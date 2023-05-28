import { ServiceMethods } from '@feathersjs/feathers';
interface Data {
}
interface ServiceOptions {
}
export declare class CustomService implements ServiceMethods<Data> {
    options: ServiceOptions;
    constructor(options?: ServiceOptions);
    find(params: any): Promise<{
        message: string;
    }>;
    get(id: any, params?: any): Promise<{
        message: string;
    }>;
    create(data: any): Promise<{
        error: string;
        result?: undefined;
        token?: undefined;
        success?: undefined;
    } | {
        result: any;
        token: string;
        success: boolean;
        error?: undefined;
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
