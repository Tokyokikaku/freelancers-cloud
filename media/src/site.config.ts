/**
 * サイト全体の設定。サイト名・URL・連絡先などはここだけ変更すればOK。
 */
export const SITE = {
  /** サイト名（仮） */
  name: 'Yupir',
  /** キャッチコピー。\n で改行、**〜** で囲んだ部分が太字になる（改行位置はここで決める） */
  tagline: '**個人開発**の\n挑戦を、\nもっと**遠く**へ。',
  /** FVのサブタイトル */
  heroLead: 'まだ知られていない、いいサービスを見つけよう。個人開発者がつくったアプリやWebサービスを紹介します。',
  description:
    '個人開発者のサービスを紹介する日本語メディア。サービス紹介記事と開発者インタビューを掲載します。',
  /** 本番URL（canonical・sitemap・RSS・OGPに使用）。Cloudflare Pagesのドメインに合わせて変更 */
  url: 'https://yupir.tyokikaku.co.jp',
  lang: 'ja',
  /** 運営会社（フッター・運営者情報に表示） */
  company: { url: 'https://www.tyokikaku.co.jp/' },
  /** 管理画面（/admin/）の保存先。記事の Markdown をこのリポジトリに直接コミットする */
  github: {
    owner: 'Tokyokikaku',
    repo: 'freelancers-cloud',
    branch: 'main',
    contentDir: 'media/src/content/articles',
  },
  /** 1ページあたりの記事数 */
  pageSize: 9,
  /** 問い合わせ先（掲載希望・取材依頼・掲載内容の修正/削除の申請） */
  contact: { email: 'info@tyokikaku.co.jp' },
  /** ヘッダー・フッターのナビ */
  nav: [
    { label: '記事一覧', href: '/articles/' },
    { label: '紹介', href: '/type/introduction/' },
    { label: 'インタビュー', href: '/type/interview/' },
    { label: 'タグ', href: '/tags/' },
    { label: '運営者情報', href: '/about/' },
  ],
  /** サイト共通のOGP画像（public/ からのパス）。記事に ogImage がないときに使う */
  defaultOgImage: '/og-default.png',
} as const;

export const TYPE_LABEL = {
  introduction: '紹介',
  interview: 'インタビュー',
} as const;

export type ArticleType = keyof typeof TYPE_LABEL;
