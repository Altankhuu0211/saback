import type { Application } from '../../declarations';
import { ScheduleService } from './schedule.class';
export declare const schedulePath = "schedule";
export declare const scheduleMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './schedule.class';
export * from './schedule.schema';
export declare const schedule: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [schedulePath]: ScheduleService;
    }
}
