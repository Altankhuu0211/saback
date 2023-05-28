import type { Application } from '../../declarations';
import { StudentsService } from './students.class';
export declare const studentsPath = "students";
export declare const studentsMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './students.class';
export * from './students.schema';
export declare const students: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [studentsPath]: StudentsService;
    }
}
