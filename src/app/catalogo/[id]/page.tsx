import ProductDetail from "@/components/shared/productoDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetail id={id} />;
}
