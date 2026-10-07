# media/（Yupir：個人開発メディア）

- Astro + Content Collections + Tailwind。静的出力。設定は `src/site.config.ts` に集約。
- 記事の入稿・公開の手順とルールは、リポジトリ直下の `.claude/skills/publish-article/SKILL.md` に従う（数字は出典と確認日が必須、`verified` は確認済みのときだけ `true`、他人の投稿の転載はしない）。
- `npm run dev` で確認、`npm run build` で検証。デプロイは `scripts/deploy-vercel.py`。
