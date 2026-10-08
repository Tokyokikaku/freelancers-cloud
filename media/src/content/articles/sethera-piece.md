---
title: セルのない計算ボード「Sethera Piece」。囲んで数えるだけで見積書まで作れる
description: 表計算のセルがなく、付箋のような「ピース」を自由に置いて、集計ゾーンで囲むだけで計算できるビジュアルボード「Sethera Piece」を紹介します。MITライセンスのオープンソースです。
publishedAt: 2026-10-08
tags: [計算, 見積書, オープンソース, ビジュアルボード]
type: introduction
category: tools
service:
  name: Sethera Piece
  url: https://cuculhart.github.io/sethera-piece/
  developerName: cuculhart
  developerXHandle: Cuculhart
  techStack: [React, React Flow]
---

## どんなサービス？

「Sethera Piece（セセラピース）」は、テキストと数値の「ピース」を、キャンバスに自由に置き、集計ゾーンで囲むだけで計算できるビジュアルボードです。表計算ソフトのような「セル」は、ありません。

GitHub Pagesで、インストールなしで試せます。ソースコードは、MITライセンスで公開されています。

## 3つの部品

- **ピース:** テキスト、数値、付箋と数値。複数行、揃え、色、サイズ、枠なしの表示に対応
- **集計ゾーン（Σ）:** 囲んだピースを、合計・個数・平均・最大・最小で、リアルタイムに集計する
- **計算ピース:** 足し算、引き算、掛け算、割り算と、端数の処理。計算の対象は、線でつなぐ

ポイントは、**ピースを動かすだけで、計算が変わる**ことです。ピースを集計ゾーンの中に入れた瞬間に、結果が再計算されます。ゾーンの結果を、計算ピースの入力にすることもできるので、「小計 × 税率 = 消費税」のような連鎖も、線を引くだけで作れます。

## 帳票も作れる

罫線の部品も用意されていて、見積書のような帳票まで作れます。用紙の設定、印刷、保存と読み込みに対応しています（画面のメニューより）。

## ここがポイント

- **セルがないので、自由に配置できる。** 見た目も、計算も、ピースの置き方で決まります。
- **今後の構想。** 開発者は、共同編集、AIによる集計漏れの指摘、投票ボタンなどを検討していると、開発記に書いています。
- **フィードバックを歓迎。** 意見や貢献を募集しています。

## リンク

- 開発者のX: [@Cuculhart](https://x.com/Cuculhart)
- デモ: [Sethera Piece](https://cuculhart.github.io/sethera-piece/)
- ソースコード: [GitHub](https://github.com/cuculhart/sethera-piece)
- 開発記（Qiita）: [セルのない計算ボード「Sethera Piece」を作った](https://qiita.com/cuculhart/items/4425ab63e6b1dd497ae1)
