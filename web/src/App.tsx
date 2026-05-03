import { useEffect, useId, useRef } from 'react'
import { PreviewPanel } from '@/components/preview/preview-panel'
import { Card } from '@/components/ui/card'
import { StatusAlert } from '@/components/feedback/status-alert'
import { ResumeForm } from '@/components/workspace/resume-form'
import { SourceEditor } from '@/components/workspace/source-editor'
import { WorkspaceHeader } from '@/components/workspace/header'
import { WorkspaceModeSwitch } from '@/components/workspace/mode-switch'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

function App() {
  const iframeId = useId()
  const previewFrameRef = useRef<HTMLIFrameElement>(null)
  const mode = useFormStore((state) => state.mode)
  const language = useResumeStore((state) => state.language)
  const resumeDraft = useResumeStore((state) => state.resumeDraft)
  const renderPreview = useResumeStore((state) => state.renderPreview)

  useEffect(() => {
    void renderPreview()
  }, [language, renderPreview, resumeDraft])

  function handlePrintPdf() {
    previewFrameRef.current?.contentWindow?.print()
  }

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
