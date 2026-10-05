import type { SVGProps } from "react";

const PATHS: Record<string, string> = {
  sales: "M3 17l6-6 4 4 8-8M15 7h6v6",
  marketing: "M4 20V10m6 10V4m6 16v-7m6 7H2",
  acquisition: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  recruitment: "M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21a8 8 0 0116 0",
  ec: "M3 4h2l2.4 11.2a1 1 0 001 .8h8.7a1 1 0 001-.8L20 8H6.2M9 20.5a.5.5 0 100-1 .5.5 0 000 1zm8 0a.5.5 0 100-1 .5.5 0 000 1z",
  mna: "M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14",
  funding: "M12 3v18M16.5 7.5C15.7 6.6 14.1 6 12 6c-2.5 0-4 1-4 2.6S9.5 11 12 11.5s4 1.200 4 3-1.600 2.700-4 2.700c-2.200 0-3.800-.7-4.700-1.800",
  other: "M5 12h.01M12 12h.01M19 12h.01",
  search: "M21 21l-4.3-4.3M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
  check: "M5 13l4 4L19 7",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  scale: "M12 3v18M5 7h14M5 7l-3 7a4 4 0 006 0L5 7zm14 0l-3 7a4 4 0 006 0l-3-7z",
  shield: "M12 3l8 3v6c0 4.500-3.400 8-8 9-4.600-1-8-4.500-8-9V6l8-3zM9 12l2 2 4-4",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.500l9 5 9-5",
  compare: "M8 4H4v16h4M16 4h4v16h-4M12 3v18",
  info: "M12 16v-4m0-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z",
};

export function Icon({ name, className = "size-5", ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  const d = PATHS[name] ?? PATHS.other;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
      <path d={d} />
    </svg>
  );
}
