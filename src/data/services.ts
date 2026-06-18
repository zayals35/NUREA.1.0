export type ServiceId = "nettsider" | "reklamer" | "systemer" | "innhold" | "merkevare";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  href: string;
  image: string;
  /** Priority stones are the three main anchors (Nettsider, Merkevare, Innhold) */
  priority: boolean;
  /** rotation in degrees applied to the stone */
  rotation: number;
  /** desktop position — center-based (left/top are stone center coordinates) */
  desktop: { left: string; top: string; width: string };
  /** mobile position as percentages of hero */
  mobile: { left: string; top: string; width: string };
}

export const SERVICES: Service[] = [
  {
    id: "nettsider",
    title: "Nettsider",
    description: "Bygget for klarhet, tillit og riktige henvendelser.",
    href: "/tjenester/nettsider",
    image: "/nurea-hero/stone-nettsider.png",
    priority: true,
    rotation: -2,
    // Biggest anchor — center of left stone field
    desktop: { left: "28vw", top: "58vh", width: "clamp(300px, 23vw, 430px)" },
    mobile: { left: "50%", top: "48%", width: "58%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    priority: true,
    rotation: 2,
    desktop: { left: "38vw", top: "38vh", width: "clamp(240px, 18vw, 350px)" },
    mobile: { left: "62%", top: "22%", width: "44%" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    priority: true,
    rotation: -4,
    desktop: { left: "15vw", top: "82vh", width: "clamp(240px, 18vw, 350px)" },
    mobile: { left: "26%", top: "80%", width: "46%" },
  },
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    priority: false,
    rotation: -3,
    desktop: { left: "9vw", top: "30vh", width: "clamp(180px, 14vw, 270px)" },
    mobile: { left: "18%", top: "14%", width: "32%" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    priority: false,
    rotation: 3,
    desktop: { left: "36vw", top: "84vh", width: "clamp(190px, 15vw, 290px)" },
    mobile: { left: "48%", top: "92%", width: "32%" },
  },
];
