"use client";
import { useActionState } from "react";
import { importServices, type ImportState } from "@/app/actions/admin-import";

export function ImportForm() {
  const [state, action, pending] = useActionState<ImportState, FormData>(importServices, {});
  return (
    <div className="space-y-4">
      <form action={action} className="panel space-y-3 p-4">
        <input type="hidden" name="intent" value="preview" />
        <div>
          <label htmlFor="file" className="label">CSVファイル</label>
          <input id="file" name="file" type="file" accept=".csv,text/csv" className="input" />
        </div>
        <div>
          <label htmlFor="csv" className="label">または、CSVを貼り付け</label>
          <textarea id="csv" name="csv" rows={5} className="input font-mono text-xs" placeholder="slug,name,company_name,website_url,..." />
        </div>
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? "検証中…" : "検証する"}</button>
      </form>

      {state.fatal && <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">{state.fatal}</p>}

      {state.stage === "preview" && (
        <section className="panel p-4">
          <h2 className="text-lg">検証結果</h2>
          <p className="mt-1 text-sm">取り込める行: <b>{state.rows?.length ?? 0}</b> 件 ／ エラー: <b className={state.errors?.length ? "text-red-600" : ""}>{state.errors?.length ?? 0}</b> 件</p>
          {state.errors && state.errors.length > 0 && (
            <ul className="mt-3 space-y-1.5 rounded bg-red-50 p-3 text-sm text-red-700">
              {state.errors.map((e) => <li key={e.line}><b>{e.line}行目（{e.slug}）</b>：{e.messages.join(" ／ ")}</li>)}
            </ul>
          )}
          {state.rows && state.rows.length > 0 && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead className="bg-surface text-left text-xs text-muted"><tr><th className="p-2">slug</th><th className="p-2">サービス名</th><th className="p-2">会社名</th><th className="p-2">取込</th></tr></thead>
                <tbody>
                  {state.rows.map((r) => (
                    <tr key={r.slug} className="border-t border-line">
                      <td className="p-2 font-mono text-xs">{r.slug}</td><td className="p-2">{r.name}</td><td className="p-2">{r.company_name}</td>
                      <td className="p-2 text-xs">{r.locked ? <span className="text-red-600">確認済み/公開中のため上書きしません</span> : r.exists ? "既存の下書きを更新" : "新規（下書き）"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {state.rows && state.rows.some((r) => !r.locked) && (
            <form action={action} className="mt-4">
              <input type="hidden" name="intent" value="commit" />
              <input type="hidden" name="csv" value={state.csv} />
              <button type="submit" disabled={pending} className="btn-cta disabled:opacity-60">{pending ? "取り込み中…" : `${state.rows.filter((r) => !r.locked).length}件を下書きとして取り込む`}</button>
              {state.errors && state.errors.length > 0 && <p className="mt-2 text-xs text-muted">エラーの行は取り込まれません。</p>}
            </form>
          )}
        </section>
      )}

      {state.stage === "done" && (
        <p role="status" className="rounded bg-good-50 p-3 text-sm">
          取り込みました。新規 <b>{state.inserted}</b> 件 ／ 更新 <b>{state.updated}</b> 件 ／ スキップ <b>{state.skipped}</b> 件。
          <a href="/admin/services?status=draft" className="ml-2 font-bold text-brand-700 underline">下書きを確認する →</a>
        </p>
      )}
    </div>
  );
}
