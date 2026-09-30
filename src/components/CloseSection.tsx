import type { ReactNode } from "react";
import Button from "./Button";
import Reveal from "./Reveal";

interface Props {
  heading: string;
  primary: { to: string; label: string };
  secondary: { to: string; label: string };
  children?: ReactNode;
}

/**
 * The red close every inner page ends on: the question in the poster voice,
 * one paper pill, one text link, and room for a "next" line under them.
 */
export default function CloseSection({ heading, primary, secondary, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent text-parchment">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal sfx>
          <h2 className="poster max-w-[14ch] text-[clamp(2.4rem,10vw,4rem)] md:text-[clamp(3.6rem,6.4vw,6.4rem)]">
            {heading}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Button to={primary.to} variant="paper">{primary.label}</Button>
            <Button to={secondary.to} variant="link" className="text-parchment">
              {secondary.label}
            </Button>
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
