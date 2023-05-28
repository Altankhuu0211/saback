// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  subjectDataValidator,
  subjectPatchValidator,
  subjectQueryValidator,
  subjectResolver,
  subjectExternalResolver,
  subjectDataResolver,
  subjectPatchResolver,
  subjectQueryResolver
} from './subject.schema'

import type { Application } from '../../declarations'
import { SubjectService, getOptions } from './subject.class'

export const subjectPath = 'subject'
export const subjectMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './subject.class'
export * from './subject.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const subject = (app: Application) => {
  // Register our service on the Feathers application
  app.use(subjectPath, new SubjectService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: subjectMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(subjectPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(subjectExternalResolver),
        schemaHooks.resolveResult(subjectResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(subjectQueryValidator), schemaHooks.resolveQuery(subjectQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(subjectDataValidator), schemaHooks.resolveData(subjectDataResolver)],
      patch: [schemaHooks.validateData(subjectPatchValidator), schemaHooks.resolveData(subjectPatchResolver)],
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
    [subjectPath]: SubjectService
  }
}
