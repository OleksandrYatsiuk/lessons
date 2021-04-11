import { HttpResponseBase } from '@angular/common/http';


// export interface BaseResponse<T = {}> extends HttpResponseBase {
//     result: T;
// }

// export interface BaseErrorResponse extends HttpResponseBase {
//     error: BaseHttpError;
// }


// export interface BaseHttpError<T> {
//     code: number;
//     status: Statuses;
//     message: string;
//     result: Error[] | string;
// }
// eslint-disable-next-line no-shadow
export enum Statuses {
    success = 'success',
    error = 'error'
}
// export interface Error {
//     field: string;
//     message: string;
//     code?: number;
// }

export interface BaseResponse<T = any> extends HttpResponseBase {
    result: T;
}

export interface BaseErrorResponse extends HttpResponseBase {
    error: BaseHttpError;
}

export interface BaseHttpError {
    code: number;
    status: Statuses;
    message: string;
    result: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    code: number;
}

