import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function SourceEditor() {
  const value = useFormStore((state) => state.jsonDraft)
  const message = useFormStore((state) => state.jsonStatusMessage)
  const onChange = useFormStore((state) => state.applyJsonDraft)
  const validationIssues = useResumeStore((state) => state.validationState.issues)
  const hasErrors = Boolean(message) || validationIssues.length > 0

  return (
    <section className="grid gap-4 overflow-auto p-4">
      <div className="rounded-lg border border-border/70 bg-muted/20 px-4 py-3">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-primary">Fonte</p>
        <p className="mt-1 text-sm font-semibold text-foreground">Edite o currículo direto em JSON</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          O preview continua reagindo ao estado válido mais recente.
        </p>
      </div>

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
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'min-h-[60vh] rounded-xl border-slate-800/90 bg-slate-950 px-4 py-3 font-mono text-[0.8rem] leading-6 text-slate-100 caret-emerald-300 shadow-inner xl:min-h-[calc(100vh-15rem)]',
          hasErrors ? 'border-destructive/70' : 'focus-visible:ring-emerald-400/40',
        )}
      />
    </section>
  )
}
