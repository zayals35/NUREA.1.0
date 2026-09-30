import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";
import { NureaWordmark } from "./brand/NureaLogo";

const KEY = "nurea-intro-seen";

/** Short one-time page-load curtain. Text under it paints immediately. */
export default function Intro() {
  const [phase, setPhase] = useState<"hold" | "leaving" | "gone">(() => {
    try {
      if (sessionStorage.getItem(KEY) || prefersReducedMotion()) return "gone";
    } catch {
      /* ignore */
    }
    return "hold";
  });

  useEffect(() => {
    if (phase !== "hold") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    const t1 = setTimeout(() => setPhase("leaving"), 850);
    const t2 = setTimeout(() => setPhase("gone"), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-accent transition-transform duration-[900ms] will-change-transform"
      style={{
        transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <NureaWordmark
        className="h-10 w-auto text-parchment"
        style={{ animation: "fade-up-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
        aria-label="Nurea"
      />
      <style>{`@keyframes fade-up-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
