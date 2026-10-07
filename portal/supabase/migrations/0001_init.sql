-- 成果報酬ナビ: 初期スキーマ
-- Supabase の SQL Editor に貼り付けて実行するか、`supabase db push` で適用してください。

-- ───────────────────────── 共通 ─────────────────────────
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ───────────────────────── categories ─────────────────────────
create table if not exists categories (
  id              uuid primary key default gen_random_uuid(),
  parent_id       uuid references categories(id) on delete set null,
  slug            text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name            text not null,
  icon            text,                          -- アイコンキー（src/components/Icon.tsx 参照）
  description     text,                          -- カテゴリ説明文（カテゴリページ冒頭に表示）
  seo_title       text,
  seo_description text,
  sort_order      integer not null default 0,
  published       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger categories_updated_at before update on categories
  for each row execute function set_updated_at();

-- ───────────────────────── services ─────────────────────────
create table if not exists services (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name                  text not null,                 -- サービス名（正式名称）
  company_name          text not null,                 -- 運営会社
  summary               text,                          -- 一覧カード用の短い説明
  description           text,                          -- 詳細ページ用の概要（300〜800文字目安）
  logo_url              text,
  website_url           text not null,                 -- 公式サイト
  -- 料金（type が unknown の場合は「要問い合わせ」表示）
  initial_fee_type      text not null default 'unknown' check (initial_fee_type in ('free','paid','unknown')),
  initial_fee           text,                          -- 有料の場合の補足（例: 要問い合わせ）
  monthly_fee_type      text not null default 'unknown' check (monthly_fee_type in ('free','paid','unknown')),
  monthly_fee           text,
  success_fee           text,                          -- 成果報酬額（不明なら null → 要問い合わせ）
  pricing_note          text,                          -- 料金に関する補足
  success_condition     text,                          -- 成果地点（自由記述）
  outcome_type          text not null default 'other'
                          check (outcome_type in ('appointment','meeting','contract','hire','lead','sale','click','matching','other')),
  -- 料金モデル: success_only=標準が成果発生時のみ / hybrid=固定費+成果報酬が標準 / optional_plan=標準は固定費型で、成果報酬プランが条件つきで定義されている
  pricing_model         text not null default 'success_only' check (pricing_model in ('success_only','hybrid','optional_plan')),
  is_full_success_fee   boolean not null default false, -- 固定費・月額費用がなく、成果発生時のみ費用が発生
  has_free_consultation boolean not null default false,
  target_companies      text,                          -- 対象企業
  features              text[] not null default '{}',  -- 特徴（3〜5項目）
  -- 提携・掲載設定
  partner_status        text not null default 'unpartnered' check (partner_status in ('unpartnered','partner','premium')),
  featured              boolean not null default false, -- おすすめ（編集部が設定）
  show_in_popular       boolean not null default true,  -- 人気ランキング算出の対象にするか
  published             boolean not null default false,
  -- 編集ワークフロー: draft(取込直後) → needs_review(確認中) → verified(確認済み)。公開できるのは verified のみ
  review_status         text not null default 'draft' check (review_status in ('draft','needs_review','verified')),
  -- 情報の出典
  source_url            text,
  last_verified_at      date,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  -- 完全成果報酬は初期費用・月額が「0円」と確認できている場合のみ
  constraint published_requires_verified check (not published or review_status = 'verified'),
  constraint full_success_requires_free check (
    not is_full_success_fee or (initial_fee_type = 'free' and monthly_fee_type = 'free' and pricing_model = 'success_only')
  )
);
create trigger services_updated_at before update on services
  for each row execute function set_updated_at();
create index if not exists services_published_idx on services (published);

create table if not exists service_categories (
  service_id  uuid not null references services(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  is_primary  boolean not null default false,
  primary key (service_id, category_id)
);
create index if not exists service_categories_category_idx on service_categories (category_id);

-- 提携後の通知先（公開しない。service_role のみ参照）
create table if not exists partner_contacts (
  service_id    uuid primary key references services(id) on delete cascade,
  notify_email  text,
  webhook_url   text,
  updated_at    timestamptz not null default now()
);

-- ───────────────────────── leads ─────────────────────────
create table if not exists leads (
  lead_id       uuid primary key default gen_random_uuid(),
  service_id    uuid references services(id) on delete set null,
  service_name  text not null,                 -- 送信時点のサービス名を保持
  company       text not null,
  corporate_number text,                       -- 法人番号（候補から選択し、国税庁APIで確認できた場合のみ）
  company_verified boolean not null default false, -- 国税庁の法人番号公表サイトで実在確認済みか
  name          text not null,
  email         text not null,
  phone         text,
  timing        text,                          -- 検討時期
  employees     text,                          -- 従業員規模（任意）
  message       text,                          -- 検討の背景・ご要望（任意）
  consent_version text,                        -- 同意時に表示した文言のバージョン（lib/lead-options.ts の CONSENT_VERSION）
  third_party_consent boolean not null default false, -- 提携済みサービスの提供会社への情報提供に同意したか
  request_id    uuid,                          -- 1回の入力でまとめて請求した場合に共通のID
  source        text,                          -- 流入元（utm_source または referrer ホスト）
  medium        text,                          -- utm_medium
  campaign      text,                          -- utm_campaign
  visitor_id    text,
  partner_status text,                         -- 送信時点の提携状態
  notified_at   timestamptz,                   -- 広告主へ通知した日時（提携後）
  created_at    timestamptz not null default now()
);
create index if not exists leads_created_idx on leads (created_at desc);
create index if not exists leads_request_idx on leads (request_id);
create index if not exists leads_service_idx on leads (service_id, created_at desc);

-- ───────────────────────── page_events ─────────────────────────
create table if not exists page_events (
  id            bigint generated always as identity primary key,
  event_name    text not null check (event_name in (
                  'service_page_view','official_site_click','document_button_click',
                  'lead_form_start','lead_submit','category_page_view','search')),
  service_id    uuid references services(id) on delete cascade,
  category_id   uuid references categories(id) on delete cascade,
  path          text,
  visitor_id    text,                          -- ブラウザ単位の匿名ID（ユニークユーザー集計用）
  session_id    text,
  source        text,
  medium        text,
  campaign      text,
  referrer      text,
  query         text,                          -- search イベントの検索語
  results_count integer,
  created_at    timestamptz not null default now()
);
create index if not exists page_events_service_idx on page_events (service_id, event_name, created_at desc);
create index if not exists page_events_created_idx on page_events (created_at desc);

-- ───────────────────────── articles ─────────────────────────
create table if not exists articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text not null,
  excerpt         text,
  body            text not null default '',     -- Markdown
  category_id     uuid references categories(id) on delete set null,
  seo_title       text,
  seo_description text,
  published       boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger articles_updated_at before update on articles
  for each row execute function set_updated_at();

create table if not exists article_services (
  article_id uuid not null references articles(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (article_id, service_id)
);

-- ───────────────────────── admins ─────────────────────────
-- Supabase Auth のユーザーのうち、ここに登録された人だけが /admin に入れます。
create table if not exists admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

-- ───────────────────────── 集計関数 ─────────────────────────
-- サービス単位の需要データ。リードCVR = リード数 ÷ ページPV
create or replace function service_stats(p_from timestamptz, p_to timestamptz)
returns table (
  service_id uuid,
  page_views bigint,
  unique_users bigint,
  official_clicks bigint,
  document_clicks bigint,
  form_starts bigint,
  leads bigint
)
language sql stable as $$
  with ev as (
    select e.service_id,
           count(*) filter (where e.event_name = 'service_page_view')      as page_views,
           count(distinct e.visitor_id) filter (where e.event_name = 'service_page_view') as unique_users,
           count(*) filter (where e.event_name = 'official_site_click')    as official_clicks,
           count(*) filter (where e.event_name = 'document_button_click')  as document_clicks,
           count(*) filter (where e.event_name = 'lead_form_start')        as form_starts
    from page_events e
    where e.service_id is not null and e.created_at >= p_from and e.created_at < p_to
    group by e.service_id
  ), ld as (
    select l.service_id, count(*) as leads
    from leads l
    where l.service_id is not null and l.created_at >= p_from and l.created_at < p_to
    group by l.service_id
  )
  select s.id,
         coalesce(ev.page_views, 0), coalesce(ev.unique_users, 0),
         coalesce(ev.official_clicks, 0), coalesce(ev.document_clicks, 0),
         coalesce(ev.form_starts, 0), coalesce(ld.leads, 0)
  from services s
  left join ev on ev.service_id = s.id
  left join ld on ld.service_id = s.id;
$$;
revoke all on function service_stats(timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function service_stats(timestamptz, timestamptz) to service_role;

-- ───────────────────────── RLS ─────────────────────────
-- 公開サイトは anon キーで「公開済みデータのみ」参照。書き込み・個人情報は service_role（サーバー側）のみ。
alter table categories         enable row level security;
alter table services           enable row level security;
alter table service_categories enable row level security;
alter table partner_contacts   enable row level security;
alter table leads              enable row level security;
alter table page_events        enable row level security;
alter table articles           enable row level security;
alter table article_services   enable row level security;
alter table admins             enable row level security;

create policy "public read published categories" on categories
  for select to anon, authenticated using (published);
create policy "public read published services" on services
  for select to anon, authenticated using (published);
create policy "public read service_categories of published services" on service_categories
  for select to anon, authenticated using (
    exists (select 1 from services s where s.id = service_id and s.published)
  );
create policy "public read published articles" on articles
  for select to anon, authenticated using (published);
create policy "public read article_services" on article_services
  for select to anon, authenticated using (
    exists (select 1 from articles a where a.id = article_id and a.published)
  );
-- partner_contacts / leads / page_events / admins にはポリシーを作らない（= anon から一切アクセス不可）
