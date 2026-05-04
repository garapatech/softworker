import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useWorkspaceHeader } from '@/hooks/use-workspace-header'
import { PREVIEW_LANGUAGES, type ResumeLanguage } from '@/services/preview.service'

export function WorkspaceHeader() {
  const { language, setLanguage } = useWorkspaceHeader()

  return (
    <header className="grid gap-5 border-b border-border/70 bg-card px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end">
      <div className="space-y-3">
        <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-primary">SoftWorker</p>
        <div className="space-y-2">
          <h1 className="text-[clamp(1.5rem,1.75vw,1.9rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance">
            Editor de currículos
          </h1>
          <p className="max-w-2xl text-[0.92rem] leading-6 text-muted-foreground">
            Edite os dados e acompanhe o documento final sem sair da mesma tela.
          </p>
        </div>
      </div>

      <div className="grid gap-2 rounded-2xl border border-border/70 bg-muted/60 p-2.5 shadow-none">
        <Label htmlFor="language-select" className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
          Idioma
        </Label>
        <Select
          id="language-select"
          className="min-h-11 border-border/70 bg-transparent font-medium"
          value={language}
          title="Escolher idioma do currículo"
          onChange={(event) => setLanguage(event.target.value as ResumeLanguage)}
        >
          {PREVIEW_LANGUAGES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </header>
  )
}
