import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-bold text-brand-700">404</p>
      <h1 className="mt-2 text-2xl sm:text-3xl">ページが見つかりませんでした</h1>
      <p className="mt-3 text-sm text-muted">URLが変更されたか、掲載を終了した可能性があります。</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">トップへ戻る</Link>
        <Link href="/services" className="btn-ghost">サービス一覧</Link>
      </div>
    </div>
  );
}
