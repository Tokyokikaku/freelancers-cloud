import "server-only";
import { getServiceStats } from "./data";
import { RANKING_WINDOW_DAYS, rankByPopularity } from "./ranking";
import type { Service } from "./types";

/** 公開ページ用: 直近30日の行動データで人気順に並べる（結果は 5 分キャッシュ） */
export async function getPopularServices(services: Service[], opts: { onlyEligible?: boolean } = {}): Promise<Service[]> {
  const to = new Date();
  to.setMinutes(0, 0, 0); // 同一時間内は同じURLになりキャッシュが効く
  const from = new Date(to.getTime() - RANKING_WINDOW_DAYS * 86400_000);
  to.setHours(to.getHours() + 1);
  const stats = await getServiceStats(from, to, { cached: true });
  return rankByPopularity(services, stats, opts);
}
