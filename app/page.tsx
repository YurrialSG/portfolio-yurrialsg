import { AboutSection } from "./components/about-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { Navigation } from "./components/navigation";
import { ProjectsSection } from "./components/projects-section";
import { TechSkillsSection } from "./components/tech-skills-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TechSkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
