import Link from "next/link";
import { logout } from "@/app/actions/admin-auth";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

const NAV = [
  ["/admin", "ダッシュボード"],
  ["/admin/services", "サービス"],
  ["/admin/import", "CSV取込"],
  ["/admin/categories", "カテゴリ"],
  ["/admin/leads", "リード"],
  ["/admin/articles", "記事"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="lg:grid lg:grid-cols-[14rem_1fr]">
      <aside className="border-b border-line bg-white p-4 lg:min-h-dvh lg:border-r lg:border-b-0">
        <p className="font-bold text-ink">成果報酬ナビ 管理</p>
        <nav aria-label="管理メニュー" className="mt-3 flex flex-wrap gap-1 lg:flex-col">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-bold text-ink hover:bg-surface">{label}</Link>
          ))}
          <Link href="/" target="_blank" className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface">サイトを表示 ↗</Link>
        </nav>
        <form action={logout} className="mt-4 border-t border-line pt-3">
          <p className="mb-2 truncate text-xs text-muted">{admin.email}</p>
          <button type="submit" className="btn-ghost w-full">ログアウト</button>
        </form>
      </aside>
      <div className="min-w-0 p-4 sm:p-8">{children}</div>
    </div>
  );
}
