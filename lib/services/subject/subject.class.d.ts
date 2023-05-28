import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Subject, SubjectData, SubjectPatch, SubjectQuery } from './subject.schema';
export type { Subject, SubjectData, SubjectPatch, SubjectQuery };
export interface SubjectParams extends KnexAdapterParams<SubjectQuery> {
}
export declare class SubjectService<ServiceParams extends Params = SubjectParams> extends KnexService<Subject, SubjectData, SubjectParams, SubjectPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
