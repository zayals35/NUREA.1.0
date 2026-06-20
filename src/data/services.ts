export type ServiceId = "nettsider" | "reklamer" | "systemer" | "innhold" | "merkevare";

export interface StonePos {
  left: string;
  top: string;
  width: string;
  /** Optional per-breakpoint rotation (e.g. "-5deg"). Falls back to Service.rotation. */
  rotate?: string;
}

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
  /** Center-based positions per breakpoint (left/top are the stone's center).
   *  Desktop: stones cascade down the LEFT half (text + CTA on the right).
   *  Phone / Tablet: stones cluster in the TOP half (text + CTA at the bottom). */
  desktop: StonePos;
  tablet: StonePos;
  phone: StonePos;
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
    // Largest anchor stone. Mid-left per the Figma sketch.
    desktop: { left: "25%", top: "70%", width: "17%" },
    tablet: { left: "50%", top: "40%", width: "32%" },
    phone: { left: "66%", top: "18%", width: "25%", rotate: "3deg" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    priority: true,
    rotation: 2,
    desktop: { left: "24%", top: "34%", width: "14%" },
    tablet: { left: "28%", top: "25%", width: "27%" },
    phone: { left: "33%", top: "39.5%", width: "22%", rotate: "7deg" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    priority: true,
    rotation: -4,
    desktop: { left: "49%", top: "75%", width: "15%" },
    tablet: { left: "54%", top: "11%", width: "27%" },
    phone: { left: "51%", top: "50.5%", width: "25%", rotate: "5deg" },
  },
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    priority: false,
    rotation: -3,
    desktop: { left: "57%", top: "36%", width: "13%" },
    tablet: { left: "74%", top: "25%", width: "21%" },
    phone: { left: "33%", top: "16%", width: "18.5%", rotate: "-5deg" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    priority: false,
    rotation: 3,
    desktop: { left: "46%", top: "24%", width: "13%" },
    tablet: { left: "24%", top: "10%", width: "22%" },
    phone: { left: "68%", top: "35%", width: "18.5%", rotate: "-3deg" },
  },
];
