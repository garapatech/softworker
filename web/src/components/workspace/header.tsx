import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useWorkspaceHeader } from '@/hooks/use-workspace-header'
import { PREVIEW_LANGUAGES, type ResumeLanguage } from '@/services/preview.service'

export function WorkspaceHeader() {
  const { language, setLanguage } = useWorkspaceHeader()

  return (
    <header className="grid gap-5 border-b border-border/70 bg-card/80 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-end">
      <div className="space-y-3">
        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-primary">SoftWorker</p>
        <div className="space-y-2">
          <h1 className="text-[clamp(1.55rem,1.8vw,1.92rem)] font-extrabold leading-tight tracking-tight text-balance">
            Editor de currículos
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Edite os dados e acompanhe o documento final sem sair da mesma tela.
          </p>
        </div>
      </div>

      <div className="grid gap-2 rounded-lg border border-border/70 bg-background/80 p-3">
        <Label htmlFor="language-select" className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
          Idioma
        </Label>
        <Select
          id="language-select"
          className="bg-background"
          value={language}
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
