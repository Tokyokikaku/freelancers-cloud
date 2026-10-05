"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { TIMING_OPTIONS } from "@/lib/lead-options";
import { getAttribution, getVisitorId, track } from "@/lib/tracking";
import type { PartnerStatus } from "@/lib/types";
import { Icon } from "./Icon";

interface Props {
  serviceId: string;
  serviceName: string;
  buttonLabel: string;
  disclaimer: string;
  partnerStatus: PartnerStatus;
  className?: string;
  placement: string;
}

const initial: LeadState = { ok: false };

export function LeadDialog({ serviceId, serviceName, buttonLabel, disclaimer, className, placement }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [state, action, pending] = useActionState(submitLead, initial);
  const [attr, setAttr] = useState({ source: "", medium: "", campaign: "", visitor_id: "" });
  const started = useRef(false);

  function open() {
    const a = getAttribution();
    setAttr({ source: a.source, medium: a.medium, campaign: a.campaign, visitor_id: getVisitorId() });
    started.current = false;
    track("document_button_click", { service_id: serviceId, service_name: serviceName, placement });
    dialogRef.current?.showModal();
  }

  function onFormStart() {
    if (started.current) return;
    started.current = true;
    track("lead_form_start", { service_id: serviceId, service_name: serviceName });
  }

  useEffect(() => {
    if (state.ok && state.redirectTo) {
      // DB への保存・lead_submit 記録はサーバー側で済んでいるため、GA4 のみへ送信
      track("lead_submit", { service_id: serviceId, service_name: serviceName }, { store: false });
      router.push(state.redirectTo);
    }
  }, [state, router, serviceId, serviceName]);

  const err = (k: string) => state.errors?.[k];
  const fieldProps = (k: string) => ({
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? `lead-${k}-err` : undefined,
  });

  return (
    <>
      <button type="button" onClick={open} className={className ?? "btn-secondary"}>
        {buttonLabel}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="lead-title"
        className="m-auto w-[min(100%-1.5rem,34rem)] max-h-[92dvh] overflow-y-auto rounded-2xl border border-line bg-white p-0 shadow-2xl"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <form action={action} onInputCapture={onFormStart} className="p-5 sm:p-7">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id="lead-title" className="text-lg sm:text-xl">{buttonLabel}</h2>
              <p className="mt-1 text-sm text-muted">{serviceName}</p>
            </div>
            <button type="button" onClick={() => dialogRef.current?.close()} className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg hover:bg-surface" aria-label="閉じる">
              <Icon name="close" />
            </button>
          </div>

          <input type="hidden" name="service_id" value={serviceId} />
          <input type="hidden" name="source" value={attr.source} />
          <input type="hidden" name="medium" value={attr.medium} />
          <input type="hidden" name="campaign" value={attr.campaign} />
          <input type="hidden" name="visitor_id" value={attr.visitor_id} />
          {/* ハニーポット: 人間には見えない */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="lead-company">会社名 <span className="text-red-600">必須</span></label>
              <input id="lead-company" name="company" required maxLength={100} autoComplete="organization" className="input" {...fieldProps("company")} />
              {err("company") && <p id="lead-company-err" className="mt-1 text-sm text-red-600">{err("company")}</p>}
            </div>
            <div>
              <label className="label" htmlFor="lead-name">氏名 <span className="text-red-600">必須</span></label>
              <input id="lead-name" name="name" required maxLength={60} autoComplete="name" className="input" {...fieldProps("name")} />
              {err("name") && <p id="lead-name-err" className="mt-1 text-sm text-red-600">{err("name")}</p>}
            </div>
            <div>
              <label className="label" htmlFor="lead-email">メールアドレス <span className="text-red-600">必須</span></label>
              <input id="lead-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" className="input" {...fieldProps("email")} />
              {err("email") && <p id="lead-email-err" className="mt-1 text-sm text-red-600">{err("email")}</p>}
            </div>
            <div>
              <label className="label" htmlFor="lead-service">興味のあるサービス</label>
              <input id="lead-service" value={serviceName} readOnly className="input bg-surface" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="lead-phone">電話番号 <span className="font-normal text-muted">任意</span></label>
                <input id="lead-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" className="input" {...fieldProps("phone")} />
                {err("phone") && <p id="lead-phone-err" className="mt-1 text-sm text-red-600">{err("phone")}</p>}
              </div>
              <div>
                <label className="label" htmlFor="lead-timing">検討時期 <span className="font-normal text-muted">任意</span></label>
                <select id="lead-timing" name="timing" defaultValue="" className="input">
                  <option value="">選択してください</option>
                  {TIMING_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <p className="mt-5 rounded-xl bg-surface p-3.5 text-sm leading-7 text-body">{disclaimer}</p>
          <p className="mt-3 text-xs leading-6 text-muted">
            送信により<a href="/privacy" target="_blank" className="underline">プライバシーポリシー</a>に同意したものとみなします。
          </p>

          {state.message && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.message}</p>}

          <button type="submit" disabled={pending || state.ok} className="btn-primary mt-5 w-full disabled:opacity-60">
            {pending || state.ok ? "送信中…" : "内容を送信する"}
          </button>
        </form>
      </dialog>
    </>
  );
}
