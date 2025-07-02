"use client"
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { montserrat, roboto } from '@/fonts/fonts';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/lib/productsStore';
import { Input } from '@/components/ui/input';
import Head from 'next/head';

export default function Catalogo() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [marca, setMarca] = useState('all');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 15;

  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (!products) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  const marcas = useMemo(
    () => ['all', ...new Set((products ?? []).map(p => p.market ?? 'Sin marca'))],
    [products]
  );

  const categories = useMemo(
    () => ['all', ...new Set((products ?? []).map(p => p.category ?? 'Sin categoría'))],
    [products]
  );

  const visibles = (products ?? []).filter(
    p =>
      (marca === 'all' || p.market === marca) &&
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );


  const totalPages = Math.ceil(visibles.length / perPage);
  const pageProducts = visibles.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [marca, query]);

  return (
    <>
      <Head>
        {/* Básicos */}
        <title>Catálogo de Productos – Hypertrophic</title>
        <meta
          name="description"
          content="Explora nuestro catálogo de suplementos originales: proteínas, creatinas, pre-workouts y combos con envío gratis. ¡Supera tus límites con Hypertrophic!"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:site_name" content="Hypertrophic" />
        <meta property="og:url" content="https://hypertrophic.com.co/catalogo" />
        <meta property="og:title" content="Catálogo de Productos – Hypertrophic" />
        <meta
          property="og:description"
          content="Explora nuestro catálogo de suplementos originales: proteínas, creatinas, pre-workouts y combos con envío gratis."
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Catálogo Hypertrophic" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@HypertrophicCo" />
        <meta name="twitter:title" content="Catálogo de Productos – Hypertrophic" />
        <meta
          name="twitter:description"
          content="Descubre nuestras proteínas, creatinas, pre-workouts y combos con envío gratis. ¡Encuentra tu aliado para entrenar duro!"
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png"
        />
      </Head>
      <section className="p-6 text-white space-y-8 flex flex-col items-center justify-center">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Catálogo de productos
        </h2>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="text"
            placeholder="Buscar producto…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-64 rounded-md bg-[#1a1a1a]/80 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A40606]"
          />
          <select
            value={marca}
            onChange={e => setMarca(e.target.value)}
            className="w-56 rounded-md bg-[#1a1a1a]/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A40606]"
          >
            {marcas.map(m => (
              <option key={m} value={m} className="bg-[#1a1a1a]">
                {m === 'all' ? 'Todas las marcas' : m}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-56 rounded-md bg-[#1a1a1a]/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A40606]"
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-[#1a1a1a]">
                {c === 'all' ? 'Todas las categorías' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
          {pageProducts.map(p => (
            <Card
              key={p.id}
              role="button"
              tabIndex={0}
              className="flex flex-col items-center justify-center w-[200px] h-[300px] bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:brightness-110 hover:shadow-[0_0_25px_#ff0000aa] hover:ring-2 hover:ring-[#ff4d4d] ring-offset-2"
              onClick={() => router.push(`catalogo/${p.id}`)}
            >
              <div className="flex justify-center items-center h-40">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={140}
                  height={140}
                  className="object-contain max-h-40"
                />
              </div>
              <h3 className={`${montserrat.className} font-semibold text-sm text-center`}>
                {p.name}
              </h3>
            </Card>
          ))}

          {pageProducts.length === 0 && products && (
            <p className={`${roboto.className} col-span-full text-center mt-6`}>
              No se encontraron productos.
            </p>
          )}
        </div>

        {/* Paginación */}
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
    </>
  );
}
