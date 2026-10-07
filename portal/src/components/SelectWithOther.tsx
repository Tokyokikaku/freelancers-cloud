"use client";
import { useState } from "react";
import { OTHER_OPTION } from "@/lib/lead-options";

/** プルダウン。最後の「その他」を選ぶと自由記述の入力欄が出る */
export function SelectWithOther({
  id,
  name,
  label,
  options,
  defaultValue,
  defaultOther,
  error,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  defaultOther?: string;
  error?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <div>
      <label className="label" htmlFor={id}>{label} <span className="text-xs font-normal text-muted">任意</span></label>
      <select id={id} name={name} value={value} onChange={(e) => setValue(e.target.value)} className="input" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined}>
        <option value="">選択してください</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
        <option value={OTHER_OPTION}>{OTHER_OPTION}（自由記述）</option>
      </select>
      {value === OTHER_OPTION && (
        <input name={`${name}_other`} required maxLength={50} defaultValue={defaultOther} placeholder="内容を入力してください" aria-label={`${label}（その他）`} className="input mt-2" />
      )}
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
