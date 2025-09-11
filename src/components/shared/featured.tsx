"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { montserrat } from "@/fonts/fonts";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/lib/productsStore";

const destacadosKeys = [
  "Creatine platinum",
  "Creastack",
  "WHEY ELITE",
  "Euphoriq",
  "Bipro Classic",
  "Gold Standard 100% Whey Protein",
];

export default function Destacados() {
  const router = useRouter();

  const {products}= useProductStore();

  const destacados = (products ?? []).filter(p =>
    destacadosKeys.includes(p.name)
  );

  return (
    <section className="p-6 text-white">
      <article className="flex flex-col items-center gap-8">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Nuestros productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destacados.map((producto) => (
            <Card
              onClick={() => router.push(`catalogo/${producto.id}`)}
              role="button"
              key={producto.id}
              className="group relative w-[200px] h-[280px] cursor-pointer rounded-xl bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:scale-105 transition-transform duration-300 perspective-[1000px]"
            >
              <CardContent className="absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 [backface-visibility:hidden]">
                  <Image src={producto.image} alt={producto.name} width={140} height={140} className="object-contain max-h-35" />
                  <CardFooter className="mt-2 flex flex-col items-center text-center">
                    <h3 className={`${montserrat.className} font-semibold text-base`}>{producto.name}</h3>
                    <div className="mt-1 text-sm">
                      {producto.variants[0].price && producto.variants[0].price+15000 > producto.variants[0].price ? (
                        <div>
                          <span className="line-through text-gray-300 mr-2">
                            {(producto.variants[0].price+15000).toLocaleString('es-CO')}
                          </span>
                          <span className="text-green-400 font-bold">
                            ${producto.variants[0].price.toLocaleString('es-CO')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-white font-bold">
                          ${producto.variants[0].price.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                  </CardFooter>

                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col p-4 bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)] rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] text-center">
                  <p className="text-sm mb-3 line-clamp-4">{producto.description}</p>
                  <Image src={producto.image} alt={producto.name} width={80} height={40} className="object-contain self-center mt-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </article>
    </section>
  );
}
