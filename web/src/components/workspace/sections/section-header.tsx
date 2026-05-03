import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeader({
  actions,
  contentId,
  headingId,
  isOpen,
  onToggle,
  status,
  subtitle,
  title,
}: {
  actions?: ReactNode
  contentId: string
  headingId: string
  isOpen: boolean
  onToggle: () => void
  status?: ReactNode
  subtitle?: string
  title: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border/70 bg-muted/15 px-4 py-3.5">
      <button
        type="button"
        className="group flex min-w-0 flex-1 cursor-pointer items-center gap-4 rounded-lg text-left transition-colors hover:text-foreground"
        aria-controls={contentId}
        aria-expanded={isOpen}
        aria-labelledby={headingId}
        onClick={onToggle}
      >
        <div className="min-w-0 flex-1" id={headingId}>
          <h2 className="text-[0.97rem] font-extrabold leading-[1.18]">{title}</h2>
          {subtitle ? <p className="mt-1 text-[0.82rem] leading-[1.45] text-muted-foreground">{subtitle}</p> : null}
          {status ? <div className="mt-2 flex flex-wrap gap-2">{status}</div> : null}
        </div>
      </button>

      <div className="flex shrink-0 items-center gap-2">
        {actions}
        <button
          type="button"
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground shadow-none transition-colors hover:border-border hover:bg-accent/50 hover:text-foreground"
          aria-controls={contentId}
          aria-expanded={isOpen}
          aria-labelledby={headingId}
          onClick={onToggle}
        >
          <span
            aria-hidden="true"
            className={cn(
              'inline-block transition-transform',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            ▾
          </span>
        </button>
      </div>
    </div>
  )
}
