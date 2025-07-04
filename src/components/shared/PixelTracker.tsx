'use client';
declare global {
  interface Window {
    /**
     * fbq para Facebook Pixel.
     * @param command Siempre 'track' en este caso.
     * @param event Nombre del evento (p.ej. 'AddToCart').
     * @param params Parámetros adicionales del evento.
     */
    fbq?: (
      command: 'track',
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PixelTracker() {
  const path = usePathname();

  useEffect(() => {
    if (window.fbq) window.fbq('track', 'PageView');
  }, [path]);

  return null;
}
