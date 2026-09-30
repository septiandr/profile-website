import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import HUDHeader from "@/components/ui/HUDHeader";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} dark`}>
      <body className="bg-space-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        <SmoothScroll>
          <CustomCursor />
          <HUDHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
