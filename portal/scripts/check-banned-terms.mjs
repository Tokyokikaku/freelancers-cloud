// 未提携企業に使ってはいけない表現（仕様 §19）が、提携済み専用ファイル以外に混入していないか検査する。
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const BANNED = ["公式パートナー", "提携サービス", "当サイト限定", "公式資料"];
// 提携済み（partner / premium）の場合にだけ使う文言をまとめたファイル
const ALLOWLIST = new Set(["src/lib/partner.ts", "scripts/check-banned-terms.mjs"]);

const root = new URL("..", import.meta.url).pathname;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(p);
    } else if (/\.(tsx?|json|sql|md)$/.test(name)) {
      const rel = relative(root, p);
      if (ALLOWLIST.has(rel)) continue;
      const text = readFileSync(p, "utf8");
      for (const word of BANNED) if (text.includes(word)) hits.push(`${rel}: 「${word}」`);
    }
  }
}
walk(join(root, "src"));
walk(join(root, "supabase"));

if (hits.length) {
  console.error("未提携企業に使用できない表現が見つかりました:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("OK: 禁止表現は見つかりませんでした。");
