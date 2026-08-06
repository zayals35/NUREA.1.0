import type { Lang } from "../i18n";

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
  /** Locked until the delivered work is actually live; hidden everywhere. */
  hidden?: boolean;
}

const WORK_NO: WorkItem[] = [
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
      "Logo, nettside, e-postoppsett og CRM-integrasjon samlet i én tydelig digital retning for maritim bemanning og rekruttering.",
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
    caption: "Nettsiden er under arbeid. Caset publiseres når den er lansert.",
    tags: ["Merkevare"],
    metricLabel: "Logo · Identitet · Konsept",
    art: "/work/art-nue.webp",
    shots: ["/work/nue/shot-1.webp"],
    hidden: true,
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

const WORK_EN: WorkItem[] = [
  {
    id: "metanoia",
    title: "Clothing brand",
    company: "Metanoia",
    caption:
      "From clothing collection to cultural movement. Name, logo, identity, garment design, content and creative direction built from the ground up.",
    tags: ["Clothing brand"],
    metricLabel: "Identity · Design · Content direction",
    art: "/work/art-metanoia.webp",
    shots: ["/work/metanoia/shot-1.webp", "/work/metanoia/shot-2.webp", "/work/metanoia/shot-3.webp"],
    instagram: "@metanoia.ftp",
  },
  {
    id: "bilmekka",
    title: "Car dealership",
    company: "Bilmekka",
    caption:
      "Bilmekka needed a digital expression that felt as tidy and trustworthy as a good car dealership should be. NUREA developed the logo, website, email structure and systems that give the business a more professional and unified presence.",
    tags: ["Brand", "Website"],
    metricLabel: "Logo · Website · Email · Systems",
    art: "/work/art-bilmekka.webp",
    shots: ["/work/bilmekka/shot-1.webp", "/work/bilmekka/shot-2.webp", "/work/bilmekka/shot-3.webp"],
    href: "https://www.bilmekka.no",
  },
  {
    id: "moremarin",
    title: "Staffing agency",
    company: "Møre Marin",
    caption:
      "Logo, website, email setup and CRM integration gathered in one clear digital direction for maritime staffing and recruitment.",
    tags: ["Brand", "Website"],
    metricLabel: "Logo · Website · Email · CRM",
    art: "/work/art-moremarin.webp",
    shots: ["/work/moremarin/shot-1.webp", "/work/moremarin/shot-2.webp", "/work/moremarin/shot-3.webp"],
    href: "https://www.moremarin.no",
  },
  {
    id: "nue-invitations",
    title: "Event planning",
    company: "NUE Invitations",
    caption: "The website is in progress. The case will be published once it launches.",
    tags: ["Brand"],
    metricLabel: "Logo · Identity · Concept",
    art: "/work/art-nue.webp",
    shots: ["/work/nue/shot-1.webp"],
    hidden: true,
  },
  {
    id: "moustache-city",
    title: "Photographer",
    company: "Moustache City",
    caption:
      "Logo and website for a photographer in Trondheim, Norway. Visual identity and a site built to let the photos speak.",
    tags: ["Brand", "Website"],
    metricLabel: "Logo · Website · Identity",
    art: "/work/art-moustach.webp",
    shots: [],
  },
];

export const WORK: Record<Lang, WorkItem[]> = { no: WORK_NO, en: WORK_EN };
