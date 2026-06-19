export type ServiceId = "nettsider" | "reklamer" | "systemer" | "innhold" | "merkevare";

export interface StonePos {
  left: string;
  top: string;
  width: string;
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
    // Largest anchor stone.
    desktop: { left: "20vw", top: "74vh", width: "clamp(220px, 18vw, 340px)" },
    tablet: { left: "50%", top: "40%", width: "32%" },
    phone: { left: "45%", top: "37%", width: "50%" },
  },
  {
    id: "innhold",
    title: "Innhold",
    description: "Ord, bilder og struktur som gjør verdien lettere å forstå.",
    href: "/tjenester/innhold",
    image: "/nurea-hero/stone-innhold.png",
    priority: true,
    rotation: 2,
    desktop: { left: "14vw", top: "47vh", width: "clamp(180px, 14vw, 270px)" },
    tablet: { left: "28%", top: "25%", width: "27%" },
    phone: { left: "31%", top: "24%", width: "43%" },
  },
  {
    id: "merkevare",
    title: "Merkevare",
    description: "Et tydelig uttrykk før du bygger mer.",
    href: "/tjenester/merkevare",
    image: "/nurea-hero/stone-merkevare.png",
    priority: true,
    rotation: -4,
    desktop: { left: "27vw", top: "29vh", width: "clamp(190px, 15vw, 290px)" },
    tablet: { left: "54%", top: "11%", width: "27%" },
    phone: { left: "67%", top: "13%", width: "40%" },
  },
  {
    id: "systemer",
    title: "Systemer",
    description: "Digitale flyter som gjør hverdagen enklere og mer ryddig.",
    href: "/tjenester/systemer",
    image: "/nurea-hero/stone-systemer.png",
    priority: false,
    rotation: -3,
    desktop: { left: "33vw", top: "55vh", width: "clamp(150px, 12vw, 230px)" },
    tablet: { left: "74%", top: "25%", width: "21%" },
    phone: { left: "74%", top: "27%", width: "33%" },
  },
  {
    id: "reklamer",
    title: "Reklamer",
    description: "Strategiske budskap som gjør synligheten tydeligere.",
    href: "/tjenester/reklamer",
    image: "/nurea-hero/stone-reklamer.png",
    priority: false,
    rotation: 3,
    desktop: { left: "11vw", top: "20vh", width: "clamp(160px, 13vw, 250px)" },
    tablet: { left: "24%", top: "10%", width: "22%" },
    phone: { left: "24%", top: "11%", width: "35%" },
  },
];
