// app/confirmation/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import { useCart } from '@/lib/cartStore';
import { CartItem } from '@/interfaces/cart';

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clear } = useCart();
  
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Obtener referencia y ID de la transacción de los parámetros de la URL
  const reference = searchParams.get('reference');
  const transactionId = searchParams.get('id');
  
  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        if (!reference) {
          setError('Referencia de pedido no encontrada');
          return;
        }
        
        // 1. Recuperar datos locales de la transacción
        const localData = localStorage.getItem(`order_${reference}`);
        if (!localData) {
          setError('Información del pedido no encontrada');
          return;
        }
        
        const orderInfo = JSON.parse(localData);
        setOrderData(orderInfo);
        
        // 2. Si tenemos un ID de transacción, verificar el estado con Wompi
        if (transactionId) {
          try {
            const wompiResponse = await fetch(
              `https://production.wompi.co/v1/transactions/${transactionId}`,
              {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`
                }
              }
            );
            
            if (wompiResponse.ok) {
              const wompiData = await wompiResponse.json();
              if (wompiData && wompiData.data) {
                const wompiStatus = wompiData.data.status;
                setTransactionStatus(wompiStatus);
                
                if (wompiStatus === 'APPROVED') {
                  clear();
                  
                  const updatedOrderInfo = {
                    ...orderInfo,
                    status: 'COMPLETED',
                    wompiTransactionId: transactionId
                  };
                  localStorage.setItem(`order_${reference}`, JSON.stringify(updatedOrderInfo));
                }
              }
            } else {
              console.error('Error en la respuesta de Wompi:', wompiResponse.statusText);
            }
          } catch (wompiError) {
            console.error('Error verificando transacción con Wompi:', wompiError);
          }
        }
      } catch (error) {
        console.error('Error verificando transacción:', error);
        setError('Error al verificar la transacción');
      } finally {
        setLoading(false);
      }
    };
    
    verifyTransaction();
  }, [reference, transactionId, clear]);
  
  if (loading) return <Loading />;
  
  if (error || !orderData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-white text-center">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Error</h1>
        <p>{error || 'No se encontró la información del pedido'}</p>
        <Button 
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          onClick={() => router.push('/')}
        >
          Volver al inicio
        </Button>
      </div>
    );
  }
  
  // Determinar el mensaje según el estado de la transacción
  const getStatusMessage = () => {
    // Priorizar el estado obtenido de Wompi si está disponible
    const status = transactionStatus || orderData.status;
    
    switch(status) {
      case 'APPROVED':
      case 'COMPLETED':
        return {
          title: '¡Pago Confirmado!',
          message: 'Tu pago ha sido procesado correctamente.',
          color: 'text-green-500'
        };
      case 'PENDING':
        return {
          title: 'Pago en Proceso',
          message: 'Estamos procesando tu pago. Te notificaremos cuando se complete.',
          color: 'text-yellow-500'
        };
      case 'DECLINED':
      case 'VOIDED':
      case 'ERROR':
        return {
          title: 'Pago Rechazado',
          message: 'Tu pago ha sido rechazado. Por favor intenta con otro método de pago.',
          color: 'text-red-500'
        };
      default:
        return {
          title: 'Estado del Pedido',
          message: 'Gracias por tu compra.',
          color: 'text-white'
        };
    }
  };
  
  const statusInfo = getStatusMessage();
  const customer = orderData.customerInfo;
  const items = orderData.items;
  const shippingCost = orderData.shippingCost;
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className={`text-3xl font-bold mb-6 text-center ${statusInfo.color}`}>
        {statusInfo.title}
      </h1>
      
      <div className="bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
        <div className="text-center mb-6">
          <p className="text-xl">Gracias por tu compra, {customer.name}</p>
          <p className="text-sm text-gray-400">Pedido #{reference}</p>
          <p className="text-sm mt-2">{statusInfo.message}</p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-400">Detalles del pedido</h2>
          
          {items.map((item: CartItem, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.qty}x {item.name}</span>
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
            <span className="text-xl font-semibold text-red-400">Total</span>
            <span className="text-xl font-bold">
              ${(orderData.amountInCents / 100).toLocaleString()} COP
            </span>
          </div>
        </div>
        
        {(transactionStatus === 'APPROVED' || orderData.status === 'COMPLETED') && (
          <div className="mt-8 p-4 bg-zinc-800 rounded-lg">
            <p className="text-center text-yellow-400 font-medium mb-2">Próximos pasos</p>
            <p className="text-sm text-center">
              Por favor comunícate con nosotros vía WhatsApp al número <strong>+57 313 2496945</strong> 
              y menciona tu número de pedido para coordinar la entrega.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-center">
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