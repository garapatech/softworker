import { Button } from '@/components/ui/button'

export function PreviewActions({
  onDownloadJson,
  onPrintPdf,
}: {
  onDownloadJson: () => void
  onPrintPdf: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button variant="secondary" size="sm" onClick={onDownloadJson}>
        Baixar JSON
      </Button>
      <Button size="sm" onClick={onPrintPdf}>
        Baixar PDF
      </Button>
    </div>
  )
}
