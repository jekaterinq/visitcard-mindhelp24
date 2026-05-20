import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindHelp24 — Онлайн-консультации психолога",
  description:
    "Онлайн-консультации психолога. Помогу справиться с жизненными трудностями, обрести внутреннюю гармонию и улучшить качество жизни. Клиенты из любой точки мира.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">
        {children}
      </body>
    </html>
  );
}
