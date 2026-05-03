import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SectionHeader({
  actions,
  isOpen,
  onToggle,
  subtitle,
  title,
}: {
  actions?: ReactNode
  isOpen: boolean
  onToggle: () => void
  subtitle?: string
  title: string
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/70 bg-muted/15 px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <h2 className="text-[0.97rem] font-extrabold leading-[1.18]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[0.82rem] leading-[1.45] text-muted-foreground">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={onToggle}>
          {isOpen ? 'Recolher' : 'Expandir'}
          <span
            aria-hidden="true"
            className={cn(
              'ml-1 inline-block transition-transform',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            ▾
          </span>
        </Button>
      </div>
    </div>
  )
}
