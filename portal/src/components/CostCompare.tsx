/** 固定費型と成果報酬型の費用の出方を比べるイメージ図（実際の金額ではありません） */
const MONTHS = ["1", "2", "3", "4", "5", "6"];

function Chart({ filled, label, bar }: { filled: number[]; label: string; bar: string }) {
  return (
    <div role="img" aria-label={label}>
      <div className="grid h-36 grid-cols-6 items-end gap-2 border-b border-ink">
        {MONTHS.map((m, i) => (
          <div key={m} className="flex h-full flex-col items-center justify-end">
            {filled[i] ? <div className={`w-full ${bar}`} style={{ height: `${filled[i]}%` }} /> : <span className="mb-1 text-xs font-bold text-good-700">0円</span>}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-6 gap-2 text-center text-[11px] text-muted">{MONTHS.map((m) => <span key={m}>{m}か月目</span>)}</div>
    </div>
  );
}

export function CostCompare() {
  return (
    <figure>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-muted">固定費で外注すると</p>
          <p className="mb-5 mt-1 font-serif text-xl font-bold text-ink">成果が出なくても、毎月支払う</p>
          <Chart filled={[70, 70, 70, 70, 70, 70]} label="固定費型は毎月同じ額の費用が発生するイメージ" bar="bg-[#b9b2a3]" />
        </div>
        <div>
          <p className="text-sm font-bold text-brand-700">成果報酬で外注すると</p>
          <p className="mb-5 mt-1 font-serif text-xl font-bold text-ink">実績が出た分だけ、支払う</p>
          <Chart filled={[0, 0, 0, 55, 0, 75]} label="成果報酬型は実績が発生した分だけ費用が発生するイメージ" bar="bg-brand-600" />
        </div>
      </div>
      <figcaption className="mt-5 text-xs text-muted">※ 費用の出方を示すイメージ図です。実際の料金体系はサービスごとに異なります。</figcaption>
    </figure>
  );
}
