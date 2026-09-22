import { useId } from "react";
import { NureaSymbol } from "../brand/NureaLogo";

/** Material studies using the final symbol unchanged as a mask. */
export default function HeroArtwork({ variant }: { variant: number }) {
  const id = useId().replace(/:/g, "");
  const mask = `${id}-n`;
  const surface = `${id}-surface`;
  const grain = `${id}-grain`;
  return (
    <svg viewBox="45 25 445 470" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="550" height="550"><NureaSymbol width="512" height="512" style={{ color: "white" }} /></mask>
        <linearGradient id={surface} x1="80" y1="80" x2="430" y2="420" gradientUnits="userSpaceOnUse">
          {variant === 1 ? <><stop stopColor="#A5B7DD" /><stop offset=".22" stopColor="#2849A3" /><stop offset=".46" stopColor="#10285D" /><stop offset=".58" stopColor="#7196DD" /><stop offset=".8" stopColor="#2849A3" /><stop offset="1" stopColor="#10214E" /></> : <><stop stopColor="#F5F4F0" /><stop offset=".33" stopColor="#AAA5A0" /><stop offset=".47" stopColor="#F5F4F0" /><stop offset=".71" stopColor="#78716D" /><stop offset="1" stopColor="#E8E6DF" /></>}
        </linearGradient>
        <filter id={grain} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="7" /><feColorMatrix type="saturate" values="0" /><feBlend in="SourceGraphic" mode="multiply" /></filter>
      </defs>
      {(variant === 1 || variant === 5) && Array.from({ length: 8 }, (_, i) => <g key={i} transform={`translate(${(8 - i) * 2.3} ${(8 - i) * 1.2})`}><NureaSymbol width="512" height="512" style={{ color: variant === 1 ? "#10214E" : "#78716D" }} /></g>)}
      <g mask={`url(#${mask})`}>
        {variant === 0 && <>
          <rect width="550" height="550" fill="#201D1D" />
          <g transform="rotate(-15 256 256)" fill="#F5F4F0" fontFamily="Cabinet Grotesk, sans-serif" fontWeight="800" fontSize="54" letterSpacing="-2">
            {Array.from({ length: 10 }, (_, i) => <text x={i % 2 ? "40" : "-20"} y={i * 55} key={i}>nurea nurea nurea</text>)}
          </g>
        </>}
        {variant === 1 && <><rect width="550" height="550" fill={`url(#${surface})`} /><path d="M0 120C210-60 160 360 540 180M0 164C210-16 160 404 540 224M0 208C210 28 160 448 540 268" stroke="#F5F4F0" strokeOpacity=".19" strokeWidth="2" /></>}
        {variant === 2 && <>
          <rect width="550" height="550" fill="#F5F4F0" />
          {Array.from({ length: 18 }, (_, i) => { const x = 65 + (i % 4) * 125; const y = 40 + Math.floor(i / 4) * 120; return <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}><path d="M0 65Q-54 18 0-58Q54 18 0 65Z" fill={i % 3 === 0 ? "#D8CF55" : "#2849A3"} /><path d="M0 58V-49M0 30L-20 7M0 7L20-16M0-16L-12-33" stroke="#F5F4F0" strokeWidth="2" /></g>; })}
        </>}
        {variant === 3 && <>
          <rect width="550" height="550" fill="#2849A3" />
          {Array.from({ length: 169 }, (_, i) => <rect key={i} x={(i % 13) * 40} y={Math.floor(i / 13) * 40} width="40" height="40" fill={(i * 17 + Math.floor(i / 13) * 7) % 11 < 4 ? "#F5F4F0" : (i * 13) % 7 < 2 ? "#D8CF55" : "#2849A3"} />)}
        </>}
        {variant === 4 && <>
          <rect width="550" height="550" fill="#F5F4F0" />
          <path d="M0 200L520 45V240L0 395Z" fill="#2849A3" /><path d="M0 40L180 0 550 340 360 460Z" fill="#8C0608" />
          <g transform="rotate(-16 256 256)"><rect x="0" y="260" width="550" height="76" fill="#D8CF55" /><text x="24" y="321" fill="#201D1D" fontFamily="Cabinet Grotesk, sans-serif" fontWeight="900" fontSize="70">VIS DET.</text></g>
          <g fill="#201D1D">{Array.from({ length: 12 }, (_, i) => <rect key={i} x="300" y={i * 7 + 70} width={110 - i * 3} height="2" />)}</g>
        </>}
        {variant === 5 && <><rect width="550" height="550" fill={`url(#${surface})`} /><rect width="550" height="550" fill="#F5F4F0" filter={`url(#${grain})`} opacity=".22" /><path d="M100 0L450 550M135 0L485 550" stroke="#F5F4F0" strokeWidth="1" strokeOpacity=".7" /></>}
      </g>
    </svg>
  );
}
