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
    id: "nettsider",
    title: "Nettsider",
    description: "Bygget for klarhet, tillit og riktige henvendelser.",
    href: "/tjenester/nettsider",
    image: "/nurea-hero/stone-nettsider.png",
    desktop: { left: "66%", top: "60%", width: "20%" },
    mobile: { left: "72%", top: "58%", width: "42%" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    desktop: { left: "20%", top: "86%", width: "16%" },
    mobile: { left: "18%", top: "82%", width: "38%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    desktop: { left: "48%", top: "76%", width: "16%" },
    mobile: { left: "52%", top: "74%", width: "38%" },
  },
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    desktop: { left: "80%", top: "30%", width: "16%" },
    mobile: { left: "78%", top: "32%", width: "38%" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    desktop: { left: "82%", top: "82%", width: "16%" },
    mobile: { left: "82%", top: "84%", width: "36%" },
  },
];
