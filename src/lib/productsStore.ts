// src/lib/productStore.ts
import { create } from 'zustand';
import { Product } from '@/interfaces/product';
import { getAllProductos } from '@/services/firebase.service';

interface ProductState {
  products: Product[] | null;
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: null,
  loading: false,
  
  fetchProducts: async () => {
    set({ loading: true });
    const productos = await getAllProductos();
    set({ products: productos, loading: false });
    
  },
}));
