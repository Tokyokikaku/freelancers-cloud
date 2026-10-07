# 個人開発者メディア（Astro 静的サイト）

個人開発者のサービス紹介・インタビュー記事を載せる静的メディアです。Markdown を1ファイル追加するだけで公開できます。

- Astro 7 + Content Collections + Tailwind CSS 4（追加依存は `@astrojs/sitemap` / `@astrojs/rss` のみ）
- 出力は静的HTML（Cloudflare Pages 向け）

## 使い方

```bash
cd media
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/ に静的出力
npm run preview   # ビルド結果の確認
```

## 最初に変える場所

| 変えたいもの | ファイル |
|---|---|
| サイト名・キャッチコピー・本番URL・運営者情報・XのDMリンク・ナビ | `src/site.config.ts` |
| 配色・フォント（CSS変数） | `src/styles/global.css` の `:root` |
| robots.txt 内の sitemap URL | `public/robots.txt`（本番URLに書き換え） |
| 共通OGP画像（1200×630 PNG） | `public/og-default.png` |

サイト名は「Yupir」です。本番URLは `site.config.ts` の `url`（現在 `https://yupir.tyokikaku.co.jp`）。独自ドメインにしたら必ず更新してください。`site.config.ts` の `name` を変えると全ページに反映されます。
`url` を本番ドメインにしないと、canonical / sitemap / RSS / OGP のURLが正しくなりません。

## 新しい記事を追加する手順

1. `src/content/articles/` に `任意のslug.md` を作る（ファイル名がURL `/articles/任意のslug/` になる）。
   サンプルは `src/content/articles/samples/` にあります。
2. 先頭に frontmatter を書き、その下に Markdown で本文を書く。
3. `npm run dev` で表示を確認し、`git push` する（Cloudflare Pages が自動ビルド）。

```md
---
title: 記事タイトル
description: 検索結果やOGPに出る説明（80〜120字目安）
publishedAt: 2026-10-10
updatedAt: 2026-10-12          # 任意
type: introduction              # introduction（紹介）| interview（インタビュー）
tags: [Webアプリ, 生産性]
verified: false                 # 本人確認・数字確認が済んだら true
service:
  name: サービス名
  url: https://example.com/
  developerName: 開発者名
  developerXHandle: x_handle    # 任意（@なし）
  techStack: [Astro, TypeScript]
  launchedAt: 2026-04-01        # 任意
metrics:                        # 任意。売上・ユーザー数など
  - label: ユーザー数
    value: 1,200人
    sourceUrl: https://example.com/stats   # 必須
    checkedAt: 2026-10-08                  # 必須（確認日）
ogImage: ./images/my-article.jpg           # 任意。記事と同じ階層からの相対パス
draft: false                    # true にすると公開されない
---

本文をここに書く。
```

### 守るルール（仕組みでも担保しています）

- **metrics は出典URLと確認日が必須。** 欠けているとビルドエラーになり、出典のない数字は表示されません。
- **`verified: false` の記事には「本人未確認」バッジと注意書き**が自動で出ます。
- **記事末尾に「掲載内容の修正・削除はこちら」**が全記事に自動表示されます。
- **他人の投稿・サービス画面のスクリーンショットや本文は転載しない。** リンクと要約だけにします。
- `ogImage` を省略すると、タイトル入りのグラデーションが記事のサムネイルとして自動生成されます。
  ただしOGP（SNSカード）には共通画像 `og-default.png` が使われます。

## サンプル記事を消す

サンプル3本（架空）は `src/content/articles/samples/` にまとまっています。本番公開前にフォルダごと削除してください。

```bash
rm -r src/content/articles/samples
```

記事が0本でもビルドは通ります（トップは空の状態になります）。

## Cloudflare Pages の設定

| 項目 | 値 |
|---|---|
| ルートディレクトリ | `media` |
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |
| Node.js | 22 以上 |

Vercel でも `vercel.json` の設定でそのままデプロイできます（ルートディレクトリ `media`）。

## ディレクトリ構成

```
media/
├─ src/
│  ├─ site.config.ts      サイト設定
│  ├─ content.config.ts   記事のスキーマ
│  ├─ content/articles/   記事（samples/ はサンプル）
│  ├─ styles/global.css   CSS変数・共通スタイル
│  ├─ layouts/ components/ lib/
│  └─ pages/              トップ・一覧・詳細・タグ・種別・運営者・申請・RSS
└─ public/                robots.txt, favicon, og-default.png
```
