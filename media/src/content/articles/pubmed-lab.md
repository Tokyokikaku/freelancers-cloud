---
title: 日本語で入力するだけで、PubMedの論文が探せる「PubMed Lab」
description: 日本語で調べたいテーマを入力すると、AIが英語の検索式に変換してPubMedの論文を探してくれる、無料のリサーチアシスタント「PubMed Lab」を紹介します。登録は不要です。
publishedAt: 2026-10-08
tags: [論文検索, PubMed, 卒論, AI]
type: introduction
category: learning
service:
  name: PubMed Lab
  url: https://sciencepubmed.net/ja/lab/
  developerName: sciencepubmed
  techStack: [Astro, Cloudflare Workers, Claude]
---

## どんなサービス？

「PubMed Lab」は、日本語で入力するだけで、PubMedの英語論文を検索できる、リサーチアシスタントです。卒論や修論のテーマ探しで、興味のある論文を効率よく見つけたい学生や院生向けに作られています。無料で、登録は不要です。

*このサービスのページには、第三者の広告が含まれるため、画面の画像は掲載していません。*

## 使い方

公式ページには、次の流れが書かれています。

1. 気になるテーマや質問を、日本語で入力する
2. AIが、英語のPubMed検索クエリに変換する
3. マッチする論文を、最大10件、英語のabstract付きで表示する
4. 気になった論文は、星で保存したり、チャットで質問したり（β）できる

「大学生の睡眠不足と学業成績の関係」など、サンプルの検索もあります。

## ここがポイント

- **MeSHタームまでAIが判断。** PubMedで検索を絞るには、英語で入力することと、MeSHターム（専門用語の索引）を知っていることが壁になります。そこをAIが補います。
- **論文と壁打ちできる。** 各論文のabstractをもとに、AIと質疑応答ができます（1日3メッセージまで）。
- **卒論テーマの提案。** 検索結果を俯瞰して、テーマの案を出す機能もあります。
- **お気に入りは端末に保存。** 保存した論文は、そのブラウザの中に保存されます。

AIの回答や、論文の要約は、必ず元の論文で確かめてください。

## リンク

- サービス: [PubMed Lab](https://sciencepubmed.net/ja/lab/)
- 開発記（Zenn）: [日本語で PubMed が引ける ツールを個人で作った話 - Astro + Cloudflare Workers](https://zenn.dev/sciencepubmed/articles/20cc035a73d15e)
