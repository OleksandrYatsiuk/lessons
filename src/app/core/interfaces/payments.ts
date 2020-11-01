export interface Payments {
    amount: number;
    description: string;
    order_id: string;
}
export interface PaymentsResult {
    data: string;
    signature: string;
}
