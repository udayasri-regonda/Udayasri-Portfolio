import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import CommandPalette from "@/components/CommandPalette";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import AnomalyLab from "@/components/AnomalyLab";
import TerminalSection from "@/components/TerminalSection";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[80] rounded-lg bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <AnomalyLab />
        <TerminalSection />
        <Education />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
