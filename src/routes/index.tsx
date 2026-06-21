import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/portfolio/NavBar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { BentoSection } from "@/components/portfolio/BentoSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { FooterSection } from "@/components/portfolio/FooterSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Christian Andre C. Reston — Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Christian Andre C. Reston, a software developer building pragmatic, performant web products end-to-end.",
      },
      { property: "og:title", content: "Christian Andre C. Reston — Software Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Christian Andre C. Reston, a software developer building pragmatic, performant web products end-to-end.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <HeroSection />
        <BentoSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>
      <FooterSection />
    </div>
  );
}
