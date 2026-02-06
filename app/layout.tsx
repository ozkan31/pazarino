import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pazarino Operations Console",
  description: "Operational controls, consent, observability and backup tooling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
