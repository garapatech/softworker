import { useEffect, useId, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useAppPreview() {
  const iframeId = useId()
  const previewFrameRef = useRef<HTMLIFrameElement>(null)
  const mode = useFormStore((state) => state.mode)
  const { language, renderPreview, resumeDraft } = useResumeStore(
    useShallow((state) => ({
      language: state.language,
      renderPreview: state.renderPreview,
      resumeDraft: state.resumeDraft,
    })),
  )

  useEffect(() => {
    void renderPreview()
  }, [language, renderPreview, resumeDraft])

  function handlePrintPdf() {
    previewFrameRef.current?.contentWindow?.print()
  }

  return {
    handlePrintPdf,
    iframeId,
    mode,
    previewFrameRef,
  }
}
