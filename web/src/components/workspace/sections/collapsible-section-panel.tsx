import type { ReactElement, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CollapsibleSectionPanelProps {
  actions?: ReactNode
  children: ReactNode
  contentClassName?: string
  contentId: string
  headingId: string
  isOpen: boolean
  onToggle: () => void
  sectionId: string
  status?: ReactNode
  subtitle?: string
  title: string
}

export function CollapsibleSectionPanel({
  actions,
  children,
  contentClassName,
  contentId,
  headingId,
  isOpen,
  onToggle,
  sectionId,
  status,
  subtitle,
  title,
}: CollapsibleSectionPanelProps): ReactElement {
  return (
    <Card id={sectionId} className="scroll-mt-4 overflow-hidden border-border/70">
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
            <h2 className="text-[0.95rem] font-extrabold leading-[1.18]">{title}</h2>
            <div className="mt-1 min-h-[1.5rem]">
              {subtitle ? <p className="text-[0.8rem] leading-[1.45] text-muted-foreground">{subtitle}</p> : null}
            </div>
            <div className="mt-2 min-h-[2rem]">
              {status ? <div className="flex flex-wrap gap-2">{status}</div> : null}
            </div>
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

      {isOpen ? (
        <CardContent
          id={contentId}
          aria-labelledby={headingId}
          className={cn(contentClassName)}
        >
          {children}
        </CardContent>
      ) : null}
    </Card>
  )
}
