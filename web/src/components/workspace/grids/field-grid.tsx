import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function FieldGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid gap-3 md:grid-cols-2', className)} {...props} />
}
