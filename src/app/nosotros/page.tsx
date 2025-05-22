"use client"
import { montserrat, roboto } from "@/fonts/fonts"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

export default function Nosotros() {
  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen gap-16 justify-center text-white mt-2">

      {/* EQUIPO */}
      <section className="flex flex-col items-center gap-8">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Nuestro equipo
        </h2>
        <div className="flex flex-wrap justify-center gap-16">
          {[
            { src: "/jorge.png", name: "Jorge" },
            { src: "/juan.png", name: "Juan" },
            { src: "/sebastian.png", name: "Sebastian" },
          ].map((member) => (
            <Card
              key={member.name}
              className="w-[220px] aspect-[3/4] flex flex-col justify-between items-center bg-transparent drop-shadow-[0_0_25px_rgba(255,0,0,0.7)]"
            >
              <CardContent className="pt-4">
                <Image
                  src={member.src}
                  alt={member.name}
                  width={200}
                  height={312}
                  className="object-contain fade-bottom"
                />
              </CardContent>
              <CardFooter className="text-center pb-4">
                <h3 className={`${montserrat.className} font-extrabold`}>{member.name}</h3>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* MISIÓN */}
      <section className="flex flex-col items-center gap-6">
        <h2 className={`${montserrat.className} text-3xl font-extrabold text-center`}>
          Misión
        </h2>
        <p className={`${roboto.className} text-lg text-center max-w-3xl`}>
          Impulsar a cada persona a superar sus límites físicos y mentales, ofreciendo productos auténticos, contenido honesto y una comunidad que valora el esfuerzo real por encima de las apariencias.
        </p>
      </section>

      {/* VISIÓN */}
      <section className="flex flex-col items-center gap-6">
        <h2 className={`${montserrat.className} text-3xl font-extrabold text-center`}>
          Visión
        </h2>
        <p className={`${roboto.className} text-lg text-center max-w-3xl`}>
          Convertirnos en la marca de referencia para quienes viven el entrenamiento como un estilo de vida, construyendo una comunidad sólida que se expanda por Latinoamérica, guiada por la disciplina, el conocimiento y la autenticidad.
        </p>
      </section>

      {/* COMPROMISO */}
      <section className="flex flex-col items-center gap-6 pb-10">
        <h2 className={`${montserrat.className} text-3xl font-extrabold text-center`}>
          Compromiso con la comunidad
        </h2>
        <ul className={`${roboto.className} text-lg max-w-3xl list-disc list-inside space-y-2 text-center`}>
          <li>Creamos contenido educativo y motivacional sin filtros.</li>
          <li>Llevamos retos y dinámicas mensuales para que todos se reten.</li>
          <li>Escuchamos activamente a quienes nos siguen, porque esto lo construimos juntos.</li>
          <li>Defendemos el acceso a productos originales y apoyo real, no humo ni promesas falsas.</li>
        </ul>
      </section>
    </main>
  )
}
