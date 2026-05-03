import type { RefObject } from 'react'

export function PreviewFrame({
  iframeId,
  previewFrameRef,
  previewHtml,
}: {
  iframeId: string
  previewFrameRef: RefObject<HTMLIFrameElement | null>
  previewHtml: string
}) {
  return (
    <iframe
      ref={previewFrameRef}
      id={iframeId}
      title="Pré-visualização do currículo"
      className="h-full min-h-[72vh] w-full rounded-xl border border-border/70 bg-white shadow-sm shadow-black/5 xl:min-h-0"
      srcDoc={previewHtml}
    />
  )
}
