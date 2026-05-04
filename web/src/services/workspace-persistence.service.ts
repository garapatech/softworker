import { formatJson, type JsonObject } from '@/services/resume.service'
import { DEFAULT_LANGUAGE, DEFAULT_RESUME, type ResumeLanguage } from '@/services/preview.service'

export type WorkspaceMode = 'form' | 'source'

export interface WorkspacePersistenceSnapshot {
  jsonDraft: string
  language: ResumeLanguage
  mode: WorkspaceMode
  resumeDraft: JsonObject
}

const STORAGE_KEY = 'softworker.workspace.v1'

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

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

    return isJsonObject(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function loadWorkspacePersistence() {
  const snapshot = readRawSnapshot()
  const resumeDraft = isJsonObject(snapshot?.resumeDraft) ? snapshot.resumeDraft : DEFAULT_RESUME
  const mode = snapshot?.mode === 'source' ? 'source' : 'form'

  return {
    jsonDraft: typeof snapshot?.jsonDraft === 'string' ? snapshot.jsonDraft : formatJson(resumeDraft),
    language: snapshot?.language === 'en_US' ? 'en_US' : DEFAULT_LANGUAGE,
    mode,
    resumeDraft,
  } satisfies WorkspacePersistenceSnapshot
}

export function saveWorkspacePersistence(snapshot: WorkspacePersistenceSnapshot) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    return
  }
}

export function clearWorkspacePersistence() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}
