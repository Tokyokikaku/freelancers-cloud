"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from "react";
import { submitLeads, type LeadState } from "@/app/actions/lead";
import { EMPLOYEE_OPTIONS, MAX_REQUEST_SERVICES, TIMING_OPTIONS } from "@/lib/lead-options";
import { leadDisclaimer } from "@/lib/partner";
import { getAttribution, getVisitorId, track } from "@/lib/tracking";
import type { FeeType, PartnerStatus } from "@/lib/types";
import { useRequestList } from "./request-store";

export interface ServiceLite {
  id: string;
  slug: string;
  name: string;
  company_name: string;
  category_ids: string[];
  category_names: string[];
  partner_status: PartnerStatus;
  initial_fee_type: FeeType;
  monthly_fee_type: FeeType;
  is_full_success_fee: boolean;
  featured: boolean;
  success_condition: string | null;
}

const PROFILE_KEY = "snv_profile";
interface Profile { company?: string; name?: string; email?: string; phone?: string; employees?: string; timing?: string }

function Row({ s, checked, onToggle, disabled }: { s: ServiceLite; checked: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <li>
      <label className={`flex cursor-pointer items-start gap-3 p-3 sm:p-4 ${checked ? "bg-warn-50" : "bg-white hover:bg-surface/60"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={onToggle} className="mt-1 size-5 shrink-0 accent-cta-500" aria-label={`${s.name}の資料を請求する`} />
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-ink">{s.name}</span>
          <span className="block text-xs text-muted">{s.company_name}{s.category_names[0] ? ` ／ ${s.category_names[0]}` : ""}</span>
          <span className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] font-bold">
            {s.is_full_success_fee && <span className="tag bg-brand-700 text-white">完全成果報酬</span>}
            {s.initial_fee_type === "free" && <span className="tag bg-good-50 text-good-700 ring-1 ring-good-100">初期費用0円</span>}
            {s.monthly_fee_type === "free" && <span className="tag bg-good-50 text-good-700 ring-1 ring-good-100">月額0円</span>}
            {s.success_condition && <span className="font-normal text-muted">成果地点：{s.success_condition}</span>}
          </span>
        </span>
        <Link href={`/services/${s.slug}`} target="_blank" className="shrink-0 text-xs text-brand-700 underline" onClick={(e) => e.stopPropagation()}>詳細</Link>
      </label>
    </li>
  );
}

export function RequestFlow({ services, initialSlugs }: { services: ServiceLite[]; initialSlugs: string[] }) {
  const router = useRouter();
  const store = useRequestList();
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLeads, { ok: false });
  const known = useMemo(() => new Set(services.map((s) => s.slug)), [services]);
  const [selected, setSelected] = useState<string[]>(() => initialSlugs.filter((s) => known.has(s)));
  const [profile, setProfile] = useState<Profile | null>(null);
  const [attr, setAttr] = useState({ source: "", medium: "", campaign: "", visitor_id: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const init = useRef(false);

  // 初回: URL にサービス指定がなければ、この端末の資料請求リストを使う。保存済みのプロフィールを読み込む。
  useEffect(() => {
    if (init.current) return;
    init.current = true;
    if (initialSlugs.filter((s) => known.has(s)).length === 0) {
      const fromStore = store.items.map((i) => i.slug).filter((s) => known.has(s));
      if (fromStore.length) setSelected(fromStore);
    }
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      setProfile(raw ? (JSON.parse(raw) as Profile) : {});
    } catch {
      setProfile({});
    }
    const a = getAttribution();
    setAttr({ source: a.source, medium: a.medium, campaign: a.campaign, visitor_id: getVisitorId() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bySlug = useMemo(() => new Map(services.map((s) => [s.slug, s])), [services]);
  const chosen = selected.map((s) => bySlug.get(s)).filter((s): s is ServiceLite => Boolean(s));
  const full = selected.length >= MAX_REQUEST_SERVICES;

  // あわせて資料請求されやすいサービス: 選択中と同じカテゴリ → 足りなければおすすめ順
  const suggestions = useMemo(() => {
    const cats = new Set(chosen.flatMap((c) => c.category_ids));
    const rest = services.filter((s) => !selected.includes(s.slug));
    const same = rest.filter((s) => s.category_ids.some((id) => cats.has(id)));
    const others = rest.filter((s) => !same.includes(s));
    const order = (a: ServiceLite, b: ServiceLite) => Number(b.is_full_success_fee) - Number(a.is_full_success_fee) || Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "ja");
    return [...same.sort(order), ...others.sort(order)].slice(0, 6);
  }, [services, selected, chosen]);

  const toggle = (slug: string) => setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length < MAX_REQUEST_SERVICES ? [...cur, slug] : cur));

  function onFormStart() {
    if (started.current) return;
    started.current = true;
    chosen.forEach((c) => track("lead_form_start", { service_id: c.id, service_name: c.name }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // action 属性で送ると、エラー時にも入力欄が自動リセットされてしまうため、手動で Server Action を呼ぶ
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    startTransition(() => action(fd));
    // 「次回から入力を省略」にチェックがあれば、この端末（localStorage）にだけ保存する
    try {
      if (fd.get("remember") === "on") {
        const p: Profile = {};
        for (const k of ["company", "name", "email", "phone", "employees", "timing"] as const) p[k] = String(fd.get(k) ?? "");
        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
      } else {
        window.localStorage.removeItem(PROFILE_KEY);
      }
    } catch {}
  }

  useEffect(() => {
    if (state.ok && state.redirectTo) {
      // DB への保存・lead_submit 記録はサーバー側で済んでいるため、GA4 のみへ送信
      state.sent?.forEach((s) => track("lead_submit", { service_id: s.id, service_name: s.name }, { store: false }));
      store.removeMany(selected);
      router.push(state.redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const partners = chosen.filter((c) => c.partner_status !== "unpartnered");
  const unpartnered = chosen.filter((c) => c.partner_status === "unpartnered");
  const err = (k: string) => state.errors?.[k];
  const fp = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `req-${k}-err` : undefined });

  return (
    <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="min-w-0 space-y-8">
        {/* 1. サービスを選ぶ */}
        <section aria-labelledby="step1">
          <h2 id="step1" className="mb-3 flex items-center gap-2 text-lg"><span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-600 text-sm text-white">1</span>資料請求するサービス<span className="text-sm font-normal text-muted">（{selected.length}/{MAX_REQUEST_SERVICES}件）</span></h2>
          {chosen.length ? (
            <ul className="panel divide-y divide-line overflow-hidden">
              {chosen.map((s) => <Row key={s.slug} s={s} checked onToggle={() => toggle(s.slug)} />)}
            </ul>
          ) : (
            <p className="panel p-6 text-center text-sm text-muted">資料請求するサービスが選ばれていません。下のおすすめから選ぶか、<Link href="/services" className="font-bold text-brand-700 underline">サービス一覧</Link>から選んでください。</p>
          )}
          {chosen.length > 0 && (
            <p className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
              <span>チェックを外したサービスの資料は請求されません。</span>
              <button type="button" className="font-bold text-brand-700 underline" onClick={() => setSelected([])}>すべて外す</button>
            </p>
          )}
          {err("services") && <p role="alert" className="mt-2 text-sm text-red-600">{err("services")}</p>}

          {suggestions.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base">ほかの資料もまとめて請求<span className="ml-2 text-xs font-normal text-muted">同じ入力で、追加の入力なしで一緒に無料請求できます</span></h3>
                <button type="button" className="text-xs font-bold text-brand-700 underline" onClick={() => setSelected((cur) => Array.from(new Set([...cur, ...suggestions.map((s) => s.slug)])).slice(0, MAX_REQUEST_SERVICES))}>おすすめをすべて追加</button>
              </div>
              <ul className="panel divide-y divide-line overflow-hidden">
                {suggestions.map((s) => <Row key={s.slug} s={s} checked={false} disabled={full} onToggle={() => toggle(s.slug)} />)}
              </ul>
            </div>
          )}
        </section>

        {/* 2. 情報を入力 */}
        <section aria-labelledby="step2">
          <h2 id="step2" className="mb-3 flex items-center gap-2 text-lg"><span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-600 text-sm text-white">2</span>お客様の情報を入力<span className="text-sm font-normal text-muted">（1回の入力で、選んだ全サービスに使われます）</span></h2>
          {profile && (
            <form id="request-form" ref={formRef} onInputCapture={onFormStart} onSubmit={onSubmit} className="panel space-y-4 p-4 sm:p-6">
              {selected.map((s) => <input key={s} type="hidden" name="service_slugs" value={s} />)}
              <input type="hidden" name="source" value={attr.source} />
              <input type="hidden" name="medium" value={attr.medium} />
              <input type="hidden" name="campaign" value={attr.campaign} />
              <input type="hidden" name="visitor_id" value={attr.visitor_id} />
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="req-company">会社名 <span className="text-xs text-red-600">必須</span></label>
                  <input id="req-company" name="company" required maxLength={100} autoComplete="organization" defaultValue={profile.company} className="input" {...fp("company")} />
                  {err("company") && <p id="req-company-err" className="mt-1 text-sm text-red-600">{err("company")}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="req-name">氏名 <span className="text-xs text-red-600">必須</span></label>
                  <input id="req-name" name="name" required maxLength={60} autoComplete="name" defaultValue={profile.name} className="input" {...fp("name")} />
                  {err("name") && <p id="req-name-err" className="mt-1 text-sm text-red-600">{err("name")}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="req-email">メールアドレス <span className="text-xs text-red-600">必須</span></label>
                  <input id="req-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" defaultValue={profile.email} className="input" {...fp("email")} />
                  {err("email") && <p id="req-email-err" className="mt-1 text-sm text-red-600">{err("email")}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="req-phone">電話番号 <span className="text-xs font-normal text-muted">任意</span></label>
                  <input id="req-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" defaultValue={profile.phone} className="input" {...fp("phone")} />
                  {err("phone") && <p id="req-phone-err" className="mt-1 text-sm text-red-600">{err("phone")}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="req-employees">従業員規模 <span className="text-xs font-normal text-muted">任意</span></label>
                  <select id="req-employees" name="employees" defaultValue={profile.employees ?? ""} className="input">
                    <option value="">選択してください</option>
                    {EMPLOYEE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="req-timing">検討時期 <span className="text-xs font-normal text-muted">任意</span></label>
                  <select id="req-timing" name="timing" defaultValue={profile.timing ?? ""} className="input">
                    <option value="">選択してください</option>
                    {TIMING_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label" htmlFor="req-message">検討の背景・ご要望 <span className="text-xs font-normal text-muted">任意</span></label>
                <textarea id="req-message" name="message" rows={3} maxLength={1000} placeholder="例：新規顧客の獲得を強化したい。予算は月◯万円まで。" className="input" {...fp("message")} />
                {err("message") && <p id="req-message-err" className="mt-1 text-sm text-red-600">{err("message")}</p>}
              </div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
                <input type="checkbox" name="remember" defaultChecked={Boolean(profile.email) || profile.company === undefined} className="mt-1 size-4 accent-brand-600" />
                <span>次回から入力を省略する<span className="block text-xs text-muted">入力内容をこの端末のブラウザにだけ保存します（当サイトのサーバーには送られません）。共用のパソコンではチェックを外してください。</span></span>
              </label>

              <div className="space-y-2 rounded-md bg-surface p-3.5 text-sm leading-7">
                {unpartnered.length > 0 && <p>{leadDisclaimer("unpartnered")}</p>}
                {partners.length > 0 && <p>次のサービスには、資料のご案内のため入力内容が提供されます：{partners.map((p) => p.name).join("、")}</p>}
              </div>
              {partners.length > 0 && (
                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-md border-2 border-cta-500 bg-warn-50 p-3 text-sm text-ink">
                    <input type="checkbox" name="third_party_consent" className="mt-1 size-4 accent-cta-500" aria-describedby={err("consent") ? "req-consent-err" : undefined} />
                    <span><b>必須</b> 上記の提供会社（{partners.length}社）に、資料のご案内のため、入力した会社名・氏名・連絡先・ご要望などが提供されることに同意します。</span>
                  </label>
                  {err("consent") && <p id="req-consent-err" role="alert" className="mt-1 text-sm text-red-600">{err("consent")}</p>}
                </div>
              )}
              <p className="text-xs leading-6 text-muted">送信により<Link href="/privacy" target="_blank" className="underline">プライバシーポリシー</Link>に同意したものとみなします。</p>
              {state.message && <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}
              {suggestions.length > 0 && !full && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded bg-warn-50 p-3 text-sm">
                  <span className="font-bold text-ink">ほかの資料も一緒に請求すると、入力は今回の1回だけで済みます。</span>
                  <button type="button" className="btn-secondary !min-h-9 text-xs" onClick={() => setSelected((cur) => Array.from(new Set([...cur, ...suggestions.slice(0, 3).map((s) => s.slug)])).slice(0, MAX_REQUEST_SERVICES))}>おすすめ3件を追加</button>
                </div>
              )}
              <button type="submit" disabled={pending || state.ok || chosen.length === 0} className="btn-cta w-full py-3.5 text-base disabled:opacity-60">
                {pending || state.ok ? "送信中…" : chosen.length > 1 ? `${chosen.length}件まとめて資料請求する（無料）` : "資料請求する（無料）"}
              </button>
            </form>
          )}
        </section>
      </div>

      {/* 右: 無料資料請求の内容 */}
      <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start" aria-label="無料資料請求の内容">
        <div className="panel overflow-hidden">
          <p className="bg-brand-700 px-4 py-2 text-sm font-bold text-white">無料資料請求の内容</p>
          <div className="p-4">
            <p className="text-3xl font-black text-ink">{chosen.length}<span className="ml-1 text-sm font-bold">件の資料</span></p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {chosen.map((c) => <li key={c.slug} className="flex items-start justify-between gap-2"><span className="min-w-0 truncate">{c.name}</span><button type="button" className="shrink-0 text-xs text-muted underline" onClick={() => toggle(c.slug)}>外す</button></li>)}
            </ul>
            <button type="submit" form="request-form" disabled={pending || state.ok || chosen.length === 0} className="btn-cta mt-4 hidden w-full lg:inline-flex">無料で資料請求する</button>
            <ul className="mt-4 space-y-1 border-t border-line pt-3 text-xs leading-6 text-muted">
              <li>・資料請求は無料です</li>
              <li>・1回の入力で複数サービスの資料を請求できます</li>
              <li>・コンシェルジュが資料を用意してご連絡します</li>
              <li>・未提携のサービスには、入力内容を送信しません</li>
            </ul>
          </div>
        </div>

        {suggestions.length > 0 && !full && (
          <div className="panel hidden overflow-hidden lg:block">
            <p className="border-b border-line bg-warn-50 px-4 py-2 text-sm font-bold text-ink">ほかの資料もご一緒に（あと{MAX_REQUEST_SERVICES - selected.length}件まで）</p>
            <ul className="divide-y divide-line">
              {suggestions.slice(0, 3).map((s) => (
                <li key={s.slug} className="flex items-center gap-2 p-3">
                  <span className="min-w-0 flex-1"><b className="block truncate text-sm text-ink">{s.name}</b><span className="block truncate text-[11px] text-muted">{s.category_names[0] ?? s.company_name}</span></span>
                  <button type="button" onClick={() => toggle(s.slug)} className="btn-secondary !min-h-9 shrink-0 !px-3 text-xs">＋ 追加</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
