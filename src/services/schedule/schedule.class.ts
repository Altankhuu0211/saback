// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Schedule, ScheduleData, SchedulePatch, ScheduleQuery } from './schedule.schema'

export type { Schedule, ScheduleData, SchedulePatch, ScheduleQuery }

export interface ScheduleParams extends KnexAdapterParams<ScheduleQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ScheduleService<ServiceParams extends Params = ScheduleParams> extends KnexService<
  Schedule,
  ScheduleData,
  ScheduleParams,
  SchedulePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'schedule'
  }
}
