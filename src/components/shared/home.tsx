"use client";
import Image from "next/image";
import { koulen, montserrat, roboto } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import GalleryCarousel from "@/components/shared/galleryCarousel";
import { useRouter } from "next/navigation";
import Divider from "@/components/shared/divider";
import Destacados from "./featured";
import FadeInOnView from "@/components/shared/FadeInOnView";
import { useProductStore } from "@/lib/productsStore";
import { useEffect, useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const router = useRouter();
  const url = "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/";

  const testimonials = [
    { src: `${url}testimonio1.jpeg`, alt: "test1" },
    { src: `${url}testimonio2.jpeg`, alt: "test2" },
    { src: `${url}testimonio3.jpeg`, alt: "test3" },
    { src: `${url}testimonio4.jpeg`, alt: "test4" },
    { src: `${url}testimonio5.jpeg`, alt: "test5" },
    { src: `${url}testimonio6.jpeg`, alt: "test6" },
  ];

  const fetchProducts = useProductStore(s => s.fetchProducts);
  const products = useProductStore(s => s.products);

  const combos = useMemo(() => {
    if (!products) return [];
    return products
      .filter(p => p.category?.toLowerCase() === "combo")
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
      );
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const catalogHandle = () => router.push("/catalogo");

  return (
    <>
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
              </div>
            </div>
          </section>
        </FadeInOnView>

        {/* ───────────── DESTACADOS ───────────── */}
        <FadeInOnView delay={0.4} className="flex flex-col justify-center items-center">
          <Destacados />
          <Divider />
        </FadeInOnView>

        {/* ─────────── PROMOCIONES ─────────── */}
        {combos.length > 0 && (
          <FadeInOnView delay={0.25} className="flex flex-col items-center w-full px-4">
            <section className="w-full max-w-6xl px-6 py-12 rounded-3xl shadow-lg">
              <h2 className={`${montserrat.className} text-4xl font-extrabold text-center text-white mb-12`}>
                🔥 Promociones Activas 🔥
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {combos.map(combo => (
                    <CarouselItem
                      key={combo.id}
                      className="flex justify-center mx-auto basis-full md:basis-1/2 lg:basis-1/3 px-4"
                    >
                      <Card
                        onClick={() => router.push(`catalogo/${combo.id}`)}
                        role="button"
                        className="group relative w-full h-[360px] m-4 cursor-pointer rounded-2xl
                  bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)]
                  drop-shadow-[0_0_15px_rgba(255,0,0,0.6)]
                  hover:scale-105 transition-transform duration-300
                  perspective-[1000px]"
                      >
                        <CardContent className="absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 [backface-visibility:hidden]">
                            <Image
                              src={combo.image || "/placeholder.svg"}
                              alt={combo.name}
                              width={200}
                              height={200}
                              className="object-contain w-full h-[80%]"
                            />
                            <CardFooter className="mt-2 flex flex-col items-center text-center">
                              <h3 className={`${montserrat.className} font-semibold text-base text-white`}>
                                {combo.name}
                              </h3>
                              <div className="mt-1 text-sm">
                                <span className="line-through text-gray-300 mr-2">
                                  $
                                  {(
                                    combo.variants[0].price +
                                    combo.variants[0].price * 0.2
                                  ).toLocaleString("es-CO")}
                                </span>
                                <span className="text-green-400 font-bold">
                                  ${combo.variants[0].price.toLocaleString("es-CO")}
                                </span>
                              </div>
                            </CardFooter>
                          </div>
                          {/* Back */}
                          <div
                            className="absolute inset-0 flex flex-col p-4 bg-[linear-gradient(180deg,#a40606_60%,#1a1a1a)] rounded-xl
                     [backface-visibility:hidden] [transform:rotateY(180deg)] text-center"
                          >
                            <p className="text-sm mb-3 line-clamp-4 text-white">
                              {combo.description}
                            </p>
                            <Image
                              src={combo.image || "/placeholder.svg"}
                              alt={combo.name}
                              width={100}
                              height={60}
                              className="object-contain self-center mt-2 w-full h-[60%]"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </section>
            <Divider />
          </FadeInOnView>
        )}

        {/* ───────────── TESTIMONIOS ───────────── */}
        <FadeInOnView delay={0.3}>
          <section className="py-12 flex flex-col items-center gap-8">
            <div className="w-full max-w-md">
              <GalleryCarousel images={testimonials} autoplayMs={2000} />
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
    </>
  );
}