import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Hypertrophic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[url('/fondo.png')] bg-cover bg-center">
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="min-h-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
