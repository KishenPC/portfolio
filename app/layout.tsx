import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wireframe",
  description: "Layout wireframe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&f[]=satoshi@400,500,700&f[]=jetbrains-mono@400,500&display=swap"
        />
      </head>
      <body className="bg-bg text-ink font-body antialiased">
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
