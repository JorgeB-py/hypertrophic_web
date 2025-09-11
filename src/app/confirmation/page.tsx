'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import { CartItem } from '@/interfaces/cart';

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // referencia y transactionId
  const reference = searchParams.get('reference');
  const transactionId = searchParams.get('id');

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!reference) {
          setError('Referencia de pedido no encontrada');
          return;
        }

        const localData = sessionStorage.getItem(reference);
        if (!localData) {
          setError('Información del pedido no encontrada');
          return;
        }

        let orderInfo = JSON.parse(localData);

        // Si tenemos un id, intentamos consultar a Wompi
        if (transactionId) {
          try {
            const wompiRes = await fetch(
              `https://production.wompi.co/v1/transactions/${transactionId}`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`,
                },
              }
            );

            if (wompiRes.ok) {
              const wompiData = await wompiRes.json();
              const wompiStatus = wompiData?.data?.status;

              if (wompiStatus) {
                orderInfo = {
                  ...orderInfo,
                  status: wompiStatus,
                  wompiTransactionId: transactionId,
                };


                sessionStorage.setItem(
                  reference,
                  JSON.stringify(orderInfo)
                );
              }
            } else {
              console.warn('No se pudo consultar Wompi, usando sessionStorage');
            }
          } catch (err) {
            console.warn('Error consultando Wompi, usando sessionStorage:', err);
          }
        }

        setOrderData(orderInfo);
      } catch (err) {
        console.error('Error cargando pedido:', err);
        setError('Error cargando información del pedido');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [reference, transactionId]);

  if (loading) return <Loading />;

  if (
    error ||
    !orderData ||
    !orderData.customerInfo ||
    !orderData.items ||
    !orderData.amountInCents
  ) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-white text-center">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Error</h1>
        <p>{error || "No se encontró la información del pedido"}</p>
        <Button
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </Button>
      </div>
    );
  }

  // Mensajes por estado
  const getStatusMessage = () => {
    const status = orderData.status;

    switch (status) {
      case 'APPROVED':
      case 'COMPLETED':
        return {
          title: '¡Pago Confirmado!',
          message:
            'Tu pago fue procesado correctamente. Recibirás un correo con los detalles de tu compra.',
          color: 'text-green-500',
        };
      case 'PENDING':
        return {
          title: 'Pago en Proceso',
          message:
            'Estamos verificando tu pago. Recibirás un correo en cuanto se confirme.',
          color: 'text-yellow-500',
        };
      case 'DECLINED':
      case 'VOIDED':
      case 'ERROR':
        return {
          title: 'Pago Rechazado',
          message:
            'Tu pago no pudo ser procesado. Intenta nuevamente o usa otro método de pago.',
          color: 'text-red-500',
        };
      default:
        return {
          title: 'Estado del Pedido',
          message:
            'Gracias por tu compra. Recibirás un correo con más información.',
          color: 'text-white',
        };
    }
  };

  const statusInfo = getStatusMessage();
  const customer = orderData.customerInfo;
  const items = orderData.items;
  const shippingCost = orderData.shippingCost;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className={`text-4xl font-extrabold mb-8 text-center ${statusInfo.color}`}>
        {statusInfo.title}
      </h1>

      <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center mb-6">
          <p className="text-xl">Hola, {customer.name}</p>
          <p className="text-sm text-gray-400">Pedido #{reference}</p>
          <p className="text-md mt-4">{statusInfo.message}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-red-400">Detalles del pedido</h2>

          {items.map((item: CartItem, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <span>
                {item.qty}x {item.name}
              </span>
              <span>${item.price.toLocaleString()} COP</span>
            </div>
          ))}

          {shippingCost > 0 && (
            <div className="flex justify-between items-center">
              <span>Envío</span>
              <span>${shippingCost.toLocaleString()} COP</span>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-zinc-700 pt-4">
            <span className="text-lg font-semibold text-red-400">Total</span>
            <span className="text-lg font-bold">
              {(orderData.amountInCents / 100).toLocaleString("es-CO", {
                style: "currency",
                currency: orderData.currency || "COP",
              })}
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold"
            onClick={() => router.push('/')}
          >
            Volver a la tienda
          </Button>
        </div>
      </div>
    </div>
  );
}
