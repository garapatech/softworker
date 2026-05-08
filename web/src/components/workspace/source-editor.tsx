import { cn } from '@/lib/utils'
import { type ResumeLanguage } from '@/services/preview.service'
import type { JsonObject } from '@/services/resume.service'
import { parseSourceDraft } from '@/services/source-editor.service'
import { type UiStrings } from '@/services/ui-i18n.service'
import { useFormStore } from '@/stores/form.store'
import { useState, type ChangeEvent, type ReactElement, type ReactNode } from 'react'
import { useShallow } from 'zustand/react/shallow'

const WORKSPACE_PANEL_HEIGHT_CLASS =
  'min-h-[42vh] sm:min-h-[50vh] lg:min-h-[58vh] xl:min-h-[calc(100vh-15rem)]'

const JSON_TOKEN_REGEX =
  /("(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\btrue\b|\bfalse\b|\bnull\b|[{},:\\[\\]]|\s+|[\s\S])/g

function getNextNonWhitespaceCharacter(source: string, startIndex: number): string | null {
  for (let index = startIndex; index < source.length; index += 1) {
    const character = source[index]
    if (!/\s/.test(character)) {
      return character
    }
  }

  return null
}

function highlightJsonSource(source: string): ReactNode[] {
  const nodes: ReactNode[] = []

  for (const match of source.matchAll(JSON_TOKEN_REGEX)) {
    const token = match[0]
    const tokenStartIndex = match.index ?? 0
    const nextCharacter = getNextNonWhitespaceCharacter(source, tokenStartIndex + token.length)

    if (token.startsWith('"')) {
      const className = nextCharacter === ':' ? 'text-sky-300' : 'text-emerald-300'

      nodes.push(
        <span key={`${tokenStartIndex}-${token}`} className={className}>
          {token}
        </span>,
      )
      continue
    }

    if (/^-?\d/.test(token)) {
      nodes.push(
        <span key={`${tokenStartIndex}-${token}`} className="text-amber-300">
          {token}
        </span>,
      )
      continue
    }

    if (token === 'true' || token === 'false' || token === 'null') {
      nodes.push(
        <span key={`${tokenStartIndex}-${token}`} className="text-violet-300">
          {token}
        </span>,
      )
      continue
    }

    if ('{}[],:'.includes(token)) {
      nodes.push(
        <span key={`${tokenStartIndex}-${token}`} className="text-slate-500">
          {token}
        </span>,
      )
      continue
    }

    nodes.push(token)
  }

  return nodes
}

interface SourceEditorProps {
  language: ResumeLanguage
  setResumeDraft: (resumeDraft: JsonObject) => void
  ui: UiStrings
  hasValidationIssues: boolean
}

export function SourceEditor({
  language,
  setResumeDraft,
  ui,
  hasValidationIssues,
}: SourceEditorProps): ReactElement {
  const {
    clearJsonStatus,
    message,
    setJsonDraft,
    setJsonStatusMessage,
    value,
  } = useFormStore(
    useShallow((state) => ({
      clearJsonStatus: state.clearJsonStatus,
      message: state.jsonStatusMessage,
      setJsonDraft: state.setJsonDraft,
      setJsonStatusMessage: state.setJsonStatusMessage,
      value: state.jsonDraft,
    })),
  )
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const hasErrors = Boolean(message) || hasValidationIssues
  const highlightedJson = highlightJsonSource(value)

  return (
    <section className="grid min-h-0 gap-4 overflow-auto p-3 sm:p-4">
      {message ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
          {message}
        </div>
      ) : null}

      <div
        className={cn(
          WORKSPACE_PANEL_HEIGHT_CLASS,
          'relative overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950 shadow-inner',
          hasErrors ? 'border-destructive/70' : 'focus-within:ring-2 focus-within:ring-emerald-400/40',
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden px-4 py-3 font-mono text-[0.8rem] leading-6"
        >
          <div
            className="min-h-full whitespace-pre-wrap break-words text-slate-100"
            style={{
              transform: `translate(${-scrollLeft}px, ${-scrollTop}px)`,
              willChange: 'transform',
            }}
          >
            <pre className="m-0 whitespace-pre-wrap break-words">{highlightedJson}</pre>
          </div>
        </div>

        <textarea
          id="resume-source"
          aria-label={ui.sourceEditorAriaLabel}
          spellCheck={false}
          value={value}
          onScroll={(event): void => {
            setScrollTop(event.currentTarget.scrollTop)
            setScrollLeft(event.currentTarget.scrollLeft)
          }}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
            const nextValue = event.target.value

            setJsonDraft(nextValue)
            const { errorMessage, resumeDraft } = parseSourceDraft(nextValue, language)

            if (resumeDraft !== null) {
              setResumeDraft(resumeDraft)
              clearJsonStatus()
              return
            }

            setJsonStatusMessage(`${ui.sourceInvalidJsonPrefix} ${errorMessage}`)
          }}
          className="relative z-10 h-full w-full resize-none overflow-auto bg-transparent px-4 py-3 font-mono text-[0.8rem] leading-6 text-transparent caret-emerald-300 outline-none selection:bg-emerald-400/25 selection:text-transparent"
          style={{
            backgroundColor: 'transparent',
            WebkitTextFillColor: 'transparent',
            caretColor: 'rgb(110 231 183)',
          }}
        />
      </div>
    </section>
  )
}
