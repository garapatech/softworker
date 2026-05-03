import { ArraySection } from '@/components/workspace/sections/array-section'
import { ObjectSection } from '@/components/workspace/sections/object-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FORM_SECTIONS, sectionKey } from '@/services/resume-form.service'
import type { JsonObject, JsonValue, PathPart } from '@/services/resume.service'

export function SectionList({
  hasActiveFilters,
  onAdd,
  onChange,
  onRemove,
  onResetFilters,
  onToggle,
  openSections,
  resume,
  visibleSectionKeys,
  validationErrors,
}: {
  hasActiveFilters: boolean
  onAdd: (path: string[], item: JsonObject) => void
  onChange: (path: PathPart[], value: JsonValue) => void
  onRemove: (path: string[], index: number) => void
  onResetFilters: () => void
  onToggle: (key: string, open: boolean) => void
  openSections: Set<string>
  resume: JsonObject
  visibleSectionKeys: Set<string>
  validationErrors: Record<string, string[]>
}) {
  const visibleSections = FORM_SECTIONS.filter((section) => visibleSectionKeys.has(sectionKey(section)))

  if (visibleSections.length === 0) {
    return (
      <Card className="overflow-hidden border-dashed border-sky-200 bg-white/80">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-slate-900">Nenhuma seção disponível</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Limpe a busca ou troque o filtro para voltar a exibir os blocos do currículo.
          </p>
          {hasActiveFilters ? (
            <Button variant="secondary" size="sm" className="mt-4 rounded-full" onClick={onResetFilters}>
              Mostrar todas as seções
            </Button>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {visibleSections.map((section) =>
        'key' in section ? (
          <ObjectSection
            key={section.key}
            section={section}
            resume={resume}
            isOpen={openSections.has(sectionKey(section))}
            onToggle={(open) => onToggle(sectionKey(section), open)}
            onChange={onChange}
            validationErrors={validationErrors}
          />
        ) : (
          <ArraySection
            key={sectionKey(section)}
            section={section}
            resume={resume}
            isOpen={openSections.has(sectionKey(section))}
            onToggle={(open) => onToggle(sectionKey(section), open)}
            onChange={onChange}
            onAdd={onAdd}
            onRemove={onRemove}
            validationErrors={validationErrors}
          />
        ),
      )}
    </>
  )
}
