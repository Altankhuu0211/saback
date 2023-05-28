import type { Params } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex';
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import type { Classroom, ClassroomData, ClassroomPatch, ClassroomQuery } from './classroom.schema';
export type { Classroom, ClassroomData, ClassroomPatch, ClassroomQuery };
export interface ClassroomParams extends KnexAdapterParams<ClassroomQuery> {
}
export declare class ClassroomService<ServiceParams extends Params = ClassroomParams> extends KnexService<Classroom, ClassroomData, ClassroomParams, ClassroomPatch> {
}
export declare const getOptions: (app: Application) => KnexAdapterOptions;
