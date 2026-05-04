import { PreviewPanel } from '@/components/preview/preview-panel'
import { StatusAlert } from '@/components/feedback/status-alert'
import { Card } from '@/components/ui/card'
import { WorkspaceContent } from '@/components/workspace/workspace-content'
import { WorkspaceHeader } from '@/components/workspace/header'
import { WorkspaceModeSwitch } from '@/components/workspace/mode-switch'
import { PreviewRenderSync } from '@/hooks/use-app-preview'

function App() {
  return (
    <main className="min-h-screen px-2.5 py-2.5 sm:px-3 sm:py-3 xl:px-4 xl:py-4">
      <PreviewRenderSync />
      <div className="mx-auto grid max-w-[1888px] gap-4 xl:grid-cols-[minmax(38rem,1.04fr)_minmax(34rem,0.96fr)] xl:items-start">
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
