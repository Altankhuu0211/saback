// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Subject, SubjectData, SubjectPatch, SubjectQuery } from './subject.schema'

export type { Subject, SubjectData, SubjectPatch, SubjectQuery }

export interface SubjectParams extends KnexAdapterParams<SubjectQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SubjectService<ServiceParams extends Params = SubjectParams> extends KnexService<
  Subject,
  SubjectData,
  SubjectParams,
  SubjectPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'subject'
  }
}
