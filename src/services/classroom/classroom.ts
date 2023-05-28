// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  classroomDataValidator,
  classroomPatchValidator,
  classroomQueryValidator,
  classroomResolver,
  classroomExternalResolver,
  classroomDataResolver,
  classroomPatchResolver,
  classroomQueryResolver
} from './classroom.schema'

import type { Application } from '../../declarations'
import { ClassroomService, getOptions } from './classroom.class'

export const classroomPath = 'classroom'
export const classroomMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './classroom.class'
export * from './classroom.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const classroom = (app: Application) => {
  // Register our service on the Feathers application
  app.use(classroomPath, new ClassroomService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: classroomMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(classroomPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(classroomExternalResolver),
        schemaHooks.resolveResult(classroomResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(classroomQueryValidator),
        schemaHooks.resolveQuery(classroomQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(classroomDataValidator),
        schemaHooks.resolveData(classroomDataResolver)
      ],
      patch: [
        schemaHooks.validateData(classroomPatchValidator),
        schemaHooks.resolveData(classroomPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [classroomPath]: ClassroomService
  }
}
