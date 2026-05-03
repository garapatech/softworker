import { ItemCard } from '@/components/workspace/cards/item-card'
import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { SectionHeader } from '@/components/workspace/sections/section-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAtPath, type JsonObject, type JsonValue, type PathPart } from '@/services/resume.service'
import type { ArraySectionDefinition } from '@/services/resume-form.service'

export function ArraySection({
  isOpen,
  onAdd,
  onChange,
  onRemove,
  onToggle,
  resume,
  section,
  validationErrors,
}: {
  isOpen: boolean
  onAdd: (path: string[], item: JsonObject) => void
  onChange: (path: PathPart[], value: JsonValue) => void
  onRemove: (path: string[], index: number) => void
  onToggle: (open: boolean) => void
  resume: JsonObject
  section: ArraySectionDefinition
  validationErrors: Record<string, string[]>
}) {
  const items = (getAtPath(resume, section.path) as JsonObject[] | undefined) ?? []

  return (
    <Card className="overflow-hidden border-border/70 shadow-sm shadow-black/5">
      <SectionHeader
        title={section.title}
        subtitle={`${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
        isOpen={isOpen}
        onToggle={() => onToggle(!isOpen)}
        actions={
          <Button variant="secondary" size="sm" onClick={() => onAdd(section.path, section.createItem())}>
            Adicionar
          </Button>
        }
      />

      {isOpen ? (
        <CardContent className="space-y-4 border-t border-border/70 bg-muted/10 pt-5">
          <p className="text-[0.82rem] leading-[1.45] text-muted-foreground">
            Use um item por linha nos campos de lista.
          </p>

          <div className="grid gap-3">
            {items.map((item, index) => (
              <ItemCard
                key={`${section.path.join('.')}.${index}`}
                title={section.itemTitle}
                index={index}
                onRemove={() => onRemove(section.path, index)}
              >
                <ResumeFieldList
                  fields={section.fields}
                  onChange={onChange}
                  pathPrefix={[...section.path, index]}
                  validationErrors={validationErrors}
                  values={item}
                />
              </ItemCard>
            ))}
          </div>
        </CardContent>
      ) : null}
    </Card>
  )
}
