---
title: 見続けすぎると、画面に💩が降ってくるChrome拡張「Poop Break」
description: 指定したサイトを見続けると、ページに💩が降ってきて休憩を促すChrome拡張機能「Poop Break」を紹介します。SNSや動画サイトの見すぎを防ぐ、ちょっとふざけたサイトブロッカーです。
publishedAt: 2026-10-08
tags: [Chrome拡張, 休憩, SNS, 生産性]
type: introduction
category: tools
service:
  name: Poop Break
  url: https://chromewebstore.google.com/detail/poop-break/hemfcljljgjbjcbfbebiokpnjgmebopc
  developerName: keni_solopreneur
  developerXHandle: keni_1997
  techStack: [Chrome拡張機能, Matter.js]
metrics:
  - label: Chromeウェブストアの利用者数
    value: 25ユーザー
    sourceUrl: https://chromewebstore.google.com/detail/poop-break/hemfcljljgjbjcbfbebiokpnjgmebopc
    checkedAt: 2026-10-08
---

## どんなサービス？

「Poop Break」は、選んだサイトを長く見続けると、画面を💩で覆って休憩を促すChrome拡張機能です。Chromeウェブストアでは、「SNS、動画サイト、ニュースサイトなど、つい見続けてしまうWebサイトに、『終わりどころ』をつくる」と説明されています。

やっていることは、よくあるサイトブロッカーと同じで、対象のサイトと見てよい時間を決めておき、時間になったら休憩を促します。ただし、休憩の画面をまじめなポップアップにせず、ページ上に💩が降ってきて、見ていた画面を覆う形にしたのが特徴です。

## 使い方

- 対象のサイトを、自由に追加する
- サイトを見る時間を、分単位で設定する
- 休憩の時間を、分単位で設定する

設定した時間を過ぎると、ページ上に💩が降り、画面が少しずつ覆われます。

## ここがポイント

- **物理演算で降ってくる。** 💩の動きには、物理演算のライブラリ（Matter.js）を使っていると、開発記に書かれています。ページの上で物理演算をするUIを成立させるために、いくつかの工夫が必要だったそうです。
- **まじめなモーダルより、気づきやすい。** 開発者は、休憩画面を素直にモーダルにすると、あまりにもまじめだったため、このような形にしたと書いています。
- **Chromeに追加して使う。** Chromeウェブストアから、追加して使います。

*このサービスのストアページには、他の方の動画の画面が含まれているため、画面の画像は掲載していません。*

## リンク

- 開発者のX: [@keni_1997](https://x.com/keni_1997)
- サービス（Chromeウェブストア）: [Poop Break](https://chromewebstore.google.com/detail/poop-break/hemfcljljgjbjcbfbebiokpnjgmebopc)
- 開発記（Qiita）: [Matter.jsで「時間切れのSNSに💩を降らせる」Chrome拡張を作った話](https://qiita.com/keni_solopreneur/items/e67b641bbf32c7b9aa88)
