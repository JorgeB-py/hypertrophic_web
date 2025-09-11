'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard } from 'lucide-react';
import AlertDialogWrapper from './alertdialog';
import { Product } from '@/interfaces/product';
import { useProductStore } from '@/lib/productsStore';

export default function ProductDetail({ product }: { product: Product }) {
  const [variant, setVariant] = useState(() => product?.variants?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllVariants, setShowAllVariants] = useState(false);

  const { products, fetchProducts } = useProductStore();
  const add = useCart(s => s.add);
  const router = useRouter();

  useEffect(() => {
    if (!products) fetchProducts();
  }, [products, fetchProducts]);

  const relatedProducts = useMemo(() => {
    if (!products) return [];
    const byCategory = products.filter(
      p => p.id !== product.id && p.category === product.category
    );
    if (byCategory.length >= 4) return byCategory.slice(0, 4);

    const byBrand = products.filter(
      p =>
        p.id !== product.id &&
        p.market === product.market &&
        !byCategory.some(bc => bc.id === p.id)
    );
    return [...byCategory, ...byBrand].slice(0, 4);
  }, [products, product]);

  useEffect(() => {
    if (product && !variant) {
      setVariant(product.variants?.[0] ?? null);
    }
  }, [product, variant]);

  if (!product || !variant) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-pulse text-white">Cargando…</span>
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
      category: product.category,
    });
    setOpen(true);
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [variant.sku],
        content_name: product.name,
        value: variant.price * qty,
        currency: 'COP',
        contents: [{ id: variant.sku, quantity: qty }],
        num_items: qty,
      });
    }
  };

  // Imágenes disponibles
  const images = [
    { src: product.image, alt: `Imagen principal de ${product.name}` },
    { src: product.table, alt: `Tabla nutricional de ${product.name}` },
  ].filter(img => img.src);

  // Carousel automático
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  // Variantes visibles
  const maxVisibleVariants = 4;
  const visibleVariants = showAllVariants
    ? product.variants
    : product.variants?.slice(0, maxVisibleVariants);

  return (
    <>
      <section className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-10 bg-neutral-900 rounded-2xl shadow-lg p-6">
          {/* ─ Carousel con thumbnails ─ */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Miniaturas */}
            <div className="flex md:flex-col gap-3 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border ${
                    activeIndex === idx
                      ? 'border-green-500'
                      : 'border-gray-700'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain bg-neutral-800"
                  />
                </button>
              ))}
            </div>

            {/* Imagen principal */}
            <div className="relative w-full md:w-[400px] aspect-[4/5] rounded-xl overflow-hidden bg-neutral-800">
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-contain p-4 transition-opacity duration-500"
                priority
              />
            </div>
          </div>

          {/* ─ Info ─ */}
          <div className="flex-1 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>

              <p className="whitespace-pre-line leading-relaxed text-neutral-300">
                {product.description}
              </p>

              {/* Selectores de variantes */}
              {product.variants?.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  <label className="block text-sm text-gray-300 font-medium">
                    Selecciona variante:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {visibleVariants.map(v => (
                      <Button
                        key={v.sku}
                        onClick={() => setVariant(v)}
                        className={`px-4 py-2 rounded-xl border text-sm ${
                          variant.sku === v.sku
                            ? 'bg-green-600 text-white border-green-500'
                            : 'bg-neutral-800 text-gray-200 border-gray-600 hover:bg-neutral-700'
                        }`}
                      >
                        {v.flavor} · {v.servings || '--'} serv ·{' '}
                        {v.weight || 'Peso ND'}
                      </Button>
                    ))}
                  </div>
                  {product.variants.length > maxVisibleVariants && (
                    <Button
                      onClick={() => setShowAllVariants(!showAllVariants)}
                      className="text-green-400 text-sm mt-2 underline"
                    >
                      {showAllVariants ? 'Ver menos' : 'Ver todas las variantes'}
                    </Button>
                  )}
                </div>
              )}

              {/* Cantidad con botones + y - */}
              <div className="flex items-center gap-3">
                <label className="text-sm text-white">Cantidad:</label>
                <div className="flex items-center border rounded-lg bg-neutral-800">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    className="px-3 py-2 text-lg font-bold text-white disabled:text-gray-500"
                  >
                    –
                  </button>
                  <span className="px-4 py-2 text-white">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(maxQty, qty + 1))}
                    disabled={qty >= maxQty}
                    className="px-3 py-2 text-lg font-bold text-white disabled:text-gray-500"
                  >
                    +
                  </button>
                </div>
                {maxQty > 0 ? (
                  <span className="text-sm text-gray-400">Stock: {maxQty}</span>
                ) : (
                  <span className="text-sm text-red-500 font-semibold">
                    🚫 Sin stock
                  </span>
                )}
              </div>

              {/* Precio */}
              <div className="text-4xl font-extrabold text-green-400">
                ${(variant.price * qty).toLocaleString('es-CO')}
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                size="lg"
                disabled={maxQty === 0}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-6 py-4 rounded-xl shadow-md transition"
                onClick={handleAdd}
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </Button>

              <Button
                size="lg"
                variant="secondary"
                disabled={maxQty === 0}
                className="flex items-center gap-2 bg-white text-black font-semibold text-lg px-6 py-4 rounded-xl shadow-md hover:bg-gray-200 transition"
                onClick={() => {
                  handleAdd();
                  router.push('/carro');
                }}
              >
                <CreditCard className="w-5 h-5" />
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>

        {/* ─ Recomendaciones ─ */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            También te puede interesar
          </h2>
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
                      alt={`Imagen de ${p.name}`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-white">
                    {p.name}
                  </h3>
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
