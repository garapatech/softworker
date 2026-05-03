import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export function ItemCard({
  children,
  index,
  onRemove,
  title,
}: {
  children: ReactNode
  index: number
  onRemove: () => void
  title: string
}) {
  return (
    <article className="rounded-xl border border-border/70 bg-background/90 p-4 shadow-sm shadow-black/5">
      <div className="mb-3 flex flex-col gap-3 border-b pb-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-[0.94rem] font-extrabold leading-[1.18]">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">Item {index + 1}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={onRemove}>
          Remover
        </Button>
      </div>
      {children}
    </article>
  )
}
