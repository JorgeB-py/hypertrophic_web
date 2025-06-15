'use client';

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { CartItem } from '@/interfaces/cart';

type CheckoutData = {
  items: {
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
  }[];
  customer: { name: string; address: string; email: string, phone:string, document: string, type:string }
};

type CartState = {
  items: CartItem[];
  checkoutData: CheckoutData | null;
  add: (item: Omit<CartItem, 'stock'>) => void;
  remove: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  updateQuantity: (id: string, quantity: number) => void;
  setCheckoutData: (data: CheckoutData) => void;
};

export const useCart = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        checkoutData: null,

        add: (item) =>
          set(state => {
            const idx = state.items.findIndex(i => i.id === item.id);
            if (idx > -1) {
              state.items[idx].stock += 1;
              return { items: [...state.items] };
            }
            return { items: [...state.items, { ...item, stock: 1 }] };
          }),

        remove: (id) =>
          set(state => ({ items: state.items.filter(i => i.id !== id) })),

        clear: () => set({ items: [], checkoutData: null }),

        totalItems: () =>
          get().items.reduce((sum, i) => sum + i.stock, 0),

        totalPrice: () =>
          get().items.reduce((sum, i) => sum + i.stock * i.price, 0),

        updateQuantity: (id, quantity) =>
          set(state => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, stock: quantity } : item
            ),
          })),

        setCheckoutData: (data) => set({ checkoutData: data }),
      }),
      { name: 'cart-storage' }
    ),
    { name: 'CartStore' }
  )
);
