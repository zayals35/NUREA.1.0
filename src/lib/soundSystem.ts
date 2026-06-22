// soundSystem.ts — Monolog-style tap sounds (Howler), sound-only.
// The hover visuals + binding live in hoverEffect.ts.

import { Howl, Howler } from "howler";

const VOLUME = 0.15;
const COOLDOWN_MS = 80;

let sounds: Howl[] | null = null;
let lastPlayedAt = 0;
let audioUnlocked = false;

function initSounds() {
  if (sounds) return;
  sounds = [
    new Howl({ src: ["/sound/tap_01.wav"], volume: VOLUME, preload: true }),
    new Howl({ src: ["/sound/tap_02.wav"], volume: VOLUME, preload: true }),
    new Howl({ src: ["/sound/tap_03.wav"], volume: VOLUME, preload: true }),
    new Howl({ src: ["/sound/tap_04.mp3"], volume: VOLUME, preload: true }),
    new Howl({ src: ["/sound/tap_05.ogg"], volume: VOLUME, preload: true }),
    new Howl({ src: ["/sound/tap_06.wav"], volume: VOLUME, preload: true }),
  ];
}

function unlockAudio() {
  if (audioUnlocked) return;
  initSounds();

  if (Howler.ctx && Howler.ctx.state === "suspended") {
    Howler.ctx.resume();
  }

  // Silent burst to wake the AudioContext on the first gesture.
  const silent = new Howl({ src: ["/sound/tap_01.wav"], volume: 0 });
  silent.play();
  silent.on("play", () => silent.stop());

  audioUnlocked = true;
}

export function playHover() {
  if (!audioUnlocked) return;
  const now = Date.now();
  if (now - lastPlayedAt < COOLDOWN_MS) return;
  lastPlayedAt = now;

  initSounds();
  sounds![Math.floor(Math.random() * sounds!.length)].play();
}

export function initSoundSystem() {
  document.addEventListener("click", unlockAudio, { once: true });
  document.addEventListener("touchstart", unlockAudio, { once: true });
}
