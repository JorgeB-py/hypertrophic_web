// services/checkout.service.ts
'use client';
import { CartItem, useCart } from "@/lib/cartStore";
import { wompiCheckout } from "./wompi-checkout.service";

export async function checkout(
  items: CartItem[],
  customer: {
    name: string;
    address: string;
    email: string;
    city: string;
    region: string;
    phone: string;
    document: string;
    type: string;
  },
  envio: number
) {
  // Usar la función de Wompi
  return wompiCheckout(items, customer, envio);
}