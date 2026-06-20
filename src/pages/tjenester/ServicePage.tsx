import { useParams, Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { PageShell, Skel } from "@/components/PageShell";

const ServicePage = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.id === slug);

  return (
    <PageShell
      eyebrow="Tjeneste"
      title={service?.title ?? "Tjeneste"}
      intro={service?.description ?? "Denne siden er en plassholder for prototypen."}
    >
      <Link
        to="/tjenester"
        style={{ color: "#8a5a2f", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}
      >
        ← Alle tjenester
      </Link>
      <div
        className="mt-10 grid gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        <div style={{ maxWidth: 520 }}>
          <Skel w="100%" h={12} />
          <Skel w="94%" h={12} mt={12} />
          <Skel w="88%" h={12} mt={12} />
          <Skel w="70%" h={12} mt={12} />
        </div>
        <div>
          <Skel w="60%" h={13} />
          <Skel w="42%" h={10} mt={12} />
          <Skel w="50%" h={10} mt={10} />
        </div>
      </div>
    </PageShell>
  );
};

export default ServicePage;
