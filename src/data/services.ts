export type ServiceId = "nettsider" | "reklamer" | "systemer" | "innhold" | "merkevare";

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  href: string;
  image: string;
  /** desktop position as percentages of hero */
  desktop: { left: string; top: string; width: string };
  /** mobile position as percentages of hero */
  mobile: { left: string; top: string; width: string };
}

export const SERVICES: Service[] = [
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    desktop: { left: "72%", top: "48%", width: "16%" },
    mobile: { left: "62%", top: "38%", width: "34%" },
  },
  {
    id: "nettsider",
    title: "Nettsider",
    description: "Bygget for klarhet, tillit og riktige henvendelser.",
    href: "/tjenester/nettsider",
    image: "/nurea-hero/stone-nettsider.png",
    desktop: { left: "55%", top: "62%", width: "22%" },
    mobile: { left: "18%", top: "52%", width: "44%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    desktop: { left: "30%", top: "70%", width: "16%" },
    mobile: { left: "50%", top: "66%", width: "32%" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    desktop: { left: "12%", top: "74%", width: "18%" },
    mobile: { left: "8%", top: "78%", width: "36%" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    desktop: { left: "80%", top: "72%", width: "14%" },
    mobile: { left: "58%", top: "82%", width: "32%" },
  },
];
