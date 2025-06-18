'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { useCart } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AlertDialogWrapper from './alertdialog';
import { Product, Variant } from '@/interfaces/product';

export default function ProductDetail({ id }: { id: string }) {
  /* ──────── ESTADOS ──────── */
  const [product, setProduct]   = useState<Product | null>(null);
  const [variant, setVariant]   = useState<Variant | null>(null);
  const [qty, setQty]           = useState(1);          // 👈 cantidad
  const [open, setOpen]         = useState(false);

  const add    = useCart(s => s.add);
  const router = useRouter();

  /* ──────── CARGA FIRESTORE ──────── */
  useEffect(() => {
    let active = true;
    (async () => {
      const snap = await getDoc(doc(db, 'productos', id));
      if (!snap.exists() || !active) return;
      const p = { id: snap.id, ...snap.data() } as Product;
      setProduct(p);
      setVariant(p.variants?.[0] ?? null);
    })();
    return () => { active = false; };
  }, [id]);

  if (!product || !variant)
    return <div className="flex justify-center items-center py-20"><span className="animate-pulse">Cargando…</span></div>;

  /* ──────── HANDLERS ──────── */
  const handleAdd = () => {
    // si tu store acepta qty directamente:
    add({
      id: variant.sku,
      name: `${product.name} – ${variant.flavor}`,
      price: variant.price,
      image: product.image,
      qty,
    });

  };

  const maxQty = variant.stock ?? 0;

  /* ──────── RENDER ──────── */
  return (
    <>
      <section className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* ─ Imagen ─ */}
          <div className="relative w-full md:w-[48%] aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 48vw, 100vw"
              className="object-contain rounded-xl bg-neutral-900"
              priority
            />
          </div>

          {/* ─ Info ─ */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <p className="whitespace-pre-line leading-relaxed">
              {product.description}
            </p>

            {/* Select sabor/tamaño */}
            {product.variants?.length > 1 && (
              <select
                value={variant.sku}
                onChange={e =>
                  setVariant(product.variants!.find(v => v.sku === e.target.value)!)
                }
                className="w-full border rounded-md p-2 bg-neutral-800"
              >
                {product.variants.map(v => (
                  <option key={v.sku} value={v.sku}>
                    {v.flavor} · {v.servings}{v.servings ? ' serv' : ''}
                  </option>
                ))}
              </select>
            )}

            {/* Campo cantidad */}
            <div className="flex items-center gap-2">
              <label htmlFor="qty">Cantidad:</label>
              <input
                id="qty"
                type="number"
                min={1}
                max={maxQty}
                value={qty}
                onChange={e => setQty(Math.min(maxQty, Math.max(1, +e.target.value)))}
                className="w-20 p-2 text-center rounded border bg-neutral-800"
              />
              <span className="text-sm text-muted-foreground">Stock: {maxQty}</span>
            </div>

            <p className="text-3xl font-bold">
              ${(variant.price * qty).toLocaleString('es-CO')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                disabled={maxQty === 0}
                className='cursor-pointer'
                onClick={() => { handleAdd(); setOpen(true); }}
              >
                Agregar al carrito
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={maxQty === 0}
                className='cursor-pointer'
                onClick={() => { handleAdd(); router.push('/carro'); }}
              >
                Comprar ahora
              </Button>
            </div>

            {maxQty === 0 && <p className="text-red-500">Sin stock disponible</p>}
          </div>
        </div>
      </section>

      {/* Diálogo confirmación */}
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
