# このリポジトリでの運用ルール

## スライド資料
- 資料（スライド）を作ったら、納品の前に必ず `consulting-pptx-skill` でレビューする：
  1. 生成物（HTMLまたはpptx）に `python3 scripts/check_deck.py <ファイル>` を実行し、FAIL 0 にする（HTMLなら `scripts/check_layout.mjs` も）
  2. `references/content-review-prompt.md` の指示文を、作り方を伏せた別のエージェントに渡してレビューさせ、指摘を採否表（採用／不採用／保留＋理由）にして、採用分だけ直す
  3. レビューの結果（FAIL数、採否表）をユーザーに報告してから渡す
