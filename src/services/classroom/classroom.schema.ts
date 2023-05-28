// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const classroomSchema = Type.Object(
  {
    id: Type.String(),
    rfid: Type.String()
  },
  { $id: 'Classroom', additionalProperties: false }
)
export type Classroom = Static<typeof classroomSchema>
export const classroomValidator = getValidator(classroomSchema, dataValidator)
export const classroomResolver = resolve<Classroom, HookContext>({})

export const classroomExternalResolver = resolve<Classroom, HookContext>({})

// Schema for creating new entries
export const classroomDataSchema = Type.Pick(classroomSchema, ['rfid'], {
  $id: 'ClassroomData'
})
export type ClassroomData = Static<typeof classroomDataSchema>
export const classroomDataValidator = getValidator(classroomDataSchema, dataValidator)
export const classroomDataResolver = resolve<Classroom, HookContext>({})

// Schema for updating existing entries
export const classroomPatchSchema = Type.Partial(classroomSchema, {
  $id: 'ClassroomPatch'
})
export type ClassroomPatch = Static<typeof classroomPatchSchema>
export const classroomPatchValidator = getValidator(classroomPatchSchema, dataValidator)
export const classroomPatchResolver = resolve<Classroom, HookContext>({})

// Schema for allowed query properties
export const classroomQueryProperties = Type.Pick(classroomSchema, ['id', 'rfid'])
export const classroomQuerySchema = Type.Intersect(
  [
    querySyntax(classroomQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ClassroomQuery = Static<typeof classroomQuerySchema>
export const classroomQueryValidator = getValidator(classroomQuerySchema, queryValidator)
export const classroomQueryResolver = resolve<ClassroomQuery, HookContext>({})
