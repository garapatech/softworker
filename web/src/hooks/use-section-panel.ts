import { useSectionOpen } from '@/hooks/use-section-open'
import { useValidationIssueCount } from '@/hooks/use-validation-issue-count'
import { getSectionDomId } from '@/services/resume-form.service'

export function useSectionPanel(sectionKey: string) {
  const { isOpen, onToggle } = useSectionOpen(sectionKey)
  const errorCount = useValidationIssueCount(sectionKey)
  const sectionId = getSectionDomId(sectionKey)

  return {
    contentId: `${sectionId}-content`,
    errorCount,
    headingId: `${sectionId}-heading`,
    isOpen,
    onToggle: () => onToggle(!isOpen),
    sectionId,
  }
}
