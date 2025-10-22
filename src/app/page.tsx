import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Narrative focus: highlight portfolio first */}
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
