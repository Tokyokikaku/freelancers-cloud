"use client";
import { useActionState } from "react";
import { saveService, type FormState } from "@/app/actions/admin";
import { OUTCOME_LABELS, PARTNER_STATUS_LABELS, REVIEW_LABELS, type Category, type Service } from "@/lib/types";
import { flattenTree } from "@/lib/categories";
import { Check, Field, FormMessage, Section } from "./FormUI";

const FEE_OPTIONS = [["unknown", "不明（要問い合わせ）"], ["free", "0円（無料）"], ["paid", "有料"]] as const;

export function ServiceForm({ service, categories, contact }: { service?: Service; categories: Category[]; contact?: { notify_email: string | null; webhook_url: string | null } }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveService, {});
  const e = state.errors ?? {};
  const s = service;
  const primary = s?.category_ids[0];

  return (
    <form action={action} className="space-y-6">
      {s && <input type="hidden" name="id" value={s.id} />}

      <Section title="基本情報">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="サービス名" name="name" required error={e.name}><input id="name" name="name" defaultValue={s?.name} required className="input" /></Field>
          <Field label="会社名" name="company_name" required error={e.company_name}><input id="company_name" name="company_name" defaultValue={s?.company_name} required className="input" /></Field>
          <Field label="スラッグ（URL）" name="slug" required error={e.slug} hint="/services/○○ の部分。半角英小文字・数字・ハイフン。公開後の変更は避けてください。"><input id="slug" name="slug" defaultValue={s?.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className="input" /></Field>
          <Field label="URL（公式サイト）" name="website_url" required error={e.website_url}><input id="website_url" name="website_url" type="url" defaultValue={s?.website_url} required className="input" /></Field>
          <Field label="ロゴURL" name="logo_url" error={e.logo_url} hint="権利関係を確認した画像のみ使用してください。未入力の場合は頭文字を表示します。"><input id="logo_url" name="logo_url" type="url" defaultValue={s?.logo_url ?? ""} className="input" /></Field>
        </div>
        <Field label="短い説明（一覧カード用）" name="summary" error={e.summary}><textarea id="summary" name="summary" rows={2} defaultValue={s?.summary ?? ""} className="input" /></Field>
        <Field label="サービス概要（詳細ページ用）" name="description" error={e.description} hint="300〜800文字程度。段落は空行で区切ります。確認できていない事実は書かないでください。"><textarea id="description" name="description" rows={9} defaultValue={s?.description ?? ""} className="input" /></Field>
        <Field label="特徴（1行1項目、3〜5項目）" name="features" error={e.features}><textarea id="features" name="features" rows={5} defaultValue={s?.features.join("\n") ?? ""} className="input" /></Field>
        <Field label="対象企業" name="target_companies"><input id="target_companies" name="target_companies" defaultValue={s?.target_companies ?? ""} className="input" /></Field>
      </Section>

      <Section title="カテゴリ">
        <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {flattenTree(categories).map(({ category: c, depth }) => (
            <label key={c.id} className={`flex items-center gap-2 text-sm ${depth === 0 ? "mt-2 font-bold text-ink" : ""}`} style={{ paddingLeft: `${depth * 1.25}rem` }}>
              <input type="checkbox" name="category_ids" value={c.id} defaultChecked={s?.category_ids.includes(c.id)} className="size-4 accent-brand-600" />
              {c.name}
            </label>
          ))}
        </div>
        <Field label="主カテゴリ" name="primary_category_id" hint="パンくずリストなどに使うカテゴリ（上でチェックしたもの）">
          <select id="primary_category_id" name="primary_category_id" defaultValue={primary ?? ""} className="input">
            <option value="">（先頭のチェック項目）</option>
            {flattenTree(categories).map(({ category: c, depth }) => <option key={c.id} value={c.id}>{`${"　".repeat(depth)}${c.name}`}</option>)}
          </select>
        </Field>
      </Section>

      <Section title="料金・成果">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="初期費用" name="initial_fee_type">
            <select id="initial_fee_type" name="initial_fee_type" defaultValue={s?.initial_fee_type ?? "unknown"} className="input">{FEE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </Field>
          <Field label="初期費用の補足" name="initial_fee" hint="有料の場合の金額・条件。不明なら空欄（「要問い合わせ」と表示）"><input id="initial_fee" name="initial_fee" defaultValue={s?.initial_fee ?? ""} className="input" /></Field>
          <Field label="月額費用" name="monthly_fee_type">
            <select id="monthly_fee_type" name="monthly_fee_type" defaultValue={s?.monthly_fee_type ?? "unknown"} className="input">{FEE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </Field>
          <Field label="月額費用の補足" name="monthly_fee"><input id="monthly_fee" name="monthly_fee" defaultValue={s?.monthly_fee ?? ""} className="input" /></Field>
          <Field label="成果報酬額" name="success_fee" hint="公開情報で確認できる場合のみ。不明なら空欄（「要問い合わせ」と表示）"><input id="success_fee" name="success_fee" defaultValue={s?.success_fee ?? ""} className="input" /></Field>
          <Field label="料金の補足" name="pricing_note"><input id="pricing_note" name="pricing_note" defaultValue={s?.pricing_note ?? ""} className="input" /></Field>
          <Field label="成果地点（表示用の文言）" name="success_condition" hint="例: 商談実施、採用決定"><input id="success_condition" name="success_condition" defaultValue={s?.success_condition ?? ""} className="input" /></Field>
          <Field label="成果地点の分類（絞り込み用）" name="outcome_type">
            <select id="outcome_type" name="outcome_type" defaultValue={s?.outcome_type ?? "other"} className="input">{Object.entries(OUTCOME_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </Field>
        </div>
        <Check name="is_full_success_fee" label="完全成果報酬（固定費・月額費用がなく、成果発生時のみ費用が発生）" defaultChecked={s?.is_full_success_fee} hint="初期費用・月額費用がどちらも「0円」の場合のみ設定できます。" error={e.is_full_success_fee} />
        <Check name="has_free_consultation" label="無料相談あり" defaultChecked={s?.has_free_consultation} />
      </Section>

      <Section title="情報の出典">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="情報ソースURL" name="source_url" error={e.source_url} hint="公式サイト・公式プレスリリース等"><input id="source_url" name="source_url" type="url" defaultValue={s?.source_url ?? ""} className="input" /></Field>
          <Field label="最終確認日" name="last_verified_at" error={e.last_verified_at} hint="サイト上の「情報更新日」として表示されます"><input id="last_verified_at" name="last_verified_at" type="date" defaultValue={s?.last_verified_at ?? ""} className="input" /></Field>
        </div>
      </Section>

      <Section title="提携・通知設定">
        <Field label="提携状態" name="partner_status" hint="「未提携」の企業に、提携を示す表示は出ません。提携済み・優先掲載にすると「無料で資料請求」に切り替わり、リードを通知します。">
          <select id="partner_status" name="partner_status" defaultValue={s?.partner_status ?? "unpartnered"} className="input">{Object.entries(PARTNER_STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="リード通知先メールアドレス" name="notify_email" error={e.notify_email}><input id="notify_email" name="notify_email" type="email" defaultValue={contact?.notify_email ?? ""} className="input" /></Field>
          <Field label="リード通知Webhook URL（https）" name="webhook_url" error={e.webhook_url}><input id="webhook_url" name="webhook_url" type="url" defaultValue={contact?.webhook_url ?? ""} className="input" /></Field>
        </div>
      </Section>

      <Section title="公開設定">
        <Field label="確認状態" name="review_status" error={e.review_status} hint="下書き → 確認中 → 確認済み の順に進めます。公開できるのは「確認済み」のみです。">
          <select id="review_status" name="review_status" defaultValue={s?.review_status ?? "draft"} className="input">
            {Object.entries(REVIEW_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Check name="published" label="公開する" defaultChecked={s?.published} />
        <Check name="featured" label="おすすめに設定する（編集部の判断。人気ランキングの順位には影響しません）" defaultChecked={s?.featured} />
        <Check name="show_in_popular" label="人気ランキングの対象にする" defaultChecked={s?.show_in_popular ?? true} />
      </Section>

      <FormMessage message={state.message} />
      <div className="sticky bottom-0 -mx-4 border-t border-line bg-white/95 p-4 backdrop-blur sm:-mx-8 sm:px-8">
        <button type="submit" disabled={pending} className="btn-primary min-w-40 disabled:opacity-60">{pending ? "保存中…" : "保存する"}</button>
      </div>
    </form>
  );
}
