import { PreviewPanel } from '@/components/preview/preview-panel'
import { Card } from '@/components/ui/card'
import { StatusAlert } from '@/components/feedback/status-alert'
import { ResumeForm } from '@/components/workspace/resume-form'
import { SourceEditor } from '@/components/workspace/source-editor'
import { WorkspaceHeader } from '@/components/workspace/header'
import { WorkspaceModeSwitch } from '@/components/workspace/mode-switch'
import { useAppPreview } from '@/hooks/use-app-preview'

function App() {
  const { handlePrintPdf, iframeId, mode, previewFrameRef } = useAppPreview()

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto grid max-w-[1560px] gap-5 p-4 xl:grid-cols-[minmax(34rem,1.03fr)_minmax(33rem,0.97fr)]">
        <Card className="grid min-h-0 overflow-hidden border-border/70 bg-card/95 shadow-lg shadow-black/5 backdrop-blur xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <WorkspaceHeader />
          <StatusAlert />
          <WorkspaceModeSwitch />
          {mode === 'form' ? <ResumeForm /> : <SourceEditor />}
        </Card>
        <PreviewPanel iframeId={iframeId} previewFrameRef={previewFrameRef} onPrintPdf={handlePrintPdf} />
      </div>
    </main>
  )
}

export default App
