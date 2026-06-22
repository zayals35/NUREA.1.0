# NUREA

**Merkevare og digital retning** — the official NUREA agency website.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS + shadcn/ui
- GSAP 3 (animations, CustomEase)
- Howler.js (hover sound system)
- React Router DOM

## Dev

```bash
npm install
npm run dev       # localhost:5174
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint
npm run test      # Vitest
```

## Project structure

```
src/
  lib/            soundSystem.ts + hoverEffect.ts (Monolog interaction system)
  components/
    hero/         Hero, ServiceStone, CausticsLayer
    home/         SiteNav, HomeSections, WorkCard
  pages/          Index, Tjenester, ServicePage, Priser, Arbeider,
                  Kontakt, OmOss, Metoden, Klarhetssjekk
  data/           services.ts, work.ts, method.ts

public/
  nurea-hero/     Bed images + stone PNGs
  nurea-method/   "VI TETTER GAPET" video (CloseTheGap section)
  work/           Case study artwork + shots
  sound/          Tap sound files (6)
```

## Key context

See `context.md` at the project root for a full brief: brand rules, color system, section order, interaction system details, and what still needs work.

## Repository

GitHub: https://github.com/zayals35/NUREA.1.0.git
