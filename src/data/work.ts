export interface WorkItem {
  id: string;
  title: string;
  caption: string;
  /** Short tag, e.g. the type of work delivered. */
  metric?: string;
  image: string;
  href?: string;
}

// PLACEHOLDER projects. Replace with real work: drop images into public/work/
// (work-1.webp ... ) and update title/caption/metric. Best first.
export const WORK: WorkItem[] = [
  {
    id: "w1",
    title: "Prosjekt 01",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Merkevare",
    image: "/work/work-1.webp",
  },
  {
    id: "w2",
    title: "Prosjekt 02",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Visuell identitet",
    image: "/work/work-2.webp",
  },
  {
    id: "w3",
    title: "Prosjekt 03",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Nettside",
    image: "/work/work-3.webp",
  },
  {
    id: "w4",
    title: "Prosjekt 04",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Pakkedesign",
    image: "/work/work-4.webp",
  },
  {
    id: "w5",
    title: "Prosjekt 05",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Innhold",
    image: "/work/work-5.webp",
  },
  {
    id: "w6",
    title: "Prosjekt 06",
    caption: "Kort beskrivelse av arbeidet og hva som ble løst.",
    metric: "Komplett profil",
    image: "/work/work-6.webp",
  },
];
