# NUREA Website - Project Context

**Last updated:** 2026-06-22
**Status:** In active development. Core structure and interaction system complete. Details still being refined.

---

## Project identity

- **Agency:** NUREA - "Merkevare og digital retning", Oslo, Norge
- **Tagline:** "Lettere å forstå. Lettere å velge."
- **Language:** Norwegian Bokmål only. Never Nynorsk.
- **Tone:** Calm, premium, confident. Not loud or salesy.
- **Positioning:** NUREA helps solid businesses become clearer, more credible, and easier to choose online. They are NOT a campaign agency - they build the foundation.

---

## Tech stack

- **Framework:** React 18 + TypeScript + Vite 5
- **Styling:** Tailwind CSS + shadcn/ui components + custom CSS in `src/index.css`
- **Animation:** GSAP 3.15.0 (free tier, CustomEase included), Intersection Observer for scroll reveals
- **Sound:** Howler.js (6 tap sounds, Monolog-style)
- **Routing:** React Router DOM (BrowserRouter)
- **Dev server:** `npm run dev` on `localhost:5174`

---

## Repository

- **Project path:** `D:\Projects\NUREA\under-surface-stones`
- **GitHub remote:** `https://github.com/zayals35/NUREA.1.0.git` (main branch)
- **Do NOT confuse with:** `D:\Projects\NUREA\NUREA-Website\Website` - this is an older, separate JSX project, NOT the final site

---

## Brand colors

| Name | Hex | Usage |
|------|-----|-------|
| Warm parchment (bg light) | `#e9e2d6` | Primary page background |
| Warm parchment alt | `#ece5d9` | Alternating sections |
| Ink (brand dark) | `#2a1f16` | Text, dark buttons |
| Ink accent | `#8a5a2f` | Eyebrows, accent text, links |
| Light cream (text on dark) | `#f3ecdb` | Text on dark sections |
| Deep ink (footer) | `#211a12` | Footer background |

**Fonts:**
- `'Bricolage Grotesque', sans-serif` - Display/headlines (hero-headline class)
- `'Manrope', 'Inter', sans-serif` - Body, nav, UI elements (hero-body class)

---

## Page structure (`src/App.tsx`)

| Route | Component | Status |
|-------|-----------|--------|
| `/` | `Index.tsx` | Done |
| `/tjenester` | `Tjenester.tsx` | Exists |
| `/tjenester/:slug` | `ServicePage.tsx` | Exists |
| `/priser` | `Priser.tsx` | Exists |
| `/arbeider` | `Arbeider.tsx` | Exists |
| `/kontakt` | `Kontakt.tsx` | Exists |
| `/om-oss` | `OmOss.tsx` | Exists |
| `/metoden` | `Metoden.tsx` | Exists |
| `/klarhetssjekk` | `Klarhetssjekk.tsx` | Exists |

---

## Homepage sections (top to bottom)

1. **Hero** (`src/components/hero/Hero.tsx`) - Submerged stones on a stone bed image
2. **EnemySection** - "Solide bedrifter taper ikke kunder fordi de mangler verdi..."
3. **CloseTheGap** (`src/components/CloseTheGap.tsx`) - Scroll overlay moment, "VI TETTER GAPET"
4. **TrapsSection** - "To vanlige feller": Kampanjetenkning + Tilfeldig digital tilstedeværelse
5. **ServicesSection** - "Fem deler, en grunnmur." (links to 5 service pages)
6. **WorkSection** - "Utvalgte arbeider" (case studies)
7. **MethodSection** - "Slik jobber vi." (3 steps: Klarhet, Uttrykk, Flyt)
8. **ThirtyDaysSection** - "De første 30 dagene" (trust/transparency section)
9. **KlarhetssjekkTeaser** - Lead magnet: free digital clarity check
10. **FaqSection** - 5 FAQ items (accordion)
11. **FinalCta** - "La oss snakke." on dark brown background
12. **SiteFooter**

---

## Hero system (`src/components/hero/`)

The hero concept: engraved NUREA stone bed under water. Five service stones sit in pockets in the bed. Hovering a stone lifts it above the water surface and shows a popover with that service's info. Electric pulse lines run from each stone to the engraved N emblem in the center of the bed.

**Key files:**
- `Hero.tsx` - Main hero component, manages `activeId` state, artboard layout
- `ServiceStone.tsx` - Individual stone buttons (`<button class="stone-btn">`)
- `CausticsLayer.tsx` - WebGL water caustics animation (touch/mobile only)

**Stone positioning:** Each stone has `desktop`, `tablet`, `phone` positions (left/top/width as percentages of the artboard). The artboard is sized to COVER the viewport (like `background-size: cover`).

**Artboard aspect ratios:**
- Desktop: 16:9 landscape
- Phone/Tablet: 9:16 portrait (both use portrait bed image)

**Hero images live in:** `public/nurea-hero/`
- `hero-bg-desktop.webp` - landscape bed
- `hero-bg-phone.webp` - portrait bed
- `stone-nettsider.png`, `stone-innhold.png`, `stone-merkevare.png`, `stone-systemer.png`, `stone-reklamer.png`

**Services (SERVICES array in `src/data/services.ts`):**
1. **Nettsider** - Largest anchor stone, mid-left on desktop
2. **Innhold** - Upper-left on desktop
3. **Merkevare** - Lower-center on desktop
4. **Systemer** - Mid-right on desktop
5. **Reklamer** - Upper-right on desktop

---

## Work cases (`src/data/work.ts`)

Five cases in the WorkCard grid:
1. **Metanoia** - Clothing brand to cultural movement. Full identity, design, content.
2. **NUE Invitations** - Digital invitations brand. Enso circle logo.
3. **Møre Marin** - Maritime staffing. Logo, website, email, CRM. Live at moremarin.no
4. **Bilmekka** - Car brand. Full identity, website, systems. Live at bilmekka.no
5. **Moustache City** - Brand identity. Shots to be added.

Work card images live in `public/work/`.

---

## Interaction system (Monolog-style)

Inspired by https://bymonolog.com/

### Sound system (`src/lib/soundSystem.ts`)
- 6 Howler tap sounds in `public/sound/`: `tap_01.wav`, `tap_02.wav`, `tap_03.wav`, `tap_04.mp3`, `tap_05.ogg`, `tap_06.wav`
- 80ms cooldown between sounds
- Audio unlocks on first user click or touchstart (browser autoplay policy)
- `initSoundSystem()` wires the unlock listeners only
- `playHover()` plays a random tap sound

### Hover effects (`src/lib/hoverEffect.ts`)
- GSAP + CustomEase (exact Monolog ease: `cubic-bezier(0.31, 0.75, 0.22, 1)`)
- **Fast in (0.3s) / slow out (0.65s)** - the organic, asymmetric Monolog feel
- Applies to: `a, button, [role="button"]`
- **Transparent-background elements** (nav links, FAQ rows): warm dark tint `rgba(26,23,19,0.16)` on light bg, light tint `rgba(250,250,249,0.18)` on dark bg, plus 2px lift
- **Solid-background elements** (pill buttons like "Få din klarhetssjekk", "Start et prosjekt"): lift ONLY, no tint (tint was making text unreadable)
- **Hero stones** (`.stone-btn`): sound only, no visual effect - their own React handlers own the stone animation
- `prefers-reduced-motion`: no lift, instant transition, sound still plays
- MutationObserver re-attaches on React re-renders
- Wired in `src/main.tsx`

**TODO - stone sound:** The hero stones currently play the generic tap sound as a placeholder. A dedicated stone-movement sound should be found and wired in later (the TODO comment is in `hoverEffect.ts`).

---

## Key rules for this project

1. **Language:** Always Norwegian Bokmål. Never Nynorsk.
2. **No em-dash:** Never use — (long dash). Use a comma or period instead.
3. **Get approval before changes:** Explain the plan and get a yes before making any design or code change.
4. **Animations:** All animations respect `prefers-reduced-motion`.
5. **Spacing:** 8px grid. Sections min `padding: 96px 0` desktop, `64px 0` mobile.
6. **Typography:** Bricolage Grotesque for display, Manrope for body. Max 2 fonts.

---

## What still needs work (as of 2026-06-22)

- **Stone sound:** Replace placeholder tap sound on stones with a dedicated stone-movement sound (user needs to find the right audio file first)
- **Inner pages:** `/tjenester`, `/priser`, `/arbeider`, `/kontakt`, `/om-oss`, `/metoden`, `/klarhetssjekk` - these exist as route stubs but their actual content and design quality needs verifying and completing
- **"Se alle arbeider"** link in the Work section is marked "(snart)" (coming soon) - the `/arbeider` page needs content
- **Moustache City work case** has no shot images yet
- **Mobile menu:** Confirm the mobile navigation is complete and matches desktop nav links
- **Sound QA:** Confirm sounds are audible in production (user had trouble hearing them earlier - turned out audio needs to be unlocked by a first click)

---

## File map (key files only)

```
src/
  main.tsx                  - Entry point. Imports soundSystem + hoverEffect.
  App.tsx                   - Router with all routes.
  index.css                 - Global styles, hero classes, animation system.
  lib/
    soundSystem.ts          - Howler.js tap sounds.
    hoverEffect.ts          - GSAP hover tint + lift system.
  components/
    hero/
      Hero.tsx              - Hero section (artboard, stones, copy, nav).
      ServiceStone.tsx      - Individual stone button component.
      CausticsLayer.tsx     - WebGL water caustics (mobile only).
      MobileServiceSheet.tsx
    home/
      HomeSections.tsx      - All homepage sections below the hero.
      WorkCard.tsx          - Work case card component.
      SiteNav.tsx           - Site-wide navigation.
    CloseTheGap.tsx         - Scroll overlay "VI TETTER GAPET" section.
    PageShell.tsx           - Shared page wrapper for inner pages.
    Reveal.tsx              - Scroll-reveal wrapper component.
  data/
    services.ts             - SERVICES array (5 services, stone positions).
    work.ts                 - WORK array (5 case studies).
    method.ts               - WEEK_STEPS array (30-day process steps).
  pages/
    Index.tsx               - Homepage composition.
    Tjenester.tsx           - Services overview page.
    tjenester/ServicePage.tsx - Individual service page (slug-based).
    Arbeider.tsx            - Work portfolio page.
    Kontakt.tsx             - Contact page.
    OmOss.tsx               - About page.
    Metoden.tsx             - Method page.
    Priser.tsx              - Pricing page.
    Klarhetssjekk.tsx       - Free clarity check lead magnet page.

public/
  nurea-hero/               - Hero images (bed + stone PNGs).
  work/                     - Case study images (art + shots).
  sound/                    - Tap sound files (6 files).
```
