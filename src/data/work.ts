export interface WorkItem {
  id: string;
  title: string;
  caption: string;
  /** Honest tag (type of work) or a real result. No invented numbers. */
  metric?: string;
  metricLabel?: string;
  /** Cover/placeholder image. */
  cover: string;
  /** The real work (website / logo / identity). Shown on hover (desktop) and
   *  auto-cycled over a blurred cover (mobile). Drop images in public/work/. */
  shots: string[];
  href?: string;
}

// PLACEHOLDER projects. Replace with real work:
//  - cover: a hero/placeholder image  -> public/work/work-N.webp
//  - shots: the actual website/logo screenshots -> public/work/work-N-a.webp, -b ...
// Update title/caption/metric. Best first.
export const WORK: WorkItem[] = [
  {
    id: "w1",
    title: "Prosjekt 01",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Merkevare",
    metricLabel: "Komplett identitet og profil",
    cover: "/work/work-1.webp",
    shots: [],
  },
  {
    id: "w2",
    title: "Prosjekt 02",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Visuell identitet",
    metricLabel: "Logo, farger og system",
    cover: "/work/work-2.webp",
    shots: [],
  },
  {
    id: "w3",
    title: "Prosjekt 03",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Nettside",
    metricLabel: "Struktur fra forståelse til kontakt",
    cover: "/work/work-3.webp",
    shots: [],
  },
  {
    id: "w4",
    title: "Prosjekt 04",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Pakkedesign",
    metricLabel: "Emballasje og uttrykk",
    cover: "/work/work-4.webp",
    shots: [],
  },
  {
    id: "w5",
    title: "Prosjekt 05",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Innhold",
    metricLabel: "Tekst, bilde og struktur",
    cover: "/work/work-5.webp",
    shots: [],
  },
  {
    id: "w6",
    title: "Prosjekt 06",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Komplett profil",
    metricLabel: "Hele uttrykket samlet",
    cover: "/work/work-6.webp",
    shots: [],
  },
];
