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
    // Circle 5 — bottom center anchor, largest stone
    desktop: { left: "30vw", top: "72vh", width: "clamp(300px, 22vw, 420px)" },
    mobile: { left: "50%", top: "62%", width: "58%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    priority: true,
    rotation: 2,
    // Circle 4 — center-left, settled into clearer water
    desktop: { left: "37vw", top: "34vh", width: "clamp(230px, 17vw, 330px)" },
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
    // Circle 2 — upper mid-left
    desktop: { left: "24vw", top: "19vh", width: "clamp(220px, 16vw, 320px)" },
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
    // Circle 3 — middle left
    desktop: { left: "11vw", top: "48vh", width: "clamp(180px, 14vw, 270px)" },
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
    // Circle 1 — top left
    desktop: { left: "10vw", top: "15vh", width: "clamp(190px, 14vw, 280px)" },
    mobile: { left: "48%", top: "92%", width: "32%" },
  },
];
