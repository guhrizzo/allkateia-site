import type { Metadata } from "next";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource-variable/manrope";
import Image from "next/image";
import { preloaderScript } from "./preloader";
import "./globals.css";

const title = "Allkateia | Proteção veicular e benefícios";
const description = "Conheça a proteção veicular associativa da Allkateia, consulte os benefícios e peça sua cotação pelo WhatsApp.";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(vercelHost ? "https://" + vercelHost : "https://www.allkateia.com.br"),
  openGraph: { title, description, locale: "pt_BR", type: "website", siteName: "Allkateia", images: ["/road.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: preloaderScript }} /></head>
      <body>
        <div className="preloader" aria-hidden="true">
          <div className="preloader-emblem">
            <span className="preloader-orbit"></span>
            <span className="preloader-orbit-inner"></span>
            <Image src="/logo-blue.png" alt="" width={222} height={117} loading="eager" />
          </div>
          <div className="preloader-route"><span className="preloader-progress"></span></div>
        </div>
        {children}
      </body>
    </html>
  );
}