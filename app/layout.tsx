import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { getPersonal } from "@/lib/data";
import { ReducedMotionGate } from "@/components/motion";
import "./globals.css";

const personal = getPersonal();

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal"],
  variable: "--font-fraunces",
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

const shortName = "Kishen";

export const metadata: Metadata = {
  title: {
    default: shortName,
    template: `%s · ${shortName}`,
  },
  description: personal.tagline,
  openGraph: {
    title: shortName,
    description: personal.tagline,
    type: "website",
    siteName: shortName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: shortName,
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
        className={`${fraunces.variable} ${satoshi.variable} ${jetbrainsMono.variable} bg-bg text-ink font-body antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg focus:text-ink focus:px-3 focus:py-2 focus:border focus:border-line"
        >
          Skip to content
        </a>
        <ReducedMotionGate>{children}</ReducedMotionGate>
      </body>
    </html>
  );
}
