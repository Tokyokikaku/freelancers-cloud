---
title: PCからNature Remoを操作できる、非公式Windowsアプリ「AirLit」
description: PCで作業中に、エアコンや照明、テレビをNature Remoで操作できるWindows向けの非公式デスクトップアプリ「AirLit」を紹介します。オープンソースで、インストーラは約3MBです。
publishedAt: 2026-10-08
tags: [Nature Remo, スマートホーム, Windows, オープンソース]
type: introduction
category: tools
service:
  name: AirLit
  url: https://github.com/Retro-Maid/airlit
  developerName: Retro-Maid
  developerXHandle: retro_maid
  techStack: [Tauri, React, TypeScript]
---

## どんなサービス？

「AirLit」は、Nature Remo（家電を操作するスマートリモコン）を、PCから操作するための、Windows向けのデスクトップアプリです。PCで作業中に「エアコンを切りたい」と思ったとき、スマホを探してアプリを開いて読み込みを待つ、という手間をなくしたくて作られました。

GitHubのREADMEには、個人が開発した非公式のアプリで、Nature社とは関係がなく、同社の承認も受けていない、と明記されています。MITライセンスのオープンソースです。

*このサービスはGitHubのリポジトリで公開されているため、画面の画像は掲載していません。*

## できること

開発記とREADMEによると、次のような機能があります。

- **家電をまとめて操作：** エアコン、照明、テレビ、赤外線家電、スマートメーターに対応する
- **機種に合わせた表示：** エアコンの運転モードや風量などは、その機種が対応している選択肢だけが出る。リモコンも、その家電が持っているボタンだけが並ぶ
- **シーン：** 複数の家電への操作を、ワンタッチでまとめて実行する（例：帰宅したら照明オンとエアコン冷房）
- **オートメーション：** 時刻（毎日、平日、週末）をきっかけに、自動で操作する
- **予約：** オートメーションの単発版。「30分後」を押すだけで予約できる

## ここがポイント

- **軽い。** Tauri v2、React、TypeScriptで作られ、インストーラは3.3MBです。管理者権限は要りません。
- **使うにはトークンが必要。** Nature Remoのアクセストークンを、公式のサイトで発行して入力します。
- **非公式であることを明記。** Nature Remoの名前は商標であることも含め、READMEに断り書きがあります。

## リンク

- 開発者のX: [@retro_maid](https://x.com/retro_maid)
- サービス（GitHub）: [Retro-Maid/airlit](https://github.com/Retro-Maid/airlit)
- 開発記（Qiita）: [NatureRemoってPCからも動かしたい！のでアプリ作りました！（※非公式クライアントです）](https://qiita.com/Retro-Maid/items/15fe202dc74d09b9fa89)
