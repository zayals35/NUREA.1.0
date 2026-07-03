import { Howl } from "howler";

const KEY = "nurea-sound";

type SfxName = "hover" | "click" | "enter";

const DEFS: Record<SfxName, { src: string; volume: number; minGapMs: number }> = {
  hover: { src: "/sound/tap-hover.mp3", volume: 0.14, minGapMs: 90 },
  click: { src: "/sound/tap-click.mp3", volume: 0.3, minGapMs: 120 },
  enter: { src: "/sound/tap-enter.mp3", volume: 0.2, minGapMs: 900 },
};

const howls: Partial<Record<SfxName, Howl>> = {};
const lastPlayed: Record<SfxName, number> = { hover: 0, click: 0, enter: 0 };
const listeners = new Set<(on: boolean) => void>();

let enabled = false;
try {
  enabled = localStorage.getItem(KEY) === "on";
} catch {
  /* storage unavailable */
}

function ensureLoaded() {
  for (const name of Object.keys(DEFS) as SfxName[]) {
    if (!howls[name]) {
      howls[name] = new Howl({ src: [DEFS[name].src], volume: DEFS[name].volume });
    }
  }
}

if (enabled) ensureLoaded();

export const sound = {
  get enabled() {
    return enabled;
  },
  toggle(): boolean {
    enabled = !enabled;
    try {
      localStorage.setItem(KEY, enabled ? "on" : "off");
    } catch {
      /* storage unavailable */
    }
    if (enabled) {
      ensureLoaded();
      // Toggling is a user gesture, so this also unlocks the audio context.
      sound.play("click");
    }
    listeners.forEach((fn) => fn(enabled));
    return enabled;
  },
  play(name: SfxName) {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastPlayed[name] < DEFS[name].minGapMs) return;
    lastPlayed[name] = now;
    howls[name]?.play();
  },
  subscribe(fn: (on: boolean) => void): () => void {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
