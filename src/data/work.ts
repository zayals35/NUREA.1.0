export interface WorkItem {
  id: string;
  /** Small descriptor label above the company name. */
  title: string;
  /** Primary display name — the client/brand. Rendered large. */
  company: string;
  caption: string;
  /** One or more work-type tags shown as chips on the card. */
  tags?: string[];
  metricLabel?: string;
  /** NUREA-made abstract artwork shown at rest (the card "frame"). */
  art: string;
  /** Add a film-grain overlay to the art image (for clean digital graphics). */
  grain?: boolean;
  /** Looping video shown in the art slot instead of the static art image. */
  video?: string;
  /** Real brand images, framed inside the art on hover and cycled. Drop in
   *  public/work/. Empty = the card just shows the artwork. */
  shots: string[];
  href?: string;
  instagram?: string;
}

export const WORK: WorkItem[] = [
  {
    id: "metanoia",
    title: "Klesmerke",
    company: "Metanoia",
    caption: "Fra kleskolleksjon til kulturell bevegelse. Navn, logo, identitet, klærdesign, innhold og kreativ retning bygget fra grunnen av.",
    tags: ["Klesmerke"],
    metricLabel: "Identitet · Design · Innholdsdireksjon",
    art: "/work/metanoia/metanoia-logo.webp",
    video: "/work/metanoia/placeholder.mp4",
    shots: [
      "/work/metanoia/cloud-1.jpg",
      "/work/metanoia/IMG_0533.JPG",
      "/work/metanoia/IMG_0764.JPG",
      "/work/metanoia/IMG_1636.JPG",
      "/work/metanoia/IMG_1853.JPG",
      "/work/metanoia/IMG_2753.JPEG",
      "/work/metanoia/IMG_8790.JPEG",
      "/work/metanoia/IMG_9359.JPG",
      "/work/metanoia/metanoia.package2.png",
      "/work/metanoia/metanoiapackage.all.png",
    ],
    instagram: "@metanoia.ftp",
  },
  {
    id: "bilmekka",
    title: "Bilforhandler",
    company: "Bilmekka",
    caption: "Bilmekka trengte et digitalt uttrykk som føltes like ryddig og tillitsvekkende som en god bilhandel skal være. NUREA utviklet logo, nettside, e-poststruktur og systemer som gir bedriften en mer profesjonell og samlet tilstedeværelse.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · Systemer",
    art: "/work/bilmekka/bm favicon.png",
    grain: true,
    shots: [
      "/work/bilmekka/phonehero.png",
      "/work/bilmekka/businesscards1.png",
      "/work/bilmekka/businesscards2.png",
      "/work/bilmekka/BILMEKKA.MERCH.png",
      "/work/bilmekka/BILMEKKA.MERCH.COMF.png",
      "/work/bilmekka/bilmekka.skilt.png",
    ],
    href: "https://www.bilmekka.no",
  },
  {
    id: "moremarin",
    title: "Bemanningsbyrå",
    company: "Møre Marin",
    caption: "Logo, nettside, e-postoppsett og CRM-integrasjon samlet i én digital grunnmur for maritim bemanning og rekruttering.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · CRM",
    art: "/work/moremarin/art-moremarin.webp",
    shots: [
      "/work/moremarin/moremarin-hero.webp",
      "/work/moremarin/moremarin-contact.png",
      "/work/moremarin/moremarin-jobs.webp.png",
      "/work/moremarin/moremarin-crew.webp.png",
      "/work/moremarin/sjø.png",
    ],
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
    shots: ["/work/nue-cover.webp", "/work/nue-logo.webp"],
  },
  {
    id: "moustache-city",
    title: "Fotograf",
    company: "Moustache City",
    caption: "Logo og nettside for en fotograf i Trondheim. Visuell identitet og en side bygget for å la bildene snakke.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · Identitet",
    art: "/work/art-moustach.webp",
    shots: [],
  },
];
