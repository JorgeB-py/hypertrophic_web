'use client';

interface StructuredDataProps {
  product: {
    id: string;
    name: string;
    image: string;
    description: string;
    variants: { price: number }[];
  };
}

export default function StructuredData({ product }: StructuredDataProps) {
  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Hypertrophic"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.variants?.[0]?.price ?? 0,
      availability: "https://schema.org/InStock",
      url: `https://hypertrophic.com.co/catalogo/${product.id}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
