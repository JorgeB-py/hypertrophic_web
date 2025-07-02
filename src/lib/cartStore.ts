'use client';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

/* ─── Modelo ─── */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;   
  category: string; 
}

type CheckoutData = {
  items: {
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
  }[];
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
    document: string;
    type: string;
  };
};

type CartState = {
  items: CartItem[];
  checkoutData: CheckoutData | null;
  /* recibe qty opcional */
  add: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  updateQuantity: (id: string, quantity: number) => void;
  setCheckoutData: (data: CheckoutData) => void;
};

/* ─── Store ─── */
export const useCart = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        checkoutData: null,

        /* add ahora suma la cantidad que envíes */
        add: (item) =>
          set(state => {
            const idx = state.items.findIndex(i => i.id === item.id);
            const addQty = item.qty ?? 1;            // por defecto 1

            if (idx > -1) {
              state.items[idx].qty += addQty;
              return { items: [...state.items] };
            }
            return { items: [...state.items, { ...item, qty: addQty }] };
          }),

        remove: (id) =>
          set(state => ({ items: state.items.filter(i => i.id !== id) })),

        clear: () => set({ items: [], checkoutData: null }),

        totalItems: () =>
          get().items.reduce((sum, i) => sum + i.qty, 0),

        totalPrice: () =>
          get().items.reduce((sum, i) => sum + i.qty * i.price, 0),

        updateQuantity: (id, quantity) =>
          set(state => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, qty: quantity } : item
            ),
          })),

        setCheckoutData: (data) => set({ checkoutData: data }),
      }),
      { name: 'cart-storage' }
    ),
    { name: 'CartStore' }
  )
);
