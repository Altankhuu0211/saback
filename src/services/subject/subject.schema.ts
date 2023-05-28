// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const subjectSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String()
  },
  { $id: 'Subject', additionalProperties: false }
)
export type Subject = Static<typeof subjectSchema>
export const subjectValidator = getValidator(subjectSchema, dataValidator)
export const subjectResolver = resolve<Subject, HookContext>({})

export const subjectExternalResolver = resolve<Subject, HookContext>({})

// Schema for creating new entries
export const subjectDataSchema = Type.Pick(subjectSchema, ['name'], {
  $id: 'SubjectData'
})
export type SubjectData = Static<typeof subjectDataSchema>
export const subjectDataValidator = getValidator(subjectDataSchema, dataValidator)
export const subjectDataResolver = resolve<Subject, HookContext>({})

// Schema for updating existing entries
export const subjectPatchSchema = Type.Partial(subjectSchema, {
  $id: 'SubjectPatch'
})
export type SubjectPatch = Static<typeof subjectPatchSchema>
export const subjectPatchValidator = getValidator(subjectPatchSchema, dataValidator)
export const subjectPatchResolver = resolve<Subject, HookContext>({})

// Schema for allowed query properties
export const subjectQueryProperties = Type.Pick(subjectSchema, ['id', 'name'])
export const subjectQuerySchema = Type.Intersect(
  [
    querySyntax(subjectQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SubjectQuery = Static<typeof subjectQuerySchema>
export const subjectQueryValidator = getValidator(subjectQuerySchema, queryValidator)
export const subjectQueryResolver = resolve<SubjectQuery, HookContext>({})
