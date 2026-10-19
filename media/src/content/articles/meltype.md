---
title: 半角/全角キーを押さなくていい。日本語と英語を自動で打ち分ける「Meltype」
description: 日本語と英語がまざった文章を、ローマ字のまま続けて打つだけで自動で判別して変換する、Windows向けのオープンソースの日本語入力ツール「Meltype」を紹介します。
publishedAt: 2026-10-19
tags: [日本語入力, IME, Windows, オープンソース]
type: introduction
category: tools
service:
  name: Meltype
  url: https://github.com/yksr-melt/Meltype
  developerName: 雪代
  developerXHandle: yksr_melt
---

## どんなサービス？

「Meltype」は、日本語と英語がまざった文章を、半角/全角キーを押さずに打てる日本語入力ツールです。ローマ字で続けて打つと、単語ごとに日本語か英語かを自動で判別して変換します。

READMEでは、「kyouhagoogledekensaku」と打つと「今日はgoogleで検索」になる、という例が紹介されています。Windows 10/11向けで、MacとLinux版はプレビュー版です。GPL v3.0のオープンソースとして公開されています。

*このサービスはGitHubのリポジトリで公開されているため、画面の画像は掲載していません。*

## できること

READMEによると、次のような機能があります。

- **日英の自動判別：** googleやgithubのような英単語は英語のまま残し、ほかを日本語に変換する
- **かな漢字変換：** 変換ボックスでの漢字変換や、F6・F7・F10でのひらがな・カタカナ・英字への変換
- **絵文字・顔文字：** 「えがお」から絵文字に変換できる。よくある誤字も見つける
- **開発ツールに合わせた切り替え：** VS Codeやターミナルでは英数入力を基本にして、コメントや文字列の中だけ日本語にする
- **細かな調整：** ユーザー辞書、自動判別の強さの調整、Ctrl+半角/全角での一時停止

## ここがポイント

- **入力した内容は外に出ない。** 入力の処理はPCの中で行い、ネットワークへは送らないとREADMEに書かれています。
- **管理者権限がいらない。** .NETのランタイムを同梱していて、そのままインストールできます。
- **公開後すぐに機能追加。** 公開から数日で、独自のIMEと予測変換を加えたバージョンが出ています。

署名のないアプリのため、WindowsのSmartScreenの警告が出ることがあるとREADMEに書かれています。

## リンク

- サービス（GitHub）: [yksr-melt/Meltype](https://github.com/yksr-melt/Meltype)
- 開発者のX: [@yksr_melt](https://x.com/yksr_melt)
