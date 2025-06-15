'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/interfaces/cart';
import { useCart } from '@/lib/cartStore';
import { Trash } from 'lucide-react';

export default function CartPage() {
  const { items, remove, totalPrice, updateQuantity } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone:'',
    document:'',
    type:''
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-500">🛒 Tu Carrito</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-300">Tu carrito está vacío.</p>
      ) : (
        <>
          {items.map(it => (
            <div
              key={it.id}
              className="flex gap-4 mb-4 items-center bg-zinc-900 p-4 rounded-lg shadow-sm"
            >
              <img
                src={it.image}
                alt={it.name}
                className="w-20 h-20 object-contain border border-zinc-700 rounded"
              />
              <div className="flex-grow">
                <p className="font-medium text-lg">{it.name}</p>
                <p className="text-sm text-gray-400">${it.price.toLocaleString()}</p>
              </div>
              <Input
                type="number"
                value={it.stock}
                min={0}
                onChange={(e) => {
                  const val = e.target.value;
                  const quantity = parseInt(val);

                  if (val === '') {
                    updateQuantity(it.id, 0);
                    return;
                  }

                  if (!isNaN(quantity)) {
                    if (quantity <= 0) {
                      remove(it.id);
                    } else {
                      updateQuantity(it.id, quantity);
                    }
                  }
                }}
                className="w-16 text-center border-zinc-700 bg-zinc-800 text-white"
              />

              <Button
                variant="ghost"
                onClick={() => remove(it.id)}
                className="text-red-500 hover:bg-zinc-800"
              >
                <Trash />
              </Button>
            </div>
          ))}

          <div className="mt-10 bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-red-400">Datos del cliente</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Nombre completo"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Tipo de documento"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="col-span-1 md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Documento"
                value={formData.document}
                onChange={e => setFormData({ ...formData, document: e.target.value })}
                className="col-span-1 md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Dirección de envío"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="col-span-1 md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
              <Input
                placeholder="Teléfono"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-1 md:col-span-2 bg-zinc-800 text-white border-zinc-700"
              />
              
            </div>
          </div>

          <div className="flex justify-between mt-6 border-t border-zinc-700 pt-4">
            <span className="text-lg">Total</span>
            <span className="text-lg font-bold text-white">
              ${totalPrice().toLocaleString()}
            </span>
          </div>

          <Button
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            onClick={() => checkout(items, formData)}
          >
            Finalizar compra
          </Button>
        </>
      )}
    </main>
  );
}

async function checkout(
  items: CartItem[],
  customer: { name: string; address: string; email: string, phone:string, document: string, type:string }
) {
  const mappedItems = items.map(item => ({
    title: item.name,
    quantity: item.stock,
    unit_price: Number(item.price),
    currency_id: 'COP',
  }));
  useCart.getState().setCheckoutData({ items: mappedItems, customer });

  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: mappedItems, customer: customer }),
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
