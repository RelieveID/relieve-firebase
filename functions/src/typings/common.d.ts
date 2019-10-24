declare module "*.json" {
    const value: any;
    export default value;
}

export interface ObjectAny {
    [s: string]: any;
}

export interface Pagination {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
}

export interface DeterminerOut<Model> {
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    data: Model
}

export interface Context {
    username: string;
    user_id: string;
}


export interface HttpError {
    message: string;
    name: string;
    status: number;
    data?: object;
}

export type MakeAny<T> = {
    [P in keyof T]?: any;
};
