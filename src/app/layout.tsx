import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Script from "next/script";
import PixelTracker from "@/components/shared/PixelTracker";

export const metadata: Metadata = {
  title: "Hypertrophic"
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
        {/* MercadoPago Script */}
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="afterInteractive"
        />

        {/* Meta Pixel */}
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

        {/* Structured Data - Organization */}
        <Script
          id="structured-org"
          strategy="afterInteractive"
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

        {/* Structured Data - WebSite */}
        <Script
          id="structured-web"
          strategy="afterInteractive"
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
        <Header />
        <PixelTracker />
        <div className="h-[100px]" />
        <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 text-white overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
