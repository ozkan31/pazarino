import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { getActiveTheme } from "@/lib/db";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pazarino Commerce",
  description: "Storefront and admin experience prototype",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = getActiveTheme();

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          ["--color-background" as string]: theme.tokens.background,
          ["--color-surface" as string]: theme.tokens.surface,
          ["--color-text" as string]: theme.tokens.text,
          ["--color-muted" as string]: theme.tokens.muted,
          ["--color-primary" as string]: theme.tokens.primary,
          ["--color-danger" as string]: theme.tokens.danger,
        }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
