# Christian's Digital Showcase

Developer Portfolio — Implementation Plan
Context
Build a complete, production-ready single-page developer portfolio for Christian Andre C. Reston, Software Developer. Dark mode by default with a light/dark toggle. Deep slate palette (#0f172a base) + neon green accent (#10b981). React + Tailwind + TypeScript on the existing Vite template.

Design Tokens (index.css + tailwind.config.ts)
Dark mode (default)
Token	Value
--background	222 47% 7% (deep slate #0f172a)
--foreground	210 40% 96%
--primary	160 84% 39% (neon #10b981)
--primary-glow	160 84% 55%
--surface	222 47% 11% (card bg)
--border	217 32% 17%
--muted	215 25% 27%
--muted-foreground	215 20% 65%
Light mode (toggled)
Token	Value
--background	0 0% 98%
--foreground	222 47% 10%
--surface	0 0% 100%
--border	220 13% 88%
Custom CSS utilities to add:

--gradient-hero: diagonal neon-to-transparent overlay
--gradient-card: abstract gradient for project placeholders
--shadow-glow: 0 0 30px hsl(var(--primary)/0.25)
--transition-smooth: all 0.3s cubic-bezier(0.4,0,0.2,1)
File Structure
New files (all under src/components/portfolio/)
File	Responsibility
NavBar.tsx	Sticky glassmorphism nav, dark/light toggle, smooth-scroll links
HeroSection.tsx	Two-column split: typography left, animated SVG right, scroll chevron
BentoSection.tsx	3-box bento grid (About, Tech Stack, Quick Stats)
ProjectsSection.tsx	2-column asymmetric grid, 3 project cards with gradient placeholders
ExperienceSection.tsx	Vertical timeline, sticky company/dates, scrolling achievements
FooterSection.tsx	Centered contact, copy-email button, social icon links
Modified files
File	Change
src/index.css	Replace tokens with dark/light palette + custom utilities
tailwind.config.ts	Extend with surface, primary-glow, shadow-glow tokens
src/pages/Index.tsx	Compose all portfolio sections, provide theme toggle state
Section Details
NavBar
position: sticky top-0 z-50 with backdrop-blur-md bg-background/70 (glassmorphism)
Logo: initials "CAR" in neon accent
Links: About · Skills · Projects · Experience · Contact (smooth-scroll)
Right side: Sun/Moon icon toggle (lucide-react) controlling dark class on <html>
HeroSection (<header>)
Left (60%): Name in text-5xl font-black, title in neon accent, 2-sentence hook bio, two CTA buttons (View Projects / Download CV)
Right (40%): Animated SVG — rotating/pulsing geometric rings using CSS keyframes
Bottom center: ChevronDown lucide icon with a bounce animation
BentoSection (<section id="about">)
Grid layout grid-cols-3 gap-4 (collapses to 1 col on mobile):

Box A (col-span-2): About Me bio text
Box B (col-span-1): Tech Stack — badge-style pills: JavaScript, TypeScript, React, Node.js, PostgreSQL, Tailwind CSS
Box C (col-span-1 or row below): Quick Stats cards — "3+ Yrs Experience", "14+ Projects Shipped", "5+ Happy Clients"
All boxes use bg-surface border border-border rounded-2xl p-6 shadow-glow hover:border-primary/50 transition

ProjectsSection (<section id="projects">)
grid-cols-2 gap-6 (1 col mobile). 3 cards:

DevTrack — React, Node.js, PostgreSQL — Project management dashboard
ShopWave — Next.js, Stripe, Tailwind — E-commerce storefront
ChatFlow — React, Socket.io, Express — Real-time chat application
Each card:

Top: abstract gradient placeholder (unique gradient per card via CSS vars)
Title + 3 tech <Badge> tags
2-sentence description
Two icon buttons: Github + ExternalLink (lucide-react)
ExperienceSection (<section id="experience">)
Two-column layout:

Left (sticky): Company name, date range, location badge
Right: Job title h3, 3 bullet achievements with neon dot markers
2 experience entries:

TechNova Solutions (2023–Present) — Senior Software Developer
DigitalCraft Agency (2021–2023) — Frontend Developer
FooterSection (<footer>)
Centered flex column:

"Get in Touch" heading
Email button with Copy icon — uses navigator.clipboard.writeText() + toast feedback
Social links row: Github, Linkedin, Twitter icon buttons (lucide-react)
Copyright line
Responsive Breakpoints
md: (768px): hero switches to two-column, bento grid activates
sm: (640px): single column fallback for all grids
Nav collapses to hamburger menu on mobile (Sheet from shadcn)
Verification
Preview renders full dark-mode portfolio with all 5 sections visible
Light/dark toggle switches palette correctly
Smooth-scroll nav links land on correct sections
Email copy button shows toast confirmation
All icons from lucide-react (no emoji)
No lint errors

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://restonandre.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee6fd945-0ab6-4a91-bb19-05ae3fc9dee0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
