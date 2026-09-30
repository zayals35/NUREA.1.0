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
  /** Reserved for approved motion clips. */
  clips?: string[];
  year?: number;
  href?: string;
  instagram?: string;
  status?: string;
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
    caption: "NUREA leverte logo, nettside, e-poststruktur og systemer for Bilmekka.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · Systemer",
    art: "/work/art-bilmekka.webp",
    shots: ["/work/bilmekka/shot-1.webp", "/work/bilmekka/shot-2.webp", "/work/bilmekka/shot-3.webp"],
    href: "https://www.bilmekka.no",
  },
  {
    id: "gizay",
    title: "Landing page",
    company: "GIZAY",
    caption: "Landing page, merkevare og web levert for GIZAY. Siden er live på gizay.no.",
    tags: ["Merkevare", "Web"],
    metricLabel: "Merkevare · Web · Landing page",
    art: "/work/gizay/01-hero-arrival-poster.webp",
    shots: [],
    clips: [],
    year: 2026,
    href: "https://gizay.no",
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
    caption: "Logo og nettside for en fotograf i Trondheim. Arbeidet er ikke publisert.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · Identitet",
    art: "/work/art-moustach.webp",
    shots: [],
    status: "Under arbeid, ikke publisert",
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
    caption: "NUREA delivered the logo, website, email structure and systems for Bilmekka.",
    tags: ["Brand", "Website"],
    metricLabel: "Logo · Website · Email · Systems",
    art: "/work/art-bilmekka.webp",
    shots: ["/work/bilmekka/shot-1.webp", "/work/bilmekka/shot-2.webp", "/work/bilmekka/shot-3.webp"],
    href: "https://www.bilmekka.no",
  },
  {
    id: "gizay",
    title: "Landing page",
    company: "GIZAY",
    caption: "Landing page, brand and web delivered for GIZAY. The site is live at gizay.no.",
    tags: ["Brand", "Web"],
    metricLabel: "Brand · Web · Landing page",
    art: "/work/gizay/01-hero-arrival-poster.webp",
    shots: [],
    clips: [],
    year: 2026,
    href: "https://gizay.no",
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
    caption: "Logo and website for a photographer in Trondheim, Norway. The work is not published.",
    tags: ["Brand", "Website"],
    metricLabel: "Logo · Website · Identity",
    art: "/work/art-moustach.webp",
    shots: [],
    status: "In progress, not published",
  },
];

export const WORK: Record<Lang, WorkItem[]> = { no: WORK_NO, en: WORK_EN };
