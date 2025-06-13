import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Hypertrophic",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="fixed inset-0 -z-10 bg-[url('/fondo.png')] bg-cover bg-center">
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 min-h-0 text-white overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
