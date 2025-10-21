import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Narrative focus: highlight portfolio first */}
      <Projects />
      <Journey />
      <Skills />
      <Contact />
    </>
  );
}
