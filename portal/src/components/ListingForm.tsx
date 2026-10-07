"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitListingInquiry, type ListingState } from "@/app/actions/listing";
import { checkEmail } from "@/lib/contact-validation";

const EVENT = "open-listing-form";
type Topic = "listing" | "appo";

/** ボタン。押すとフォームのダイアログが開く */
export function ListingButton({ topic = "listing", className, children }: { topic?: Topic; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent(EVENT, { detail: topic }))}>
      {children}
    </button>
  );
}

/** 掲載希望・アポ化相談フォーム（ダイアログ）。ページに1つだけ置く */
export function ListingFormDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState<Topic>("listing");
  const [withAppo, setWithAppo] = useState(false);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [state, action, pending] = useActionState<ListingState, FormData>(submitListingInquiry, { ok: false });

  useEffect(() => {
    const open = (e: Event) => {
      const t = ((e as CustomEvent).detail as Topic) ?? "listing";
      setTopic(t);
      setWithAppo(t === "appo");
      ref.current?.showModal();
    };
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  const err = (k: string) => state.errors?.[k];
  const fp = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `lf-${k}-err` : undefined });
  const topicValue = topic === "appo" ? "appo" : withAppo ? "listing_appo" : "listing";
  const Err = ({ k }: { k: string }) => (err(k) ? <p id={`lf-${k}-err`} role="alert" className="mt-1 text-sm font-bold text-red-700">{err(k)}</p> : null);

  return (
    <dialog
      ref={ref}
      aria-labelledby="lf-title"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[92dvh] w-[min(40rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-line bg-white p-0 shadow-2xl backdrop:bg-slate-900/60"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 id="lf-title" className="text-xl">{topic === "appo" ? "アポ化オプションのご相談" : "掲載のお申し込み（無料）"}</h2>
          <button type="button" onClick={() => ref.current?.close()} aria-label="閉じる" className="-m-2 p-2 text-2xl leading-none text-muted hover:text-ink">×</button>
        </div>

        {state.ok ? (
          <div className="py-8 text-center" role="status">
            <p className="text-lg font-black text-ink">送信しました</p>
            <p className="mt-3 text-sm leading-7 text-body">内容を確認のうえ、編集部からご連絡します。しばらくお待ちください。</p>
            <button type="button" onClick={() => ref.current?.close()} className="btn btn-secondary mt-6 min-h-11 px-8">閉じる</button>
          </div>
        ) : (
          <form action={action} className="mt-4 space-y-4" noValidate={false}>
            <input type="hidden" name="topic" value={topicValue} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            {state.message && <p role="alert" className="rounded border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-800">{state.message}</p>}

            <div>
              <label htmlFor="lf-company" className="label">会社名 <span className="text-red-700">*</span></label>
              <input id="lf-company" name="company" required maxLength={100} autoComplete="organization" className="input" {...fp("company")} />
              <Err k="company" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lf-service" className="label">掲載希望のサービス名</label>
                <input id="lf-service" name="service_name" maxLength={100} className="input" {...fp("service_name")} />
                <Err k="service_name" />
              </div>
              <div>
                <label htmlFor="lf-url" className="label">料金が分かるページのURL</label>
                <input id="lf-url" name="service_url" type="url" maxLength={300} inputMode="url" placeholder="https://" className="input" {...fp("service_url")} />
                <Err k="service_url" />
              </div>
            </div>
            <div>
              <label htmlFor="lf-billing" className="label">何を成果として、いくらで課金しますか</label>
              <textarea id="lf-billing" name="billing" rows={2} maxLength={500} placeholder="例：問い合わせ1件あたり◯円、初期費用なし" className="input" {...fp("billing")} />
              <Err k="billing" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lf-name" className="label">ご担当者名 <span className="text-red-700">*</span></label>
                <input id="lf-name" name="name" required maxLength={60} autoComplete="name" className="input" {...fp("name")} />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor="lf-phone" className="label">電話番号</label>
                <input id="lf-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" className="input" {...fp("phone")} />
                <Err k="phone" />
              </div>
            </div>
            <div>
              <label htmlFor="lf-email" className="label">メールアドレス <span className="text-red-700">*</span></label>
              <input
                id="lf-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" className="input" placeholder="例：taro@example.co.jp"
                onBlur={(e) => setEmailErr(e.target.value ? checkEmail(e.target.value) : null)}
                onChange={() => emailErr && setEmailErr(null)}
                {...fp("email")}
              />
              {emailErr ? <p role="alert" className="mt-1 text-sm font-bold text-red-700">{emailErr}</p> : <Err k="email" />}
            </div>
            {topic === "listing" && (
              <label className="flex items-start gap-2 text-sm leading-6">
                <input type="checkbox" checked={withAppo} onChange={(e) => setWithAppo(e.target.checked)} className="mt-1 size-4" />
                <span>アポ化オプション（資料請求後のフォロー・商談アポ化の代行）にも関心がある</span>
              </label>
            )}
            <div>
              <label htmlFor="lf-message" className="label">ご相談内容</label>
              <textarea id="lf-message" name="message" rows={3} maxLength={1000} className="input" {...fp("message")} />
              <Err k="message" />
            </div>
            <div>
              <label className="flex items-start gap-2 text-sm leading-6">
                <input type="checkbox" name="consent" required className="mt-1 size-4" {...fp("consent")} />
                <span><Link href="/privacy" target="_blank" className="font-bold text-brand-700 underline">プライバシーポリシー</Link>に同意して送信する</span>
              </label>
              <Err k="consent" />
            </div>
            <button type="submit" disabled={pending} className="btn btn-cta min-h-12 w-full text-base disabled:opacity-60">{pending ? "送信中…" : "送信する"}</button>
            <p className="text-xs leading-6 text-muted">ご入力いただいた内容は、掲載のご案内・ご相談への対応のために利用します。</p>
          </form>
        )}
      </div>
    </dialog>
  );
}
