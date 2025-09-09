// services/wompi-checkout.service.ts
'use client';

import { CartItem, useCart } from '@/lib/cartStore';

interface WompiWindow extends Window {
  WidgetCheckout?: any;
}

export async function wompiCheckout(
  items: CartItem[],
  customer: {
    name: string;
    address: string;
    city: string;
    region: string;
    email: string;
    phone: string;
    document: string;
    type: string;
  },
  envio: number
) {
  try {
    useCart.getState().setLoading(true);

    const response = await fetch(
      'https://wompiapi-isu2ps4vbq-uc.a.run.app/create-transaction',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer, shipping: envio }),
      }
    );

    if (!response.ok) {
      throw new Error('Error al crear la transacción');
    }

    const checkoutData = await response.json();

    if (!checkoutData.success) {
      throw new Error('Error en la respuesta del servidor');
    }

    // 2. Verificar que el script del widget esté disponible
    const wompiWindow = window as WompiWindow;
    if (typeof window === 'undefined' || !wompiWindow.WidgetCheckout) {
      throw new Error('El widget de Wompi no está disponible. ¿Cargaste el script https://checkout.wompi.co/widget.js?');
    }

    // 3. Iniciar el checkout de Wompi con los datos recibidos
    const checkout = new (window as WompiWindow).WidgetCheckout({
      currency: checkoutData.currency,
      amountInCents: checkoutData.amountInCents,
      reference: checkoutData.reference,
      publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
      redirectUrl: checkoutData.redirectUrl,

      // Firma de integridad ✅
      signature: {
        integrity: checkoutData.signatureIntegrity,
      },

      // Si tienes los datos del cliente
      customerData: {
        email: customer.email,
        fullName: customer.name,
        phoneNumber: customer.phone.replace(/\D/g, ''),
        phoneNumberPrefix: '+57',
        legalId: customer.document,
        legalIdType: mapDocumentType(customer.type),
      },

      // Información de envío
      shippingAddress: {
        addressLine1: customer.address,
        city: customer.city,
        phoneNumber: customer.phone.replace(/\D/g, ''),
        region: customer.region,
        country: 'CO',
      },
    });

    localStorage.setItem(`order_${checkoutData.reference}`, JSON.stringify({
      items: checkoutData.items,
      amountInCents: checkoutData.amountInCents,
      shippingCost: checkoutData.shippingCost,
      customerInfo: checkoutData.customerInfo,
      status: 'PENDING',
    }));

    useCart.getState().setLoading(true);

    checkout.open((result: any) => {
      useCart.getState().setLoading(false);
      if (result) {
        console.log(result);
        window.location.href = `/confirmation/?reference=${checkoutData.reference}/?id=${result.transaction.id}`;
      }
    });


    return { success: true };
  } catch (error) {
    console.error('Error en el checkout de Wompi:', error);
    useCart.getState().setLoading(false);
    return { success: false, error };
  }
}

function mapDocumentType(type: string): string {
  const typeMap: Record<string, string> = {
    CC: 'CC',
    CE: 'CE',
    NIT: 'NIT',
    PP: 'PP',
    TI: 'TI',
    DNI: 'DNI',
    RG: 'RG',
  };

  return typeMap[type.toUpperCase()] || 'OTHER';
}
