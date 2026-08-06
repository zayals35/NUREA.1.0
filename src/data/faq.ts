import type { Lang } from "../i18n";

export interface FaqItem {
  q: string;
  a: string;
  /** Included in the homepage shortlist. */
  home?: boolean;
}

const FAQ_NO: FaqItem[] = [
  {
    q: "Hvem jobber faktisk på prosjektet mitt?",
    a: "Zaynab leder hvert oppdrag, fra strategi og kreativ retning til din primære kontaktperson gjennom hele prosessen. Avhengig av omfang trekker vi inn nøye utvalgte samarbeidspartnere på design og utvikling. Kvaliteten og omsorgen for arbeidet er den samme, uansett prosjektets størrelse.",
    home: true,
  },
  {
    q: "Hva trenger dere for å komme i gang?",
    a: "Vi starter med en klarhetssamtale der vi går gjennom dine konkrete behov. Deretter sender vi et tilpasset tilbud. Alt vi trenger for å starte er en signert avtale og et starthonorar. Så er vi i gang.",
    home: true,
  },
  {
    q: "Hva skjer etter at arbeidet er levert?",
    a: "Arbeidet slutter ikke ved levering. Du får alle filer, dokumentasjon og en blåkopi av det vi har bygget sammen. Du eier det fullt og helt og kan fortsette med oss eller ta det med deg til et annet byrå. Ønsker du løpende støtte, finner vi en modell som passer.",
    home: true,
  },
  {
    q: "Kan dere håndtere merkevare, design og utvikling?",
    a: "Ja. Vi leverer alle tre under ett tak. Narrativ, identitet, visuals og funksjonalitet henger sammen fra dag én, slik at resultatet blir ett sammenhengende uttrykk, ikke løse deler fra ulike leverandører.",
    home: true,
  },
  {
    q: "Hvor lang tid tar et prosjekt?",
    a: "Det kommer an på omfanget. En tydelig leveranse kan gå raskt; en hel merkevare bygges i rolige steg. Vi avtaler tempo og milepæler før vi starter.",
    home: true,
  },
  {
    q: "Kan jeg starte med bare én ting?",
    a: "Ja. Mange starter med én konkret leveranse, en merkevare, en side eller et budskap, og bygger videre derfra.",
  },
  {
    q: "Hva er NUREA-metoden?",
    a: "Tre rolige steg: Klarhet, Uttrykk og Flyt. Fra uklarhet til et tydelig digitalt uttrykk som henger sammen.",
  },
];

const FAQ_EN: FaqItem[] = [
  {
    q: "Who actually works on my project?",
    a: "Zaynab leads every engagement, from strategy and creative direction to being your primary contact through the whole process. Depending on scope, we bring in carefully chosen partners for design and development. The quality and care in the work are the same, whatever the size of the project.",
    home: true,
  },
  {
    q: "What do you need to get started?",
    a: "We start with a clarity conversation where we go through your specific needs. Then we send a tailored proposal. All we need to start is a signed agreement and a starting fee. Then we are underway.",
    home: true,
  },
  {
    q: "What happens after the work is delivered?",
    a: "The work does not end at delivery. You get every file, the documentation and a blueprint of what we built together. You own it fully and can continue with us or take it to another agency. If you want ongoing support, we find a model that fits.",
    home: true,
  },
  {
    q: "Can you handle brand, design and development?",
    a: "Yes. We deliver all three under one roof. Narrative, identity, visuals and functionality belong together from day one, so the result is one coherent expression, not loose parts from different suppliers.",
    home: true,
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. A single clear deliverable can move fast; a whole brand is built in calm steps. We agree on pace and milestones before we start.",
    home: true,
  },
  {
    q: "Can I start with just one thing?",
    a: "Yes. Many start with one concrete deliverable, a brand, a page or a message, and build from there.",
  },
  {
    q: "What is the NUREA method?",
    a: "Three calm steps: Clarity, Expression and Flow. From unclear to a clear digital expression that holds together.",
  },
];

export const FAQ: Record<Lang, FaqItem[]> = { no: FAQ_NO, en: FAQ_EN };
