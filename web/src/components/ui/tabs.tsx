import { createContext, useContext, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>.')
  }

  return context
}

export function Tabs({
  children,
  className,
  onValueChange,
  value,
}: {
  children: ReactNode
  className?: string
  onValueChange: (value: string) => void
  value: string
}) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-2xl border border-border/70 bg-gradient-to-b from-muted/55 to-muted/70 p-1 text-muted-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  children,
  className,
  value,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = useTabsContext()
  const active = context.value === value

  return (
    <button
      type="button"
      className={cn(
        'inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-transparent px-3 py-1.5 text-[0.9rem] font-semibold tracking-[-0.01em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-card text-foreground shadow-[0_1px_2px_rgb(15_23_42/0.06)] ring-1 ring-border/60'
          : 'bg-transparent text-muted-foreground hover:bg-background/55 hover:text-foreground',
        className,
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}
