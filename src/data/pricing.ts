import type { Lang } from "../i18n";

export interface PriceTier {
  name: string;
  tagline: string;
  points: string[];
  /** Availability line, only where an offer is not open yet. */
  note?: string;
}

/**
 * The three launch offers as they appear on /priser, approved 2026-09-20.
 * Unranked and independently selectable; no offer is "most chosen".
 */
export const OFFER_PRICING: Record<Lang, PriceTier[]> = {
  no: [
    {
      name: "Nettside og uttrykk",
      tagline: "Gjør det lett å velge deg.",
      points: [
        "Klare ord, et eget uttrykk og en enkel vei til kontakt.",
        "Omfanget avtales før vi starter, og bygges ferdig.",
      ],
    },
    {
      name: "Systemer og automatisering",
      tagline: "Færre ting å følge opp manuelt.",
      points: [
        "Én konkret arbeidsflyt: skjema, e-post eller booking.",
        "Tilpasset verktøyene du bruker, med tydelig avtalt oppfølging.",
      ],
    },
    {
      name: "Visuell produksjon",
      tagline: "Nurea Create.",
      points: [
        "AI-assisterte kampanjebilder og korte filmer for produktmerker.",
        "Avgrensede produksjoner med avtalt retning, leveranser og revisjoner.",
      ],
      note: "Under utvikling. Åpner senere.",
    },
  ],
  en: [
    {
      name: "Website and identity",
      tagline: "Make choosing you easy.",
      points: [
        "Clear words, a distinctive identity and a simple way to get in touch.",
        "Scope agreed before we start, then built to completion.",
      ],
    },
    {
      name: "Systems and automation",
      tagline: "Less to follow up manually.",
      points: [
        "One specific workflow: forms, email or booking.",
        "Built around the tools you use, with clearly agreed support.",
      ],
    },
    {
      name: "Visual production",
      tagline: "Nurea Create.",
      points: [
        "AI-assisted campaign images and short films for product brands.",
        "Defined productions with agreed direction, deliverables and revisions.",
      ],
      note: "In development. Coming later.",
    },
  ],
};

export const PRICING_NOTE: Record<Lang, string> = {
  no: "Omfang og pris avtales i en klarhetssamtale. Ingen prisliste, ingen fra-ankre.",
  en: "Scope and price are agreed in a clarity conversation. No price list, no from-price anchors.",
};
