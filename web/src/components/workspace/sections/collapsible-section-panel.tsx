import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/workspace/sections/section-header'
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
}: CollapsibleSectionPanelProps) {
  return (
    <Card id={sectionId} className="scroll-mt-4 overflow-hidden border-border/70">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        headingId={headingId}
        contentId={contentId}
        isOpen={isOpen}
        onToggle={onToggle}
        status={status}
        actions={actions}
      />

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
