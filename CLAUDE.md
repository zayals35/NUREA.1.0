# NUREA — Claude instructions

## Language
Always write in **Norwegian Bokmål**. Never Nynorsk. All UI text, copy, comments in user-facing strings must be Norwegian.

## No em-dash
Never use the long dash (—). Use a comma or period instead.

## Approval before changes
Explain the plan and get explicit approval before making any design or code change. Do not start implementing until the user says yes.

## Project identity
- **Final project path:** `D:\Projects\NUREA\under-surface-stones`
- **Dev server:** `npm run dev` → localhost:5174
- **GitHub:** https://github.com/zayals35/NUREA.1.0.git (main)
- Do NOT confuse with `D:\Projects\NUREA\NUREA-Website\Website` — that is an older, separate JSX project.

## Design system

### Colors
| Token | Value | Use |
|-------|-------|-----|
| bg-light | `#e9e2d6` | Primary background |
| bg-alt | `#ece5d9` | Alternating sections |
| ink | `#2a1f16` | Text, dark buttons |
| accent | `#8a5a2f` | Eyebrows, links |
| cream | `#f3ecdb` | Text on dark |
| bg-dark | `#2a1f16` | Final CTA section |
| footer | `#211a12` | Footer |

### Typography classes (defined in index.css)
- `.hero-headline` — Bricolage Grotesque, bold, tight tracking
- `.hero-body` — Manrope/Inter, 16–18px, 1.65 line-height
- `.hero-nav` — nav link style
- `.hero-wordmark` — NUREA logotype
- `.cta-link` / `.cta-link--primary` — CTA anchor styles

### Spacing
8px base grid. Section padding: `96px 0` desktop, `64px 0` mobile minimum.

## Interaction system
- **Sound:** `src/lib/soundSystem.ts` — Howler.js, 6 tap sounds, unlocks on first click
- **Hover:** `src/lib/hoverEffect.ts` — GSAP + CustomEase (Monolog ease), fast-in 0.3s / slow-out 0.65s
- **Tint rule:** transparent-background elements get a warm tint on hover; solid-background buttons (pills) get lift only — never tint them or text becomes unreadable
- **Stones** (`.stone-btn`): sound only, no visual hover effect — React handlers own their motion
- Both wired in `src/main.tsx`

## Hero system
- Artboard covers viewport at fixed aspect ratio (16:9 desktop, 9:16 mobile)
- Stone positions are percentages of the artboard, not the viewport
- Images in `public/nurea-hero/` — do not move or rename without updating `Hero.tsx`
- Electric lines run from each stone to the engraved N position (`N_POS_BY_BP` in Hero.tsx)

## Animation rules
- Only animate `transform` and `opacity` — never `height`, `width`, `top`, `left`, `margin`
- Always include `prefers-reduced-motion` handling
- GSAP CustomEase "monolog": `M0,0 C0.31,0.75 0.22,1 1,1`

## Scroll reveals
Use the `<Reveal>` component (`src/components/Reveal.tsx`) for all below-fold content. It wraps Intersection Observer.

## Full project brief
See `context.md` at the root for the complete picture: page sections, data files, work cases, and pending work.
