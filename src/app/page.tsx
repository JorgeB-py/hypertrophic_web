// app/page.tsx
import Home from "@/components/shared/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hypertrophic – Suplementos Originales en Colombia 🏋️‍♂️",
  description:
    "Compra suplementos 100% originales en Colombia. Proteínas, creatinas, pre-workouts y combos con envío gratis. Con Hypertrophic supera tus límites.",
  keywords: [
    "suplementos en Colombia",
    "proteínas originales",
    "creatina",
    "pre-entreno",
    "comprar suplementos Bogotá",
    "pre-workout",
    "ganadores de peso",
    "combos suplementos",
  ],
  metadataBase: new URL("https://hypertrophic.com.co"),
  openGraph: {
    title: "Hypertrophic – Suplementos Originales en Colombia",
    description:
      "Explora nuestra tienda online de suplementos originales. Proteínas, creatinas, pre-workouts y combos con envío gratis.",
    url: "https://hypertrophic.com.co",
    siteName: "Hypertrophic",
    images: [
      {
        url: "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
        width: 1200,
        height: 630,
        alt: "Hypertrophic – Catálogo de Suplementos",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HypertrophicCo",
    title: "Hypertrophic – Suplementos Originales en Colombia",
    description:
      "Proteínas, creatinas y pre-workouts originales en Colombia. Envío gratis y combos especiales.",
    images: [
      "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
    ],
  },
  alternates: {
    canonical: "https://hypertrophic.com.co",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <Home />;
}
