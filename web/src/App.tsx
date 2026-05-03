import { PreviewPanel } from '@/components/preview/preview-panel'
import { StatusAlert } from '@/components/feedback/status-alert'
import { Card } from '@/components/ui/card'
import { WorkspaceContent } from '@/components/workspace/workspace-content'
import { WorkspaceHeader } from '@/components/workspace/header'
import { WorkspaceModeSwitch } from '@/components/workspace/mode-switch'
import { PreviewRenderSync } from '@/hooks/use-app-preview'

function App() {
  return (
    <main className="min-h-screen px-3 py-3 sm:px-4 sm:py-4">
      <PreviewRenderSync />
      <div className="mx-auto grid max-w-[1580px] gap-4 xl:grid-cols-[minmax(35rem,1.02fr)_minmax(32rem,0.98fr)] xl:items-start">
        <Card className="grid min-h-0 overflow-hidden border-border/80 bg-card xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <WorkspaceHeader />
          <StatusAlert />
          <WorkspaceModeSwitch />
          <WorkspaceContent />
        </Card>
        <PreviewPanel />
      </div>
    </main>
  )
}

export default App
