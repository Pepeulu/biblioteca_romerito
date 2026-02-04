import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import HeaderComponent from "../components/HeaderComponent";

export default function RootLayout({
  children,
}: Readonly<{
children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-black min-h-screen w-full overflow-x-hidden scroll-smooth">
        <HeaderComponent titulo="Biblioteca" logoUrl="/logo.png"></HeaderComponent>
        {children}
      </body>
    </html>
  );
}
