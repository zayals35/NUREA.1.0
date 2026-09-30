import { useLang } from "../../i18n";
import { STUDIO, type WorkPiece } from "../../data/studioSite";
import CaseVideo from "./CaseVideo";

/**
 * The editorial gallery, one case per client: the desktop recording and the
 * phone recording sit together, so each company appears once. The visible
 * "visit" action over the desktop recording is a real link, shown on hover
 * or focus with a pointer and always on touch screens; the play controls stay
 * separate buttons. The caption carries the client, the task and one factual
 * sentence. Cases alternate sides on desktop.
 */
export default function WorkGallery({ pieces }: { pieces: WorkPiece[] }) {
  const { lang } = useLang();
  const t = STUDIO[lang].work;
  const cases: WorkPiece[][] = [];
  for (const piece of pieces) {
    const group = cases.find((c) => c[0].client === piece.client);
    if (group) group.push(piece);
    else cases.push([piece]);
  }
  return (
    <div className="st-gallery">
      {cases.map((group, i) => {
        const wide = group.find((g) => g.orientation === "wide") ?? group[0];
        const tall = group.find((g) => g !== wide);
        const copy = t.cases[wide.client];
        return (
          <figure key={wide.client} className={`st-case${i % 2 ? " flip" : ""}`} data-rv>
            <div className="st-case-wide">
              <div className={`st-media ${wide.orientation}`}>
                <CaseVideo clip={wide.clip} label={`${wide.client}, ${wide.domain}, ${t.desktop}`} />
                <a className="st-cut paper st-act" href={wide.url} target="_blank" rel="noopener">
                  <span>
                    {t.visit} {wide.domain}
                  </span>
                  <b aria-hidden="true">
                    <i>↗</i>
                  </b>
                </a>
              </div>
            </div>
            {tall && (
              <div className="st-case-tall">
                <div className={`st-media ${tall.orientation}`}>
                  <CaseVideo clip={tall.clip} label={`${tall.client}, ${tall.domain}, ${t.phone}`} />
                </div>
              </div>
            )}
            <figcaption className="st-caption">
              <span className="st-client">{wide.client}</span>
              <span className="st-label st-task">{copy.task}</span>
              <p>{copy.caption}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
