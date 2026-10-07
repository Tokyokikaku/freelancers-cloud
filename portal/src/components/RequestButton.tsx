"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ComparisonMaterial } from "@/lib/comparison";
import { documentCtaLabel } from "@/lib/partner";
import { track } from "@/lib/tracking";
import type { PartnerStatus } from "@/lib/types";
import { ComparisonOfferDialog } from "./ComparisonOfferDialog";
import { loadComparisonOffers, markDeclined, wasDeclined } from "./comparison-offers";
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
  const [offer, setOffer] = useState<ComparisonMaterial | null>(null);
  const [open, setOpen] = useState(false);

  // 比較資料の案内は先に読み込んでおく（クリック時に待たせない）
  useEffect(() => {
    let alive = true;
    void loadComparisonOffers().then((o) => alive && setOffer(o?.offers[slug] ?? null));
    return () => {
      alive = false;
    };
  }, [slug]);

  const go = (withComparison: boolean) => router.push(requestHref(slugs, withComparison && offer ? [offer.categorySlug] : []));

  return (
    <>
      <a
        href={requestHref([slug])}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          track("document_button_click", { service_id: id, service_name: name, placement });
          // 1社だけの請求のときは、同じカテゴリの比較資料もあわせて請求することを提案する
          if (offer && slugs.length === 1 && !wasDeclined(offer.categorySlug)) {
            setOpen(true);
            return;
          }
          go(false);
        }}
      >
        {documentCtaLabel(partnerStatus)}
      </a>
      {open && offer && (
        <ComparisonOfferDialog
          serviceName={name}
          offer={offer}
          onClose={() => setOpen(false)}
          onAccept={() => {
            track("document_button_click", { service_id: id, service_name: name, placement: "comparison_offer_accept" });
            setOpen(false);
            go(true);
          }}
          onDecline={() => {
            markDeclined(offer.categorySlug);
            setOpen(false);
            go(false);
          }}
        />
      )}
    </>
  );
}
