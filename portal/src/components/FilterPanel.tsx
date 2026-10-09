"use client";
import { useEffect, useRef } from "react";

/** スマホでは折りたたみ、PC（lg 以上）では常に開いた状態で表示する絞り込みパネル */
export function FilterPanel({ children, activeCount }: { children: React.ReactNode; activeCount: number }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => ref.current && (ref.current.open = mq.matches || activeCount > 0);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [activeCount]);
  return (
    <details ref={ref} className="card group p-0 lg:sticky lg:top-40" open>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-bold text-ink lg:pointer-events-none [&::-webkit-details-marker]:hidden">
        <span>絞り込み{activeCount > 0 && <span className="ml-2 tag bg-brand-600 text-white">{activeCount}</span>}</span>
        <span className="text-xs font-normal text-muted lg:hidden">タップで開閉</span>
      </summary>
      <div className="border-t border-line p-5">{children}</div>
    </details>
  );
}
