/** 固定費型と成果報酬型の費用の出方を比べるイメージ図（実際の金額ではありません） */
const MONTHS = ["1か月目", "2か月目", "3か月目", "4か月目", "5か月目", "6か月目"];

export function CostCompare() {
  return (
    <figure className="card overflow-hidden">
      <div className="grid gap-px bg-line md:grid-cols-2">
        <div className="bg-white p-5 sm:p-7">
          <p className="tag bg-slate-100 text-slate-600">固定費型</p>
          <p className="mt-3 text-lg font-bold text-ink">成果が出ても出なくても、毎月費用が発生</p>
          <div className="mt-6 grid h-40 grid-cols-6 items-end gap-2" role="img" aria-label="固定費型は毎月同じ額の費用が発生するイメージ">
            {MONTHS.map((m) => (
              <div key={m} className="flex h-full flex-col justify-end">
                <div className="rounded-t-md bg-slate-300" style={{ height: "70%" }} />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-6 gap-2 text-center text-[10px] text-muted">{MONTHS.map((m) => <span key={m}>{m.replace("目", "")}</span>)}</div>
          <p className="mt-4 text-sm text-muted">成果が出る前から費用がかかり、結果が出なかった場合も回収できません。</p>
        </div>
        <div className="bg-brand-50/60 p-5 sm:p-7">
          <p className="tag bg-brand-600 text-white">成果報酬型</p>
          <p className="mt-3 text-lg font-bold text-ink">成果が出るまで<span className="marker">0円</span>、出たときだけ支払い</p>
          <div className="mt-6 grid h-40 grid-cols-6 items-end gap-2" role="img" aria-label="成果報酬型は成果が発生した月だけ費用が発生するイメージ">
            {MONTHS.map((m, i) => (
              <div key={m} className="flex h-full flex-col items-center justify-end">
                {i === 3 || i === 5 ? (
                  <div className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-500" style={{ height: i === 3 ? "52%" : "70%" }} />
                ) : (
                  <span className="mb-1 text-xs font-bold text-mint-500">0円</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-6 gap-2 text-center text-[10px] text-muted">{MONTHS.map((m) => <span key={m}>{m.replace("目", "")}</span>)}</div>
          <p className="mt-4 text-sm text-muted">成果が発生した月だけ費用が発生します。事業を始める前の固定費リスクを抑えられます。</p>
        </div>
      </div>
      <figcaption className="border-t border-line bg-white px-5 py-3 text-xs text-muted">※ 費用の出方を示すイメージ図です。実際の料金体系はサービスごとに異なります。</figcaption>
    </figure>
  );
}
