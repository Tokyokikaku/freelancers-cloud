/**
 * サイト全体の設定。サイト名・URL・連絡先などはここだけ変更すればOK。
 */
export const SITE = {
  /** サイト名（仮） */
  name: 'Yupir',
  /** キャッチコピー。\n で改行、**〜** で囲んだ部分が太字になる（改行位置はここで決める） */
  tagline: '個人開発の\n「**つくった理由**」を、\n**ひとつずつ**。',
  description:
    '個人開発者のサービスを紹介する日本語メディア。サービス紹介記事と開発者インタビューを掲載します。',
  /** 本番URL（canonical・sitemap・RSS・OGPに使用）。Cloudflare Pagesのドメインに合わせて変更 */
  url: 'https://yupir.vercel.app',
  lang: 'ja',
  /** 1ページあたりの記事数 */
  pageSize: 9,
  /** 運営者のXアカウント（@なし）。ここがDM窓口にもなる */
  operator: {
    name: '（運営者名）',
    xHandle: 'your_x_handle',
    /** 取材依頼・掲載削除の申請に使うXのDMリンク。recipient_id を設定すると直接DMが開く */
    dmUrl: 'https://x.com/messages/compose?recipient_id=（後で設定）',
    profile:
      '（運営者の自己紹介をここに書きます。どんな経緯でこのメディアを始めたか、どんな方針で記事を書いているかなど。）',
  },
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
