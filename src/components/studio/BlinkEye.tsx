import { forwardRef } from "react";

/**
 * A drawn eye in the Insights ink language: imperfect double contour, sparse
 * hatching, a blue iris with a paper highlight. The lid is the card's own
 * colour and sits above the eye (translate -260) until the scroll timeline
 * in StackCards moves it down for a blink. Only transform ever moves. With
 * no timeline (reduced motion, or GSAP never starting) the eye is open.
 */
const BlinkEye = forwardRef<SVGSVGElement, { title?: string; className?: string }>(function BlinkEye({ title, className = "" }, ref) {
  return (
    <svg ref={ref} className={`st-eye ${className}`} viewBox="0 0 400 260" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">
      <defs>
        <clipPath id="st-eye-clip">
          <path d="M28 130 C 108 22, 292 22, 372 130 C 292 238, 108 238, 28 130 Z" />
        </clipPath>
      </defs>
      {/* the white of the eye */}
      <path d="M28 130 C 108 22, 292 22, 372 130 C 292 238, 108 238, 28 130 Z" fill="var(--paper)" />
      {/* iris and pupil, moved by the gaze */}
      <g className="st-eye-gaze" clipPath="url(#st-eye-clip)">
        <circle cx="200" cy="130" r="58" fill="var(--blue)" />
        <g stroke="var(--ink)" strokeWidth="2" opacity="0.35" strokeLinecap="round">
          <path d="M200 76 L200 92 M254 116 L240 120 M244 168 L232 160 M158 166 L170 158 M146 118 L160 122 M226 82 L220 96 M176 82 L182 96" />
        </g>
        <circle cx="200" cy="130" r="27" fill="var(--ink)" />
        <circle cx="181" cy="111" r="10" fill="var(--paper)" />
        <circle cx="219" cy="150" r="4" fill="var(--paper)" opacity="0.8" />
      </g>
      {/* the lid: card colour, parked above the eye, brought down for each blink */}
      <g clipPath="url(#st-eye-clip)">
        <path className="st-eye-lid" transform="translate(0 -260)" d="M28 130 C 108 22, 292 22, 372 130 C 292 238, 108 238, 28 130 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="8" strokeLinejoin="round" />
      </g>
      {/* contours: one confident line, one lighter offset line, like dip-pen ink */}
      <path d="M28 130 C 108 22, 292 22, 372 130 C 292 238, 108 238, 28 130 Z" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M34 132 C 112 30, 288 30, 366 132" fill="none" stroke="var(--ink)" strokeWidth="3" opacity="0.55" strokeLinecap="round" />
      {/* lashes, top right, and a little hatching under the eye */}
      <g stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M300 54 L318 32" />
        <path d="M330 72 L352 56" />
        <path d="M350 98 L376 90" />
      </g>
      <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <path d="M70 176 L84 190 M92 190 L104 202 M116 200 L126 210 M290 206 L302 196 M312 198 L326 186" />
      </g>
    </svg>
  );
});

export default BlinkEye;
