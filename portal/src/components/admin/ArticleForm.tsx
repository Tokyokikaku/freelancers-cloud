"use client";
import { useActionState } from "react";
import { saveArticle, type FormState } from "@/app/actions/admin";
import type { Article, Category, Service } from "@/lib/types";
import { Check, Field, FormMessage } from "./FormUI";

export function ArticleForm({ article, categories, services }: { article?: Article; categories: Category[]; services: Pick<Service, "id" | "name">[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveArticle, {});
  const e = state.errors ?? {};
  const a = article;
  return (
    <form action={action} className="card space-y-4 p-5 sm:p-6">
      {a && <input type="hidden" name="id" value={a.id} />}
      <Field label="タイトル" name="title" required error={e.title}><input id="title" name="title" defaultValue={a?.title} required className="input" /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="スラッグ（URL）" name="slug" required error={e.slug} hint="/articles/○○ の部分"><input id="slug" name="slug" defaultValue={a?.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className="input" /></Field>
        <Field label="カテゴリ" name="category_id">
          <select id="category_id" name="category_id" defaultValue={a?.category_id ?? ""} className="input">
            <option value="">（なし）</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="抜粋" name="excerpt" error={e.excerpt}><textarea id="excerpt" name="excerpt" rows={2} defaultValue={a?.excerpt ?? ""} className="input" /></Field>
      <Field label="本文（Markdown）" name="body" error={e.body} hint="サービスへの内部リンクは [サービス名](/services/slug) の形式で書けます。表（GFM）も使えます。">
        <textarea id="body" name="body" rows={20} defaultValue={a?.body ?? ""} className="input font-mono text-sm" />
      </Field>
      <fieldset>
        <legend className="label">関連サービス（記事下に表示）</legend>
        <div className="grid max-h-48 gap-1 overflow-y-auto rounded-md border border-line p-3 sm:grid-cols-2">
          {services.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="service_ids" value={s.id} defaultChecked={a?.service_ids.includes(s.id)} className="size-4 accent-brand-600" />{s.name}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="SEO title（任意）" name="seo_title"><input id="seo_title" name="seo_title" defaultValue={a?.seo_title ?? ""} className="input" /></Field>
      <Field label="SEO description（任意）" name="seo_description"><textarea id="seo_description" name="seo_description" rows={2} defaultValue={a?.seo_description ?? ""} className="input" /></Field>
      <Check name="published" label="公開する" defaultChecked={a?.published} />
      <FormMessage message={state.message} />
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? "保存中…" : "保存する"}</button>
    </form>
  );
}
