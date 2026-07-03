import { useEffect, useState } from "react";
import { sound } from "../lib/sound";

export default function SoundToggle() {
  const [on, setOn] = useState(sound.enabled);

  useEffect(() => sound.subscribe(setOn), []);

  return (
    <button
      type="button"
      onClick={() => sound.toggle()}
      aria-pressed={on}
      aria-label={on ? "Skru av lyd" : "Skru på lyd"}
      className="group flex h-10 items-center gap-2 rounded-full border border-current/20 px-4 text-[11px] font-semibold tracking-[0.18em] uppercase opacity-80 transition-opacity hover:opacity-100"
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
      Lyd {on ? "på" : "av"}
    </button>
  );
}
