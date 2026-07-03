export interface WorkItem {
  id: string;
  /** Small descriptor label above the company name. */
  title: string;
  company: string;
  caption: string;
  tags: string[];
  metricLabel: string;
  /** NUREA-made abstract artwork, the case "frame". */
  art: string;
  /** Real brand shots for the detail presentation. */
  shots: string[];
  href?: string;
  instagram?: string;
}

export const WORK: WorkItem[] = [
  {
    id: "metanoia",
    title: "Klesmerke",
    company: "Metanoia",
    caption:
      "Fra kleskolleksjon til kulturell bevegelse. Navn, logo, identitet, klærdesign, innhold og kreativ retning bygget fra grunnen av.",
    tags: ["Klesmerke"],
    metricLabel: "Identitet · Design · Innholdsdireksjon",
    art: "/work/art-metanoia.webp",
    shots: ["/work/metanoia/shot-1.webp", "/work/metanoia/shot-2.webp", "/work/metanoia/shot-3.webp"],
    instagram: "@metanoia.ftp",
  },
  {
    id: "bilmekka",
    title: "Bilforhandler",
    company: "Bilmekka",
    caption:
      "Bilmekka trengte et digitalt uttrykk som føltes like ryddig og tillitsvekkende som en god bilhandel skal være. NUREA utviklet logo, nettside, e-poststruktur og systemer som gir bedriften en mer profesjonell og samlet tilstedeværelse.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · Systemer",
    art: "/work/art-bilmekka.webp",
    shots: ["/work/bilmekka/shot-1.webp", "/work/bilmekka/shot-2.webp", "/work/bilmekka/shot-3.webp"],
    href: "https://www.bilmekka.no",
  },
  {
    id: "moremarin",
    title: "Bemanningsbyrå",
    company: "Møre Marin",
    caption:
      "Logo, nettside, e-postoppsett og CRM-integrasjon samlet i én digital grunnmur for maritim bemanning og rekruttering.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · CRM",
    art: "/work/art-moremarin.webp",
    shots: ["/work/moremarin/shot-1.webp", "/work/moremarin/shot-2.webp", "/work/moremarin/shot-3.webp"],
    href: "https://www.moremarin.no",
  },
  {
    id: "nue-invitations",
    title: "Event planlegging",
    company: "NUE Invitations",
    caption: "Nettsiden lanseres 29. juli. Caset blir oppdatert etter lansering.",
    tags: ["Merkevare"],
    metricLabel: "Logo · Identitet · Konsept",
    art: "/work/art-nue.webp",
    shots: ["/work/nue/shot-1.webp"],
  },
  {
    id: "moustache-city",
    title: "Fotograf",
    company: "Moustache City",
    caption:
      "Logo og nettside for en fotograf i Trondheim. Visuell identitet og en side bygget for å la bildene snakke.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · Identitet",
    art: "/work/art-moustach.webp",
    shots: [],
  },
];
