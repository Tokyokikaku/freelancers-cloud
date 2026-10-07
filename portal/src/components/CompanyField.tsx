"use client";
import { useEffect, useId, useRef, useState } from "react";

interface Suggestion { number: string; name: string; address: string }

/**
 * 会社名入力。国税庁の法人番号APIで候補を出す（HOUJIN_BANGOU_APP_ID 設定時のみ）。
 * 候補から選ぶと法人番号が付き、実在確認済みとして扱う。候補にない場合は自由入力のまま送信できる。
 */
export function CompanyField({
  enabled,
  defaultValue,
  defaultNumber,
  invalid,
  describedBy,
}: {
  enabled: boolean;
  defaultValue?: string;
  defaultNumber?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const [value, setValue] = useState(defaultValue ?? "");
  const [number, setNumber] = useState(defaultNumber ?? "");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const q = value.trim();
    if (q.length < 2 || number) {
      setItems([]);
      setSearched(false);
      return;
    }
    const id = ++seq.current;
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/company-suggest?q=${encodeURIComponent(q)}`);
        const json = (await res.json()) as { items?: Suggestion[] };
        if (id !== seq.current) return;
        setItems(json.items ?? []);
        setSearched(true);
        setActive(-1);
        setOpen(true);
      } catch {
        if (id === seq.current) setItems([]);
      } finally {
        if (id === seq.current) setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [value, number, enabled]);

  const pick = (s: Suggestion) => {
    seq.current++;
    setValue(s.name);
    setNumber(s.number);
    setItems([]);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <input
        id="req-company"
        name="company"
        required
        maxLength={100}
        autoComplete="organization"
        value={value}
        onChange={(e) => { setValue(e.target.value); setNumber(""); }}
        onFocus={() => items.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        role={enabled ? "combobox" : undefined}
        aria-expanded={enabled ? open && items.length > 0 : undefined}
        aria-controls={enabled ? listId : undefined}
        aria-autocomplete={enabled ? "list" : undefined}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        placeholder={enabled ? "会社名を入力すると候補が表示されます" : undefined}
        className="input"
      />
      <input type="hidden" name="corporate_number" value={number} />
      {enabled && (
        <>
          {number ? (
            <p className="mt-1 flex items-center gap-1 text-xs font-bold text-good-700">
              <span aria-hidden>✓</span>法人番号 {number} を確認しました
            </p>
          ) : (
            <p className="mt-1 text-xs text-muted">{loading ? "候補を検索しています…" : "候補から選ぶと、実在する法人として確認されます（個人事業主・候補にない場合はそのまま入力できます）"}</p>
          )}
          {open && items.length > 0 && (
            <ul id={listId} role="listbox" className="absolute left-0 right-0 z-20 mt-1 max-h-72 overflow-auto rounded-md border border-line bg-white shadow-lg">
              {items.map((s, i) => (
                <li
                  key={s.number}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                  onMouseEnter={() => setActive(i)}
                  className={`cursor-pointer border-b border-line px-3 py-2 last:border-b-0 ${i === active ? "bg-brand-50" : ""}`}
                >
                  <span className="block text-sm font-bold text-ink">{s.name}</span>
                  <span className="block text-xs text-muted">{s.address || "所在地不明"}　法人番号 {s.number}</span>
                </li>
              ))}
            </ul>
          )}
          {open && searched && !loading && items.length === 0 && value.trim().length >= 2 && (
            <p className="mt-1 text-xs text-muted">該当する法人が見つかりませんでした。このまま入力して送信できます。</p>
          )}
        </>
      )}
    </div>
  );
}
