import type { Metadata } from "next";
import "@/styles/globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

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
    <html lang="en">
      <body className="bg-[#faf9f6] text-zinc-950 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
