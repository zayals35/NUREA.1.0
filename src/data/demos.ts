export interface DemoItem {
  id: string;
  /** Niche descriptor above the fictional business name. */
  niche: string;
  company: string;
  /** The study insight this demo answers. */
  thesis: string;
  /** Evidence line: what the study behind the demo actually covered. */
  studyLine: string;
  /** Signature moves the demo makes, from the locked art direction. */
  signature: string[];
  preview: string;
  /** Static demo URL, served outside the app. */
  href: string;
}

export const DEMOS: DemoItem[] = [
  {
    id: "tannlege",
    niche: "Tannlegeklinikk",
    company: "Elva Tannklinikk",
    thesis:
      "Folk gruer seg til to ting hos tannlegen: stolen og regningen. De fleste klinikksider svarer på ingen av delene. Denne demoen er bygget rundt begge, med ro i språket og prisene i klartekst.",
    studyLine: "Studie først: ti norske klinikksider og internasjonale referanser.",
    signature: [
      "Prislisten som en designet kvittering, ingen prisjakt",
      "Egen side for deg som gruer deg",
      "Åpent eller stengt akkurat nå, synlig i menyen",
      "Menneskene med navn og ansikt, ikke et tomt om oss",
    ],
    preview: "/demoer/preview-tannlege.webp",
    href: "/demoer/tannlege/",
  },
];

export interface UpcomingDemo {
  niche: string;
  status: "Bygges nå" | "I kø";
  line: string;
}

export const UPCOMING: UpcomingDemo[] = [
  {
    niche: "Bruktbilforhandler",
    status: "Bygges nå",
    line: "Trygghet ved bruktbilkjøp: menneskene bak plassen, rettighetene dine, og bilene på ett sted i stedet for en lenke til Finn.",
  },
  {
    niche: "Hud- og estetikkklinikk",
    status: "I kø",
    line: "En bransje der loven skriver halve designbriefen. Synlig etterlevelse som det sterkeste trustsignalet.",
  },
  {
    niche: "Tverrfaglig helseklinikk",
    status: "I kø",
    line: "Behandlere med navn og kompetanse, og en booking som faktisk virker, i stedet for tomme referansefelt.",
  },
  {
    niche: "Kreativ portefølje",
    status: "I kø",
    line: "En portefølje som lar arbeidet snakke, uten å stille seg i veien for det.",
  },
  {
    niche: "Håndverker",
    status: "I kø",
    line: "Mobil først, ring først. Nettsiden som jobber like ryddig som firmaet.",
  },
];
