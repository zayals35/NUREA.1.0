export interface WorkItem {
  id: string;
  title: string;
  caption: string;
  /** One or more work-type tags shown as chips on the card. */
  tags?: string[];
  metricLabel?: string;
  /** NUREA-made abstract artwork shown at rest (the card "frame"). */
  art: string;
  /** Real brand images, framed inside the art on hover and cycled. Drop in
   *  public/work/. Empty = the card just shows the artwork. */
  shots: string[];
  href?: string;
}

export const WORK: WorkItem[] = [
  {
    id: "metanoia",
    title: "Metanoia",
    caption: "Fra kleskolleksjon til kulturell bevegelse. Navn, logo, identitet, klærdesign, innhold og kreativ retning bygget fra grunnen av.",
    tags: ["Merkevare"],
    metricLabel: "Identitet · Design · Innholdsdireksjon",
    art: "/work/art-metanoia.webp",
    shots: [
      "/work/metanoia-cover.webp",
      "/work/metanoia-logo.webp",
      "/work/metanoia-a.webp",
      "/work/metanoia-b.webp",
      "/work/metanoia-c.webp",
    ],
  },
  {
    id: "nue-invitations",
    title: "NUE Invitations",
    caption: "Et digitalt invitasjonsmerke bygget rundt enso-sirkelen. Tidløs estetikk, moderne funksjonalitet og en klar merkevare som erstatter papir med noe verdt å ta vare på.",
    tags: ["Merkevare"],
    metricLabel: "Logo · Identitet · Konsept",
    art: "/work/art-nue.webp",
    shots: ["/work/nue-cover.webp", "/work/nue-logo.webp"],
  },
  {
    id: "moremarin",
    title: "Bemanningsbyrå",
    caption: "Logo, nettside, e-postoppsett og CRM-integrasjon samlet i én digital grunnmur for maritim bemanning og rekruttering.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · CRM",
    art: "/work/moremarin/art-moremarin.webp",
    shots: [
      "/work/moremarin/moremarin-hero.webp",
      "/work/moremarin/moremarin-contact.png",
      "/work/moremarin/moremarin-jobs.webp.png",
      "/work/moremarin/moremarin-crew.webp.png",
    ],
    href: "https://www.moremarin.no",
  },
  {
    id: "bilmekka",
    title: "Bilmekka",
    caption: "Logo bygget for å bære hele merket: visittkort, uniform, bygningsskilt, annonser og sosiale medier. Supplert med nettside, e-postoppsett og digitale systemer.",
    tags: ["Merkevare", "Nettside"],
    metricLabel: "Logo · Nettside · E-post · Systemer",
    art: "/work/art-bilmekka.webp",
    shots: ["/work/bilmekka-cover.webp", "/work/bilmekka-a.webp"],
    href: "https://www.bilmekka.no",
  },
  {
    id: "moustache-city",
    title: "Moustache City",
    caption: "Merkevare og visuell retning. Case og bilder legges til snart.",
    tags: ["Merkevare"],
    metricLabel: "Identitet · Uttrykk",
    art: "/work/art-moustach.webp",
    shots: [],
  },
];
