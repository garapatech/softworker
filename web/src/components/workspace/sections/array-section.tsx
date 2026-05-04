import { ItemCard } from '@/components/workspace/cards/item-card'
import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { CollapsibleSectionPanel } from '@/components/workspace/sections/collapsible-section-panel'
import { Button } from '@/components/ui/button'
import { useArraySectionActions } from '@/hooks/use-array-section-actions'
import { useResumeArrayLength } from '@/hooks/use-resume-array-length'
import { useSectionPanel } from '@/hooks/use-section-panel'
import { useValidationIssueCount } from '@/hooks/use-validation-issue-count'
import { useFormStore } from '@/stores/form.store'
import { useEffect, useState } from 'react'
import {
  sectionKey,
  type ArraySectionDefinition,
} from '@/services/resume-form.service'

function ArraySectionItem({
  index,
  itemTitle,
  path,
  fields,
  isHighlighted,
  onRemove,
}: {
  index: number
  itemTitle: string
  path: string[]
  fields: ArraySectionDefinition['fields']
  isHighlighted?: boolean
  onRemove: () => void
}) {
  const itemErrorCount = useValidationIssueCount(`${path.join('.')}.${index}`)

  return (
    <ItemCard
      hasErrors={itemErrorCount > 0}
      isHighlighted={isHighlighted}
      title={itemTitle}
      index={index}
      onRemove={onRemove}
    >
      <ResumeFieldList
        fields={fields}
        pathPrefix={[...path, index]}
      />
    </ItemCard>
  )
}

export function ArraySection({ section }: { section: ArraySectionDefinition }) {
  const { onAdd, onRemove } = useArraySectionActions()
  const key = sectionKey(section)
  const { contentId, errorCount, headingId, isOpen, onToggle, sectionId } = useSectionPanel(key)
  const itemCount = useResumeArrayLength(section.path)
  const toggleSection = useFormStore((state) => state.toggleSection)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  function focusNewItem(nextIndex: number) {
    const firstFieldKey = section.fields[0]?.key

    if (!firstFieldKey) {
      return
    }

    const elementId = [...section.path, nextIndex, firstFieldKey].join('.')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(elementId)
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
          target.focus()
        }
      })
    })
  }

  function handleAddItem() {
    const nextIndex = itemCount

    if (!isOpen) {
      toggleSection(key, true)
    }

    setHighlightedIndex(nextIndex)
    onAdd(section.path, section.createItem())
    focusNewItem(nextIndex)
  }

  useEffect(() => {
    if (highlightedIndex == null) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setHighlightedIndex(null)
    }, 1400)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [highlightedIndex])

  return (
    <CollapsibleSectionPanel
      title={section.title}
      subtitle={
        errorCount > 0
          ? `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} com ajuste`
          : `${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`
      }
      sectionId={sectionId}
      headingId={headingId}
      contentId={contentId}
      isOpen={isOpen}
      onToggle={onToggle}
      status={errorCount > 0 ? <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">Revisão pendente</span> : undefined}
      actions={
        <Button
          variant="outline"
          size="sm"
          className="size-8 rounded-full border-border/80 bg-background p-0 text-base leading-none text-muted-foreground shadow-none hover:border-border hover:bg-accent/50 hover:text-foreground"
          aria-label={`Adicionar ${section.itemTitle.toLocaleLowerCase('pt-BR')}`}
          onClick={handleAddItem}
        >
          +
        </Button>
      }
      contentClassName={
        itemCount === 0
          ? 'space-y-4 bg-muted/10 pt-4'
          : 'space-y-4 border-t border-border/70 bg-muted/10 pt-5'
      }
    >
      {itemCount === 0 ? (
        <p className="rounded-lg border border-dashed border-border/70 bg-background/70 px-4 py-5 text-sm leading-6 text-muted-foreground">
          Nenhum item ainda. Use o botão `+` para adicionar o primeiro.
        </p>
      ) : (
        <>
          <p className="text-[0.8rem] leading-[1.45] text-muted-foreground">
            Use um item por linha nos campos de lista.
          </p>

          <div className="grid gap-3">
            {Array.from({ length: itemCount }, (_, index) => (
              <ArraySectionItem
                key={`${section.path.join('.')}.${index}`}
                index={index}
                itemTitle={section.itemTitle}
                path={section.path}
                fields={section.fields}
                isHighlighted={highlightedIndex === index}
                onRemove={() => onRemove(section.path, index)}
              />
            ))}
          </div>
        </>
      )}
    </CollapsibleSectionPanel>
  )
}
