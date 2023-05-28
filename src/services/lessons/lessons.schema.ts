// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const lessonsSchema = Type.Object(
  {
    id: Type.Number(),
    teacher_id: Type.String(),
    subject_id: Type.String(),
    year: Type.String(),
    semester: Type.String()
  },
  { $id: 'Lessons', additionalProperties: false }
)
export type Lessons = Static<typeof lessonsSchema>
export const lessonsValidator = getValidator(lessonsSchema, dataValidator)
export const lessonsResolver = resolve<Lessons, HookContext>({})

export const lessonsExternalResolver = resolve<Lessons, HookContext>({})

// Schema for creating new entries
export const lessonsDataSchema = Type.Pick(lessonsSchema, ['teacher_id', 'subject_id', 'year', 'semester'], {
  $id: 'LessonsData'
})
export type LessonsData = Static<typeof lessonsDataSchema>
export const lessonsDataValidator = getValidator(lessonsDataSchema, dataValidator)
export const lessonsDataResolver = resolve<Lessons, HookContext>({})

// Schema for updating existing entries
export const lessonsPatchSchema = Type.Partial(lessonsSchema, {
  $id: 'LessonsPatch'
})
export type LessonsPatch = Static<typeof lessonsPatchSchema>
export const lessonsPatchValidator = getValidator(lessonsPatchSchema, dataValidator)
export const lessonsPatchResolver = resolve<Lessons, HookContext>({})

// Schema for allowed query properties
export const lessonsQueryProperties = Type.Pick(lessonsSchema, [
  'id',
  'teacher_id',
  'subject_id',
  'year',
  'semester'
])
export const lessonsQuerySchema = Type.Intersect(
  [
    querySyntax(lessonsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LessonsQuery = Static<typeof lessonsQuerySchema>
export const lessonsQueryValidator = getValidator(lessonsQuerySchema, queryValidator)
export const lessonsQueryResolver = resolve<LessonsQuery, HookContext>({})
