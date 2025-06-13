"use client";
import Image from "next/image";
import { montserrat, roboto } from "@/fonts/fonts";
import { Card, CardContent } from "@/components/ui/card";
import Divider from "./divider";

export default function Team() {
  const equipo = [
    { src: "/jorge.png", name: "Jorge" },
    { src: "/juan.png",  name: "Juan"  },
    { src: "/sebastian.png", name: "Sebastian" },
  ];

  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
        Nuestro equipo
      </h2>

      <p className={`${roboto.className} text-lg text-center max-w-3xl`}>
        Somos un equipo apasionado por el fitness y la nutrición, comprometido con ofrecer
        productos auténticos y contenido honesto. Cada miembro aporta su experiencia y
        dedicación para construir una comunidad sólida y motivada.
      </p>

      {/* Tarjetas */}
      <div className="flex flex-wrap justify-center gap-16">
        {equipo.map((m) => (
          <Card
            key={m.name}
            className="relative w-[200px] aspect-[3/5] overflow-hidden rounded-xl
                       hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            {/* Foto */}
            <CardContent className="relative h-full w-full">
              <Image
                src={m.src}
                alt={m.name}
                fill
                sizes="200px"
                className="object-cover"
                priority
              />

              {/* halo negro-rojo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b
                              from-black/40 via-[#A40606]/20 to-black/90" />
            </CardContent>

            {/* Cuadro con nombre (colores Hypertrophic) */}
            <div className="absolute left-1/2 bottom-2 w-[85%] -translate-x-1/2
                            bg-[#1a1a1a]/90 backdrop-blur-sm text-center rounded-md py-3 px-2 shadow
                            ring-1 ring-[#A40606]/60">
              <h3 className={`${montserrat.className} text-base font-extrabold text-white`}>
                {m.name}
              </h3>
              <div className="mx-auto mt-1 h-[2px] w-8 bg-[#A40606]" />
            </div>
          </Card>
        ))}
      </div>

      <Divider />
    </section>
  );
}
