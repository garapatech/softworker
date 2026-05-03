import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { WORKSPACE_PANEL_HEIGHT_CLASS } from '@/components/workspace/workspace-panel.constants'

export function WorkspacePanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={cn('grid gap-3 overflow-auto p-3 sm:p-4', className)}>{children}</section>
}

export function WorkspacePanelFallback() {
  return (
    <WorkspacePanel>
      <div className="h-12 animate-pulse rounded-xl border border-border/70 bg-muted/40" />
      <div className={cn(WORKSPACE_PANEL_HEIGHT_CLASS, 'animate-pulse rounded-xl border border-border/70 bg-muted/30')} />
    </WorkspacePanel>
  )
}
