import { z } from 'zod'

const optionalString = z.string().optional()
const requiredString = z.string().trim().min(1, 'Campo obrigatório.')
const optionalUrl = z.string().trim().url('URL inválida.').or(z.literal('')).optional()
const stringList = z.array(z.string())
const emailSchema = z.email('E-mail inválido.')
const urlSchema = z.url('URL inválida.')

const requiredEmail = z.string().trim().superRefine((value, ctx) => {
  if (value.length === 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Campo obrigatório.',
    })
    return
  }

  if (!emailSchema.safeParse(value).success) {
    ctx.addIssue({
      code: 'custom',
      message: 'E-mail inválido.',
    })
  }
})

const requiredUrl = z.string().trim().superRefine((value, ctx) => {
  if (value.length === 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Campo obrigatório.',
    })
    return
  }

  if (!urlSchema.safeParse(value).success) {
    ctx.addIssue({
      code: 'custom',
      message: 'URL inválida.',
    })
  }
})

const basicsProfileSchema = z.object({
  network: requiredString,
  username: requiredString,
  url: requiredUrl,
})

const basicsLocationSchema = z.object({
  address: optionalString,
  postalCode: optionalString,
  city: requiredString,
  region: optionalString,
  countryCode: optionalString,
})

const basicsSchema = z.object({
  name: requiredString,
  label: requiredString,
  image: optionalUrl,
  email: requiredEmail,
  phone: requiredString,
  url: optionalUrl,
  summary: optionalString,
  location: basicsLocationSchema.optional(),
  profiles: z.array(basicsProfileSchema).optional(),
})

const workSchema = z.object({
  name: requiredString,
  description: optionalString,
  position: requiredString,
  url: optionalUrl,
  location: optionalString,
  startDate: requiredString,
  endDate: optionalString,
  summary: optionalString,
  highlights: stringList.optional(),
})

const volunteerSchema = z.object({
  organization: requiredString,
  position: requiredString,
  url: optionalUrl,
  startDate: requiredString,
  endDate: optionalString,
  summary: optionalString,
  highlights: stringList.optional(),
})

const educationSchema = z.object({
  institution: requiredString,
  area: requiredString,
  studyType: requiredString,
  url: optionalUrl,
  startDate: requiredString,
  endDate: optionalString,
  score: optionalString,
  courses: stringList.optional(),
})

const awardSchema = z.object({
  title: requiredString,
  date: optionalString,
  awarder: optionalString,
  summary: optionalString,
})

const publicationSchema = z.object({
  name: requiredString,
  publisher: requiredString,
  releaseDate: optionalString,
  url: optionalUrl,
  summary: optionalString,
})

const skillSchema = z.object({
  name: requiredString,
  level: optionalString,
  keywords: stringList.optional(),
})

const languageSchema = z.object({
  language: requiredString,
  fluency: optionalString,
})

const interestSchema = z.object({
  name: requiredString,
  keywords: stringList.optional(),
})

const referenceSchema = z.object({
  name: requiredString,
  reference: requiredString,
})

const projectSchema = z.object({
  name: requiredString,
  description: requiredString,
  highlights: stringList.optional(),
  keywords: stringList.optional(),
  startDate: optionalString,
  endDate: optionalString,
  url: optionalUrl,
  roles: stringList.optional(),
  entity: optionalString,
  type: optionalString,
})

const certificateSchema = z.object({
  name: requiredString,
  date: optionalString,
  url: optionalUrl,
  issuer: optionalString,
})

const metaSchema = z.object({
  canonical: optionalUrl,
  version: optionalString,
  lastModified: optionalString,
})

export const resumeSchema = z.object({
  basics: basicsSchema,
  meta: metaSchema.optional(),
  work: z.array(workSchema).optional(),
  volunteer: z.array(volunteerSchema).optional(),
  education: z.array(educationSchema).optional(),
  awards: z.array(awardSchema).optional(),
  publications: z.array(publicationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  interests: z.array(interestSchema).optional(),
  references: z.array(referenceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
})
