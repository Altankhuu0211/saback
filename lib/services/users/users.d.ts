import type { Application } from '../../declarations';
import { UsersService } from './users.class';
export declare const usersPath = "users";
export declare const usersMethods: readonly ["find", "get", "create", "patch", "remove"];
export * from './users.class';
export * from './users.schema';
export declare const users: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [usersPath]: UsersService;
    }
}
