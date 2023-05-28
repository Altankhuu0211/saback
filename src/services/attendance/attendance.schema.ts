// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const attendanceSchema = Type.Object(
  {
    id: Type.Number(),
    student_sch_id: Type.Number(),
    semester_week: Type.String(),
    status: Type.String(),
    arrival_time: Type.String()
  },
  { $id: 'Attendance', additionalProperties: false }
)
export type Attendance = Static<typeof attendanceSchema>
export const attendanceValidator = getValidator(attendanceSchema, dataValidator)
export const attendanceResolver = resolve<Attendance, HookContext>({})

export const attendanceExternalResolver = resolve<Attendance, HookContext>({})

// Schema for creating new entries
export const attendanceDataSchema = Type.Pick(
  attendanceSchema,
  ['student_sch_id', 'semester_week', 'status', 'arrival_time'],
  {
    $id: 'AttendanceData'
  }
)
export type AttendanceData = Static<typeof attendanceDataSchema>
export const attendanceDataValidator = getValidator(attendanceDataSchema, dataValidator)
export const attendanceDataResolver = resolve<Attendance, HookContext>({})

// Schema for updating existing entries
export const attendancePatchSchema = Type.Partial(attendanceSchema, {
  $id: 'AttendancePatch'
})
export type AttendancePatch = Static<typeof attendancePatchSchema>
export const attendancePatchValidator = getValidator(attendancePatchSchema, dataValidator)
export const attendancePatchResolver = resolve<Attendance, HookContext>({})

// Schema for allowed query properties
export const attendanceQueryProperties = Type.Pick(attendanceSchema, [
  'id',
  'student_sch_id',
  'semester_week',
  'status',
  'arrival_time'
])
export const attendanceQuerySchema = Type.Intersect(
  [
    querySyntax(attendanceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AttendanceQuery = Static<typeof attendanceQuerySchema>
export const attendanceQueryValidator = getValidator(attendanceQuerySchema, queryValidator)
export const attendanceQueryResolver = resolve<AttendanceQuery, HookContext>({})
