import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SEPTIAN DWI RISANGGALIH // Senior Frontend & Fullstack Architect",
  description:
    "Interactive 3D Portfolio of Septian Dwi Risanggalih. Senior Frontend & Fullstack Developer specializing in React, Next.js, Three.js, React Native, and Golang.",
  keywords: [
    "Septian Dwi Risanggalih",
    "Senior Frontend Developer",
    "Fullstack Developer",
    "React",
    "Next.js",
    "Three.js",
    "GSAP",
    "React Native",
    "Golang",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${serifFont.variable} ${monoFont.variable} dark`}
    >
      <body className="bg-[#070811] text-zinc-100 antialiased selection:bg-amber-400/20 selection:text-amber-200">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
