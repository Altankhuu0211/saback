import { ServiceMethods } from '@feathersjs/feathers';
interface Data {
}
interface ServiceOptions {
}
export declare class CustomService implements ServiceMethods<Data> {
    options: ServiceOptions;
    constructor(options?: ServiceOptions);
    find(params: any): Promise<{
        data: never[];
    } | {
        data: {
            attendance: any[];
            total_absent: number;
            total_free: number;
            total_present: number;
            total_sick: number;
            total_students: number;
        };
    }>;
    get(id: any, params?: any): Promise<{
        message: string;
    }>;
    create(data: any): Promise<{
        data: number;
    }>;
    update(id: any, data: any, params?: any): Promise<{
        message: string;
    }>;
    patch(params: any): Promise<{
        message: string;
    }>;
    remove(id: any, params?: any): Promise<{
        message: string;
    }>;
}
export {};
