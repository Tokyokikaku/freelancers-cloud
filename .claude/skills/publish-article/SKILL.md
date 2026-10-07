---
name: publish-article
description: Yupir（個人開発メディア）に記事を入稿・検証・公開する。「記事を書いて」「記事を入稿して」「この記事を公開して」「インタビュー記事を追加して」などのときに使う。記事は media/src/content/articles/ の Markdown。
---

# 記事の入稿手順（Yupir）

サイト本体は `media/`（Astro）。記事は `media/src/content/articles/<slug>.md` の Markdown 1ファイル。
画像を使う場合は `media/src/content/articles/images/` に置き、frontmatter の `ogImage: ./images/<name>.jpg` で参照する。

## 1. 書く前のルール（必ず守る）

- **数字（metrics）は出典URLと確認日が必須。** 出典を確認できない数字は載せない（スキーマ上も必須で、欠けるとビルドが失敗する）。数字を書くときは、出典ページを実際に開いて確認した日を `checkedAt` にする。推測や記憶で数字を書かない。
- **`verified` は、開発者本人への確認、または数字の確認が済んだときだけ `true`。** 不明なら `false`（記事に「本人未確認」バッジが出る）。ユーザーが確認済みと言っていないのに `true` にしない。
- **他人の投稿・サービス画面のスクリーンショットや本文の転載はしない。** リンクと要約だけにする。画像は、記事用に用意したものか、自動生成のサムネイルを使う。
- 実在の人物・サービスについて、事実に基づかない内容や、貶める内容を書かない。確認できない事柄は「〜とされています」ではなく、書かない。
- サンプル記事（`samples/` 配下、架空）を本番記事として扱わない。

## 2. frontmatter

```yaml
---
title: 記事タイトル
description: 検索結果・SNSに出る説明（80〜120字目安）
publishedAt: 2026-10-10        # 公開日（今日の日付）
updatedAt: 2026-10-12          # 任意
tags: [Webアプリ, 生産性]
type: introduction              # introduction（紹介）| interview（インタビュー）
verified: false
service:
  name: サービス名
  url: https://example.com/
  developerName: 開発者名
  developerXHandle: x_handle    # 任意（@なし）
  techStack: [Astro, TypeScript]
  launchedAt: 2026-04-01        # 任意
metrics:                        # 任意
  - label: ユーザー数
    value: 1,200人
    sourceUrl: https://example.com/stats   # 必須
    checkedAt: 2026-10-08                  # 必須
ogImage: ./images/xxx.jpg       # 任意
draft: false                    # true で公開しない
---
```

ファイル名（slug）は半角英小文字・数字・ハイフンのみ。例: `20261010-taskpet.md`。URLは `/articles/<slug>/`。
本文は `##` 見出しから始める（`#` はタイトルが使う）。

## 3. 検証

```bash
cd media && npm ci   # 初回のみ
npm run build        # スキーマ違反（出典なしの数字など）があるとここで失敗する
```

ビルドが通ったら、生成ページ（`media/dist/articles/<slug>/index.html`）に「本人未確認」バッジなどが想定どおり出ているか確認する。

## 4. 公開

**ユーザーの明示的な承認なしに公開しない。** 公開前に、タイトル・説明・`verified` の値・載せた数字とその出典を、短くまとめて見せる。

承認が出たら:

1. 記事ファイル（と画像）を `main` に反映する（GitHub のツールでコミット、または管理画面 `/admin/` の保存と同じ結果）。
2. `main` への push で GitHub Actions（`.github/workflows/deploy-media.yml`）が本番へ自動デプロイする。Actions が使えない場合は、`media/` で `npm run build` のあと `python3 scripts/deploy-vercel.py`（環境変数 `VERCEL_TOKEN` が必要）で手動デプロイする。
3. 公開後、`https://yupir.tyokikaku.co.jp/articles/<slug>/` が 200 で開くことを確認して報告する。

## 5. 管理画面について

`/admin/`（`https://yupir.tyokikaku.co.jp/admin/`）は人間用の入稿画面。GitHub のトークンを入力して使う。AI が書いた記事は、画面の「Markdownを貼り付けて取り込む」で取り込める。
