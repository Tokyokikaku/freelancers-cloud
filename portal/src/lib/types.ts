export type FeeType = "free" | "paid" | "unknown";
export type PartnerStatus = "unpartnered" | "partner" | "premium";
export type OutcomeType =
  | "appointment"
  | "meeting"
  | "contract"
  | "hire"
  | "lead"
  | "sale"
  | "click"
  | "matching"
  | "other";

export interface Category {
  id: string;
  parent_id: string | null;
  slug: string;
  name: string;
  icon: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  sort_order: number;
  published: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  company_name: string;
  summary: string | null;
  description: string | null;
  logo_url: string | null;
  website_url: string;
  initial_fee_type: FeeType;
  initial_fee: string | null;
  monthly_fee_type: FeeType;
  monthly_fee: string | null;
  success_fee: string | null;
  pricing_note: string | null;
  success_condition: string | null;
  outcome_type: OutcomeType;
  is_full_success_fee: boolean;
  has_free_consultation: boolean;
  target_companies: string | null;
  features: string[];
  partner_status: PartnerStatus;
  featured: boolean;
  show_in_popular: boolean;
  published: boolean;
  source_url: string | null;
  last_verified_at: string | null;
  created_at: string;
  updated_at: string;
  /** service_categories から解決したカテゴリID（先頭が主カテゴリ） */
  category_ids: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  service_ids: string[];
}

export interface ServiceStats {
  service_id: string;
  page_views: number;
  unique_users: number;
  official_clicks: number;
  document_clicks: number;
  form_starts: number;
  leads: number;
}

export const EVENT_NAMES = [
  "service_page_view",
  "official_site_click",
  "document_button_click",
  "lead_form_start",
  "lead_submit",
  "category_page_view",
  "search",
] as const;
export type EventName = (typeof EVENT_NAMES)[number];

export const OUTCOME_LABELS: Record<OutcomeType, string> = {
  appointment: "アポイント獲得",
  meeting: "商談実施",
  contract: "成約・契約",
  hire: "採用決定",
  lead: "問い合わせ・リード獲得",
  sale: "購入・売上発生",
  click: "クリック・表示",
  matching: "マッチング成立",
  other: "その他",
};

export const PARTNER_STATUS_LABELS: Record<PartnerStatus, string> = {
  unpartnered: "未提携",
  partner: "提携済み",
  premium: "優先掲載",
};
