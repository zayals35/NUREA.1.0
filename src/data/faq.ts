export interface FaqItem {
  q: string;
  a: string;
  /** Included in the homepage shortlist. */
  home?: boolean;
}

export const FAQ: FaqItem[] = [
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
