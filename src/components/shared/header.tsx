"use client";
import Image from "next/image";
import { Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { roboto } from "@/fonts/fonts";
import Link from "next/link";
import CartIcon from "./carticon";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setMenuOpen(false); // Cierra el menú al hacer scroll
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4",
        scrolled ? "bg-black/40 backdrop-blur shadow-lg" : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center py-4 max-w-7xl mx-auto text-white">
        <Link href={"/"}>
          <Image
            src={"/imagen_h_blanca.png"}
            alt={"logo"}
            width={90}
            height={90}
          />
        </Link>

        {/* Menú hamburguesa (móvil) */}
        <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenu.Trigger className="lg:hidden p-2">
            <Menu className="w-8 h-8" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="text-white rounded-md p-4 shadow-lg flex flex-col space-y-4 text-center bg-black"
              sideOffset={5}
            >
              <DropdownMenu.Item onSelect={() => setMenuOpen(false)}>
                <Link
                  href="/nosotros"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Nosotros
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => setMenuOpen(false)}>
                <Link
                  href="/catalogo"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Catálogo
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => setMenuOpen(false)}>
                <a
                  href="https://wa.me/573132496945"
                  className="block px-4 py-2 hover:bg-gray-700 rounded"
                >
                  Contáctanos
                </a>
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => setMenuOpen(false)}>
                {mounted && <CartIcon />}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Menú de navegación (desktop) */}
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
          >
            Contáctanos
          </a>
          {mounted && <CartIcon />}
        </nav>
      </div>
    </header>
  );
}
