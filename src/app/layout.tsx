import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Ornaments from "@/components/Ornaments";
import Sfx from "@/components/Sfx";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const bodyFont = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RISANGALIH | PRESS START",
  description:
    "A personal profile powered by Next.js — reborn as an 8-bit arcade game. Press start to explore quests, skills and projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning on <html>: the pre-paint theme script below sets
  // data-theme before React hydrates, so attribute diffing on this element
  // must be skipped (standard next-themes pattern).
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Apply the saved (or system) theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pixel-theme");if(t!=="day"&&t!=="night"){t=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)?"night":"day";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","day");}})();`,
          }}
        />
        <Sfx />
        <div className="scanlines" aria-hidden />
        <Ornaments />
        <Header />
        {children}
        {/* Floating contact button */}
        <a
          href="#contact"
          aria-label="Go to Contact"
          className="btn btn-red btn-fab fixed bottom-6 right-6 z-50"
        >
          ▶
        </a>
      </body>
    </html>
  );
}
