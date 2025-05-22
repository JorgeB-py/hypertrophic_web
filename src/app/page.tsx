"use client"
import Image from "next/image";
import { koulen, montserrat, roboto } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";
import CarouselTestimonials from "@/components/shared/testimonials";
import { Testimonials } from "@/components/shared/testimonials";

export default function Home() {
  const testimonials: Testimonials[] = [
    { name: "Federico Reyes", description: "Gracias a Hypertrophic tengo esta estética" },
    { name: "Joseph Pulido", description: "Los productos de Hypertrophic mejoraron mi recuperación y energía. Excelente calidad y atención." },
    { name: "Rosario Pino", description: "Son productos de excelente calidad!" }
  ];

  const whatsappAPI = () => {
    window.open("https://wa.me/573132496945");
  };
  const catalogHandle = () => {
    window.open("https://drive.google.com/file/d/1GQ_7HqssFydWHnBEJFqOhCZdBZTdmjWq/view");
  };

  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen gap-16 justify-center">

      <section className="flex flex-col items-center text-white gap-8">
        <h1 className={`${koulen.className} text-center text-[clamp(12rem,8vw,14rem)] leading-none`}>
          HYPERTROPHIC
        </h1>
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-16 w-full">
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <Image
              src={"/nitrotech.png"}
              width={353}
              height={353}
              alt="Hypertrophic"
              className="max-w-full h-auto md:mr-12"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <h2 className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md`}>
              MÁS ALLÁ DE LOS SUPLEMENTOS. MÁS ALLÁ DE LOS LÍMITES.
            </h2>
            <Button
              onClick={whatsappAPI}
              className="bg-[#A40606] hover:bg-[#A40606]/80 w-[250px] h-[50px] rounded-3xl cursor-pointer flex items-center justify-center"
            >
              <Image src={'/wpp.png'} width={37} height={37} alt="whatsapp" />
              <p className={`${roboto.className} pl-4 text-white font-semibold`}>Envíanos un mensaje</p>
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center text-white gap-6">
        <Image src={'/jengy.png'} width={425} height={647} alt="Jengy" />
        <h2 className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}>
          “Cada gramo cuenta. Cada esfuerzo importa”
        </h2>
      </section>

      <section className="flex flex-col items-center text-white gap-8">
        <div className="w-full max-w-md">
          <CarouselTestimonials testimonials={testimonials} />
        </div>
      </section>

      <section className="flex flex-col items-center text-white gap-6 mb-10">
        <h2 className={`${montserrat.className} text-center text-[clamp(1.5rem,4vw,2.5rem)] max-w-md font-extrabold`}>
          Accede a nuestro catálogo
        </h2>
        <Button
          onClick={catalogHandle}
          className="bg-[#A40606] hover:bg-[#A40606]/80 w-80 h-12 rounded-3xl cursor-pointer flex items-center justify-center gap-4"
        >
          <Image src={'/shopping-bag.png'} width={28} height={28} alt="shopping" />
          <p className={`${roboto.className} text-white font-semibold text-lg`}>Consulta nuestro catálogo</p>
        </Button>
      </section>
    </main>
  );
}
