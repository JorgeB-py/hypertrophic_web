"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { productos, logos } from "@/services/productos.service";
import { Producto } from "@/interfaces/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { montserrat, roboto } from "@/fonts/fonts";

export default function Catalogo() {
  const [query, setQuery] = useState("");
  const [marca, setMarca] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 15;

  // lista de marcas únicas
  const marcas = useMemo(
    () => ["all", ...new Set(productos.map((p: Producto) => p.market ?? "Sin marca"))],
    []
  );
  const marketLogo: Record<string, string> = Object.fromEntries(
    logos.map(l => [l.market, l.image])
  );

  // productos filtrados
  const visibles = productos.filter(
    (p: Producto) =>
      (marca === "all" || p.market === marca) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  // paginación
  const totalPages = Math.ceil(visibles.length / perPage);
  const pageProducts = visibles.slice((page - 1) * perPage, page * perPage);

  // Reset page si cambia filtro o búsqueda
  useEffect(() => { setPage(1); }, [marca, query]);

  return (
    <section className="p-6 text-white space-y-8">
      <article className="flex flex-col items-center gap-8">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Catálogo de productos
        </h2>

        {/* filtros */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Buscar producto…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-md border-none bg-[#1a1a1a]/80 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A40606]"
          />

          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-56 rounded-md border-none bg-[#1a1a1a]/80 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#A40606]"
          >
            {marcas.map((m) => (
              <option key={m} value={m} className="bg-[#1a1a1a] text-white">
                {m === "all" ? "Todas las marcas" : m}
              </option>
            ))}
          </select>
        </div>

        {/* grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {pageProducts.map((p: Producto) => (
            <Card
              key={p.name}
              className="group relative w-[200px] h-[280px] bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
              rounded-xl overflow-hidden transition-all duration-500
              drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]
              hover:scale-105 group-hover:rounded-full"
            >
              {/* ── Frontal ── */}
              <div className="absolute inset-0 transition-transform duration-500
                  transform group-hover:rotate-y-180">
                <CardContent className="flex items-center justify-center pt-6 h-[210px]">
                  <Image src={p.image} alt={p.name} width={140} height={140} className="object-contain" />
                </CardContent>
                <CardFooter className="text-center pb-4">
                  <h3 className={`${montserrat.className} font-semibold text-base`}>{p.name}</h3>
                </CardFooter>
              </div>
              {/* ── Trasera ── */}
              <div className="absolute inset-0 flex flex-col items-center justify-center
                  bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 p-4 text-center
                  rounded-xl group-hover:rounded-full">
                <p className="text-sm mb-3">{p.description || "Sin descripción"}</p>
                {marketLogo[p.market] && (
                  <Image
                    src={marketLogo[p.market]}
                    alt={p.market}
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                )}
              </div>
            </Card>
          ))}

          {pageProducts.length === 0 && (
            <p className={`${roboto.className} col-span-full text-center mt-6`}>
              No se encontraron productos.
            </p>
          )}
        </div>

        {/* paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 my-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-[#a40606] text-white disabled:opacity-50 cursor-pointer"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-lg font-bold">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-[#a40606] text-white disabled:opacity-50 cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </article>
    </section>
  );
}