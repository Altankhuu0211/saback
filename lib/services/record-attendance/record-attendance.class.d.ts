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
        data: {};
    } | {
        data: string;
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
