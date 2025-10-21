import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Ornaments from "@/components/Ornaments";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Developer Portfolio — GSAP Storytelling",
  description:
    "Portfolio with Next.js & GSAP: high performance, smooth animations, meaningful storytelling.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Ornaments />
        <Header />
        {children}
      </body>
    </html>
  );
}
