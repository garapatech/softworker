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
    <main className="min-h-screen px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto grid max-w-[1580px] gap-4 xl:grid-cols-[minmax(35rem,1.02fr)_minmax(32rem,0.98fr)] xl:items-start">
        <Card className="grid min-h-0 overflow-hidden border-border/80 bg-card xl:grid-rows-[auto_auto_minmax(0,1fr)]">
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
