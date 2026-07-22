# Lume Labs — Project Status

**Consultancy**: Lume Labs (Amelia Santosh)
**Stack**: Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion
**Domain**: lumelabs.dev
**Last Updated**: July 2026

---

## Completed Phases

### Phase 1 — Project Setup ✅
- Scaffolded Next.js project with TypeScript, Tailwind CSS v4, and ESLint
- Installed Framer Motion
- Established folder structure: `components/ui`, `components/sections`, `components/layout`, `lib`
- Cleaned up boilerplate

### Phase 2 — Design System ✅
- Defined color tokens in `globals.css` using Tailwind v4 `@theme` block
- Color palette: near-black background (`#0a0a0a`), silver accent (`#c4c4c4`), muted greys
- Typography: Inter (primary) + JetBrains Mono (technical accents) via `next/font/google`
- Built reusable `Button` component with three variants: `primary`, `secondary`, `ghost`
- Updated metadata: title and description set to Lume Labs

### Phase 3 — Layout Shell ✅
- Built `Navbar`: sticky, blurred background, logo + nav links + CTA button
- Built `Footer`: copyright line + contact email
- Wired both into `layout.tsx` to wrap every page

### Phase 4 — Hero Section ✅
- Built `Hero` component with headline, subheadline, and CTA
- Messaging: outcome-oriented, client's original copy preserved
- Responsive font sizes across breakpoints

### Phase 5 — Services + Tech Stack ✅
- Built `Services` section: 4 outcome-oriented service cards in a 2-column grid
  - Custom Web Applications
  - Business Automation & Internal Tools
  - AI Solutions & Intelligent Automation
  - Scalable Backend & Cloud Infrastructure
- Built `TechStack` section: 10 brand-colored icons via `react-icons/si`
  - React, Next.js, TypeScript, Node.js, Django, PostgreSQL, MongoDB, Python, Docker, Git
  - Icons dim at rest, full color + label on hover

### Phase 6 — Proof of Work + CTA ✅
- Built `Proof` section (later removed from homepage — moved to `/work`)
- Built closing `CTA` section with second "Book a Consultation" conversion point

### Phase 7 — Animations (Framer Motion) ✅
- Hero: staggered `animate` on headline, subheadline, and CTA button (load-time animation)
- All below-fold sections: `whileInView` + `viewport={{ once: true }}` scroll reveals
- Service cards and TechStack icons: staggered via `index * delay` pattern
- Mobile hamburger menu: slide-in/out via `AnimatePresence`, toggle with `useState`
- Installed `lucide-react` for Menu/X icons

### Phase 8 — Additional Pages ✅
- `/about` — honest solo-consultancy narrative (Amelia Santosh, direct engagement, no hand-offs)
- `/services` — expanded 4-service layout with secondary tech mentioned in descriptions
- `/contact` — form UI (static shell, wired up in Phase 9)
- `/work` — compact project cards grid, structured as `PROJECTS` array for easy future additions
  - One anonymized case study: "BOM Costing & Production Management System" for a furniture manufacturer
- Removed `Proof` section from homepage; `/work` replaces it

### Phase 9 — Functional Contact Form ✅
- Installed Resend SDK
- Created `src/lib/actions.ts` as a Next.js Server Action (`"use server"`)
- Form sends to `hello@lumelabs.dev`, `replyTo` set to the client's email
- Form UI: pending/success/error states with inline feedback
- Email forwarding configured via Porkbun: `hello@lumelabs.dev` → personal inbox
- Verified end-to-end: Resend confirms sent, email arrives in inbox

### Phase 10 — SEO, Metadata & OG Image ✅
- Added `metadataBase`, `title.template`, `description`, `openGraph`, and `twitter` to root `layout.tsx`
- Per-page metadata added via route `layout.tsx` files (needed because `page.tsx` files use `"use client"`)
  - `/about/layout.tsx`, `/services/layout.tsx`, `/work/layout.tsx`, `/contact/layout.tsx`
- Homepage metadata exported directly from `src/app/page.tsx`
- `alternates.canonical` set on every page
- Created `src/app/opengraph-image.tsx` — branded OG image (1200×630) using `next/og` ImageResponse
  - Near-black background, silver logo mark, "Custom Software, Built to Last." headline, lumelabs.dev URL
  - Served automatically by Next.js; linked in `<head>` on every page
- Cleaned up `globals.css` — removed conflicting boilerplate `@theme inline` block and duplicate `body` rules
- Fixed missing `<h1>` heading on `/work` page

### Phase 11 — Accessibility Audit + Responsive QA ✅
- Keyboard navigation verified: all nav links, buttons, and form fields reachable via Tab
- Lighthouse Accessibility score: **100/100**
- Fixed SVG accessibility: added `aria-hidden="true"` to all 10 `react-icons` SVGs in `TechStack.tsx`
  - Icons have visible text labels on hover; hiding SVGs from screen readers prevents double-announcement
- Responsive QA passed at 375px, 768px, and 1280px across all pages
- Mobile hamburger menu opens and closes correctly

---

## Remaining Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 12 | Deployment to Vercel | ⏳ Pending |
| — | `/work/[slug]` individual case study pages | 🔜 Future |
| — | Physics-based falling icons for TechStack (Matter.js) | 🔜 Future |
| — | `loading.tsx` and `error.tsx` pages | 🔜 Future |

---

## File Structure

```
src/
  app/
    about/
      layout.tsx        ← metadata (Server Component wrapper)
      page.tsx
    contact/
      layout.tsx        ← metadata (Server Component wrapper)
      page.tsx
    services/
      layout.tsx        ← metadata (Server Component wrapper)
      page.tsx
    work/
      layout.tsx        ← metadata (Server Component wrapper)
      page.tsx
    layout.tsx          ← root metadata + font + Navbar/Footer
    page.tsx            ← homepage metadata + page
    globals.css         ← Tailwind v4 @theme tokens (cleaned up)
    opengraph-image.tsx ← branded OG image via next/og
    favicon.ico
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    sections/
      Hero.tsx
      Services.tsx
      TechStack.tsx     ← aria-hidden="true" on all SVG icons
      CTA.tsx
      Proof.tsx         ← unused, kept for reference
    ui/
      Button.tsx
  lib/
    actions.ts          ← Server Action (Resend email)
```

---

## Key Design Decisions

| Decision | Reasoning |
|----------|-----------|
| Tailwind v4 with `@theme` | No config file needed; tokens auto-generate utility classes |
| Inter + JetBrains Mono | De facto engineering-focused aesthetic (Vercel/Linear-inspired) |
| Silver accent, not purple/blue | Differentiates from typical AI/SaaS dark sites |
| Outcome-oriented service names | Clients buy results, not technologies |
| Anonymized case study | No client sign-off yet for public attribution |
| Server Action for contact form | No separate API route needed; API key stays server-side |
| Porkbun email forwarding | Free, zero-maintenance receiving inbox at `hello@lumelabs.dev` |
| `whileInView` not `animate` for below-fold | Prevents re-triggering on scroll; `once: true` keeps it clean |
| Route `layout.tsx` for metadata | `page.tsx` files use `"use client"` so metadata must live in a Server Component wrapper |
| `aria-hidden` on TechStack SVGs | Visible hover labels already convey meaning; hiding SVG prevents screen reader duplication |
| OG image via `next/og` ImageResponse | Edge-rendered, no external service, auto-linked by Next.js |

---

## Known Issues / Deferred Items

- `<Button><Link>` nesting (button wrapping anchor) — invalid HTML, deferred fix to post-launch
- `/work/[slug]` individual project pages not yet built
- No `loading.tsx` or `error.tsx` pages yet
- Physics-based TechStack animation (Matter.js) deferred to post-launch polish phase