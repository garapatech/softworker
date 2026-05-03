import { ItemCard } from '@/components/workspace/cards/item-card'
import { ResumeFieldList } from '@/components/workspace/fields/resume-field-list'
import { SectionHeader } from '@/components/workspace/sections/section-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAtPath, type JsonObject, type JsonValue, type PathPart } from '@/services/resume.service'
import {
  countValidationIssues,
  getSectionDomId,
  sectionKey,
  type ArraySectionDefinition,
} from '@/services/resume-form.service'

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
  const key = sectionKey(section)
  const sectionId = getSectionDomId(key)
  const headingId = `${sectionId}-heading`
  const contentId = `${sectionId}-content`
  const errorCount = countValidationIssues(validationErrors, key)

  return (
    <Card id={sectionId} className="scroll-mt-4 overflow-hidden border-border/70">
      <SectionHeader
        title={section.title}
        subtitle={
          errorCount > 0
            ? `${items.length} ${items.length === 1 ? 'item' : 'itens'} com ajuste`
            : `${items.length} ${items.length === 1 ? 'item' : 'itens'}`
        }
        headingId={headingId}
        contentId={contentId}
        isOpen={isOpen}
        onToggle={() => onToggle(!isOpen)}
        status={errorCount > 0 ? <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">Revisão pendente</span> : undefined}
        actions={
          <Button
            variant="outline"
            size="sm"
            className="size-8 rounded-full border-border/80 bg-background p-0 text-base leading-none text-muted-foreground shadow-none hover:border-border hover:bg-accent/50 hover:text-foreground"
            aria-label={`Adicionar ${section.itemTitle.toLocaleLowerCase('pt-BR')}`}
            onClick={() => onAdd(section.path, section.createItem())}
          >
            +
          </Button>
        }
      />

      {isOpen ? (
        <CardContent
          id={contentId}
          aria-labelledby={headingId}
          className={
            items.length === 0
              ? 'space-y-4 bg-muted/10 pt-4'
              : 'space-y-4 border-t border-border/70 bg-muted/10 pt-5'
          }
        >
          {items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/70 bg-background/70 px-4 py-5 text-sm leading-6 text-muted-foreground">
              Nenhum item ainda. Use o botão `+` para adicionar o primeiro.
            </p>
          ) : (
            <>
              <p className="text-[0.82rem] leading-[1.45] text-muted-foreground">
                Use um item por linha nos campos de lista.
              </p>

              <div className="grid gap-3">
                {items.map((item, index) => {
                  const itemErrorCount = countValidationIssues(validationErrors, `${key}.${index}`)

                  return (
                    <ItemCard
                      key={`${section.path.join('.')}.${index}`}
                      hasErrors={itemErrorCount > 0}
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
                  )
                })}
              </div>
            </>
          )}
        </CardContent>
      ) : null}
    </Card>
  )
}
