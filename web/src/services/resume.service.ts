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

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function updateAtPath(target: JsonValue | undefined, path: PathPart[], value: JsonValue): JsonValue {
  const [part, ...rest] = path

  if (part == null) {
    return value
  }

  if (typeof part === 'number') {
    const current = Array.isArray(target) ? target : []
    const next = current.slice()
    const branch = current[part]

    next[part] = rest.length > 0 ? updateAtPath(branch, rest, value) : value

    return next
  }

  const current = isJsonObject(target) ? target : {}
  const branch = current[part]

  return {
    ...current,
    [part]: rest.length > 0 ? updateAtPath(branch, rest, value) : value,
  }
}

export function setAtPath(target: JsonObject, path: PathPart[], value: JsonValue) {
  return updateAtPath(target, path, value) as JsonObject
}

export function insertArrayItem(target: JsonObject, path: string[], item: JsonObject) {
  const current = getAtPath(target, path)
  const nextItems = Array.isArray(current) ? [...current, item] : [item]

  return setAtPath(target, path, nextItems)
}

export function removeArrayItem(target: JsonObject, path: string[], index: number) {
  const current = getAtPath(target, path)

  if (!Array.isArray(current)) {
    return target
  }

  return setAtPath(
    target,
    path,
    current.filter((_, itemIndex) => itemIndex !== index),
  )
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
