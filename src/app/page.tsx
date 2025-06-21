"use client";

import Image from "next/image";
import { koulen, montserrat, roboto } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import CarouselTestimonials, { Testimonials } from "@/components/shared/testimonials";
import { useRouter } from "next/navigation";
import Divider from "@/components/shared/divider";
import Destacados from "../components/shared/featured";
import FadeInOnView from "@/components/shared/FadeInOnView";
import { useProductStore } from "@/lib/productsStore";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const testimonials: Testimonials[] = [
    { image: "testimonio1.jpeg" },
    { image: "testimonio2.jpeg" },
    { image: "testimonio3.jpeg" },
  ];

  const fetchProducts = useProductStore(s => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const whatsappAPI = () => window.open("https://wa.me/573132496945");
  const catalogHandle = () => router.push("/catalogo");

  return (
    <section className="pt-8 pb-12 space-y-24">
      {/* ───────────── HERO ───────────── */}
      <FadeInOnView delay={0.1}>
        <section className="flex flex-col items-center gap-8">
          <h1
            className={`${koulen.className} logo-loop text-center leading-none
              text-[clamp(4.2rem,9vw,7rem)] 
              sm:text-[clamp(5rem,12vw,10rem)]
              md:text-[clamp(6rem,14vw,14rem)]
              max-w-full`}
          >
            HYPERTROPHIC
          </h1>

          <div className="flex flex-col md:flex-row items-center md:justify-center gap-16 w-full">
            {/* Botella flotante */}
            <div className="animate-[float_3s_ease-in-out_infinite] w-[160px] sm:w-[220px] md:w-[270px] lg:w-[320px]">
              <Image
                src="/wheygold.png"
                width={353}
                height={353}
                alt="NitroTech"
                className="w-full h-auto max-w-full"
              />
            </div>

            {/* Lema + botón */}
            <div className="flex flex-col items-center gap-6">
              <h2
                className={`${montserrat.className} text-center text-[clamp(1.1rem,4vw,2.5rem)]
                  sm:text-[clamp(1.4rem,5vw,2.7rem)] md:text-[clamp(1.5rem,4vw,3rem)]
                  max-w-[90vw] md:max-w-md`}
              >
                MÁS ALLÁ DE LOS SUPLEMENTOS. MÁS ALLÁ DE LOS LÍMITES.
              </h2>

              <Button
                onClick={whatsappAPI}
                className="bg-[#A40606] hover:bg-[#A40606]/80 w-60 h-12 rounded-3xl flex items-center cursor-pointer justify-center gap-3"
              >
                <Image src="/wpp.png" width={37} height={37} alt="WhatsApp" />
                <span className={`${roboto.className} font-semibold text-white text-lg`}>
                  Envíanos un mensaje
                </span>
              </Button>
            </div>
          </div>
        </section>
      </FadeInOnView>

      {/* ───────────── DESTACADOS ───────────── */}
      <FadeInOnView delay={0.4}>
        <Destacados />
      </FadeInOnView>

      {/* ──────────── FRASE + IMAGEN ──────────── */}
      <FadeInOnView delay={0.2}>
        <section className="relative isolate flex flex-col items-center gap-6 py-12">
          <div className="absolute inset-0 -z-10" />
          <Image src="/ronnie.png" width={325} height={647} alt="Ronnie Coleman" />
          <h2 className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}>
            “Cada gramo cuenta. Cada esfuerzo importa”
          </h2>
          <Divider />
        </section>
      </FadeInOnView>

      {/* ───────────── TESTIMONIOS ───────────── */}
      <FadeInOnView delay={0.3}>
        <section className="py-12 flex flex-col items-center gap-8">
          <div className="w-full max-w-md">
            <CarouselTestimonials testimonials={testimonials} />
          </div>
          <Divider />
        </section>
      </FadeInOnView>

      {/* ───────────── CTA CATÁLOGO ───────────── */}
      <FadeInOnView delay={0.5}>
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
            <Image src="/shopping-bag.png" width={28} height={28} alt="Shopping bag" />
            <span className={`${roboto.className} text-white font-semibold text-lg`}>
              Consulta nuestro catálogo
            </span>
          </Button>
        </section>
      </FadeInOnView>
    </section>
  );
}
