import type { Lang } from "../i18n";

export interface PriceTier {
  name: string;
  tagline: string;
  points: string[];
  featured?: boolean;
}

const RETAINERS_NO: PriceTier[] = [
  {
    name: "Teknisk trygghet",
    tagline: "Det laveste nivået. Vi holder det tekniske trygt i bakgrunnen.",
    points: [
      "Månedlig sjekk av hosting, sky-sikkerhet og API-stabilitet.",
      "Du slipper å tenke på at siden krasjer.",
    ],
  },
  {
    name: "Digital optimering",
    tagline: "Et steg opp. Vi følger med på trafikk og konvertering, og forbedrer jevnt.",
    points: [
      "Månedlig 1-sides helserapport.",
      "Jevn optimering av det som svekker konvertering.",
      "Alt fra Teknisk trygghet inkludert.",
    ],
  },
  {
    name: "Strategisk allianse",
    tagline: "Din outsourcede kreative avdeling, samlet i én partner.",
    points: [
      "Månedlig strategisamtale (30 min).",
      "Prioritert respons innen 24 til 48 timer.",
      "Alt fra Digital optimering inkludert.",
    ],
    featured: true,
  },
];

const RETAINERS_EN: PriceTier[] = [
  {
    name: "Technical peace of mind",
    tagline: "The base level. We keep the technical side safe in the background.",
    points: [
      "Monthly check of hosting, cloud security and API stability.",
      "You never have to think about the site going down.",
    ],
  },
  {
    name: "Digital optimization",
    tagline: "A step up. We watch traffic and conversion, and improve steadily.",
    points: [
      "A monthly one-page health report.",
      "Steady optimization of whatever weakens conversion.",
      "Everything in Technical peace of mind included.",
    ],
  },
  {
    name: "Strategic alliance",
    tagline: "Your outsourced creative department, gathered in one partner.",
    points: [
      "A monthly strategy call (30 min).",
      "Priority response within 24 to 48 hours.",
      "Everything in Digital optimization included.",
    ],
    featured: true,
  },
];

const CONTENT_TIERS_NO: PriceTier[] = [
  {
    name: "Fast og jevnt",
    tagline: "Ferdige visuelle elementer hver måned, i din stil.",
    points: ["Et fast antall visuelle elementer.", "Klare til publisering."],
  },
  {
    name: "Mer bevegelse",
    tagline: "Mer innhold, inkludert bevegelse og video.",
    points: ["Alt fra Fast og jevnt.", "Bevegelig innhold og enkel video."],
  },
  {
    name: "Full produksjon",
    tagline: "Jevn strøm av video. Nye pakker for hver sesong.",
    points: ["Full innholdsproduksjon.", "Sesongpakker gjennom året."],
  },
];

const CONTENT_TIERS_EN: PriceTier[] = [
  {
    name: "Steady and consistent",
    tagline: "Finished visual assets every month, in your style.",
    points: ["A fixed number of visual assets.", "Ready to publish."],
  },
  {
    name: "More motion",
    tagline: "More content, including motion and video.",
    points: ["Everything in Steady and consistent.", "Motion content and simple video."],
  },
  {
    name: "Full production",
    tagline: "A steady stream of video. New packages for every season.",
    points: ["Full content production.", "Seasonal packages through the year."],
  },
];

export const RETAINERS: Record<Lang, PriceTier[]> = { no: RETAINERS_NO, en: RETAINERS_EN };
export const CONTENT_TIERS: Record<Lang, PriceTier[]> = { no: CONTENT_TIERS_NO, en: CONTENT_TIERS_EN };

export const PRICING_NOTE: Record<Lang, string> = {
  no: "Før det månedlige starter, setter vi opp grunnlaget én gang. Omfang og pris avtales i en klarhetssamtale. Ingen overraskelser.",
  en: "Before the monthly work begins, we set up the foundation once. Scope and price are agreed in a clarity conversation. No surprises.",
};
