export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  market: string;
  category: string;
  variants: Variant[]
}

export interface Variant{
  sku: string,
  flavor: string,
  servings: number,
  price: number,
  stock: number,
}