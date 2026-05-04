import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useWorkspaceMode } from '@/hooks/use-workspace-mode'
import { useWorkspaceReset } from '@/hooks/use-workspace-reset'

export function WorkspaceModeSwitch() {
  const { mode, setMode } = useWorkspaceMode()
  const resetWorkspace = useWorkspaceReset()

  return (
    <section className="flex flex-col gap-3 border-b border-border/70 bg-card px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-primary">
          Modo de edição
        </span>
        <strong className="mt-1 block text-[0.92rem] font-semibold leading-6 text-foreground">
          Escolha entre formulário estruturado e fonte JSON
        </strong>
      </div>
      <div className="flex flex-wrap items-center gap-2 self-start rounded-lg border border-border/70 bg-muted/15 p-3 shadow-none md:self-auto">
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'form' | 'source')}>
          <TabsList className="grid w-[12.5rem] grid-cols-2 rounded-xl border-border/70 bg-background/70 shadow-none">
            <TabsTrigger value="form">
              Formulário
            </TabsTrigger>
            <TabsTrigger value="source">
              JSON
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          type="button"
          variant="outline"
          className="!h-9 !w-9 !min-w-0 shrink-0 !rounded-lg border-border/80 bg-background !p-0 text-muted-foreground shadow-none hover:border-border hover:bg-accent/50 hover:text-foreground"
          onClick={resetWorkspace}
          aria-label="Resetar progresso"
          title="Resetar progresso"
        >
          <span aria-hidden="true" className="text-[1.15rem] leading-none">
            ↻
          </span>
        </Button>
      </div>
    </section>
  )
}
