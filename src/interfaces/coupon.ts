export interface Coupon{
    id: string;
    code: string;
    discount_type:string;
    discount_value:string;
    status:"ACTIVE"|"INACTIVE";
}