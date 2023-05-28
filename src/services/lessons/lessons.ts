// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  lessonsDataValidator,
  lessonsPatchValidator,
  lessonsQueryValidator,
  lessonsResolver,
  lessonsExternalResolver,
  lessonsDataResolver,
  lessonsPatchResolver,
  lessonsQueryResolver
} from './lessons.schema'

import type { Application } from '../../declarations'
import { LessonsService, getOptions } from './lessons.class'

export const lessonsPath = 'lessons'
export const lessonsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './lessons.class'
export * from './lessons.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const lessons = (app: Application) => {
  // Register our service on the Feathers application
  app.use(lessonsPath, new LessonsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: lessonsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(lessonsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(lessonsExternalResolver),
        schemaHooks.resolveResult(lessonsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(lessonsQueryValidator), schemaHooks.resolveQuery(lessonsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(lessonsDataValidator), schemaHooks.resolveData(lessonsDataResolver)],
      patch: [schemaHooks.validateData(lessonsPatchValidator), schemaHooks.resolveData(lessonsPatchResolver)],
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
    [lessonsPath]: LessonsService
  }
}
