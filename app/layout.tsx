import { ReactNode } from "react";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";

export const metadata = {
  title: "Structured — Designer Portfolio",
  description:
    "Renaissance gallery on putty paper. A minimal, editorial portfolio celebrating intentional design.",
  openGraph: {
    title: "Structured — Designer Portfolio",
    description:
      "Renaissance gallery on putty paper. A minimal, editorial portfolio celebrating intentional design.",
    url: "https://structured.example.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-putty text-ink">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
