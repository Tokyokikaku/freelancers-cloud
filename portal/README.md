# 成果報酬ナビ（成果報酬サービス比較ポータル）

「初期費用なし・リスクなしで事業を推進」をテーマに、成果報酬型で使えるサービス（営業・マーケティング〔成果報酬の広告運用〕・採用・資金調達）だけを集めた、BtoB向けの検索・比較ポータルです。トップページはLP（ランディングページ）を兼ねています。
「検索 → 比較 → サービス詳細 → 公式サイト閲覧／資料意向の送信」の流れと、
運営側がサービス単位の需要データ（PV・公式サイトクリック・資料意向・リード）を取得できることを最優先に作っています。

- Frontend: Next.js 16（App Router / Server Components / ISR）・TypeScript・Tailwind CSS v4
- Backend / DB: Supabase（Postgres + Auth + RLS）
- Hosting: Vercel
- 計測: Google Analytics 4 ＋ 自前の `page_events` テーブル（サービス別集計用）

> このディレクトリ（`portal/`）が新サイトです。リポジトリ直下の `public/` `vercel.json` は別プロジェクト（外注ドットコム LP）のもので、そのまま残しています。

---

## 1. ローカル起動

```bash
cd portal
npm install
cp .env.example .env.local   # Supabase を使わないデモモードなら空のままでOK
npm run dev                  # http://localhost:3000
```

**デモモード**: `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` が未設定の場合、
`src/data/seed.json` の初期データで公開サイトが動きます（一覧・検索・絞り込み・比較・詳細・カテゴリ・記事・フォームの画面遷移を確認可能）。
このモードでは、リード・行動データは保存されず、管理画面は使えません。

その他のコマンド:

| コマンド | 内容 |
|---|---|
| `npm run build` / `npm start` | 本番ビルド／起動 |
| `npm run typecheck` | 型チェック |
| `npm run check:terms` | 未提携企業に使えない表現（「公式パートナー」等）が混入していないか検査 |
| `npm run seed:sql` | `src/data/seed.json` から `supabase/seed.sql` を再生成 |

---

## 2. 環境変数一覧

`.env.example` を参照してください。

| 変数 | 必須 | 説明 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 本番で必須 | 本番URL（例 `https://example.com`）。canonical・sitemap・OGP・構造化データに使用 |
| `NEXT_PUBLIC_SITE_NAME` | 任意 | サイト名（既定: 成果報酬ナビ） |
| `NEXT_PUBLIC_OPERATOR_NAME` | 任意 | 運営者名（フッター・運営情報ページ）。**公開前に正式名称を設定してください** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 任意 | 問い合わせ先（既定: info@tyokikaku.co.jp） |
| `NEXT_PUBLIC_SUPABASE_URL` | DB利用時 | Supabase の Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | DB利用時 | anon（公開）キー。RLS により「公開済みデータの読み取りのみ」可能 |
| `SUPABASE_SERVICE_ROLE_KEY` | DB利用時 | **サーバー専用**。リード保存・行動計測・管理画面・集計に使用。`NEXT_PUBLIC_` を付けない／コミットしない |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 任意 | GA4 測定ID（`G-XXXXXXXXXX`） |
| `NEXT_PUBLIC_GSC_VERIFICATION` | 任意 | Search Console の HTML タグ認証の `content` 値 |
| `RESEND_API_KEY` / `MAIL_FROM` | 任意 | [Resend](https://resend.com) でメール通知する場合 |
| `LEAD_NOTIFY_EMAIL` | 任意 | リード発生のたびに通知する運営側アドレス |

---

## 3. Supabase のセットアップ

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. **SQL Editor** で次の順に実行
   1. `supabase/migrations/0001_init.sql` … テーブル・RLS・集計関数
   2. `supabase/seed.sql` … 初期カテゴリ・サービス・記事（任意）
3. **Project Settings → API** から `Project URL` / `anon key` / `service_role key` を取得し、環境変数に設定
4. 管理者ユーザーを作成（→ 4 章）

### テーブル定義（概要）

| テーブル | 内容 |
|---|---|
| `services` | サービス本体。`slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type/initial_fee, monthly_fee_type/monthly_fee, success_fee, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features[], partner_status, featured, show_in_popular, published, source_url, last_verified_at, created_at, updated_at` |
| `categories` | カテゴリ（`parent_id` で大カテゴリ／子カテゴリの2階層以上）。`slug, name, icon, description, seo_title, seo_description, sort_order, published` |
| `service_categories` | サービスとカテゴリの多対多（`is_primary` が主カテゴリ） |
| `leads` | 資料意向フォームの送信内容（`lead_id, service_id, service_name, company, name, email, phone, timing, created_at, source, medium, campaign` ほか） |
| `page_events` | 行動イベント（`service_page_view / official_site_click / document_button_click / lead_form_start / lead_submit / category_page_view / search`）。匿名の `visitor_id` を持ち、ユニークユーザー集計に使用 |
| `articles` / `article_services` | SEO記事（Markdown）と、記事から各サービスページへの内部リンク |
| `partner_contacts` | 提携後のリード通知先（メール／Webhook）。**公開されない** |
| `admins` | 管理画面に入れるユーザー（Supabase Auth のユーザーIDと紐づけ） |

主な設計判断:

- **料金の「不明」を明示的に扱う**: `initial_fee_type / monthly_fee_type` は `free`（0円）/ `paid`（有料）/ `unknown`（不明）。`unknown` や `success_fee is null` は画面上「要問い合わせ」と表示されます。
- **完全成果報酬の定義をDBで担保**: `is_full_success_fee = true` は、初期費用・月額費用がともに `free` の場合のみ許可（CHECK 制約 `full_success_requires_free`）。
- **RLS**: 公開サイトは anon キーで「公開済み（`published`）の `services / categories / articles` のみ」読み取り可能。`leads / page_events / partner_contacts / admins` には anon 向けポリシーがなく、一切アクセスできません。書き込みはすべてサーバー側（service_role）です。
- **集計関数 `service_stats(from, to)`**: サービス別に PV・ユニークユーザー・公式サイトクリック・資料ボタンクリック・フォーム開始・リード数を返します（service_role のみ実行可）。

---

## 4. 管理画面 `/admin`

### ログイン方法

1. Supabase の **Authentication → Users → Add user** でメールアドレス＋パスワードのユーザーを作成（"Auto Confirm User" をオン）
2. **SQL Editor** で管理者として登録

   ```sql
   insert into admins (user_id, email)
   select id, email from auth.users where email = 'あなたのメールアドレス';
   ```

3. `https://（サイトURL）/admin` を開き、メールアドレスとパスワードでログイン

`admins` に登録されていないユーザーは、ログインに成功しても管理画面に入れません。各ページ・各サーバー処理・CSV出力のすべてで管理者確認を行っています。

### できること

| 画面 | 内容 |
|---|---|
| ダッシュボード | 期間別（7/30/90日）に、サービス単位で **ページPV・ユニークUU・公式サイトクリック数・公式サイトCTR・資料ボタンクリック数・フォーム開始数・リード数・リードCVR** を一覧。CSVエクスポート、よく検索されるキーワードも表示 |
| サービス | 追加・編集・削除、公開／非公開、おすすめ、人気ランキング対象の切り替え。料金・成果地点・特徴・情報ソース・最終確認日・提携状態・リード通知先を編集 |
| カテゴリ | 追加・編集・削除、親子関係、表示順、説明文、SEO title/description |
| リード | 一覧と **CSVエクスポート**（全件・Excel対応のUTF-8 BOM付き） |
| 記事 | 追加・編集・削除（Markdown）、関連サービスの紐づけ |

### 指標の定義

- 公式サイトCTR ＝ 公式サイトクリック ÷ ページPV
- リードCVR ＝ リード数 ÷ ページPV
- ユニークUU ＝ ブラウザごとの匿名ID（localStorage）の数。ボットUAは除外

---

## 5. 行動計測と GA4

### 計測しているイベント

| イベント | 発火タイミング |
|---|---|
| `service_page_view` | サービス詳細ページ表示 |
| `official_site_click` | 「公式サイト」リンクのクリック（`placement` パラメータで設置場所を区別） |
| `document_button_click` | 「資料を確認する」ボタンのクリック |
| `lead_form_start` | フォームへの最初の入力 |
| `lead_submit` | フォーム送信成功（DB保存はサーバー側、GA4 にはクライアントから送信） |
| `category_page_view` | カテゴリページ表示 |
| `search` | サイト内検索の実行（`query`, `results_count`） |

イベントは **GA4（gtag）** と **自前DB（`/api/events` → `page_events`）** の両方へ送られます。GA4 の標準レポートでは「サービス別」の集計が扱いづらいため、広告主提案に使う数値は自前DB（管理画面）を正とする設計です。UTM（`utm_source / medium / campaign`）とリファラは、最初の着地ページで保存し、イベントとリードに紐づけます。

### GA4 の設定手順

1. [Google アナリティクス](https://analytics.google.com/) でプロパティとウェブデータストリームを作成し、測定ID（`G-XXXXXXXXXX`）を取得
2. Vercel の環境変数 `NEXT_PUBLIC_GA_MEASUREMENT_ID` に設定して再デプロイ
3. GA4 の **管理 → イベント → 作成**、または **キーイベント** で `lead_submit` を「キーイベント（コンバージョン）」に設定
4. **管理 → カスタム定義** で、`service_name`（イベントスコープ）などをカスタムディメンションとして登録すると、サービス名別のレポートが作れます
5. 動作確認は **管理 → DebugView**、またはリアルタイムレポートで
6. Search Console を使う場合は、HTMLタグ認証の `content` 値を `NEXT_PUBLIC_GSC_VERIFICATION` に設定し、`https://（サイトURL）/sitemap.xml` を送信

> 公開前に、プライバシーポリシー（`/privacy`、ひな形）を法務確認のうえ、外部送信規律（Google への情報送信の通知・公表）に沿った内容にしてください。

---

## 6. Vercel へのデプロイ

1. このリポジトリを Vercel に Import
2. **Root Directory を `portal` に設定**（Framework Preset は Next.js が自動検出）
3. 環境変数（2 章）を Production / Preview に設定
4. Deploy
5. 独自ドメインを設定したら `NEXT_PUBLIC_SITE_URL` をそのURLに更新

公開ページは ISR（5分）で配信され、管理画面で保存すると該当データのキャッシュは即時破棄されます。

---

## 7. 仕様どおりの動作と注意点

- **提携前の表現**: 未提携の企業に「公式パートナー」「提携サービス」「当サイト限定」「公式資料」などは使いません。提携関連の文言は `src/lib/partner.ts` に集約し、`npm run check:terms` で混入を検査します。
- **資料請求（まとめて請求）**: 一覧・カテゴリ・ランキングの各行に「資料請求（無料）」「公式サイトへ」の2ボタンと、「資料請求リストに追加」「比較に追加」のチェックを置き、カテゴリ上部の「まとめて資料請求」バー、画面下部の固定バー、ヘッダーの「資料請求リスト」から、複数サービスを1回の入力で請求できます（`/request`）。サービスごとに1件のリードを保存し、同じ `request_id` で束ねます。入力内容は、希望者のみこの端末の localStorage に保存して次回自動入力します。完了後（`/thanks`）に、同じカテゴリのサービスを続けて請求できます。提携済みサービスが含まれる場合は、未チェックの同意ボックス（提供先への情報提供）を本人がオンにしないと送信できず、同意した文言のバージョンを `leads.consent_version` に記録します。「あわせて請求されているサービス」の候補は初期状態では未チェックです。
- **資料を確認する（旧仕様の注意書き）**: 提携前は、フォーム内容を掲載企業へ送信しません（注意書きをフォーム内に表示）。送信後は `/thanks` で「お問い合わせを受け付けました」と表示し、広告主への資料請求が完了したと誤認させない文言にしています。
- **提携後（`partner_status = partner / premium`）**: CTA が「無料で資料請求」に変わり、リード保存時に `partner_contacts` のメール／Webhook へ通知します（Webhook は `lead.created` の JSON を POST）。優先掲載は表示ラベルのみで、**人気ランキングの順位には影響しません**。
- **人気ランキング**: 直近30日の閲覧数・公式サイトCTR・資料ボタンCTRからスコア化（`src/lib/ranking.ts`）。サンプルが少ないサービスが偶然上位にならないようCTRは補正しています。「閲覧数・ユーザー行動などをもとに算出」の説明を表示します。
- **検索**: MVP は辞書＋全文一致＋文字bigramの簡易スコアリング。「商談が取れた時だけ料金が発生する営業代行」のような文章から、成果地点＝商談・完全成果報酬・カテゴリ＝営業を読み取って優先表示します（`src/lib/search.ts`）。AI検索に差し替える場合は `SearchEngine` インターフェースを実装して `searchEngine` を入れ替えます。
- **SEO**: 英語スラッグ、ページ別 title/description/canonical/OGP、構造化データ（WebSite+SearchAction / FAQPage / BreadcrumbList / ItemList / Service / Article）、`sitemap.xml`、`robots.txt`。検索結果・絞り込み結果・比較・サンクスページは `noindex`、掲載ゼロのカテゴリも `noindex`＋sitemap除外。
- **初期データ**: `src/data/seed.json` は、公式サイトまたは公式のプレスリリースで条件を確認できた成果報酬の実態を公式の料金ページで監査した実在サービス70件を公開（実績連動課金・必須月額なしのスコープ。固定費＋成果報酬のハイブリッド型は非公開）（営業・マーケティング・採用・資金調達・コンサルティング・制作・開発。複数カテゴリに属するものを含む）です。料金・成果報酬額が確認できていない項目は「要問い合わせ」にし、条件付きの0円（例: 予算規模による）は「0円」ではなく条件を明記しています。プレスリリース由来で情報が古い可能性があるもの（マジゼロ）には、その旨を料金の補足に記載しています。**公開前に編集部で必ず再確認し、管理画面から最新化してください。**
- 一覧・検索・絞り込みは、公開サービスを一括取得して TypeScript 側で処理します（数百件規模まで想定。1,000件を超える場合は DB 側検索への移行が必要）。

---

## 8. 今後追加すべき機能

優先度が高い順の目安です。

1. **濫用対策**: `/api/events` とフォームのレート制限（Vercel WAF / Upstash Ratelimit）、reCAPTCHA / Turnstile
2. **リード確認メール**（ユーザー向け自動返信）と、運営側のリード対応ステータス管理（未対応／案内済み など）
3. **広告主向けの需要レポート**: ダッシュボードの月次PDF／共有リンク、前月比
4. **広告主向け管理画面・ログイン**、請求（成果報酬の自動集計・決済）
5. **成果報酬の課金イベント**: 資料請求／商談予約／成約ごとの単価設定とリードの課金ステータス
6. **AI検索**: 埋め込み検索・自然文からの意図解析（`SearchEngine` を差し替え）
7. **CMS強化**: 記事のプレビュー・画像アップロード、サービス情報の変更履歴、情報の定期再確認アラート（`last_verified_at` が古い順）
8. **ユーザー向け機能**: お気に入り、比較結果の共有URL、レビュー／事例
9. **カテゴリ別の比較軸**（営業ならアポ単価、採用なら採用単価 など）の構造化データ化
10. **同意管理（Cookieバナー）**、ボット判定の高度化、Search Console API 連携
11. 自動テスト（E2E）と CI
