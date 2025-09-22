import { Coupon } from "@/interfaces/coupon";

export async function checkForCoupons(coupon: string) {
    try {
        const response = await fetch(`https://wompiapi-isu2ps4vbq-uc.a.run.app/get-coupon/${coupon}`);

        if (response.ok) {
            const data: Coupon = await response.json();
            return data
        } else {
            console.error("Cupón no válido");
        }
    } catch (e) {
        console.error("error,", e);
    }
}