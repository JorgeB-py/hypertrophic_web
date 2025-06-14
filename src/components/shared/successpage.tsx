'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cartStore';
import Link from 'next/link';
import { CheckoutData } from '@/interfaces/checkout';

export default function SuccessPageContent() {
    const params = useSearchParams();
    const paymentId = params.get('payment_id');
    const { clear, checkoutData } = useCart();

    useEffect(() => {
        if (!paymentId) return;

        const fetchAndSend = async () => {
            const res = await fetch('/api/check-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId }),
            });

            if (!res.ok) return redirect('/');
            const data = await res.json();

            if (data.status !== 'approved') return redirect('/');

            if (checkoutData) {
                const { items, customer } = checkoutData as CheckoutData;
                const total = items.reduce(
                    (sum, item) => sum + item.quantity * item.unit_price,
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

                clear();
            }
        };

        fetchAndSend();
    }, [paymentId, checkoutData, clear]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">✅ Pago aprobado</h1>
                <p className="text-center text-gray-700">Hemos recibido tu pedido. Te notificaremos pronto.</p>
                <Link
                    href="/"
                    className="block mt-6 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
}
