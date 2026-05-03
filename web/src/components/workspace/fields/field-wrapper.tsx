import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function FieldWrapper({
  children,
  error,
  full,
  id,
  label,
  required,
}: {
  children: ReactNode
  error?: string
  full?: boolean
  id: string
  label: string
  required?: boolean
}) {
  return (
    <div className={cn('grid gap-2.5', full ? 'md:col-span-2' : '')}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  )
}
