'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/interfaces/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { montserrat, roboto } from '@/fonts/fonts';
import { useCart } from '@/lib/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // shadcn
import { getAllProductos } from '@/services/firebase.service';

export default function Catalogo() {
  const router = useRouter();
  const addToCart = useCart(state => state.add);

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [marca, setMarca] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const handleClick = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
    });

  }

  /* ──────────────────── Firestore ──────────────────── */
  useEffect(() => {
    (async () => {
      const productos = await getAllProductos();
      setProducts(productos);
    })();
  }, []);

  /* ──────────────────── Memos ──────────────────── */
  const marcas = useMemo(
    () => ['all', ...new Set(products.map(p => p.market ?? 'Sin marca'))],
    [products]
  );

  /* ──────────────────── Filtros y paginación ──────────────────── */
  const visibles = products.filter(
    p =>
      (marca === 'all' || p.market === marca) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(visibles.length / perPage);
  const pageProducts = visibles.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [marca, query]);

  /* ──────────────────── Render ──────────────────── */
  return (
    <section className="p-6 text-white space-y-8">
      <h2
        className={`${montserrat.className} text-4xl font-extrabold text-center`}
      >
        Catálogo de productos
      </h2>

      {/* ───────────── Filtros ───────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Buscar producto…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-64 rounded-md bg-[#1a1a1a]/80 px-4 py-2 text-sm placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-[#A40606]"
        />

        <select
          value={marca}
          onChange={e => setMarca(e.target.value)}
          className="w-56 rounded-md bg-[#1a1a1a]/80 px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#A40606]"
        >
          {marcas.map(m => (
            <option key={m} value={m} className="bg-[#1a1a1a]">
              {m === 'all' ? 'Todas las marcas' : m}
            </option>
          ))}
        </select>
      </div>

      {/* ───────────── Grid de productos ───────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {pageProducts.map(p => (
          <Card
            key={p.id}
            role="button"
            tabIndex={0}
            className="relative w-[200px] h-[300px] bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
                       rounded-xl overflow-hidden transition-transform duration-300
                       hover:scale-105 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]"
            onClick={() => router.push(`catalogo/${p.id}`)}
          >
            <CardContent className="flex flex-col items-center justify-center pt-6 h-[210px] cursor-pointer">
              <Image
                src={p.image}
                alt={p.name}
                width={140}
                height={140}
                className="object-contain"
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pb-4">
              <h3
                className={`${montserrat.className} font-semibold text-sm text-center`}
              >
                {p.name}
              </h3>
              <p className="text-base font-bold text-center">
                ${p.price?.toLocaleString('es-CO')}
              </p>

              <Button
                size="sm"
                className="w-full mt-1 cursor-pointer"
                onClick={e => handleClick(e, p)}
              >
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}

        {pageProducts.length === 0 && (
          <p className={`${roboto.className} col-span-full text-center mt-6`}>
            No se encontraron productos.
          </p>
        )}
      </div>

      {/* ───────────── Paginación ───────────── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-6">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Anterior
          </Button>

          <span className="px-4 py-2 text-lg font-bold">
            Página {page} de {totalPages}
          </span>

          <Button
            variant="secondary"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            Siguiente
          </Button>
        </div>
      )}
    </section>
  );
}
