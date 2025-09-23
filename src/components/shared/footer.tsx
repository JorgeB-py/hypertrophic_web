import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-black px-6 py-10 text-[#a1a1a1] text-sm">
      {/* Logo */}
      <Image
        src="/imagen_h_blanca.png"
        alt="Hypertrophic logo"
        width={60}
        height={60}
        className="mb-4"
        priority
      />

      {/* Texto legal */}
      <p className="text-center mb-4 text-gray-400">
        © {new Date().getFullYear()}, <span className="text-white font-semibold">Hypertrophic</span> | Todos los derechos reservados
      </p>

      {/* Links legales */}
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
        <Link href="/terminos-y-condiciones" className="hover:text-red-500 transition-colors">
          Políticas y condiciones
        </Link>
        <Link href="/terminos-y-condiciones" className="hover:text-red-500 transition-colors">
          Política de privacidad
        </Link>
        <Link href="/terminos-y-condiciones" className="hover:text-red-500 transition-colors">
          Política de envíos
        </Link>
        <Link href="https://wa.me/573132496945" className="hover:text-red-500 transition-colors">
          Contáctanos
        </Link>
      </nav>

      {/* Métodos de pago */}
      <div className="flex flex-wrap justify-center items-center gap-4 opacity-80">
        <Image src="/visa.png" alt="Visa" width={50} height={30} />
        <Image src="/mastercard.png" alt="MasterCard" width={50} height={30} />
        <Image src="/amex.png" alt="American Express" width={50} height={30} />
        <Image src="/pse.png" alt="PSE" width={50} height={30} />
        <Image src="/nequi.png" alt="Nequi" width={60} height={40} />
        <Image src="/bancolombia.png" alt="Bancolombia" width={50} height={30} />
        <Image src="/wompi.png" alt="Wompi" width={60} height={30} />
      </div>

      {/* Frase de confianza */}
      <p className="text-xs text-gray-500 mt-6 text-center max-w-md">
        Compra 100% segura con métodos de pago confiables. Tus datos están protegidos con encriptación y pasarelas certificadas.
      </p>
    </footer>
  );
}
