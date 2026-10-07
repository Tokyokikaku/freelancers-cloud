import { useId } from "react";

/** 金賞メダル風の数値バッジ。月桂樹・金のグラデーション・リボン付き */
export function GoldMedal({ label, value, unit }: { label: string; value: number | string; unit: string }) {
  const uid = useId().replace(/:/g, "");
  const cx = 110;
  const cy = 104;
  const R = 86;
  // 月桂樹の葉（左右対称）
  const leaves: { x: number; y: number; rot: number; k: string }[] = [];
  for (let i = 0; i < 9; i++) {
    const a = (205 - i * 13) * (Math.PI / 180); // 左側: 下から上へ
    const x = cx + R * Math.cos(a);
    const y = cy - R * Math.sin(a);
    const rot = 90 - (205 - i * 13) + 18;
    leaves.push({ x, y, rot, k: `l${i}` });
    leaves.push({ x: 2 * cx - x, y, rot: -rot, k: `r${i}` });
  }
  return (
    <div className="relative mx-auto aspect-[220/250] w-[8rem] sm:w-[9rem]" role="img" aria-label={`${label} ${value}${unit}`}>
      <svg viewBox="0 0 220 250" className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}g`} cx="35%" cy="28%" r="85%">
            <stop offset="0" stopColor="#fff6c2" />
            <stop offset="0.35" stopColor="#f6d155" />
            <stop offset="0.75" stopColor="#d9a21c" />
            <stop offset="1" stopColor="#b57a0a" />
          </radialGradient>
          <linearGradient id={`${uid}l`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f7d96a" />
            <stop offset="1" stopColor="#bf8710" />
          </linearGradient>
          <linearGradient id={`${uid}r`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f6fd0" />
            <stop offset="1" stopColor="#0b4a9c" />
          </linearGradient>
        </defs>
        {/* リボン */}
        <path d="M70 168 L52 244 L82 230 L100 246 L112 176 Z" fill={`url(#${uid}r)`} />
        <path d="M150 168 L168 244 L138 230 L120 246 L108 176 Z" fill={`url(#${uid}r)`} opacity="0.92" />
        {/* 月桂樹 */}
        {leaves.map((l) => (
          <ellipse key={l.k} cx={l.x} cy={l.y} rx="5.6" ry="13" transform={`rotate(${l.rot} ${l.x} ${l.y})`} fill={`url(#${uid}l)`} />
        ))}
        {/* メダル本体 */}
        <circle cx={cx} cy={cy} r="70" fill={`url(#${uid}g)`} stroke="#a8730a" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="61" fill="none" stroke="#fff3b8" strokeWidth="2" opacity="0.9" />
        <circle cx={cx} cy={cy} r="57" fill="none" stroke="#b9820f" strokeWidth="1" opacity="0.5" />
        {/* 光沢 */}
        <path d="M58 78 A56 56 0 0 1 126 46" fill="none" stroke="#fffbe0" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        {/* 上部の星 */}
        <path d="M110 6 l5.2 10.6 11.7 1.7 -8.5 8.2 2 11.6 -10.4 -5.5 -10.4 5.5 2 -11.6 -8.5 -8.2 11.7 -1.7z" fill="#f6d155" stroke="#a8730a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-x-0 top-[31%] flex flex-col items-center text-[#4a2f00]">
        <span className="text-[10px] font-black leading-none tracking-wide sm:text-[12px]">{label}</span>
        <span className="mt-1.5 flex items-baseline leading-none">
          <b className="text-[1.85rem] font-black tracking-tight sm:text-[2.15rem]">{value}</b>
          <span className="ml-0.5 text-xs font-black sm:text-sm">{unit}</span>
        </span>
      </div>
    </div>
  );
}
