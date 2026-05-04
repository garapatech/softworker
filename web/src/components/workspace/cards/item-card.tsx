import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ItemCard({
  children,
  hasErrors,
  index,
  onRemove,
  isHighlighted,
  title,
}: {
  children: ReactNode
  hasErrors?: boolean
  isHighlighted?: boolean
  index: number
  onRemove: () => void
  title: string
}) {
  return (
    <article
      className={cn(
        'rounded-xl border p-4 transition-[box-shadow,transform,border-color,background-color] duration-300 focus-within:ring-2 focus-within:ring-emerald-300/70',
        hasErrors
          ? 'border-rose-300/70 bg-rose-50/85'
          : 'border-border/70 bg-background/90',
        isHighlighted && 'array-item-focus-pop border-emerald-300/70 bg-emerald-50/50 shadow-[0_0_0_1px_rgba(16,185,129,0.14)]',
      )}
    >
      <div className="mb-3 flex flex-col gap-3 border-b pb-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h3 className="text-[0.92rem] font-extrabold leading-[1.18]">{title}</h3>
          <p className="mt-1 text-[0.72rem] text-muted-foreground">Item {index + 1}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-border bg-muted/40 text-foreground hover:bg-muted/70"
            onClick={onRemove}
          >
            Remover
          </Button>
        </div>
      </div>
      {children}
    </article>
  )
}
