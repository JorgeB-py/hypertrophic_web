"use client";
import Team from "@/components/shared/team";
import { montserrat, roboto } from "@/fonts/fonts";

export default function Nosotros() {
  return (
    <main className="max-w-7xl mx-auto p-4 min-h-screen space-y-20 text-white">
      {/* ───── EQUIPO ───── */}
      <Team />

      {/* ───── MISIÓN ───── */}
      <section className="flex flex-col items-center gap-6">
        <h2
          className={`${montserrat.className} text-3xl font-extrabold text-center`}
        >
          Misión
        </h2>
        <p className={`${roboto.className} text-lg text-center max-w-3xl`}>
          Impulsar a cada persona a superar sus límites físicos y mentales,
          ofreciendo productos auténticos, contenido honesto y una comunidad que
          valora el esfuerzo real por encima de las apariencias.
        </p>
      </section>

      {/* ───── VISIÓN ───── */}
      <section className="flex flex-col items-center gap-6">
        <h2
          className={`${montserrat.className} text-3xl font-extrabold text-center`}
        >
          Visión
        </h2>
        <p className={`${roboto.className} text-lg text-center max-w-3xl`}>
          Convertirnos en la marca de referencia para quienes viven el
          entrenamiento como un estilo de vida, construyendo una comunidad
          sólida que se expanda por Latinoamérica, guiada por la disciplina, el
          conocimiento y la autenticidad.
        </p>
      </section>

      {/* ───── COMPROMISO ───── */}
      <section className="flex flex-col items-center gap-6 pb-10">
        <h2
          className={`${montserrat.className} text-3xl font-extrabold text-center`}
        >
          Compromiso con la comunidad
        </h2>
        <ul
          className={`${roboto.className} text-lg max-w-3xl list-disc list-inside space-y-2 text-center`}
        >
          <li>Creamos contenido educativo y motivacional sin filtros.</li>
          <li>Llevamos retos y dinámicas mensuales para que todos se reten.</li>
          <li>
            Escuchamos activamente a quienes nos siguen, porque esto lo
            construimos juntos.
          </li>
          <li>
            Defendemos el acceso a productos originales y apoyo real, no humo ni
            promesas falsas.
          </li>
        </ul>
      </section>
    </main>
  );
}
