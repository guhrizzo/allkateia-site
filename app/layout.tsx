import type { Metadata } from "next";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource-variable/manrope";
import Image from "next/image";
import { preloaderScript } from "./preloader";
import "./globals.css";

const title = "Allkateia | Proteção veicular e benefícios";
const description = "Conheça a proteção veicular associativa da Allkateia, consulte os benefícios e peça sua cotação pelo WhatsApp.";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || "allkateia-site.vercel.app";
const siteUrl = new URL(`https://${productionHost}`);
const socialImage = {
  url: "/allkateia-social.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Allkateia. Proteção veicular, assistência e benefícios. Um SUV azul percorre uma estrada.",
};

export const metadata: Metadata = {
  title,
  description,
  metadataBase: siteUrl,
  openGraph: {
    url: siteUrl,
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "Allkateia",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
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
