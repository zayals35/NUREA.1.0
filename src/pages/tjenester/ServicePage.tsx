import { useParams, Link } from "react-router-dom";
import { SERVICES } from "@/data/services";

const ServicePage = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.id === slug);

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-slate-900 px-6 md:px-16 py-20">
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">← Tilbake</Link>
      <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-[hsl(var(--gold))]">Tjeneste</p>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">
        {service?.title ?? "Tjeneste"}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        {service?.description ?? "Denne siden er en plassholder for prototypen."}
      </p>
    </main>
  );
};

export default ServicePage;
