import { ResumeForm } from '@/components/workspace/resume-form'
import { SourceEditor } from '@/components/workspace/source-editor'
import { useWorkspaceMode } from '@/hooks/use-workspace-mode'

export function WorkspaceContent() {
  const { mode } = useWorkspaceMode()

  return mode === 'form' ? <ResumeForm /> : <SourceEditor />
}
