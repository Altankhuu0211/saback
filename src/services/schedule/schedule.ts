// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  scheduleDataValidator,
  schedulePatchValidator,
  scheduleQueryValidator,
  scheduleResolver,
  scheduleExternalResolver,
  scheduleDataResolver,
  schedulePatchResolver,
  scheduleQueryResolver
} from './schedule.schema'

import type { Application } from '../../declarations'
import { ScheduleService, getOptions } from './schedule.class'

export const schedulePath = 'schedule'
export const scheduleMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './schedule.class'
export * from './schedule.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const schedule = (app: Application) => {
  // Register our service on the Feathers application
  app.use(schedulePath, new ScheduleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: scheduleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(schedulePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(scheduleExternalResolver),
        schemaHooks.resolveResult(scheduleResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(scheduleQueryValidator),
        schemaHooks.resolveQuery(scheduleQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(scheduleDataValidator),
        schemaHooks.resolveData(scheduleDataResolver)
      ],
      patch: [
        schemaHooks.validateData(schedulePatchValidator),
        schemaHooks.resolveData(schedulePatchResolver)
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
    [schedulePath]: ScheduleService
  }
}
