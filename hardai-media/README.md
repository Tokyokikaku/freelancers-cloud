# ハードAIナビ

AIペット・家庭用ロボット・AIガジェットを、出典つきで比較するアフィリエイトメディア。依存ゼロの静的サイトです。

```bash
node build.mjs      # content/articles/*.md → dist/
node preview.mjs    # http://localhost:4321 で確認
```

- 記事: `content/articles/*.md`（運用ルールは `CLAUDE.md`）
- デザイン: `src/style.css`（ライト/ダーク自動対応、JSなし）。トップ・記事・404のテンプレートは `build.mjs`
- 静的ファイル（favicon・OGP画像）: `public/`
- 公開URL: ビルド時に環境変数 `SITE_URL` があればそれを、なければ `site.config.json` の `baseUrl` を canonical / sitemap / OGP に使います
- Vercel: `vercel.json` で `node build.mjs` → `dist` を指定済み（リポジトリルートのLPとは別プロジェクトとして、Root Directory を `hardai-media` にして使います）

frontmatter: `title` / `description` / `date` / `updated` / `sources` は必須。`category`（AIペット / 人型ロボット / 購入ガイド）は任意で、カードのイラストと分類に使われます。
