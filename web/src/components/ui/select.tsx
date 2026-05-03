import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'flex h-10 w-full cursor-pointer appearance-none rounded-xl border border-input bg-background px-3 py-2 pr-10 text-base text-foreground shadow-sm outline-none transition-[color,box-shadow,border-color] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-muted-foreground"
      >
        ▾
      </span>
    </div>
  )
}
