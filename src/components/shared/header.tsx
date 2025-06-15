"use client"
import Image from "next/image";
import { Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { roboto } from "@/fonts/fonts";
import Link from "next/link";
import CartIcon from "./carticon";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 text-white">
        <Link href={"/"}>
            <Image src={'/imagen_h_blanca.png'} alt={"logo"} width={90} height={90} />
        </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="lg:hidden p-2">
          <Menu className="w-8 h-8" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="text-white rounded-md p-4 shadow-lg flex flex-col space-y-4 text-center bg-black"
            sideOffset={5}
          >
            <DropdownMenu.Item>
              <Link href="/nosotros" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Nosotros
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/catalogo" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Catálogo
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/destacados" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Destacados
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="https://wa.me/573132496945" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Contáctanos
              </a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <CartIcon></CartIcon>
            </DropdownMenu.Item>
            
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <nav className="hidden lg:flex lg:justify-end lg:space-x-6">
        <Link className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`} href="/nosotros">Nosotros</Link>
        <Link className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`} href="/catalogo">Catálogo</Link>
        <Link className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`} href="/destacados">Destacados</Link>
        <a className={`${roboto.className} p-4 hover:text-gray-400 text-2xl`} href="https://wa.me/573132496945">Contáctanos</a>
        <CartIcon></CartIcon>
      </nav>
    </header>
  );
}
