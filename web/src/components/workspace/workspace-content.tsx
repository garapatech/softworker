import { lazy, Suspense } from 'react'
import { WorkspacePanelFallback } from '@/components/workspace/workspace-panel'
import { useWorkspaceMode } from '@/hooks/use-workspace-mode'

const ResumeForm = lazy(async () => {
  const module = await import('@/components/workspace/resume-form')
  return { default: module.ResumeForm }
})

const SourceEditor = lazy(async () => {
  const module = await import('@/components/workspace/source-editor')
  return { default: module.SourceEditor }
})

export function WorkspaceContent() {
  const { mode } = useWorkspaceMode()

  return (
    <Suspense fallback={<WorkspacePanelFallback />}>
      {mode === 'form' ? <ResumeForm /> : <SourceEditor />}
    </Suspense>
  )
}
