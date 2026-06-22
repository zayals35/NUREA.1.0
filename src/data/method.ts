// The documented "De første 30 dagene" process. Shared by the homepage trust
// section (HomeSections) and the /metoden page so the method stays consistent.
export interface WeekStep {
  n: string;
  h: string;
  p: string;
}

export const WEEK_STEPS: WeekStep[] = [
  {
    n: "Uke 1",
    h: "Diagnose",
    p: "Vi går gjennom nettside, merkevare, budskap, kundereise og digitale flaskehalser.",
  },
  {
    n: "Uke 2",
    h: "Retning",
    p: "Du får en konkret plan: hva som bør bygges, hvorfor, og i hvilken rekkefølge.",
  },
  {
    n: "Uke 3",
    h: "Første løft",
    p: "Vi forbedrer det som raskest kan øke tillit: struktur, tekst, CTA, visuell retning eller kontaktflyt.",
  },
  {
    n: "Uke 4",
    h: "Grunnmur",
    p: "Vi definerer neste steg: nettside, brand, systemer, innhold eller markedsføring.",
  },
];
