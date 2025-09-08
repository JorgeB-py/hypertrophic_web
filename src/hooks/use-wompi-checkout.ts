// hooks/useWompiCheckout.ts
'use client';

import { useEffect, useState } from 'react';

export function useWompiCheckout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Evitar cargarlo varias veces
    if (document.getElementById('wompi-widget-script')) {
      setReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'wompi-widget-script';
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;

    script.onload = () => {
      console.log('Wompi widget cargado ✅');
      setReady(true);
    };

    script.onerror = () => {
      console.error('Error al cargar el widget de Wompi');
    };

    document.body.appendChild(script);

    return () => {
      // ❗ Opcional: si quieres removerlo al desmontar
      // document.body.removeChild(script)
    };
  }, []);

  return ready;
}
