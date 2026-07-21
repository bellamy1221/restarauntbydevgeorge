import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyReserve } from "@/components/layout/StickyReserve";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { restaurant } from "@/content/restaurant";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.site.url),
  title: {
    default: `${restaurant.name} — современная итальянская кухня`,
    template: `%s · ${restaurant.name}`,
  },
  description: restaurant.shortDescription,
  applicationName: restaurant.name,
  keywords: [
    "VINCENZO",
    "итальянский ресторан",
    "Москва",
    "бронирование стола",
    "pasta",
    "современная итальянская кухня",
  ],
  authors: [{ name: restaurant.name }],
  openGraph: {
    type: "website",
    locale: restaurant.site.locale,
    url: restaurant.site.url,
    siteName: restaurant.name,
    title: `${restaurant.name} — современная итальянская кухня`,
    description: restaurant.shortDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: restaurant.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: restaurant.name,
    description: restaurant.shortDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1612",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sourceSans.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <JsonLd />
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2"
          >
            Перейти к содержимому
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyReserve />
        </SmoothScroll>
      </body>
    </html>
  );
}
