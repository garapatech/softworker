import type { RefObject } from 'react'
import { PreviewActions } from '@/components/preview/preview-actions'
import { PreviewFrame } from '@/components/preview/preview-frame'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeStore } from '@/stores/resume.store'

export function PreviewPanel({
  iframeId,
  onPrintPdf,
  previewFrameRef,
}: {
  iframeId: string
  onPrintPdf: () => void
  previewFrameRef: RefObject<HTMLIFrameElement | null>
}) {
  const previewHtml = useResumeStore((state) => state.previewHtml)
  const onDownloadJson = useResumeStore((state) => state.downloadJson)

  return (
    <Card className="min-h-0 overflow-hidden border-border/70 bg-card/95 shadow-lg shadow-black/5 xl:sticky xl:top-4 xl:grid xl:h-[calc(100vh-2rem)] xl:grid-rows-[auto_minmax(0,1fr)]">
      <CardHeader className="gap-4 border-b border-border/70 bg-card/80 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-primary">Pré-visualização</p>
          <CardTitle className="mt-1 text-xl">Currículo em PDF</CardTitle>
          <CardDescription className="mt-1 max-w-lg">
            A visualização acompanha o estado válido mais recente do currículo.
          </CardDescription>
        </div>
        <PreviewActions onDownloadJson={onDownloadJson} onPrintPdf={onPrintPdf} />
      </CardHeader>
      <CardContent className="h-full bg-muted/15 p-4">
        <PreviewFrame iframeId={iframeId} previewFrameRef={previewFrameRef} previewHtml={previewHtml} />
      </CardContent>
    </Card>
  )
}
