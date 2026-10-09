import { adminCategories } from "@/lib/admin-data";
import { flattenTree } from "@/lib/categories";
import { CSV_COLUMNS } from "@/lib/service-import";
import { ImportForm } from "./ImportForm";

export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const categories = flattenTree(await adminCategories());
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl">サービスのCSV一括登録</h1>
        <p className="mt-1 text-sm text-muted">調査結果をスプレッドシートにまとめて、まとめて取り込めます。取り込んだサービスは<b>「下書き」で非公開</b>になり、内容を確認して「確認済み」にしてから公開します。</p>
      </div>
      <ol className="panel space-y-2 p-4 text-sm leading-7">
        <li>1. <a href="/admin/import/template" className="font-bold text-brand-700 underline">テンプレートCSV</a> をダウンロード（既存データは <a href="/admin/services/export" className="font-bold text-brand-700 underline">CSV出力</a> で取得）</li>
        <li>2. 公式サイト・公式プレスリリースで確認できた事実だけを記入。不明な項目は空欄（要問い合わせ表示）</li>
        <li>3. 下のフォームでアップロード →「検証する」でエラーを確認 →「取り込む」</li>
        <li>4. サービス一覧で内容を確認し、確認状態を「確認済み」→ 公開</li>
      </ol>
      <ImportForm />
      <details className="panel p-4 text-sm leading-7">
        <summary className="cursor-pointer font-bold text-ink">列の説明</summary>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>列（この順でなくても可・ヘッダー名で判定）: <code className="text-xs">{CSV_COLUMNS.join(", ")}</code></li>
          <li><code>initial_fee_type / monthly_fee_type</code>: <code>free</code>（公式が0円・不要と明記）／<code>paid</code>（有料・条件付き）／<code>unknown</code>（不明）</li>
          <li><code>outcome_type</code>: appointment, meeting, contract, hire, lead, sale, click, matching, other</li>
          <li><code>pricing_model</code>: <code>success_only</code>（成果発生時のみ）／<code>hybrid</code>（固定費＋成果報酬）／<code>optional_plan</code>（成果報酬プランが条件つきで定義されている）。「相談に応じる」程度のものは掲載しないでください</li>
          <li><code>is_full_success_fee</code>: true は初期費用・月額がともに free で、pricing_model=success_only の場合のみ</li>
          <li><code>features</code>: 「|」区切り（最大8）。<code>categories</code>: カテゴリslugを「|」区切り（先頭が主カテゴリ）</li>
          <li>確認済み・公開中のサービスと同じ slug の行は上書きされません（個別画面から編集してください）</li>
        </ul>
        <p className="mt-3 font-bold text-ink">使えるカテゴリslug</p>
        <p className="mt-1 text-xs leading-6">{categories.map(({ category: c, depth }) => `${"　".repeat(depth)}${c.slug}`).join(" ／ ")}</p>
      </details>
    </div>
  );
}
