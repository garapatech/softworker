import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export function ItemCard({
  children,
  hasErrors,
  index,
  onRemove,
  title,
}: {
  children: ReactNode
  hasErrors?: boolean
  index: number
  onRemove: () => void
  title: string
}) {
  return (
    <article
      className={
        hasErrors
          ? 'rounded-xl border border-rose-200 bg-rose-50/50 p-4'
          : 'rounded-xl border border-border/70 bg-background/90 p-4'
      }
    >
      <div className="mb-3 flex flex-col gap-3 border-b pb-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h3 className="text-[0.94rem] font-extrabold leading-[1.18]">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">Item {index + 1}</p>
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
