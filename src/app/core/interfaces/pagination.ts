export interface IPaginationResponse<T = any> {
    total: number;
    page: number;
    limit: number;
    result: T;
}
