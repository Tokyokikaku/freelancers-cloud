"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { documentCtaLabel } from "@/lib/partner";
import { track } from "@/lib/tracking";
import type { PartnerStatus } from "@/lib/types";
import { TopPicksDialog } from "./TopPicksDialog";
import { loadTopPicks, markDeclined, offerFor, wasDeclined, type Offer } from "./top-picks-client";
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
  const [offer, setOffer] = useState<Offer | null>(null);
  const [open, setOpen] = useState(false);

  // 提案データは先に読み込んでおく（クリック時に待たせない）
  useEffect(() => {
    if (partnerStatus === "unpartnered") return;
    let alive = true;
    void loadTopPicks().then((d) => alive && setOffer(offerFor(d, slug)));
    return () => {
      alive = false;
    };
  }, [slug, partnerStatus]);

  if (partnerStatus === "unpartnered") {
    return (
      <button type="button" disabled aria-disabled="true" className={`${className.replace(/\bbtn-cta\b/, "btn-soon")}`} title="現在、このサービスの資料請求は準備中です">
        準備中
      </button>
    );
  }

  return (
    <>
      <a
        href={requestHref([slug])}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          track("document_button_click", { service_id: id, service_name: name, placement });
          // 1社だけの請求のときは、同じカテゴリの人気上位サービスとの比較（まとめて請求）を提案する
          if (offer && slugs.length === 1 && !wasDeclined(offer.categoryName)) {
            setOpen(true);
            return;
          }
          router.push(requestHref(slugs));
        }}
      >
        {documentCtaLabel(partnerStatus)}
      </a>
      {open && offer && (
        <TopPicksDialog
          serviceName={name}
          offer={offer}
          onClose={() => setOpen(false)}
          onAccept={() => {
            track("document_button_click", { service_id: id, service_name: name, placement: "top_picks_accept" });
            setOpen(false);
            router.push(requestHref([slug, ...offer.picks.map((p) => p.slug)]));
          }}
          onDecline={() => {
            markDeclined(offer.categoryName);
            setOpen(false);
            router.push(requestHref([slug], { solo: true }));
          }}
        />
      )}
    </>
  );
}
