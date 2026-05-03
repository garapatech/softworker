import { Textarea } from '@/components/ui/textarea'
import { useSourceEditor } from '@/hooks/use-source-editor'
import { cn } from '@/lib/utils'

export function SourceEditor() {
  const { hasErrors, message, onChange, value } = useSourceEditor()

  return (
    <section className="grid gap-4 overflow-auto p-3 sm:p-4">
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
          'min-h-[58vh] rounded-xl border-slate-800/90 bg-slate-950 px-4 py-3 font-mono text-[0.8rem] leading-6 text-slate-100 caret-emerald-300 shadow-inner sm:min-h-[62vh] xl:min-h-[calc(100vh-15rem)]',
          hasErrors ? 'border-destructive/70' : 'focus-visible:ring-emerald-400/40',
        )}
      />
    </section>
  )
}
