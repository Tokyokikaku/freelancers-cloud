---
title: Unityを開かずに、VRChatのアバターを配信や会議に映せる「VRCast」
description: Unityを開かずにVRChatのアバターを単体で表示し、OBSやDiscord、Zoomに映せるWindows用のオープンソースアプリ「VRCast」を紹介します。
publishedAt: 2026-10-19
tags: [VRChat, アバター, 配信, オープンソース]
type: introduction
category: creator
service:
  name: VRCast
  url: https://github.com/coffin299/VRCast
  developerName: ごみぃ
  developerXHandle: coffin299
  techStack: [Unity, C#, Python, MediaPipe]
---

## どんなサービス？

「VRCast」は、VRChatのアバターを、Unityを開かずに単体で表示できるWindows用のアプリです。背景を透過してOBSに映したり、仮想カメラとしてDiscordやZoomに映したりできます。

Apache License 2.0のオープンソースとしてGitHubで公開されています。VRChat Inc.とは関係のない非公式ツールです。

*このサービスはGitHubのリポジトリで公開されているため、画面の画像は掲載していません。*

## できること

READMEによると、次のような機能があります。

- **背景透過で出力：** OBSのゲームキャプチャで、背景を透過して映せる
- **VRChatの設定を再現：** 表情やトグル、PhysBones、Constraintなどを、元のアバターを改変せずに再現する
- **リップシンクとまばたき：** マイクの音声から口の形を推定し、自動でまばたきする
- **Webカメラでトラッキング：** 頭、目、口、視線、腕、手、指を動かせる
- **仮想カメラ：** DiscordやZoomにアバターを映せる
- **日本語と英語のUI**

## ここがポイント

- **アバターは専用形式に書き出して使う。** Unity用の変換パッケージで、アバターを専用の形式に書き出してから読み込みます。
- **動きは近似。** PhysBonesなどは近似なので、動きはVRChatと完全には一致しない、とREADMEに書かれています。

## リンク

- サービス（GitHub）: [coffin299/VRCast](https://github.com/coffin299/VRCast)
- 開発者のX: [@coffin299](https://x.com/coffin299)
