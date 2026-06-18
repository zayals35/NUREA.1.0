export type ServiceId = "nettsider" | "reklamer" | "systemer" | "innhold" | "merkevare";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  href: string;
  image: string;
  /** Priority stones are the three main anchors (Nettsider, Merkevare, Innhold) */
  priority: boolean;
  /** desktop position as percentages of hero */
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
    // Largest, left-center main anchor
    desktop: { left: "26%", top: "58%", width: "26%" },
    mobile: { left: "40%", top: "46%", width: "52%" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    priority: true,
    // Large, lower-left
    desktop: { left: "12%", top: "82%", width: "20%" },
    mobile: { left: "22%", top: "78%", width: "44%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    priority: true,
    // Large, mid-left / upper-left
    desktop: { left: "44%", top: "34%", width: "20%" },
    mobile: { left: "60%", top: "22%", width: "44%" },
  },
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    priority: false,
    // Supporting, upper-left smaller
    desktop: { left: "10%", top: "26%", width: "12%" },
    mobile: { left: "16%", top: "14%", width: "28%" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    priority: false,
    // Supporting, lower-middle smaller
    desktop: { left: "38%", top: "88%", width: "12%" },
    mobile: { left: "44%", top: "92%", width: "28%" },
  },
];
