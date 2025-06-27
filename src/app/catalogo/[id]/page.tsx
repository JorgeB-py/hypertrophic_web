import ProductDetail from "@/components/shared/productoDetail";
import StructuredData from "@/components/shared/struturedData";
import { getProduct } from "@/services/firebase.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product?.name
      ? `${product.name} | Suplementos Originales en Hypertrophic`
      : "Producto no encontrado",
    description: `Compra ${product?.name ?? "Producto"} original. Suplementos importados con envío rápido. Aumenta tu rendimiento con Hypertrophic.`,
    openGraph: {
      title: product?.name,
      description: `Compra ${product?.name ?? "Producto"} original. Suplementos importados con envío rápido. Aumenta tu rendimiento con Hypertrophic.`,
      url: `https://hypertrophic.com.co/catalogo/${id}`,
      images: [
        {
          url: product?.image ?? "https://hypertrophic.com.co/logo.jpg",
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product?.name} | Suplementos Originales en Hypertrophic`,
      description: `Compra ${product?.name ?? "Producto"} original. Suplementos importados con envío rápido. Aumenta tu rendimiento con Hypertrophic.`,
      images: [product?.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
      <StructuredData product={{ ...product, id: id }} />
      <ProductDetail product={{ ...product, id: id }} />
    </>
  );
}