import { clearWorkspacePersistence } from '@/services/workspace-persistence.service'
import { useFormStore } from '@/stores/form.store'
import { useResumeStore } from '@/stores/resume.store'

export async function resetWorkspaceToDefaults(renderPreview: () => Promise<void>): Promise<void> {
  clearWorkspacePersistence()

  useResumeStore.getState().resetToDefaults()
  useFormStore.getState().resetToDefaults()

  await renderPreview()
}
