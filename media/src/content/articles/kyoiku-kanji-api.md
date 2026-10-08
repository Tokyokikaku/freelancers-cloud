---
title: 小学校で習う1,026字が引ける、無料の「教育漢字API」
description: 小学校で習う教育漢字1,026字の読み、意味、画数、学年、用例を返すAPI「Kyoiku Kanji API」を紹介します。学習アプリやゲームの材料に使えます。
publishedAt: 2026-10-08
tags: [API, 漢字, 教育, Cloudflare]
type: introduction
category: developer
service:
  name: Kyoiku Kanji API
  url: https://api.kyoiku-kanji.st-man.com
  developerName: st-man-hori
  techStack: [Cloudflare Workers, Hono, Cloudflare D1, OpenAPI]
ogImage: ./images/kyoiku-kanji-api-og.jpg
---

## どんなサービス？

「Kyoiku Kanji API」は、小学校で習う教育漢字1,026字の情報を返す、公開APIです。読み、意味、画数、学年、用例の単語が、JSONで取れます。

公式ページはAPIの仕様書（Swagger UI）になっていて、そのまま試せます。漢字を使った学習アプリや、ゲームを作りたい人向けの部品です。

![Kyoiku Kanji APIの仕様書ページ。漢字の一覧、ランダム取得、単字の詳細、学年ごとの字数のエンドポイント](./images/kyoiku-kanji-api-top.jpg)

*画像：Kyoiku Kanji API公式サイト（2026年10月8日に取得）*

## できること

開発記と仕様書によると、用意されているのは次の4つです。

- `GET /v1/kanji`：漢字の一覧
- `GET /v1/kanji/random`：ランダムな1字
- `GET /v1/kanji/{kanji}`：単字の詳細
- `GET /v1/grades`：学年ごとの字数

一覧には、学年、画数の範囲、漢字・意味・読みの部分一致で絞り込めます。訓読みと音読みは、日本語表記とローマ字の両方を配列で持っています。

## ここがポイント

- **仕様書から作っている。** zod-openapiでルートの定義からOpenAPIの仕様を生成していて、仕様書と実装がずれにくい作りです。
- **ローカルでも試せる。** Cloudflare D1のローカルDB（SQLite）を使うので、手元で開発やテストができます。
- **データの出典が明記されている。** 漢字のデータは、Kanji aliveが公開しているもの（CC BY 4.0）を元にしている、と開発記に書かれています。

## リンク

- サービス: [Kyoiku Kanji API](https://api.kyoiku-kanji.st-man.com)
- 開発記（Qiita）: [教育漢字（小学校で習う1026字）特化のAPIを開発・公開した](https://qiita.com/st-man-hori/items/2dceda8e319e26f41792)
