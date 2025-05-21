"use client"
import Image from "next/image";
import { koulen, montserrat } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen gap-8 justify-center">
      <section className="text-white flex flex-col items-center gap-8">
        <h1 className={`${koulen.className} text-center text-[clamp(12rem,8vw,14rem)] leading-none`}>
          HYPERTROPHIC
        </h1>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-16 w-full">
          <Image
            src={"/nitrotech.png"}
            width={353}
            height={353}
            alt="Hypertrophic"
            className="max-w-full h-auto md:mr-12"
          />
          <div className="flex flex-col items-center gap-6">
            <h2
              className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md`}
            >
              MÁS ALLÁ DE LOS SUPLEMENTOS. MÁS ALLÁ DE LOS LÍMITES.
            </h2>
            <Button className="bg-[#A40606] hover:bg-[#A40606]/80 w-[250px] h-[50px] rounded-3xl cursor-pointer">
              <Image src={'/wpp.png'} width={37} height={37} alt="whatsapp"></Image>
              <p className="pl-4">Envíanos un mensaje</p>
            </Button>
          </div>

        </div>
      </section>
      <section className="flex flex-col items-center text-white pt-16">
        <Image src={'/jengy.png'} width={425} height={647} alt="Jengy"></Image>
        <h2
          className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}
        >
          “Cada gramo cuenta. Cada esfuerzo importa”
        </h2>

      </section>
      <section className="flex flex-col items-center text-white pt-16">
        <CarouselDemo></CarouselDemo>
      </section>
      <section>{/* Otro contenido */}</section>
    </main>
  );
}

function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs" plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
