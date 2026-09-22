import type { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";
import { sound } from "../lib/sound";

interface Props {
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-dark" | "paper" | "link";
  type?: "button" | "submit";
  className?: string;
}

/**
 * Buttons are pills set in Nippo, sentence case (r4, her 2026-09-23 revise:
 * no rectangles, no tracked small caps). `link` is the quiet second action:
 * bare text with an underline that draws on hover, no box at all.
 */
const BASE =
  "font-mono inline-flex items-center justify-center gap-2 text-[15px] font-medium tracking-[0.01em] transition-[transform,box-shadow,background-color,color,border-color] duration-200 will-change-transform";

const PILL = "rounded-full px-7 py-3.5";

const VARIANTS = {
  primary: `${PILL} bg-accent text-parchment hover:bg-ink`,
  ghost: `${PILL} border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/10`,
  "ghost-dark": `${PILL} border border-ink/30 text-ink hover:border-ink hover:bg-ink/5`,
  paper: `${PILL} bg-parchment text-accent hover:bg-ink hover:text-parchment`,
  link: "link-line py-2 text-ink",
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
