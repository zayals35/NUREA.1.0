import { useState } from "react";
import Reveal from "../Reveal";
import { FAQ, type FaqItem } from "../../data/faq";
import { sound } from "../../lib/sound";
import { useLang, type Lang } from "../../i18n";

const T: Record<Lang, { heading: string }> = {
  no: { heading: "Spørsmål vi ofte får." },
  en: { heading: "Questions we often get." },
};

export function FaqList({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const border = dark ? "border-cream/12" : "border-ink/10";
  const muted = dark ? "text-cream/75" : "text-ink/70";

  return (
    <div className={`border-t ${border}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`border-b ${border}`}>
            <button
              type="button"
              onClick={() => {
                sound.play("click");
                setOpen(isOpen ? null : i);
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
            >
              <span className="display-sans text-lg md:text-2xl">{f.q}</span>
              <span
                aria-hidden="true"
                className={`relative h-5 w-5 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-accent" />
                <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-accent" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`max-w-[68ch] pb-8 text-sm leading-relaxed md:text-base ${muted}`}>
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqSection() {
  const { lang } = useLang();
  return (
    <section className="grain relative overflow-hidden bg-parchment-alt text-ink">
      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <Reveal>
            <p className="eyebrow text-ink/70">FAQ</p>
            <h2 className="display mt-6 text-4xl md:text-5xl">
              {T[lang].heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList items={FAQ[lang].filter((f) => f.home).slice(0, 4)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
