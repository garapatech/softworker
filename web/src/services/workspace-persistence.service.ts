import { formatJson, isJsonRecord, type JsonObject } from '@/services/resume.service'
import { DEFAULT_LANGUAGE, DEFAULT_RESUME } from '@/services/preview.service'
import type { ResumeLanguage } from '@/services/preview.service'

export type WorkspaceMode = 'form' | 'source'

export interface WorkspacePersistenceSnapshot {
  jsonDraft: string
  language: ResumeLanguage
  mode: WorkspaceMode
  resumeDraft: JsonObject
}

const STORAGE_KEY = 'softworker.workspace.v1'

function readRawSnapshot(): Partial<WorkspacePersistenceSnapshot> | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return null
    }

    const parsed = JSON.parse(rawValue) as Partial<WorkspacePersistenceSnapshot>

    return isJsonRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function loadWorkspacePersistence(): WorkspacePersistenceSnapshot {
  const snapshot = readRawSnapshot()
  const resumeDraft = isJsonRecord(snapshot?.resumeDraft) ? snapshot.resumeDraft : DEFAULT_RESUME
  const mode = snapshot?.mode === 'source' ? 'source' : 'form'

  return {
    jsonDraft: typeof snapshot?.jsonDraft === 'string' ? snapshot.jsonDraft : formatJson(resumeDraft),
    language: snapshot?.language === 'en_US' ? 'en_US' : DEFAULT_LANGUAGE,
    mode,
    resumeDraft,
  } satisfies WorkspacePersistenceSnapshot
}

export function saveWorkspacePersistence(snapshot: WorkspacePersistenceSnapshot): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    return
  }
}

export function clearWorkspacePersistence(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}
