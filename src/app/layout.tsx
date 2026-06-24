import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTG Interaction Prototype",
  description: "Internal interaction prototype for GTG Solutions & Consult.",
  icons: {
    icon: "/brand/gtg-logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
