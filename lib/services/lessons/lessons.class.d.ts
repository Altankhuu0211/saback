import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Lessons, LessonsData, LessonsPatch, LessonsQuery } from './lessons.schema';
export type { Lessons, LessonsData, LessonsPatch, LessonsQuery };
export interface LessonsParams extends KnexAdapterParams<LessonsQuery> {
}
export declare class LessonsService<ServiceParams extends Params = LessonsParams> extends KnexService<Lessons, LessonsData, LessonsParams, LessonsPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
