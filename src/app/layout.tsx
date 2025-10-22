import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Ornaments from "@/components/Ornaments";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Risanggalih | Profile",
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
        {/* Floating Contact button */}
        <a
          href="#contact"
          aria-label="Go to Contact"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--primary)] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          C
        </a>
      </body>
    </html>
  );
}
