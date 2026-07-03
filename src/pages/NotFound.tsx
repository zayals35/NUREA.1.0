import { useEffect } from "react";
import Button from "../components/Button";

export default function NotFound() {
  useEffect(() => {
    document.title = "Siden finnes ikke · NUREA";
  }, []);

  return (
    <main className="grain relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center text-cream">
      <p className="eyebrow relative z-[2] text-accent">404</p>
      <h1 className="display relative z-[2] mt-6 text-4xl md:text-6xl">
        Denne siden finnes ikke.
      </h1>
      <p className="relative z-[2] mt-6 max-w-[44ch] text-base leading-relaxed text-cream/70">
        Kanskje lenken er gammel, eller kanskje noe ble skrevet feil. Det
        viktigste finner du uansett på forsiden.
      </p>
      <div className="relative z-[2] mt-10">
        <Button to="/">Til forsiden</Button>
      </div>
    </main>
  );
}
