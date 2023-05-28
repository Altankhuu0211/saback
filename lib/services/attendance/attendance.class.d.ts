import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Attendance, AttendanceData, AttendancePatch, AttendanceQuery } from './attendance.schema';
export type { Attendance, AttendanceData, AttendancePatch, AttendanceQuery };
export interface AttendanceParams extends KnexAdapterParams<AttendanceQuery> {
}
export declare class AttendanceService<ServiceParams extends Params = AttendanceParams> extends KnexService<Attendance, AttendanceData, AttendanceParams, AttendancePatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
