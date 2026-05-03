import { useShallow } from 'zustand/react/shallow'
import { useResumeStore } from '@/stores/resume.store'

export function usePreviewPanel() {
  return useResumeStore(
    useShallow((state) => ({
      onDownloadJson: state.downloadJson,
      previewHtml: state.previewHtml,
    })),
  )
}
