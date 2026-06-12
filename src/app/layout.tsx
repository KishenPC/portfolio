import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers/theme-provider";
import { siteMetadata, siteViewport } from "@/lib/metadata/site-metadata";

import "./globals.css";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
