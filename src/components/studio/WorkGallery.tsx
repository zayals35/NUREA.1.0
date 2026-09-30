import { useLang } from "../../i18n";
import { STUDIO, type WorkPiece } from "../../data/studioSite";
import CaseVideo from "./CaseVideo";

const SLOT = ["lead", "n2", "n3", "n4"];

/**
 * The editorial gallery: an offset lead recording, unequal pairs, captions
 * below the media. The visible "visit" action over the recording is a real
 * link, shown on hover or focus with a pointer and always on touch screens;
 * the play control stays a separate button. The caption carries the client,
 * the task and one factual sentence.
 */
export default function WorkGallery({ pieces, home = false }: { pieces: WorkPiece[]; home?: boolean }) {
  const { lang } = useLang();
  const t = STUDIO[lang].work;
  return (
    <div className={`st-gallery${home ? " home" : ""}`}>
      {pieces.map((piece, i) => {
        const copy = t.pieces[piece.id];
        return (
          <figure key={piece.id} className={`st-piece ${SLOT[i] ?? ""}`} data-rv>
            <div className={`st-media ${piece.orientation}`}>
              <CaseVideo clip={piece.clip} label={`${piece.client}, ${piece.domain}`} />
              <a className="st-cut paper st-act" href={piece.url} target="_blank" rel="noopener">
                <span>
                  {t.visit} {piece.domain}
                </span>
                <b aria-hidden="true">
                  <i>↗</i>
                </b>
              </a>
            </div>
            <figcaption className="st-caption">
              <span className="st-client">{piece.client}</span>
              <span className="st-label st-task">{copy.task}</span>
              <p>{copy.caption}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
