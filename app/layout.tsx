import { ReactNode } from "react";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";

export const metadata = {
  title: {
    default: "Kishen Pathiyan Cherumanal — Software Engineer",
    template: "%s — Structured",
  },
  description:
    "Renaissance gallery on putty paper. A minimal, editorial portfolio celebrating intentional design and full-stack development by Kishen Pathiyan Cherumanal.",
  openGraph: {
    title: "Kishen Pathiyan Cherumanal — Software Engineer",
    description:
      "Renaissance gallery on putty paper. A minimal, editorial portfolio celebrating intentional design and full-stack development.",
    url: "https://structured.example.com",
    siteName: "Structured",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishen Pathiyan Cherumanal — Software Engineer",
    description:
      "Renaissance gallery on putty paper. A minimal, editorial portfolio celebrating intentional design.",
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
