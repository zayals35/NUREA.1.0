import type { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";
import { sound } from "../lib/sound";

interface Props {
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-dark";
  type?: "button" | "submit";
  className?: string;
}

const BASE =
  "inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-[transform,box-shadow,background-color,color] duration-200 will-change-transform";

const VARIANTS = {
  primary:
    "bg-accent text-cream hover:bg-[#9c6836] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:shadow-[0_10px_36px_rgba(138,90,47,0.35)]",
  ghost:
    "border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5",
  "ghost-dark":
    "border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/5",
};

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  type,
  className = "",
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const handleClick = (e: MouseEvent) => {
    sound.play("click");
    onClick?.(e);
  };

  const inner = to ? (
    <Link to={to} className={cls} onClick={handleClick}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={cls} onClick={handleClick}>
      {children}
    </a>
  ) : (
    <button type={type ?? "button"} className={cls} onClick={handleClick}>
      {children}
    </button>
  );

  return <Magnetic className="inline-block">{inner}</Magnetic>;
}
