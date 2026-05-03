import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useWorkspaceMode } from '@/hooks/use-workspace-mode'

export function WorkspaceModeSwitch() {
  const { mode, setMode } = useWorkspaceMode()

  return (
    <section className="flex flex-col gap-4 border-b border-border/70 bg-card px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-primary">
          Modo de edição
        </span>
        <strong className="mt-1 block text-sm font-semibold leading-5 text-foreground">
          Escolha entre formulário estruturado e fonte JSON
        </strong>
      </div>
      <Tabs value={mode} onValueChange={(value) => setMode(value as 'form' | 'source')} className="self-start md:self-auto">
        <TabsList className="grid w-[12.5rem] grid-cols-2 rounded-xl border-border bg-muted/70 p-1 shadow-none">
          <TabsTrigger value="form">
            Formulário
          </TabsTrigger>
          <TabsTrigger value="source">
            JSON
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  )
}
