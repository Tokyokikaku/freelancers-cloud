# ディスプレイ広告バナー

`out/` が PNG、`jpg/` が JPG（150KB以下に圧縮）。サイズ: 300x250 / 336x280 / 300x600 / 728x90 / 320x100 / 1200x628 / 1200x1200。

`gen.mjs` がバナーのHTMLを作り、`shoot.mjs` が Playwright で各サイズにスクリーンショットします（コピー・配色・サイズの調整は `gen.mjs` を編集）。
人物写真は `public/hero/person.webp`、ロゴは `public/logo.svg` を使用。
