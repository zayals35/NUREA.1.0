import type { Lang } from "../i18n";

export interface WeekStep {
  n: string;
  h: string;
  p: string;
}

export const WEEK_STEPS: Record<Lang, WeekStep[]> = {
  no: [
    {
      n: "Steg 01",
      h: "Diagnose",
      p: "Vi går gjennom nettside, merkevare, budskap og kundereise.",
    },
    {
      n: "Steg 02",
      h: "Retning",
      p: "En konkret plan: hva som bygges, hvorfor, i hvilken rekkefølge.",
    },
    {
      n: "Steg 03",
      h: "Første løft",
      p: "Det som raskest øker tillit: struktur, tekst, CTA, kontaktflyt.",
    },
    {
      n: "Steg 04",
      h: "Videre",
      p: "Neste steg defineres: nettside, brand, innhold eller systemer.",
    },
  ],
  en: [
    {
      n: "Step 01",
      h: "Diagnosis",
      p: "We go through your website, brand, message and customer journey.",
    },
    {
      n: "Step 02",
      h: "Direction",
      p: "A concrete plan: what gets built, why, and in what order.",
    },
    {
      n: "Step 03",
      h: "First lift",
      p: "What builds trust fastest: structure, copy, CTA, contact flow.",
    },
    {
      n: "Step 04",
      h: "Onwards",
      p: "The next step is defined: website, brand, content or systems.",
    },
  ],
};

export const METHOD_STEPS: Record<Lang, WeekStep[]> = {
  no: [
    {
      n: "01",
      h: "Klarhet",
      p: "Hva som skal sies, til hvem, og hvorfor. Uten klarhet er alt annet gjetning.",
    },
    {
      n: "02",
      h: "Uttrykk",
      p: "Klarheten får form: identitet, språk og design riktig kunde kjenner igjen.",
    },
    {
      n: "03",
      h: "Flyt",
      p: "Uttrykket settes i system: nettside, innhold og flyter som jobber sammen.",
    },
  ],
  en: [
    {
      n: "01",
      h: "Clarity",
      p: "What to say, to whom, and why. Without clarity everything else is guesswork.",
    },
    {
      n: "02",
      h: "Expression",
      p: "Clarity takes form: identity, language and design the right customer recognizes.",
    },
    {
      n: "03",
      h: "Flow",
      p: "The expression is set to work: website, content and flows working together.",
    },
  ],
};
