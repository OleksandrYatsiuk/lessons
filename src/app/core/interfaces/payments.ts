export interface Payments {
    amount: number;
    description: string;
    order_id: string;
    result_url: string;
}
export interface PaymentsResult {
    data: string;
    signature: string;
}
