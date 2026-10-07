import Link from "next/link";
import "@/app/hero.css";

function Medal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fv-medal" aria-hidden="true">
      <span className="fv-medal__crown">♛</span>
      <span className="fv-medal__laurel fv-medal__laurel--left">❮</span>
      <span className="fv-medal__center">{children}</span>
      <span className="fv-medal__laurel fv-medal__laurel--right">❯</span>
    </div>
  );
}

export function HomeHero({ serviceCount, categoryCount }: { serviceCount: number; categoryCount: number }) {
  return (
    <section className="fv-hero">
      <div className="fv-hero__shape fv-hero__shape--a" />
      <div className="fv-hero__shape fv-hero__shape--b" />
      <div className="fv-hero__dots fv-hero__dots--left" />
      <div className="fv-hero__dots fv-hero__dots--right" />

      <div className="fv-container fv-hero__inner">
        <div className="fv-hero__content">
          <p className="fv-eyebrow"><span />初期費用なし・リスクを抑えて事業を推進</p>

          <h1>
            払うのは、<br />
            <strong>成果が出た分</strong>だけ。
          </h1>

          <p className="fv-lead">
            再生数・問い合わせ数・アポ数・採用数など、<br />
            成果に応じて課金されるサービスを比較。<br />
            固定費を抑えながら、自社に合うサービスを見つけられます。
          </p>

          <div className="fv-hero__actions">
            <a className="fv-cta fv-cta--primary" href="#all-categories">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.35-4.35m1.35-5.15A6.5 6.5 0 1 1 5 11.5a6.5 6.5 0 0 1 13 0Z" /></svg>
              <span>カテゴリから探す</span>
              <span className="fv-chevron">›</span>
            </a>
            <Link className="fv-cta fv-cta--secondary" href="/services">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" /></svg>
              <span>サービス一覧を見る</span>
              <span className="fv-chevron">›</span>
            </Link>
          </div>

          <div className="fv-stats" aria-label="掲載情報">
            <div className="fv-stat">
              <Medal><svg viewBox="0 0 24 24"><path d="M7 3h9l3 3v15H7zM10 11h6m-6 4h6M10 7h3" /></svg></Medal>
              <div className="fv-stat__copy">
                <span className="fv-stat__label">掲載サービス</span>
                <div className="fv-stat__value"><strong>{serviceCount}</strong><span>件</span></div>
                <div className="fv-stat__stars" aria-hidden="true">★★★</div>
              </div>
            </div>
            <div className="fv-stat">
              <Medal><svg viewBox="0 0 24 24"><path d="M5 5h5v5H5zm9 0h5v5h-5zM5 14h5v5H5zm9 0h5v5h-5z" /></svg></Medal>
              <div className="fv-stat__copy">
                <span className="fv-stat__label">カテゴリ</span>
                <div className="fv-stat__value"><strong>{categoryCount}</strong><span>種</span></div>
                <div className="fv-stat__stars" aria-hidden="true">★★★</div>
              </div>
            </div>
          </div>
        </div>

        <div className="fv-hero__visual" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/hero-businessman.webp" alt="" width={731} height={855} />
        </div>
      </div>
    </section>
  );
}
