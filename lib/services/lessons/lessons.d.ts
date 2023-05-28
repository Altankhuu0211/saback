import type { Application } from '../../declarations';
import { LessonsService } from './lessons.class';
export declare const lessonsPath = "lessons";
export declare const lessonsMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './lessons.class';
export * from './lessons.schema';
export declare const lessons: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [lessonsPath]: LessonsService;
    }
}
