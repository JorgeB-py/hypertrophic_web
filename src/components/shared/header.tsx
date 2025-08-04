"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";
import CartIcon from "./carticon";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { roboto } from "@/fonts/fonts";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
   <>
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4",
        scrolled ? "bg-black/40 backdrop-blur shadow-lg" : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center py-4 max-w-7xl mx-auto text-white">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/imagen_h_blanca.png"
            alt="logo"
            width={90}
            height={90}
            priority
          />
        </Link>

        {/* Botón hamburguesa (solo en móviles) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden p-2 text-white"
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Navegación para escritorio */}
        <nav className="hidden lg:flex lg:justify-end lg:space-x-6">
          <Link
            className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`}
            href="/nosotros"
          >
            Nosotros
          </Link>
          <Link
            className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`}
            href="/catalogo"
          >
            Catálogo
          </Link>
          <a
            className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`}
            href="https://wa.me/573132496945"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contáctanos
          </a>
          {mounted && <CartIcon />}
        </nav>
      </div>

    </header>
          {/* Sidebar móvil */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden transition-transform duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menú lateral */}
        <div className="relative w-64 bg-black h-full p-6 flex flex-col space-y-6 text-white">
          <button
            className="text-white text-right self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          <Link
            href="/nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:text-gray-400"
          >
            Nosotros
          </Link>
          <Link
            href="/catalogo"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:text-gray-400"
          >
            Catálogo
          </Link>
          <a
            href="https://wa.me/573132496945"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contáctanos
          </a>
          {mounted && <CartIcon />}
        </div>
      </div>
    </> 
  );
}
