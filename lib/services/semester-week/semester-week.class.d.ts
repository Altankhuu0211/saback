import { ServiceMethods } from '@feathersjs/feathers';
interface Data {
}
interface ServiceOptions {
}
export declare class CustomService implements ServiceMethods<Data> {
    options: ServiceOptions;
    constructor(options?: ServiceOptions);
    getWeeksDiff(endDate: any): number;
    find(params: any): Promise<{
        success: boolean;
        data: number;
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
