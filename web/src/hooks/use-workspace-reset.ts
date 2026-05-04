import { buildValidationIssueCounts } from '@/services/resume-form.service'
import { formatJson, validateResume } from '@/services/resume.service'
import { DEFAULT_LANGUAGE, DEFAULT_RESUME } from '@/services/preview.service'
import { clearWorkspacePersistence } from '@/services/workspace-persistence.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useWorkspaceReset() {
  return async () => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('Resetar o progresso salvo deste currículo?')

      if (!confirmed) {
        return
      }
    }

    clearWorkspacePersistence()

    const validationState = validateResume(DEFAULT_RESUME)

    useResumeStore.setState({
      language: DEFAULT_LANGUAGE,
      previewHtml: '',
      previewStatusMessage: '',
      resumeDraft: DEFAULT_RESUME,
      validationIssueCounts: buildValidationIssueCounts(validationState.byPath),
      validationState,
    })

    useFormStore.setState({
      jsonDraft: formatJson(DEFAULT_RESUME),
      jsonStatusMessage: '',
      mode: 'form',
      openSections: new Set<string>(),
    })

    await useResumeStore.getState().renderPreview()
  }
}
