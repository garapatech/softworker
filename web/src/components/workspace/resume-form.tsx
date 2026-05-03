import { useMemo, useState } from 'react'
import { SectionList } from '@/components/workspace/sections/section-list'
import { useResumeForm } from '@/hooks/use-resume-form'
import {
  FORM_SECTIONS,
  getSectionSearchText,
  sectionKey,
  type SectionFilterMode,
} from '@/services/resume-form.service'

export function ResumeForm() {
  const { onAdd, onChange, onRemove, onToggle, openSections, resume, validationErrors } = useResumeForm()
  const [searchValue, setSearchValue] = useState('')
  const [filterMode, setFilterMode] = useState<SectionFilterMode>('all')
  const hasActiveFilters = searchValue.trim().length > 0 || filterMode !== 'all'

  const visibleSectionKeys = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLocaleLowerCase('pt-BR')

    return new Set(
      FORM_SECTIONS
        .filter((section) => {
          const key = sectionKey(section)
          const matchesQuery = normalizedQuery.length === 0 || getSectionSearchText(section).includes(normalizedQuery)
          const errorCount = Object.entries(validationErrors).reduce((count, [path, messages]) => {
            if (path === key || path.startsWith(`${key}.`)) {
              return count + messages.length
            }

            return count
          }, 0)

          const matchesMode =
            filterMode === 'all'
              ? true
              : filterMode === 'open'
                ? openSections.has(key)
                : errorCount > 0

          return matchesQuery && matchesMode
        })
        .map((section) => sectionKey(section)),
    )
  }, [filterMode, openSections, searchValue, validationErrors])

  return (
    <div className="grid gap-3 overflow-auto p-3 sm:p-4">
      <SectionList
        resume={resume}
        openSections={openSections}
        visibleSectionKeys={visibleSectionKeys}
        hasActiveFilters={hasActiveFilters}
        onToggle={onToggle}
        onChange={onChange}
        onAdd={onAdd}
        onRemove={onRemove}
        onResetFilters={() => {
          setSearchValue('')
          setFilterMode('all')
        }}
        validationErrors={validationErrors}
      />
    </div>
  )
}
