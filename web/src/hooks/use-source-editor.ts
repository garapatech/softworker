import { useShallow } from 'zustand/react/shallow'
import { parseResumeJson } from '@/services/resume.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export function useSourceEditor() {
  const { clearJsonStatus, jsonDraft, jsonStatusMessage, setJsonDraft, setJsonStatusMessage } = useFormStore(
    useShallow((state) => ({
      clearJsonStatus: state.clearJsonStatus,
      jsonDraft: state.jsonDraft,
      jsonStatusMessage: state.jsonStatusMessage,
      setJsonDraft: state.setJsonDraft,
      setJsonStatusMessage: state.setJsonStatusMessage,
    })),
  )
  const setResumeDraft = useResumeStore((state) => state.setResumeDraft)
  const validationIssueCount = useResumeStore((state) => state.validationState.issues.length)

  const onChange = (value: string) => {
    setJsonDraft(value)

    try {
      setResumeDraft(parseResumeJson(value))
      clearJsonStatus()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'JSON inválido.'
      setJsonStatusMessage(`JSON inválido: ${message}`)
    }
  }

  return {
    hasErrors: Boolean(jsonStatusMessage) || validationIssueCount > 0,
    message: jsonStatusMessage,
    onChange,
    value: jsonDraft,
  }
}
