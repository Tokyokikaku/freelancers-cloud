-- 掲載希望企業からの問い合わせ（/for-companies のフォーム）
create table if not exists listing_inquiries (
  inquiry_id    uuid primary key default gen_random_uuid(),
  topic         text not null,                 -- listing（掲載希望） / listing_appo（掲載＋アポ化オプション） / appo（アポ化オプションのみ）
  company       text not null,
  service_name  text,
  service_url   text,
  billing       text,                          -- 何を成果として、いくらで課金するか
  name          text not null,
  email         text not null,
  phone         text,
  message       text,
  consent_version text,
  created_at    timestamptz not null default now()
);
create index if not exists listing_inquiries_created_idx on listing_inquiries (created_at desc);
alter table listing_inquiries enable row level security;
-- ポリシーは作らない（= anon から一切アクセス不可。service_role のみ）
