"use client"
import Image from "next/image";
import { Menu, X } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 text-white">
      <Image src={'/imagen_h_blanca.png'} alt={"logo"} width={70} height={70} />

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
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Nosotros
              </a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Catálogo
              </a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">
                Contáctanos
              </a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <nav className="hidden lg:flex lg:justify-end lg:space-x-6">
        <a className="p-4 hover:text-gray-400" href="#">Nosotros</a>
        <a className="p-4 hover:text-gray-400" href="#">Catálogo</a>
        <a className="p-4 hover:text-gray-400" href="#">Contáctanos</a>
      </nav>
    </header>
  );
}
