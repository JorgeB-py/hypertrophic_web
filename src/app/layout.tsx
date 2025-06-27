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
  themeColor: 'black'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* MercadoPago Script */}
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hypertrophic",
              url: "https://hypertrophic.com.co",
              logo: "https://hypertrophic.com.co/logo.jpg",
              sameAs: [
                "https://www.instagram.com/hypertrophic_supplements",
                "https://www.facebook.com/hypertrophic"
              ]
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Hypertrophic",
              url: "https://hypertrophic.com.co",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://hypertrophic.com.co/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>

      <body className="bg-[url('/fondo.png')] bg-cover bg-center">
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <div className="h-[100px]" />
          <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 min-h-0 text-white overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
