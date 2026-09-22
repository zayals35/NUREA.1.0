import { useLang } from "../../i18n";

type Mark = { id: string; name: string; src: string; h: string };

const MARKS: Mark[] = [
  { id: "metanoia", name: "Metanoia", src: "/logos/metanoia.png", h: "h-[30px] md:h-[38px]" },
  { id: "bilmekka", name: "Bilmekka", src: "/logos/bilmekka.svg", h: "h-[14px] md:h-[18px]" },
  { id: "moremarin", name: "Møre Marin", src: "/logos/moremarin.png", h: "h-[28px] md:h-[36px]" },
  { id: "gizay", name: "GIZAY", src: "/logos/gizay.svg", h: "h-[20px] md:h-[26px]" },
];

/** Rolling client belt straight beneath the hero. */
export default function TrustBelt() {
  const { lang } = useLang();
  return (
    <section
      aria-label={lang === "no" ? "Merker vi har jobbet med" : "Brands we have worked with"}
      className="relative overflow-hidden border-y border-ink/15 bg-parchment py-7 md:py-9"
    >
      <div className="belt-mask">
        <div className="belt-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-14 pr-14 md:gap-24 md:pr-24"
            >
              {MARKS.map((mark) => (
                <img
                  key={mark.id}
                  src={mark.src}
                  alt={copy === 0 ? mark.name : ""}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`w-auto shrink-0 select-none opacity-85 [filter:brightness(0)] ${mark.h}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
