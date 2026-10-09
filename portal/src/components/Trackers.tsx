"use client";
import { useEffect, useRef } from "react";
import { getAttribution, track } from "@/lib/tracking";
import type { EventName } from "@/lib/types";

/** マウント時に1回だけイベントを送る（Strict Mode の二重実行対策つき） */
export function PageEvent({ name, params }: { name: EventName; params: Parameters<typeof track>[1] }) {
  const sent = useRef<string | null>(null);
  const key = JSON.stringify(params);
  useEffect(() => {
    getAttribution(); // 最初の着地ページで流入元を確定させる
    if (sent.current === key) return;
    sent.current = key;
    track(name, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, key]);
  return null;
}

/** 公式サイトへの外部リンク（クリックを計測）。広告掲載ではないため nofollow を付ける */
export function OfficialSiteLink({
  href,
  serviceId,
  serviceName,
  className,
  children,
  placement,
}: {
  href: string;
  serviceId: string;
  serviceName: string;
  className?: string;
  children: React.ReactNode;
  placement: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={className}
      onClick={() => track("official_site_click", { service_id: serviceId, service_name: serviceName, placement })}
    >
      {children}
    </a>
  );
}
