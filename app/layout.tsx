import type { Metadata } from "next";
import localFont from "next/font/local";
import { getPersonal } from "@/lib/data";
import "./globals.css";

const personal = getPersonal();

const cabinetGrotesk = localFont({
  src: [
    {
      path: "./fonts/cabinet-grotesk-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/cabinet-grotesk-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/satoshi-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "./fonts/jetbrains-mono.woff2",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${personal.name} · ${personal.role}`,
    template: `%s · ${personal.name}`,
  },
  description: personal.tagline,
  openGraph: {
    title: `${personal.name} · ${personal.role}`,
    description: personal.tagline,
    type: "website",
    siteName: personal.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: personal.name,
    description: personal.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cabinetGrotesk.variable} ${satoshi.variable} ${jetbrainsMono.variable} bg-bg text-ink font-body antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg focus:text-ink focus:px-3 focus:py-2 focus:border focus:border-line"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
