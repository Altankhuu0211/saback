import { ServiceMethods } from '@feathersjs/feathers';
interface Data {
}
interface ServiceOptions {
}
export declare class CustomService implements ServiceMethods<Data> {
    options: ServiceOptions;
    constructor(options?: ServiceOptions);
    find(params: any): Promise<{
        data: {
            semester_week: string;
            total_absent: number;
            total_free: number;
            total_present: number;
            total_sick: number;
            total_students: number;
        }[];
    }>;
    get(id: any, params?: any): Promise<{
        message: string;
    }>;
    create(data: any, params?: any): Promise<{
        message: string;
    }>;
    update(id: any, data: any, params?: any): Promise<{
        message: string;
    }>;
    patch(id: any, data: any, params?: any): Promise<{
        message: string;
    }>;
    remove(id: any, params?: any): Promise<{
        message: string;
    }>;
}
export {};
