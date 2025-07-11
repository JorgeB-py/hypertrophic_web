import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { Product } from '@/interfaces/product';
import { Market } from '@/interfaces/market';

export async function getAllProductos(): Promise<Product[]> {
  const snap = await getDocs(collection(db, 'productos'));
  return snap.docs.map(d => ({ ...(d.data() as Product), id: d.id }));
}

export async function getAllMarcas(): Promise<Market[]> {
  const snap = await getDocs(collection(db, 'marcas'));
  return snap.docs.map(d => ({ ...(d.data() as Market), id: d.id }));
}

export async function getProduct(id: string) {
  const docRef = doc(db, "productos", id);
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as Product) : null;
}