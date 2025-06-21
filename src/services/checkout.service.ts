import { CartItem, useCart } from "@/lib/cartStore";

export async function checkout(
  items: CartItem[],
  customer: {
    name: string;
    address: string;
    email: string;
    phone: string;
    document: string;
    type: string;
  },
  envio: number
) {
  const mappedItems = [
    ...items.map(item => ({
      title: item.name,
      quantity: item.qty,
      unit_price: Number(item.price),
      currency_id: 'COP',
    })),
    ...(envio > 0
      ? [{
        title: 'Costo de envío',
        quantity: 1,
        unit_price: envio,
        currency_id: 'COP',
      }]
      : []),
  ];

  useCart.getState().setCheckoutData({ items: mappedItems, customer });

  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: mappedItems, customer }),
  });

  const { preferenceId } = await res.json();

  const waitForMP = () =>
    new Promise<void>((resolve, reject) => {
      let tries = 0;
      const interval = setInterval(() => {
        if (window.MercadoPago) {
          clearInterval(interval);
          resolve();
        } else if (tries > 10) {
          clearInterval(interval);
          reject("No se cargó el SDK de Mercado Pago");
        }
        tries++;
      }, 300);
    });

  try {
    await waitForMP();

    const mp = new window.MercadoPago(`${process.env.NEXT_PUBLIC_MP_PUBLIC_KEY}`, {
      locale: 'es-CO',
    });

    await mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true,
    });
  } catch (err) {
    console.error(err);
    alert("Hubo un error al cargar el pago con Mercado Pago.");
  }
}
