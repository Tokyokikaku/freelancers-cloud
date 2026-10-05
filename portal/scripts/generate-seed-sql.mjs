// src/data/seed.json から supabase/seed.sql を生成する。  使い方: npm run seed:sql
import { readFileSync, writeFileSync } from "node:fs";

const seed = JSON.parse(readFileSync(new URL("../src/data/seed.json", import.meta.url), "utf8"));
const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const arr = (a) => `array[${a.map(q).join(", ")}]::text[]`;
const b = (v) => (v ? "true" : "false");

const out = [];
out.push("-- 自動生成: `npm run seed:sql`（src/data/seed.json から生成）。直接編集しないでください。");
out.push("-- 料金・成果報酬条件は公式サイトで確認できたものだけを記載しています。公開前に編集部で再確認してください。");
out.push("begin;\n");

// 親カテゴリ → 子カテゴリの順に投入
const depthOf = (c) => (c.parent ? 1 + depthOf(seed.categories.find((x) => x.slug === c.parent)) : 0);
for (const c of [...seed.categories].sort((a, b) => depthOf(a) - depthOf(b))) {
  const parent = c.parent ? `(select id from categories where slug = ${q(c.parent)})` : "null";
  out.push(
    `insert into categories (slug, name, icon, description, sort_order, parent_id, published) values (${q(c.slug)}, ${q(c.name)}, ${q(c.icon)}, ${q(c.description)}, ${c.sort_order}, ${parent}, true)\n` +
      `  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;`,
  );
}
out.push("");

for (const s of seed.services) {
  out.push(
    `insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)\n` +
      `values (${[
        q(s.slug), q(s.name), q(s.company_name), q(s.summary), q(s.description), q(s.logo_url), q(s.website_url),
        q(s.initial_fee_type), q(s.initial_fee), q(s.monthly_fee_type), q(s.monthly_fee), q(s.success_fee), q(s.pricing_note),
        q(s.success_condition), q(s.outcome_type), b(s.is_full_success_fee), b(s.has_free_consultation), q(s.target_companies),
        arr(s.features), q(s.partner_status), b(s.featured), b(s.show_in_popular), b(s.published), q("verified"), q(s.source_url), q(s.last_verified_at),
      ].join(", ")})\n` +
      `  on conflict (slug) do nothing;`,
  );
  s.categories.forEach((slug, i) => {
    out.push(
      `insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, ${i === 0} from services s, categories c where s.slug = ${q(s.slug)} and c.slug = ${q(slug)} on conflict do nothing;`,
    );
  });
  out.push("");
}

for (const a of seed.articles) {
  const cat = a.category ? `(select id from categories where slug = ${q(a.category)})` : "null";
  out.push(
    `insert into articles (slug, title, excerpt, body, category_id, published, published_at) values (${q(a.slug)}, ${q(a.title)}, ${q(a.excerpt)}, ${q(a.body)}, ${cat}, true, ${q(a.published_at)})\n  on conflict (slug) do nothing;`,
  );
  a.services.forEach((slug, i) => {
    out.push(
      `insert into article_services (article_id, service_id, sort_order) select a.id, s.id, ${i} from articles a, services s where a.slug = ${q(a.slug)} and s.slug = ${q(slug)} on conflict do nothing;`,
    );
  });
  out.push("");
}
out.push("commit;");
writeFileSync(new URL("../supabase/seed.sql", import.meta.url), out.join("\n") + "\n");
console.log("supabase/seed.sql を生成しました");
