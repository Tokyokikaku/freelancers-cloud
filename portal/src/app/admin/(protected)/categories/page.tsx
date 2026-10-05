import Link from "next/link";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteCategory } from "@/app/actions/admin";
import { adminCategories } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const sp = await searchParams;
  const categories = await adminCategories();
  const roots = categories.filter((c) => !c.parent_id);
  const ordered = roots.flatMap((r) => [{ c: r, depth: 0 }, ...categories.filter((c) => c.parent_id === r.id).map((c) => ({ c, depth: 1 }))]);
  // 3階層目以降（孫カテゴリ）も表示から漏れないよう追加
  const shown = new Set(ordered.map((o) => o.c.id));
  categories.filter((c) => !shown.has(c.id)).forEach((c) => ordered.push({ c, depth: 2 }));
  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">カテゴリ（{categories.length}）</h1>
        <Link href="/admin/categories/new" className="btn-primary">カテゴリを追加</Link>
      </div>
      {sp.saved && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">保存しました。</p>}
      {sp.deleted && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">削除しました。</p>}
      <div className="card divide-y divide-line">
        {ordered.map(({ c, depth }) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5" style={{ paddingLeft: depth ? `${depth * 1.5 + 1}rem` : undefined }}>
            <div>
              <p className="font-bold text-ink">{c.name} {!c.published && <span className="tag bg-slate-100 text-slate-600">非公開</span>}</p>
              <p className="text-xs text-muted">/category/{c.slug} ・ 表示順 {c.sort_order}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/categories/${c.id}`} className="btn-ghost !min-h-8 !px-3 !py-1">編集</Link>
              <form action={deleteCategory}><input type="hidden" name="id" value={c.id} /><ConfirmButton message="このカテゴリを削除しますか？" className="btn !min-h-8 !px-3 !py-1 text-red-700 hover:bg-red-50">削除</ConfirmButton></form>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">カテゴリを削除すると、サービスとの紐づけが外れます（サービス自体は削除されません）。子カテゴリは大カテゴリになります。</p>
    </div>
  );
}
