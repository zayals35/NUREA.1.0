/** Placeholder names until client logo files exist; swap spans for imgs later. */
const CLIENTS = ["Metanoia", "Bilmekka", "Møre Marin", "Moustache City", "NUE"];

/** Rolling client belt straight beneath the hero. */
export default function TrustBelt() {
  return (
    <section
      aria-label="Merker vi har jobbet med"
      className="relative overflow-hidden border-y border-cream/10 bg-espresso py-6 md:py-8"
    >
      <div className="belt-mask">
        <div className="belt-track flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-baseline gap-14 pr-14 md:gap-24 md:pr-24"
            >
              {CLIENTS.map((name) => (
                <span
                  key={name}
                  className="display-sans whitespace-nowrap text-xl text-cream/60 md:text-2xl"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
