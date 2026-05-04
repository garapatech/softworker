import { PreviewFrame } from '@/components/preview/preview-frame'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePreviewPanel } from '@/hooks/use-preview-panel'

export function PreviewPanel() {
  const { iframeId, onDownloadJson, onPrintPdf, previewFrameRef, previewHtml } = usePreviewPanel()

  return (
    <Card className="min-h-0 overflow-hidden border-border/80 bg-card xl:sticky xl:top-4 xl:grid xl:h-[calc(100vh-2rem)] xl:grid-rows-[auto_minmax(0,1fr)]">
      <CardHeader className="gap-4 border-b border-border/70 bg-card p-4 sm:p-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-primary">Pré-visualização</p>
          <CardTitle className="mt-1 text-[1.05rem] font-extrabold tracking-[-0.02em] sm:text-[1.15rem]">Currículo em PDF</CardTitle>
          <CardDescription className="mt-1 max-w-lg text-[0.92rem] leading-6">
            A visualização acompanha o estado válido mais recente do currículo.
          </CardDescription>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-full rounded-xl border-border/80 bg-card px-3.5 text-[0.92rem] font-medium text-muted-foreground shadow-none hover:border-border hover:bg-muted/60 hover:text-foreground sm:w-auto"
            onClick={onDownloadJson}
            title="Baixar JSON"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {'{ }'}
            </span>
            Baixar JSON
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-10 w-full rounded-xl px-4 text-[0.92rem] font-semibold shadow-none sm:w-auto"
            onClick={onPrintPdf}
            title="Baixar PDF"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ↓
            </span>
            Baixar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-full overflow-auto overscroll-contain bg-muted/30 p-3 sm:p-4">
        <PreviewFrame iframeId={iframeId} previewFrameRef={previewFrameRef} previewHtml={previewHtml} />
      </CardContent>
    </Card>
  )
}
