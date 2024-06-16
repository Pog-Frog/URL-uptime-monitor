export interface IUrlCheck {
    _id: string;
    name: string;
    url: string;
    path?: string;
    userId: string;
    port?: number;
    webhook?: string;
    timeout?: number;
    interval?: number;
    threshold?: number;
    authentication?: {
        username: string;
        password: string;
    };
    headers?: object;
    tags?: string[];
    ignoreSSL?: boolean;
    active?: boolean;
    handle?: object;
    createdAt: Date;
    updatedAt: Date;
}