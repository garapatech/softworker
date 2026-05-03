import { Textarea } from '@/components/ui/textarea'
import { WORKSPACE_PANEL_HEIGHT_CLASS } from '@/components/workspace/workspace-panel.constants'
import {
  WorkspacePanel,
} from '@/components/workspace/workspace-panel'
import { useSourceEditor } from '@/hooks/use-source-editor'
import { cn } from '@/lib/utils'

export function SourceEditor() {
  const { hasErrors, message, onChange, value } = useSourceEditor()

  return (
    <WorkspacePanel className="gap-4">
      {message ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
          {message}
        </div>
      ) : null}

      <Textarea
        id="resume-source"
        aria-label="Fonte JSON do currículo"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          WORKSPACE_PANEL_HEIGHT_CLASS,
          'rounded-xl border-slate-800/90 bg-slate-950 px-4 py-3 font-mono text-[0.8rem] leading-6 text-slate-100 caret-emerald-300 shadow-inner',
          hasErrors ? 'border-destructive/70' : 'focus-visible:ring-emerald-400/40',
        )}
      />
    </WorkspacePanel>
  )
}
