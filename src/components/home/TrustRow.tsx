import Reveal from "../Reveal";
import { sound } from "../../lib/sound";

const CLIENTS = ["Metanoia", "Bilmekka", "Møre Marin", "Moustache City", "NUE"];

export default function TrustRow() {
  return (
    <section className="bg-parchment text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow text-accent">Merker vi har jobbet med</p>
        </Reveal>
        <Reveal
          className="mt-10 flex flex-wrap items-baseline gap-x-12 gap-y-6 md:gap-x-16"
          stagger={0.08}
        >
          {CLIENTS.map((name) => (
            <span
              key={name}
              onMouseEnter={() => sound.play("hover")}
              className="display cursor-default text-2xl text-ink/45 transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-ink md:text-4xl"
            >
              {name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
