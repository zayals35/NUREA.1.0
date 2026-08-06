import { useEffect, useState } from "react";
import { sound } from "../lib/sound";
import { useLang } from "../i18n";

export default function SoundToggle() {
  const [on, setOn] = useState(sound.enabled);
  const { lang } = useLang();

  useEffect(() => sound.subscribe(setOn), []);

  const label =
    lang === "no" ? (on ? "Skru av lyd" : "Skru på lyd") : on ? "Turn sound off" : "Turn sound on";

  return (
    <button
      type="button"
      onClick={() => sound.toggle()}
      aria-pressed={on}
      aria-label={label}
      className="mono group flex h-10 items-center gap-2 border border-current/25 px-4 text-[11px] tracking-[0.18em] opacity-80 transition-opacity hover:opacity-100"
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0.5, 1, 0.7].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-current transition-transform duration-300 origin-bottom ${
              on ? "animate-[eq_1s_ease-in-out_infinite]" : "scale-y-[0.35]"
            }`}
            style={{ height: `${h * 12}px`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      {lang === "no" ? `Lyd ${on ? "på" : "av"}` : `Sound ${on ? "on" : "off"}`}
    </button>
  );
}
