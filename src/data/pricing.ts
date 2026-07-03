export interface PriceTier {
  name: string;
  tagline: string;
  points: string[];
  featured?: boolean;
}

export const RETAINERS: PriceTier[] = [
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

export const CONTENT_TIERS: PriceTier[] = [
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

export const PRICING_NOTE =
  "Før det månedlige starter, setter vi opp grunnlaget én gang. Omfang og pris avtales i en klarhetssamtale. Ingen overraskelser.";
