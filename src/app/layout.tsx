import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Hypertrophic"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor:'black'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-[url('/fondo.png')] bg-cover bg-center">
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <div className="h-[90px]" />
          <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 min-h-0 text-white overflow-x-hidden">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
