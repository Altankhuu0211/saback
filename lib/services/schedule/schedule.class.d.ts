import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Schedule, ScheduleData, SchedulePatch, ScheduleQuery } from './schedule.schema';
export type { Schedule, ScheduleData, SchedulePatch, ScheduleQuery };
export interface ScheduleParams extends KnexAdapterParams<ScheduleQuery> {
}
export declare class ScheduleService<ServiceParams extends Params = ScheduleParams> extends KnexService<Schedule, ScheduleData, ScheduleParams, SchedulePatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
