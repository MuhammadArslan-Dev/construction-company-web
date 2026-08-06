"use client"

import * as React from "react"
import { ArrowUp, RotateCcw, Sparkles, Square } from "lucide-react"

import { AssistantMessageBody } from "@/components/assistant/assistant-message"
import { Button } from "@/components/ui/button"
import { useHydrated } from "@/hooks/use-hydrated"
import type { AssistantMessage } from "@/lib/schemas"
import { cn } from "@/lib/utils"

export const suggestedPrompts = [
  "What does a 40-storey tower cost?",
  "Show me your healthcare projects",
  "How does your delivery process work?",
  "Which offices cover Southeast Asia?",
]

type Turn = AssistantMessage & { id: string; pending?: boolean }

let turnId = 0
const nextId = () => `turn-${++turnId}`

const OPENING: Turn = {
  id: "opening",
  role: "assistant",
  content:
    "I answer questions about our services, projects, offices, process and costs — from what the site actually publishes, not from guesswork.\n\nWhat are you building?",
}

/**
 * AI construction assistant.
 *
 * Reads the response body as a stream and appends each chunk, so the answer
 * appears at reading speed rather than arriving as a block after a long pause.
 * The request is abortable: closing the panel or pressing Stop cancels it, and
 * the server stops generating rather than finishing into a void.
 *
 * `variant="panel"` is the docked widget; `variant="page"` is the full-width
 * layout used on /tools/assistant. Same machine, different frame.
 */
export function AssistantChat({
  variant = "panel",
  className,
  autoFocus = false,
}: {
  variant?: "panel" | "page"
  className?: string
  autoFocus?: boolean
}) {
  const hydrated = useHydrated()
  const [turns, setTurns] = React.useState<Turn[]>([OPENING])
  const [draft, setDraft] = React.useState("")
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const abortRef = React.useRef<AbortController | null>(null)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null)

  /* `send` must read the transcript without depending on it — putting `turns`
     in the dependency list would rebuild the callback on every streamed chunk.
     A ref kept in sync each render gives the current value with a stable
     identity. */
  const turnsRef = React.useRef(turns)
  turnsRef.current = turns

  /* Stop generating if the component unmounts — the panel was closed. */
  React.useEffect(() => () => abortRef.current?.abort(), [])

  React.useEffect(() => {
    if (autoFocus && hydrated) inputRef.current?.focus()
  }, [autoFocus, hydrated])

  const scrollToEnd = React.useCallback(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" })
  }, [])

  React.useEffect(() => {
    scrollToEnd()
  }, [turns, scrollToEnd])

  const send = React.useCallback(
    async (raw: string) => {
      const question = raw.trim()
      if (!question || busy) return

      setError(null)
      setDraft("")

      const userTurn: Turn = { id: nextId(), role: "user", content: question }
      const answerId = nextId()

      /* The opening line is UI copy, not a turn the model produced — sending it
         back would have the assistant answering its own greeting. Trim to the
         last few exchanges so a long session cannot outgrow the schema's cap. */
      const history: AssistantMessage[] = [...turnsRef.current, userTurn]
        .filter(
          (turn) => turn.id !== "opening" && turn.content.trim().length > 0
        )
        .slice(-16)
        .map((turn) => ({ role: turn.role, content: turn.content }))

      /* A window that opens on an assistant turn is not a valid conversation —
         the first message must be from the user. */
      while (history.length > 0 && history[0].role !== "user") history.shift()

      setTurns((current) => [
        ...current,
        userTurn,
        { id: answerId, role: "assistant", content: "", pending: true },
      ])

      setBusy(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          const payload = await response.json().catch(() => null)
          throw new Error(
            (payload as { message?: string } | null)?.message ??
              "The assistant is unavailable right now."
          )
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          if (!chunk) continue
          setTurns((current) =>
            current.map((turn) =>
              turn.id === answerId
                ? { ...turn, content: turn.content + chunk, pending: false }
                : turn
            )
          )
        }

        setTurns((current) =>
          current.map((turn) =>
            turn.id === answerId
              ? {
                  ...turn,
                  pending: false,
                  content:
                    turn.content.trim() ||
                    "I did not get an answer back that time. Please try again.",
                }
              : turn
          )
        )
      } catch (cause) {
        const aborted = cause instanceof DOMException && cause.name === "AbortError"

        setTurns((current) =>
          current.flatMap((turn) => {
            if (turn.id !== answerId) return [turn]
            /* An aborted turn with nothing rendered leaves no trace. */
            if (aborted && !turn.content.trim()) return []
            return [{ ...turn, pending: false }]
          })
        )

        if (!aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "The assistant is unavailable right now."
          )
        }
      } finally {
        abortRef.current = null
        setBusy(false)
      }
    },
    [busy]
  )

  const stop = () => abortRef.current?.abort()

  const reset = () => {
    abortRef.current?.abort()
    setTurns([OPENING])
    setDraft("")
    setError(null)
    inputRef.current?.focus()
  }

  const showSuggestions = turns.length === 1 && !busy

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col",
        variant === "page" &&
          "border-border bg-background overflow-hidden rounded-xs border",
        className
      )}
    >
      {/* Transcript ---------------------------------------------------- */}
      <div
        ref={scrollRef}
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6",
          variant === "page" && "px-6 py-8 lg:px-10"
        )}
      >
        <div
          aria-live="polite"
          aria-busy={busy}
          className="mx-auto flex w-full max-w-2xl flex-col gap-6"
        >
          {turns.map((turn) =>
            turn.role === "user" ? (
              <div key={turn.id} className="flex justify-end">
                <p className="bg-foreground text-background max-w-[85%] rounded-xs px-4 py-3 text-sm leading-relaxed">
                  {turn.content}
                </p>
              </div>
            ) : (
              <div key={turn.id} className="flex gap-3">
                <span
                  aria-hidden
                  className="border-border text-accent-text mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border"
                >
                  <Sparkles className="size-3.5" />
                </span>
                <div className="text-foreground/85 min-w-0 flex-1 text-sm leading-relaxed">
                  {turn.pending ? (
                    <span className="text-muted-foreground inline-flex items-center gap-1.5">
                      <span className="sr-only">Thinking</span>
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          aria-hidden
                          className="bg-current size-1.5 rounded-full motion-safe:animate-pulse"
                          style={{ animationDelay: `${dot * 160}ms` }}
                        />
                      ))}
                    </span>
                  ) : (
                    <AssistantMessageBody content={turn.content} />
                  )}
                </div>
              </div>
            )
          )}

          {showSuggestions ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void send(prompt)}
                  disabled={!hydrated}
                  className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/35 focus-visible:ring-ring rounded-full border px-3.5 py-2 text-left text-xs transition-colors duration-300 focus-visible:ring-2 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          {error ? (
            <p role="alert" className="text-destructive text-sm">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      {/* Composer ------------------------------------------------------ */}
      <div className="border-border bg-background border-t p-4">
        <form
          className="mx-auto w-full max-w-2xl"
          onSubmit={(event) => {
            event.preventDefault()
            void send(draft)
          }}
        >
          <div className="border-input focus-within:border-foreground/40 flex items-end gap-2 rounded-xs border px-3 py-2 transition-colors">
            <label htmlFor="assistant-input" className="sr-only">
              Ask the construction assistant
            </label>
            <textarea
              id="assistant-input"
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                const node = event.target
                node.style.height = "auto"
                node.style.height = `${Math.min(node.scrollHeight, 140)}px`
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void send(draft)
                }
              }}
              /* Short enough to sit on one line at 360px — a placeholder that
                 wraps in a single-row textarea gets clipped and scrolled. */
              placeholder="Ask about a project or a cost…"
              maxLength={4000}
              className="text-foreground placeholder:text-muted-foreground max-h-[140px] min-h-[2.25rem] flex-1 resize-none bg-transparent py-1.5 text-sm outline-none"
            />

            {busy ? (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={stop}
                aria-label="Stop generating"
              >
                <Square aria-hidden className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                variant="gold"
                disabled={!hydrated || draft.trim().length === 0}
                aria-label="Send question"
              >
                <ArrowUp aria-hidden className="size-4" />
              </Button>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-4">
            <p className="text-muted-foreground text-[0.7rem] leading-relaxed">
              Answers are indicative and drawn from this site. A director
              confirms anything contractual.
            </p>
            {turns.length > 1 ? (
              <button
                type="button"
                onClick={reset}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex shrink-0 items-center gap-1.5 rounded-sm text-[0.7rem] transition-colors focus-visible:ring-2"
              >
                <RotateCcw aria-hidden className="size-3" />
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
