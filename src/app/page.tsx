import Image from "next/image";
import { koulen, montserrat } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen gap-8">
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
      <section>{/* Otro contenido */}</section>
      <section>{/* Otro contenido */}</section>
      <section>{/* Otro contenido */}</section>
    </main>
  );
}
