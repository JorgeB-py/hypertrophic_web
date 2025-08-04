import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center">
      <Image
        src="/imagen_h_blanca.png"
        alt="Cargando"
        width={100}
        height={100}
        className="animate-spin-slow"
      />
      <span className="mt-4 text-white text-lg font-semibold">Cargando...</span>
    </div>
  );
}
