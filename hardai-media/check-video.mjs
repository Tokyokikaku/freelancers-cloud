// YouTube動画の投稿元をoEmbedで確認する。使い方: node check-video.mjs <動画ID> [<動画ID> ...]
// （プロキシ環境でも動くよう curl を使う）
import { execFileSync } from 'node:child_process';
for (const id of process.argv.slice(2)) {
  try {
    const out = execFileSync('curl', ['-sSf', '-m', '20', `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`], { encoding: 'utf8' });
    const j = JSON.parse(out);
    console.log(`${id} → ${j.title} ｜ ${j.author_name} ｜ ${j.author_url}`);
  } catch { console.log(id, '→ 取得できません（非公開・埋め込み不可・削除の可能性）'); }
}
