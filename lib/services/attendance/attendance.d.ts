import type { Application } from '../../declarations';
import { AttendanceService } from './attendance.class';
export declare const attendancePath = "attendance";
export declare const attendanceMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './attendance.class';
export * from './attendance.schema';
export declare const attendance: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [attendancePath]: AttendanceService;
    }
}
