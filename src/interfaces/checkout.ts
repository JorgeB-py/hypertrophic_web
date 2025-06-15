export interface CheckoutItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  image: string;
  currency_id: string;
}

export interface CheckoutData {
  items: CheckoutItem[];
  customer: CheckoutCustomer;
}

export interface CheckoutCustomer {
  name: string;
  address: string;
  email: string;
  phone: string;
  document: string;
  type: string;
}