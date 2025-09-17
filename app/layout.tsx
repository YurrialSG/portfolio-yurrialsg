import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Navigation } from "./components/navigation";

export const metadata: Metadata = {
  title: "Yuri Silveira - Engenheiro de Software",
  description:
    "Portfólio de Yuri Silveira, Engenheiro de Software especializado em React, Next.js, Node.js e Tailwind CSS",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <Navigation />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
