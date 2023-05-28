// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const scheduleSchema = Type.Object(
  {
    id: Type.Number(),
    lesson_id: Type.String(),
    class_id: Type.String(),
    class_type: Type.String(),
    weekday: Type.String(),
    part_time: Type.String()
  },
  { $id: 'Schedule', additionalProperties: false }
)
export type Schedule = Static<typeof scheduleSchema>
export const scheduleValidator = getValidator(scheduleSchema, dataValidator)
export const scheduleResolver = resolve<Schedule, HookContext>({})

export const scheduleExternalResolver = resolve<Schedule, HookContext>({})

// Schema for creating new entries
export const scheduleDataSchema = Type.Pick(
  scheduleSchema,
  ['lesson_id', 'class_id', 'class_type', 'weekday', 'part_time'],
  {
    $id: 'ScheduleData'
  }
)
export type ScheduleData = Static<typeof scheduleDataSchema>
export const scheduleDataValidator = getValidator(scheduleDataSchema, dataValidator)
export const scheduleDataResolver = resolve<Schedule, HookContext>({})

// Schema for updating existing entries
export const schedulePatchSchema = Type.Partial(scheduleSchema, {
  $id: 'SchedulePatch'
})
export type SchedulePatch = Static<typeof schedulePatchSchema>
export const schedulePatchValidator = getValidator(schedulePatchSchema, dataValidator)
export const schedulePatchResolver = resolve<Schedule, HookContext>({})

// Schema for allowed query properties
export const scheduleQueryProperties = Type.Pick(scheduleSchema, [
  'id',
  'lesson_id',
  'class_id',
  'class_type',
  'weekday',
  'part_time'
])
export const scheduleQuerySchema = Type.Intersect(
  [
    querySyntax(scheduleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ScheduleQuery = Static<typeof scheduleQuerySchema>
export const scheduleQueryValidator = getValidator(scheduleQuerySchema, queryValidator)
export const scheduleQueryResolver = resolve<ScheduleQuery, HookContext>({})
