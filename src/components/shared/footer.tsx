import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center bg-black p-4 text-[#828281] text-sm">
            <Image
                src={'/imagen_h_blanca.png'}
                alt={"logo"}
                width={50}
                height={50}
                className="mb-4"
            />
            <p className="text-center mb-2">
                © 2025, Hypertrophic | Todos los derechos reservados
            </p>
            <nav className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center">
                <Link href="/nosotros" className="hover:underline">Nosotros</Link>
                <a className="hover:underline">Términos y condiciones</a>
                <a className="hover:underline">Política de privacidad</a>
            </nav>
        </footer>
    );
}
