import Catalogo from '@/components/shared/catalog';

export default function CatalogoPage() {
  return(
    <Catalogo></Catalogo>
  );
}

export async function generateMetadata() {
  return {
    title: "Catálogo de Productos – Hypertrophic",
    description:
      "Explora nuestro catálogo de suplementos originales: proteínas, creatinas, pre-workouts y combos con envío gratis. ¡Supera tus límites con Hypertrophic!",
    openGraph: {
      title: "Catálogo de Productos – Hypertrophic",
      description:
        "Explora nuestro catálogo de suplementos originales: proteínas, creatinas, pre-workouts y combos con envío gratis.",
      url: "https://hypertrophic.com.co/catalogo",
      images: [
        {
          url: "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
          width: 1200,
          height: 630,
          alt: "Catálogo Hypertrophic",
        },
      ],
      siteName: "Hypertrophic",
      locale: "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@HypertrophicCo",
      title: "Catálogo de Productos – Hypertrophic",
      description:
        "Descubre nuestras proteínas, creatinas, pre-workouts y combos con envío gratis. ¡Encuentra tu aliado para entrenar duro!",
      images: [
        "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
      ],
    },
  };
}
