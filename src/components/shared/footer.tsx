import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center bg-black p-4 text-[#828281]">
            <Image
                src={'/imagen_h_blanca.png'}
                alt={"logo"}
                width={50}
                height={50}
                className="mb-4"
            />
            <p>© 2025, Hypertrofic | Todos los derechos reservados</p>
            <nav className="flex justify-center">
                <Link href="/nosotros" className="pr-2">Nosotros |</Link>
                <a className="pr-2">Términos y condiciones |</a>
                <a className="pr-2">Política de privacidad</a>
            </nav>
        </footer>
    );
}
