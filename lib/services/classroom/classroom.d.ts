import type { Application } from '../../declarations';
import { ClassroomService } from './classroom.class';
export declare const classroomPath = "classroom";
export declare const classroomMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './classroom.class';
export * from './classroom.schema';
export declare const classroom: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [classroomPath]: ClassroomService;
    }
}
