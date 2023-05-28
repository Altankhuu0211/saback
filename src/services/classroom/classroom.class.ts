// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Classroom, ClassroomData, ClassroomPatch, ClassroomQuery } from './classroom.schema'

export type { Classroom, ClassroomData, ClassroomPatch, ClassroomQuery }

export interface ClassroomParams extends KnexAdapterParams<ClassroomQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ClassroomService<ServiceParams extends Params = ClassroomParams> extends KnexService<
  Classroom,
  ClassroomData,
  ClassroomParams,
  ClassroomPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'classroom'
  }
}
