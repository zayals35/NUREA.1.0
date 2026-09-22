import type { Lang } from "../i18n";

export interface PriceTier {
  name: string;
  tagline: string;
  points: string[];
  featured?: boolean;
}

export const OFFER_PRICING: Record<Lang, PriceTier[]> = {
  no: [
    {
      name: "Første løft",
      tagline: "Budskap, merkevare og nettside samlet i en tydelig start.",
      points: ["Retning for budskap og uttrykk.", "En nettside bygget for klarhet og tillit."],
    },
    {
      name: "Innholdsabonnement",
      tagline: "Jevnt innhold fra råmaterialet du allerede har.",
      points: ["Innhold hver uke eller måned.", "Tekst, bilder og reklameinnhold klar til bruk."],
      featured: true,
    },
    {
      name: "Systemer",
      tagline: "Bots og flyter som svarer, booker og følger opp.",
      points: ["Ryddigere kontaktflyt.", "Automatisering tilpasset hverdagen din."],
    },
  ],
  en: [
    {
      name: "First lift",
      tagline: "Message, brand and website gathered into a clear start.",
      points: ["Direction for message and expression.", "A website built for clarity and trust."],
    },
    {
      name: "Content subscription",
      tagline: "Steady content from the raw material you already have.",
      points: ["Content every week or month.", "Copy, images and advertising content ready to use."],
      featured: true,
    },
    {
      name: "Systems",
      tagline: "Bots and flows that answer, book and follow up.",
      points: ["A tidier contact flow.", "Automation shaped around your everyday."],
    },
  ],
};

export const PRICING_NOTE: Record<Lang, string> = {
  no: "Omfang og pris avtales i en klarhetssamtale. Ingen prisliste, ingen fra-ankre.",
  en: "Scope and price are agreed in a clarity conversation. No price list, no from-price anchors.",
};
