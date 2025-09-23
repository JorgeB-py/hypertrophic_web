import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Script from "next/script";
import PixelTracker from "@/components/shared/PixelTracker";
import { Analytics } from "@vercel/analytics/next"
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hypertrophic – Suplementos Originales en Colombia",
  description:
    "Hypertrophic es tu tienda online de suplementos originales en Colombia. Proteínas, creatinas, pre-workouts y combos exclusivos con envío gratis. ¡Supera tus límites!",
  keywords: [
    "suplementos en Colombia",
    "proteínas originales",
    "creatina",
    "pre-workout",
    "gainer",
    "suplementos Bogotá",
    "comprar suplementos",
  ],
  authors: [{ name: "Hypertrophic" }],
  creator: "Hypertrophic",
  publisher: "Hypertrophic",
  metadataBase: new URL("https://hypertrophic.com.co"),
  openGraph: {
    title: "Hypertrophic – Suplementos Originales en Colombia",
    description:
      "Compra suplementos 100% originales en Colombia. Proteínas, creatinas, pre-workouts y combos con envío gratis.",
    url: "https://hypertrophic.com.co",
    siteName: "Hypertrophic",
    images: [
      {
        url: "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
        width: 1200,
        height: 630,
        alt: "Hypertrophic – Suplementos Colombia",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HypertrophicCo",
    title: "Hypertrophic – Suplementos Originales en Colombia",
    description:
      "Proteínas, creatinas y pre-workouts originales en Colombia. Envíos gratis y combos especiales.",
    images: [
      "https://raw.githubusercontent.com/JorgeB-py/assets-hypertrophic/main/combo2.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hypertrophic.com.co",
  },
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: 'black'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://checkout.wompi.co/widget.js"
          type="text/javascript"
          strategy="afterInteractive"
          id="wompi-widget-script"
        />

        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq) return;
                n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
                if(!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t=b.createElement(e); t.async = !0;
                t.src = v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '716084394676003');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=716084394676003&ev=PageView&noscript=1" />`,
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen bg-[url('/fondo.webp')] bg-cover bg-center bg-fixed">
        <Analytics />
        <Header />
        <PixelTracker />
        <div className="h-[100px]" />
        <main className="flex-grow w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 text-white overflow-x-hidden">
          {children}
        </main>
        <Link
          href="https://wa.me/573132496945"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50"
        >
          <Image
            src="/wpp.webp"
            alt="WhatsApp"
            className=" drop-shadow-lg hover:scale-110 transition-transform"
            width={50}
            height={20}
          />
        </Link>
        <Footer />
      </body>
    </html>
  );
}
