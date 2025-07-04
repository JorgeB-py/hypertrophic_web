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
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AlertDialogWrapper from './alertdialog';
import { Product } from '@/interfaces/product';
import { useProductStore } from '@/lib/productsStore';

export default function ProductDetail({ product }: { product: Product }) {
  const [variant, setVariant] = useState(() => product?.variants?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);

  const { products, fetchProducts } = useProductStore();


  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const relatedProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => p.id !== product.id).slice(0, 4);
  }, [products, product.id]);


  const add = useCart(s => s.add);
  const router = useRouter();

  useEffect(() => {
    if (!relatedProducts) {
      fetchProducts();
    }
  }, [relatedProducts, fetchProducts]);

  useEffect(() => {
    if (product && !variant) {
      setVariant(product.variants?.[0] ?? null);
    }
  }, [product, variant]);

  if (!product || !variant) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-pulse">Cargando…</span>
      </div>
    );
  }

  const maxQty = variant.stock ?? 0;

  const handleAdd = () => {
    add({
      id: variant.sku,
      name: `${product.name} – ${variant.flavor}`,
      price: variant.price,
      image: product.image,
      qty,
      category: product.category
    });
    setOpen(true);
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [variant.sku],
        content_name: product.name,
        value: variant.price * qty,
        currency: 'COP',
        contents: [{ id: variant.sku, quantity: qty }],
        num_items: qty
      });
    }
  };

  return (
    <>
      <section className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* ─ Imagen ─ */}
          <div className="relative w-full md:w-[40%] aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain p-6"
              priority
            />
          </div>

          {/* ─ Info ─ */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>

            <p className="whitespace-pre-line leading-relaxed text-neutral-300">
              {product.description}
            </p>

            {/* Select sabor/tamaño */}
            {product.variants?.length > 1 && (
              <select
                value={variant.sku}
                onChange={e =>
                  setVariant(product.variants!.find(v => v.sku === e.target.value)!)
                }
                className="w-full border rounded-md p-3 bg-neutral-800 text-white"
              >
                {product.variants.map(v => (
                  <option key={v.sku} value={v.sku}>
                    {v.flavor} · {v.servings}{v.servings ? ' serv' : ''}
                  </option>
                ))}
              </select>
            )}

            {/* Campo cantidad */}
            <div className="flex items-center gap-3">
              <label htmlFor="qty" className="text-sm text-white">Cantidad:</label>
              <input
                id="qty"
                type="number"
                min={1}
                max={maxQty}
                value={qty}
                onChange={e => setQty(Math.min(maxQty, Math.max(1, +e.target.value)))}
                className="w-20 p-2 text-center rounded border bg-neutral-800 text-white"
              />
              <span className="text-sm text-muted-foreground">Stock: {maxQty}</span>
            </div>

            {/* Precio y promoción */}
            <div className="text-3xl font-bold text-green-400">
              ${(variant.price * qty).toLocaleString('es-CO')}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                disabled={maxQty === 0}
                className="cursor-pointer shadow-md"
                onClick={handleAdd}
              >
                Agregar al carrito
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={maxQty === 0}
                className="cursor-pointer"
                onClick={() => {
                  handleAdd();
                  router.push('/carro');
                }}
              >
                Comprar ahora
              </Button>
            </div>

            {maxQty === 0 && <p className="text-red-500">Sin stock disponible</p>}
          </div>
        </div>

        {/* ─ Recomendaciones ─ */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">También te puede interesar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => {
              const firstVariant = p.variants?.[0];
              if (!firstVariant) return null;

              return (
                <div
                  key={p.id}
                  onClick={() => router.push(`/catalogo/${p.id}`)}
                  className="bg-neutral-900 p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-800">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-white">{p.name}</h3>
                  <p className="text-green-400 font-semibold">
                    ${firstVariant.price.toLocaleString('es-CO')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─ Diálogo de confirmación ─ */}
      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Producto añadido"
        description={`${product.name} – ${variant.flavor} × ${qty} se agregó al carrito.`}
        boton="Seguir comprando"
        action={() => router.push('/catalogo')}
      />
    </>
  );
}
