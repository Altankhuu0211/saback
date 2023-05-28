// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Lessons, LessonsData, LessonsPatch, LessonsQuery } from './lessons.schema'

export type { Lessons, LessonsData, LessonsPatch, LessonsQuery }

export interface LessonsParams extends KnexAdapterParams<LessonsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class LessonsService<ServiceParams extends Params = LessonsParams> extends KnexService<
  Lessons,
  LessonsData,
  LessonsParams,
  LessonsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'lessons'
  }
}
