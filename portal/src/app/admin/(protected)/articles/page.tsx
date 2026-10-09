import Link from "next/link";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteArticle } from "@/app/actions/admin";
import { adminArticles } from "@/lib/admin-data";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const sp = await searchParams;
  const articles = await adminArticles();
  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">記事（{articles.length}）</h1>
        <Link href="/admin/articles/new" className="btn-primary">記事を追加</Link>
      </div>
      {sp.saved && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">保存しました。</p>}
      {sp.deleted && <p className="rounded-lg bg-good-50 p-3 text-sm text-good-700">削除しました。</p>}
      <div className="card divide-y divide-line">
        {articles.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5">
            <div>
              <p className="font-bold text-ink">{a.title} {!a.published && <span className="tag bg-slate-100 text-slate-600">下書き</span>}</p>
              <p className="text-xs text-muted">/articles/{a.slug} ・ 更新 {formatDate(a.updated_at)}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/articles/${a.id}`} className="btn-ghost !min-h-8 !px-3 !py-1">編集</Link>
              <form action={deleteArticle}><input type="hidden" name="id" value={a.id} /><ConfirmButton message="この記事を削除しますか？" className="btn !min-h-8 !px-3 !py-1 text-red-700 hover:bg-red-50">削除</ConfirmButton></form>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="p-8 text-center text-sm text-muted">記事がありません</p>}
      </div>
    </div>
  );
}
