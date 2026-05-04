import { useShallow } from 'zustand/react/shallow'
import { useId, useRef } from 'react'
import { useResumeStore } from '@/stores/resume.store'

export function usePreviewPanel() {
  const iframeId = useId()
  const previewFrameRef = useRef<HTMLIFrameElement>(null)
  const previewPanelState = useResumeStore(
    useShallow((state) => ({
      onDownloadJson: state.downloadJson,
      previewHtml: state.previewHtml,
    })),
  )

  function onPrintPdf() {
    previewFrameRef.current?.contentWindow?.focus()
    previewFrameRef.current?.contentWindow?.print()
  }

  return {
    ...previewPanelState,
    iframeId,
    onPrintPdf,
    previewFrameRef,
  }
}
