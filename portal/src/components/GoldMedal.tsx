/** 掲載規模の実績バッジ。左右の月桂樹と大きな数字だけのシンプルな受賞表記 */
function Laurel({ flip }: { flip?: boolean }) {
  const leaves = [
    [14, 84, -62], [10, 70, -52], [8, 56, -42], [8, 42, -30], [11, 29, -18], [17, 17, -6],
  ];
  return (
    <svg viewBox="0 0 34 100" className={`h-full w-auto ${flip ? "-scale-x-100" : ""}`} aria-hidden="true">
      <path d="M26 96 C10 78 6 40 24 6" fill="none" stroke="#b8892a" strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y} rx="3.6" ry="9" transform={`rotate(${r} ${x} ${y})`} fill="#c9a043" />
          <ellipse cx={x + 11} cy={y + 4} rx="3" ry="7.5" transform={`rotate(${r + 70} ${x + 11} ${y + 4})`} fill="#dcbb68" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export function GoldMedal({ label, value, unit }: { label: string; value: number | string; unit: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2" role="img" aria-label={`${label} ${value}${unit}`}>
      <div className="h-[4.6rem] sm:h-[5.4rem]"><Laurel /></div>
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-wide text-[#8a6310] sm:text-xs">{label}</p>
        <p className="mt-0.5 flex items-baseline justify-center leading-none text-navy-950">
          <b className="text-[2.6rem] font-black tracking-tight sm:text-[3.2rem]">{value}</b>
          <span className="ml-0.5 text-sm font-black sm:text-lg">{unit}</span>
        </p>
        <p className="mt-1 text-[10px] tracking-[0.35em] text-[#c9a043]">★★★</p>
      </div>
      <div className="h-[4.6rem] sm:h-[5.4rem]"><Laurel flip /></div>
    </div>
  );
}
