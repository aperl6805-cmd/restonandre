# Portfolio Improvement Plan

Four focused upgrades, all frontend/presentation only.

## 1. Visual polish & motion
- Add `framer-motion` and wire scroll-reveal fade/slide on each section (Hero, Bento, Projects, Experience, Education, Footer).
- Hero: typing/word-rotate effect on the role line ("Software Developer" → "Frontend Engineer" → "UI Engineer"), animated gradient mesh + subtle grid pattern background, soft glow behind the avatar rings.
- Projects: spotlight/magic-card hover (mouse-tracked radial gradient) + border-beam on the featured Dreflow card.
- Smooth section dividers and a thin scroll-progress bar pinned under the nav.

## 2. New Education section
Inserted between Experience and Footer. Single-column timeline matching the Experience style:
- Degree, school, dates, location
- Bullet list for coursework / honors / activities
- Optional GPA badge
- Nav gets a new "Education" link

I will ask for the actual education details before building (school name, degree, dates, highlights).

## 3. Interactivity
- Command palette (⌘K / Ctrl+K) using shadcn `Command` dialog: quick-jump to each section, copy email, open Dreflow, toggle theme.
- Contact form in the footer (name / email / message) with client-side validation and a toast on submit. Wires to `mailto:` for now; can later be upgraded to a real handler if Cloud is enabled.
- Back-to-top floating button that appears after scrolling past the hero.

## 4. SEO & sharing
- Replace generic root `head()` with portfolio-specific title + description: "Christian Andre C. Reston — Software Developer".
- Add `og:title`, `og:description`, `og:type: profile`, `twitter:card: summary_large_image`, canonical, theme-color.
- JSON-LD `Person` schema (name, jobTitle, url, sameAs links to GitHub/LinkedIn, alumniOf once education is provided).
- Generate a 1200×630 OG image (dark slate + neon green, name + title) via imagegen and wire it as `og:image` / `twitter:image`.
- Add `public/robots.txt` (allow all) and a `/sitemap.xml` server route.
- Ensure a single `<h1>` (hero) and semantic landmarks throughout.

## Technical notes
- New deps: `framer-motion` only. Command palette uses existing shadcn `command`.
- New files: `src/components/portfolio/EducationSection.tsx`, `src/components/portfolio/CommandPalette.tsx`, `src/components/portfolio/ScrollProgress.tsx`, `src/components/portfolio/BackToTop.tsx`, `src/routes/sitemap[.]xml.ts`, `public/robots.txt`, `src/assets/og-image.jpg`.
- Edited files: `NavBar.tsx` (Education link + ⌘K hint), `HeroSection.tsx` (motion + word rotate + background), `ProjectsSection.tsx` (magic-card hover, border-beam), `FooterSection.tsx` (contact form, social links), `routes/__root.tsx` (SEO meta + JSON-LD + OG image), `routes/index.tsx` (mount Education, CommandPalette, ScrollProgress, BackToTop).
- No business logic / no backend changes.

## Open question
Education details — what should I put in the new section? (school, degree, graduation date, key coursework or honors)
