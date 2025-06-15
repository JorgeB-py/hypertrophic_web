import ProductDetail from "@/components/shared/productoDetail";

export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProductDetail id={id} />;
}
