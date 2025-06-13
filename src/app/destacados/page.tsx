"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { montserrat } from "@/fonts/fonts";
import { productos } from "@/services/productos.service";

const destacadosKeys = [
  "Creatine platinum",   // platinum
  "Creastack",
  "Whey Gold Nitro Tech", // gold nitrotech
  "Bipro classic",
  "Legacy",
  "ISO 100",
];

const destacados = productos.filter(p =>
  destacadosKeys.includes(p.name)
);

export default function Productos() {
  return (
    <section className="p-6 text-white">
      <article className="flex flex-col items-center gap-8">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Nuestros productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {destacados.map((producto) => (
            <Card
              key={producto.name}
              className="group relative w-[200px] h-[280px] rounded-xl bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:scale-105 transition-transform duration-300 perspective-[1000px]"
            >
              <CardContent className="absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 [backface-visibility:hidden]">
                  <Image src={producto.image} alt={producto.name} width={140} height={140} className="object-contain" />
                  <CardFooter className="mt-2 text-center">
                    <h3 className={`${montserrat.className} font-semibold text-base`}>{producto.name}</h3>
                  </CardFooter>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] text-center">
                  <p className="text-sm mb-3">{producto.description}</p>
                  <Image src={producto.image /* o logo si lo deseas */} alt={producto.name} width={80} height={40} className="object-contain" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </article>
    </section>
  );
}
