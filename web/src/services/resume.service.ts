import { mapValidationIssues, type ValidationState } from '@/mappers/resume.mapper'
import { resumeSchema } from '@/schemas/resume.schema'

export type JsonPrimitive = boolean | number | string | null
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[]

export interface JsonObject {
  [key: string]: JsonValue | undefined
}

export type PathPart = number | string

export function formatJson(value: JsonObject) {
  return JSON.stringify(value, null, 2)
}

export function parseResumeJson(value: string) {
  const parsed = JSON.parse(value) as JsonValue

  if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
    throw new Error('O JSON precisa ser um objeto.')
  }

  return parsed as JsonObject
}

export function getAtPath(target: JsonValue | undefined, path: PathPart[]) {
  return path.reduce<JsonValue | undefined>((value, part) => {
    if (value == null) {
      return undefined
    }

    if (Array.isArray(value)) {
      return typeof part === 'number' ? value[part] : undefined
    }

    if (typeof value === 'object') {
      return typeof part === 'string' ? value[part] : undefined
    }

    return undefined
  }, target)
}

export function setAtPath(target: JsonObject, path: PathPart[], value: JsonValue) {
  const next = structuredClone(target) as JsonObject
  let current: JsonValue = next

  for (let index = 0; index < path.length - 1; index += 1) {
    const part = path[index]
    const following = path[index + 1]

    if (Array.isArray(current) && typeof part === 'number') {
      if (current[part] == null) {
        current[part] = typeof following === 'number' ? [] : {}
      }
      current = current[part] as JsonValue
      continue
    }

    if (typeof current === 'object' && current !== null && typeof part === 'string') {
      const objectCurrent = current as JsonObject

      if (objectCurrent[part] == null) {
        objectCurrent[part] = typeof following === 'number' ? [] : {}
      }
      current = objectCurrent[part] as JsonValue
    }
  }

  const last = path[path.length - 1]

  if (Array.isArray(current) && typeof last === 'number') {
    current[last] = value
  } else if (typeof current === 'object' && current !== null && typeof last === 'string') {
    ;(current as JsonObject)[last] = value
  }

  return next
}

export function insertArrayItem(target: JsonObject, path: string[], item: JsonObject) {
  const next = structuredClone(target) as JsonObject
  let current = getAtPath(next, path)

  if (!Array.isArray(current)) {
    const seeded = setAtPath(next, path, [])
    current = getAtPath(seeded, path)
    if (!Array.isArray(current)) {
      return seeded
    }
    current.push(item)
    return seeded
  }

  current.push(item)
  return next
}

export function removeArrayItem(target: JsonObject, path: string[], index: number) {
  const next = structuredClone(target) as JsonObject
  const current = getAtPath(next, path)

  if (Array.isArray(current)) {
    current.splice(index, 1)
  }

  return next
}

export function validateResume(resume: JsonObject): ValidationState {
  const result = resumeSchema.safeParse(resume)

  if (result.success) {
    return {
      byPath: {},
      issues: [],
    }
  }

  return mapValidationIssues(result.error.issues)
}
