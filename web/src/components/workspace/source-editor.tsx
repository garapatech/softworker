import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { parseResumeJson } from '@/services/resume.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'
import type { ChangeEvent, ReactElement } from 'react'

const WORKSPACE_PANEL_HEIGHT_CLASS =
  'min-h-[42vh] sm:min-h-[50vh] lg:min-h-[58vh] xl:min-h-[calc(100vh-15rem)]'

export function SourceEditor(): ReactElement {
  const value = useFormStore((state) => state.jsonDraft)
  const message = useFormStore((state) => state.jsonStatusMessage)
  const clearJsonStatus = useFormStore((state) => state.clearJsonStatus)
  const setJsonDraft = useFormStore((state) => state.setJsonDraft)
  const setJsonStatusMessage = useFormStore((state) => state.setJsonStatusMessage)
  const setResumeDraft = useResumeStore((state) => state.setResumeDraft)
  const validationIssueCount = useResumeStore((state) => state.validationState.issues.length)

  const hasErrors = Boolean(message) || validationIssueCount > 0

  return (
    <section className="grid min-h-0 gap-4 overflow-auto p-3 sm:p-4">
      {message ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
          {message}
        </div>
      ) : null}

      <Textarea
        id="resume-source"
        aria-label="Fonte JSON do currículo"
        spellCheck={false}
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
          const nextValue = event.target.value

          setJsonDraft(nextValue)

          try {
            setResumeDraft(parseResumeJson(nextValue))
            clearJsonStatus()
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'JSON inválido.'
            setJsonStatusMessage(`JSON inválido: ${errorMessage}`)
          }
        }}
        className={cn(
          WORKSPACE_PANEL_HEIGHT_CLASS,
          'rounded-xl border-slate-800/90 bg-slate-950 px-4 py-3 font-mono text-[0.8rem] leading-6 text-slate-100 caret-emerald-300 shadow-inner',
          hasErrors ? 'border-destructive/70' : 'focus-visible:ring-emerald-400/40',
        )}
      />
    </section>
  )
}
