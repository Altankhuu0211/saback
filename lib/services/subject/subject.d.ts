import type { Application } from '../../declarations';
import { SubjectService } from './subject.class';
export declare const subjectPath = "subject";
export declare const subjectMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './subject.class';
export * from './subject.schema';
export declare const subject: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [subjectPath]: SubjectService;
    }
}
