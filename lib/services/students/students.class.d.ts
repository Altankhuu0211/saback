import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Students, StudentsData, StudentsPatch, StudentsQuery } from './students.schema';
export type { Students, StudentsData, StudentsPatch, StudentsQuery };
export interface StudentsParams extends KnexAdapterParams<StudentsQuery> {
}
export declare class StudentsService<ServiceParams extends Params = StudentsParams> extends KnexService<Students, StudentsData, StudentsParams, StudentsPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
