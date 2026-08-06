import Anthropic from "@anthropic-ai/sdk"

import { systemPrompt } from "@/lib/assistant/knowledge"
import { retrieveAnswer } from "@/lib/assistant/retrieval"
import { env } from "@/lib/env"
import { assistantRequestSchema } from "@/lib/schemas"

/**
 * AI construction assistant.
 *
 * Streams a plain-text answer so the panel starts rendering on the first token
 * rather than after the last. Two paths, one contract:
 *
 *   - With ANTHROPIC_API_KEY: Claude, grounded in the site's own data.
 *   - Without it: the deterministic retrieval engine, streamed in the same
 *     shape so the client code is identical either way.
 *
 * The second path is not a stub. A public marketing site that ships an
 * assistant which dies the moment a key is missing has shipped a liability,
 * not a feature.
 */

export const runtime = "nodejs"
/* Never cached: every request is a different conversation. */
export const dynamic = "force-dynamic"

const MODEL = "claude-opus-5"
const MAX_TOKENS = 1400

/** Trivial per-IP throttle. In-memory, so it resets on deploy — which is the
    correct trade-off for a marketing site that has no Redis to lean on. */
const RATE_LIMIT = { windows: new Map<string, number[]>(), max: 12, ms: 60_000 }

function isRateLimited(key: string) {
  const now = Date.now()
  const hits = (RATE_LIMIT.windows.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.ms
  )
  hits.push(now)
  RATE_LIMIT.windows.set(key, hits)

  /* Opportunistic sweep so the map cannot grow without bound. */
  if (RATE_LIMIT.windows.size > 500) {
    for (const [id, times] of RATE_LIMIT.windows) {
      if (times.every((time) => now - time >= RATE_LIMIT.ms)) {
        RATE_LIMIT.windows.delete(id)
      }
    }
  }

  return hits.length > RATE_LIMIT.max
}

function textStream(chunks: Iterable<string>, delayMs = 0) {
  const encoder = new TextEncoder()
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk))
        if (delayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
      }
      controller.close()
    },
  })
}

/** Splits an answer into word-sized chunks so the fallback path animates in
    the same way the model path does. */
function wordChunks(text: string) {
  return text.match(/\S+\s*/g) ?? [text]
}

/* `X-Assistant-Path` reports which branch the request took, not which one
   produced the words. Headers are flushed before the first token, so a Claude
   request that fails on its first read and degrades to retrieval still reports
   `claude` — the header is a diagnostic for us, never a claim to the reader. */
const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store",
  /* The panel reads the stream progressively; a proxy buffering it would
     defeat the entire point. */
  "X-Accel-Buffering": "no",
} as const

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: "Malformed request." }, { status: 400 })
  }

  const parsed = assistantRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { message: "That message could not be read. Please try again." },
      { status: 400 }
    )
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local"

  if (isRateLimited(ip)) {
    return Response.json(
      {
        message:
          "That is a lot of questions at once. Give it a minute, or email projects@meridian-construction.com.",
      },
      { status: 429 }
    )
  }

  const { messages } = parsed.data
  const latest = messages[messages.length - 1]

  const apiKey = env.ANTHROPIC_API_KEY

  /* No key — answer from the site's own content. */
  if (!apiKey) {
    if (env.NODE_ENV !== "production") {
      console.warn(
        "[assistant] No ANTHROPIC_API_KEY — answering from site retrieval."
      )
    }
    const answer =
      latest.role === "user"
        ? retrieveAnswer(latest.content)
        : "Ask me anything about our services, projects or costs."

    return new Response(textStream(wordChunks(answer), 12), {
      headers: { ...STREAM_HEADERS, "X-Assistant-Path": "retrieval" },
    })
  }

  const client = new Anthropic({ apiKey })

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: "text",
          text: systemPrompt,
          /* The system prompt is large, identical on every request and sits at
             the front of the prefix — exactly what caching is for. */
          cache_control: { type: "ephemeral" },
        },
      ],
      thinking: { type: "adaptive" },
      output_config: { effort: "low" },
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    })

    const encoder = new TextEncoder()

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        let emitted = false

        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              emitted = true
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }

          const final = await stream.finalMessage()
          if (final.stop_reason === "refusal") {
            controller.enqueue(
              encoder.encode(
                "\n\nI am not able to answer that one. A director can help directly — /contact."
              )
            )
          }
        } catch (error) {
          console.error("[assistant] Stream failed", error)

          /* A bad key or an unreachable API surfaces on the first read, before
             a single token exists — so answer from retrieval as though Claude
             had never been configured. Only a genuine mid-answer failure gets
             the apologetic wrapper, because only then is there a broken
             sentence on screen to explain. */
          controller.enqueue(
            encoder.encode(
              emitted
                ? `\n\n(That answer was cut short. ${retrieveAnswer(latest.content)})`
                : retrieveAnswer(latest.content)
            )
          )
        } finally {
          controller.close()
        }
      },
      cancel() {
        /* The visitor closed the panel — stop paying for tokens nobody reads. */
        stream.abort()
      },
    })

    return new Response(body, {
      headers: { ...STREAM_HEADERS, "X-Assistant-Path": "claude" },
    })
  } catch (error) {
    console.error("[assistant] Request failed", error)

    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { message: "The assistant is busy. Try again in a moment." },
        { status: 429 }
      )
    }

    /* Any other failure degrades to retrieval rather than an error state. */
    return new Response(
      textStream(wordChunks(retrieveAnswer(latest.content)), 12),
      { headers: { ...STREAM_HEADERS, "X-Assistant-Path": "retrieval" } }
    )
  }
}
