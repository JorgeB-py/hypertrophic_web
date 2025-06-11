"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { montserrat } from "@/fonts/fonts";

const productos = [
  {
    name: "Platinum 100% Whey",
    image: "/platinum.png",
    market: "/muscletech.png",
    description:
      "25 g de aislado y concentrado de suero + 5.7 g de BCAA por scoop, enzimas digestivas añadidas y <2 g de grasa: ideal para recuperación y crecimiento rápido.",
    marketName: "Muscletech",
  },
  {
    name: "Bi-Pro Classic",
    image: "/bipro.png",
    market: "/nutramerican.png",
    description:
      "27 g de aislado de suero ultrapuro, <1 g de carbohidratos y grasa, sin lactosa: proteína limpia para fases de definición o intolerantes.",
    marketName: "Nutramerican",
  },
  {
    name: "Creastack",
    image: "/creastack.png",
    market: "/nutramerican.png",
    description:
      "3 g de creatina monohidrato + 1 g de HMB, ácido alfa-lipoico y sulfato de vanadio: combo que potencia fuerza, volumen y absorción.",
    marketName: "Nutramerican",
  },
  {
    name: "ISO100",
    image: "/iso100.png",
    market: "/dymatize.png",
    description:
      "25 g de suero hidrolizado, filtrado para eliminar lactosa, grasa y azúcar. Absorción ultrarrápida y 5.5 g de BCAA para máxima reparación muscular.",
    marketName: "Dymatize",
  },
  {
    name: "Gold Standard Whey",
    image: "/wheyON.png",
    market: "/on.png",
    description:
      "24 g de proteína (aislado, concentrado y péptidos), 5.5 g de BCAA, sin gluten y con mezcla instantánea: la fórmula más premiada del mercado.",
    marketName: "Optimum Nutrition",
  },
  {
    name: "Legacy Fresh ISO",
    image: "/legacy.png",
    market: "/proscience.png",
    description:
      "26 g de aislado de vacas grass-fed, rico en BCAA y electrolitos; libre de hormonas y GMO para un perfil aminoacídico premium.",
    marketName: "Proscience",
  },
];

export default function Productos() {
  return (
    <main className="max-w-7xl mx-auto p-6 min-h-screen text-white">
      <section className="flex flex-col items-center gap-8">
        <h2 className={`${montserrat.className} text-4xl font-extrabold text-center`}>
          Nuestros productos destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto, index) => (
            <Card
              key={producto.name}
              className={`m-5 group relative w-[200px] h-[280px] flex flex-col justify-between items-center bg-[#b30000] drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]`}
              style={{
                gridRowEnd: "span 2",
              }}
            >
              <div className="absolute inset-0 transition-transform duration-500 transform group-hover:rotate-y-180">
                <CardContent className="flex items-center justify-center pt-6 ">
                  <Image
                    src={producto.image}
                    alt={producto.name}
                    width={140}
                    height={140}
                    className="object-contain w-40 h-40"
                  />
                </CardContent>
                <CardFooter className="text-center pb-4">
                  <h3 className={`${montserrat.className} font-semibold text-base pt-6 text-white`}>
                    {producto.name}
                  </h3>
                </CardFooter>
              </div>
              {/* Back side (description & market logo) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#b30000] bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <p className="text-white text-center p-4">{producto.description}</p>
                <Image
                  src={producto.market}
                  alt={producto.marketName}
                  width={100}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
