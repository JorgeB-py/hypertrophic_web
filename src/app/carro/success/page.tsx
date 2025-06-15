'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cartStore';

export default function SuccessPage() {
  const params = useSearchParams();
  const paymentId = params.get('payment_id');
  const { clear, checkoutData } = useCart(); // checkoutData contiene items y customer

  useEffect(() => {
    if (!paymentId) return;

    const fetchAndSend = async () => {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN}`,
        },
      });

      if (!res.ok) return redirect('/');
      const data = await res.json();

      if (data.status !== 'approved') return redirect('/');

      // 🟢 Enviar el correo
      if (checkoutData) {
        const { items, customer } = checkoutData;
        const total = items.reduce(
          (sum: number, item: any) => sum + item.quantity * item.unit_price,
          0
        );

        await fetch('/api/send-order-mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customer.name,
            address: customer.address,
            email: customer.email,
            phone: customer.phone,
            document: customer.document,
            type: customer.type,
            items,
            total,
          }),
        });

        clear(); // Limpiar carrito
      }
    };

    fetchAndSend();
  }, [paymentId, checkoutData]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">✅ Pago aprobado</h1>
        <p className="text-center text-gray-700">Hemos recibido tu pedido. Te notificaremos pronto.</p>
        <a
          href="/"
          className="block mt-6 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
