"use client";

import Image from "next/image";
import { koulen, montserrat, roboto } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import CarouselTestimonials, {
  Testimonials,
} from "@/components/shared/testimonials";
import Team from "@/components/shared/team";
import { useRouter } from "next/navigation";
import Divider from "@/components/shared/divider";

export default function Home() {
  const router = useRouter();
  const testimonials: Testimonials[] = [
    {
      name: "Federico Reyes",
      description:
        "Excelentes productos y el primer envío gratis. ¡Súper recomendado!",
    },
    {
      name: "Ashley Saballet",
      description:
        "Mejoraron mi recuperación y energía. Atención al cliente de 10.",
    },
    {
      name: "Rosario Pino",
      description: "¡Calidad top y asesoría profesional!",
    },
  ];

  // ───── Handlers externos ─────
  const whatsappAPI = () => window.open("https://wa.me/573132496945");
  const catalogHandle = () =>{
      router.push("/catalogo");
      }

  return (
    <main className="max-w-7xl mx-auto pt-8 pb-12 space-y-24 text-white">
      {/* ───────────── HERO ───────────── */}
      <section className="flex flex-col items-center gap-8">
        <h1
          className={`${koulen.className} logo-loop text-center text-[clamp(12rem,8vw,14rem)] leading-none`}
        >
          HYPERTROPHIC
        </h1>

        <div className="flex flex-col md:flex-row items-center md:justify-center gap-16 w-full">
          {/* Botella flotante */}
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <Image
              src="/wheygold.png"
              width={353}
              height={353}
              alt="NitroTech"
              className="max-w-full h-auto"
            />
          </div>

          {/* Lema + botón */}
          <div className="flex flex-col items-center gap-6">
            <h2
              className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md`}
            >
              MÁS ALLÁ DE LOS SUPLEMENTOS. MÁS ALLÁ DE LOS LÍMITES.
            </h2>

            <Button
              onClick={whatsappAPI}
              className="bg-[#A40606] hover:bg-[#A40606]/80 w-60 h-12 rounded-3xl flex items-center cursor-pointer justify-center gap-3"
            >
              <Image src="/wpp.png" width={37} height={37} alt="WhatsApp" />
              <span
                className={`${roboto.className} font-semibold text-white text-lg`}
              >
                Envíanos un mensaje
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* ──────────── FRASE + IMAGEN ──────────── */}
      <section className="relative isolate flex flex-col items-center gap-6 py-12">
        {/* Overlay sutil para contraste */}
        <div className="absolute inset-0 -z-10" />

        <Image src="/ronnie.png" width={325} height={647} alt="Ronnie Coleman" />

        <h2
          className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}
        >
          “Cada gramo cuenta. Cada esfuerzo importa”
        </h2>
        <Divider />
      </section>

      {/* ───────────── TESTIMONIOS ───────────── */}
      <section className="py-12 flex flex-col items-center gap-8">
        <div className="w-full max-w-md">
          <CarouselTestimonials testimonials={testimonials} />
        </div>
        <Divider />
      </section>

      {/* ───────────── EQUIPO ───────────── */}
      <Team />

      {/* ───────────── CTA CATÁLOGO ───────────── */}
      <section className="flex flex-col items-center gap-6">
        <h2
          className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}
        >
          Accede a nuestro catálogo
        </h2>

        <Button
          onClick={catalogHandle}
          className="bg-[#A40606] hover:bg-[#A40606]/80 w-80 h-12 rounded-3xl flex items-center justify-center gap-4 cursor-pointer"
        >
          <Image
            src="/shopping-bag.png"
            width={28}
            height={28}
            alt="Shopping bag"
          />
          <span
            className={`${roboto.className} text-white font-semibold text-lg`}
          >
            Consulta nuestro catálogo
          </span>
        </Button>
      </section>
    </main>
  );
}