"use client";
import { useActionState } from "react";
import { saveCategory, type FormState } from "@/app/actions/admin";
import type { Category } from "@/lib/types";
import { Check, Field, FormMessage } from "./FormUI";

const ICONS = ["sales", "marketing", "acquisition", "recruitment", "ec", "mna", "funding", "other"];

export function CategoryForm({ category, categories }: { category?: Category; categories: Category[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveCategory, {});
  const e = state.errors ?? {};
  const c = category;
  return (
    <form action={action} className="card space-y-4 p-5 sm:p-6">
      {c && <input type="hidden" name="id" value={c.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="カテゴリ名" name="name" required error={e.name}><input id="name" name="name" defaultValue={c?.name} required className="input" /></Field>
        <Field label="スラッグ（URL）" name="slug" required error={e.slug} hint="/category/○○ の部分。半角英小文字・数字・ハイフン"><input id="slug" name="slug" defaultValue={c?.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className="input" /></Field>
        <Field label="親カテゴリ" name="parent_id" error={e.parent_id}>
          <select id="parent_id" name="parent_id" defaultValue={c?.parent_id ?? ""} className="input">
            <option value="">（なし：大カテゴリ）</option>
            {categories.filter((x) => x.id !== c?.id).map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </Field>
        <Field label="アイコン" name="icon">
          <select id="icon" name="icon" defaultValue={c?.icon ?? "other"} className="input">{ICONS.map((i) => <option key={i} value={i}>{i}</option>)}</select>
        </Field>
        <Field label="表示順（小さいほど先）" name="sort_order" error={e.sort_order}><input id="sort_order" name="sort_order" type="number" defaultValue={c?.sort_order ?? 100} className="input" /></Field>
      </div>
      <Field label="説明文（カテゴリページ冒頭）" name="description" hint="空の場合は定型文を表示します"><textarea id="description" name="description" rows={4} defaultValue={c?.description ?? ""} className="input" /></Field>
      <Field label="SEO title（任意）" name="seo_title" hint="空の場合は「成果報酬型の○○N社を比較｜成果報酬ナビ」を自動生成"><input id="seo_title" name="seo_title" defaultValue={c?.seo_title ?? ""} className="input" /></Field>
      <Field label="SEO description（任意）" name="seo_description"><textarea id="seo_description" name="seo_description" rows={2} defaultValue={c?.seo_description ?? ""} className="input" /></Field>
      <Check name="published" label="公開する" defaultChecked={c?.published ?? true} />
      <FormMessage message={state.message} />
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? "保存中…" : "保存する"}</button>
    </form>
  );
}
