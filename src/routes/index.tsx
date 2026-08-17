import { createFileRoute } from "@tanstack/react-router";
import { NavBar } from "@/components/portfolio/NavBar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { BentoSection } from "@/components/portfolio/BentoSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { NowCreatingSection } from "@/components/portfolio/NowCreatingSection";
import { LabSection } from "@/components/portfolio/LabSection";

import { EducationSection } from "@/components/portfolio/EducationSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { SoundToggle } from "@/components/portfolio/SoundToggle";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ConstellationCursor } from "@/components/portfolio/ConstellationCursor";
import { SkillHighlightProvider } from "@/components/portfolio/SkillHighlight";

import ogImage from "@/assets/og-image.jpg";

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
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Christian Andre C. Reston — Software Developer" },
      {
        name: "twitter:description",
        content: "Pragmatic, performant web products built end-to-end.",
      },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Christian Andre C. Reston",
          jobTitle: "Software Developer",
          url: "/",
          sameAs: [],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SkillHighlightProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        <NavBar />
        <ScrollProgress />
        <CommandPalette />
        <main>
          <HeroSection />
          <BentoSection />
          <ProjectsSection />
          <NowCreatingSection />
          <LabSection />
          <EducationSection />
        </main>
        <FooterSection />
        <BackToTop />
        <SoundToggle />
      </div>
    </SkillHighlightProvider>
  );
}

