"use client";
import { useRouter } from "next/navigation";
import { documentCtaLabel } from "@/lib/partner";
import { track } from "@/lib/tracking";
import type { PartnerStatus } from "@/lib/types";
import { requestHref, useRequestList } from "./request-store";

/**
 * 「資料請求（無料）」ボタン。押したサービス + すでに資料請求リストにあるサービスを、まとめて請求画面へ渡す。
 * JS が無効でも /request?s=<slug> へ遷移できるよう、href を持つ <a> にしている。
 */
export function RequestButton({
  id,
  slug,
  name,
  partnerStatus,
  placement,
  className = "btn-cta",
}: {
  id: string;
  slug: string;
  name: string;
  partnerStatus: PartnerStatus;
  placement: string;
  className?: string;
}) {
  const router = useRouter();
  const { items } = useRequestList();
  const slugs = Array.from(new Set([slug, ...items.map((i) => i.slug)]));
  return (
    <a
      href={requestHref([slug])}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        track("document_button_click", { service_id: id, service_name: name, placement });
        router.push(requestHref(slugs));
      }}
    >
      {documentCtaLabel(partnerStatus)}
    </a>
  );
}
