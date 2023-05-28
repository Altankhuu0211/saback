// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const studentsSchema = Type.Object(
  {
    id: Type.Number(),
    student_id: Type.String(),
    schedule_id: Type.String()
  },
  { $id: 'Students', additionalProperties: false }
)
export type Students = Static<typeof studentsSchema>
export const studentsValidator = getValidator(studentsSchema, dataValidator)
export const studentsResolver = resolve<Students, HookContext>({})

export const studentsExternalResolver = resolve<Students, HookContext>({})

// Schema for creating new entries
export const studentsDataSchema = Type.Pick(studentsSchema, ['student_id', 'schedule_id'], {
  $id: 'StudentsData'
})
export type StudentsData = Static<typeof studentsDataSchema>
export const studentsDataValidator = getValidator(studentsDataSchema, dataValidator)
export const studentsDataResolver = resolve<Students, HookContext>({})

// Schema for updating existing entries
export const studentsPatchSchema = Type.Partial(studentsSchema, {
  $id: 'StudentsPatch'
})
export type StudentsPatch = Static<typeof studentsPatchSchema>
export const studentsPatchValidator = getValidator(studentsPatchSchema, dataValidator)
export const studentsPatchResolver = resolve<Students, HookContext>({})

// Schema for allowed query properties
export const studentsQueryProperties = Type.Pick(studentsSchema, ['id', 'student_id', 'schedule_id'])
export const studentsQuerySchema = Type.Intersect(
  [
    querySyntax(studentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StudentsQuery = Static<typeof studentsQuerySchema>
export const studentsQueryValidator = getValidator(studentsQuerySchema, queryValidator)
export const studentsQueryResolver = resolve<StudentsQuery, HookContext>({})
