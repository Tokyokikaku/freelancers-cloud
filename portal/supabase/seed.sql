-- 自動生成: `npm run seed:sql`（src/data/seed.json から生成）。直接編集しないでください。
-- 料金・成果報酬条件は公式サイトで確認できたものだけを記載しています。公開前に編集部で再確認してください。
begin;

insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales', '営業', 'sales', '営業代行には固定月額型と成果報酬型があります。成果報酬型では、アポイント獲得や商談実施など、あらかじめ決めた成果が発生した場合のみ料金が発生します。テレアポ・訪問営業・問い合わせフォーム営業など、初期費用を抑えて新規開拓を始められるサービスを比較できます。', 10, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('marketing', 'マーケティング', 'marketing', '成果報酬型の広告運用・SEOなど、成果（コンバージョン・獲得件数・検索順位など）に応じて費用が発生するマーケティング支援を比較できます。広告費の負担方法や成果の定義はサービスごとに異なるため、条件を確認して選びましょう。', 20, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment', '採用', 'recruitment', '人材紹介・採用代行・求人広告のうち、採用決定など成果が出た場合にのみ費用が発生するサービスを比較できます。成功報酬の料率や、早期退職時の返金保証の有無もあわせて確認しましょう。', 30, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('funding', '資金調達', 'funding', '補助金・助成金の申請支援やファクタリングなど、資金調達に関するサービスを比較できます。補助金申請支援では、着手金0円・採択（交付）時のみ成功報酬というサービスもあります。', 40, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('other', 'その他', 'other', '上記以外の、成果報酬で利用できるサービスを掲載します。', 90, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('consulting', 'コンサルティング', 'consulting', 'コンサルティングの成果報酬型では、売上の増加分や経費の削減額など、成果に応じてフィーが決まる料金体系があります。成果の測り方（基準となる期間・指標）と料率、対象となる業種・規模を確認して比較しましょう。', 50, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('production', '制作・開発', 'production', 'Webサイトやシステムの制作・開発のうち、制作費の一部または全部を売上などの成果で支払う料金体系のサービスを比較できます。初期費用・月額費用が別途かかる場合があるため、条件を確認して比較しましょう。', 60, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales-outsourcing', '営業代行', 'sales', '営業代行の成果報酬型では、商談やアポイントなど決めた成果が発生したときに費用が発生します。単価と成果の定義、固定費の有無を確認して比較しましょう。', 11, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('tele-appointment', 'テレアポ代行', 'sales', 'テレアポ代行の成果報酬型では、アポイント1件ごとに費用が発生します。1件あたりの単価、キャンセル時の返金、別途の管理費の有無を確認して比較しましょう。', 12, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('web-ads', '広告運用', 'marketing', '広告運用の成果報酬型サービスでは、獲得件数（コンバージョン）など成果が発生した場合のみ費用が発生する料金体系があります。広告費を誰が負担するか、運用手数料の有無、成果の定義を確認して比較しましょう。', 21, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('seo', 'SEO', 'marketing', '成果報酬型のSEO対策では、検索順位が一定以内に入った日・月に応じて費用が発生する料金体系が多く見られます。保証する順位の定義、対象の検索エンジン、日割りや上限の有無を確認して比較しましょう。', 22, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sns', 'SNS運用', 'marketing', 'SNS運用の成果報酬型サービスでは、再生数・フォロワー増加数・問い合わせ件数など、あらかじめ決めた指標に応じて費用が発生する料金体系があります。上限額や最低契約期間の有無、成果の指標を確認して比較しましょう。', 23, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('job-ads', '求人広告', 'recruitment', null, 31, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-agency', '人材紹介', 'recruitment', null, 32, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-outsourcing', '採用代行', 'recruitment', null, 33, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('subsidy', '補助金・助成金支援', 'funding', '補助金・助成金の申請支援では、着手金0円で、採択（交付）時に成功報酬を支払う料金体系があります。成功報酬の料率、不採択時の扱い、実費の取り扱いを確認して比較しましょう。', 41, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('factoring', 'ファクタリング', 'funding', null, 42, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('business-consulting', '経営・売上改善', 'consulting', null, 51, (select id from categories where slug = 'consulting'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('marketing-consulting', 'マーケティングコンサル', 'consulting', null, 52, (select id from categories where slug = 'consulting'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('web-production', 'Web制作・運用', 'production', null, 61, (select id from categories where slug = 'production'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('islandbrain', 'アイランド・ブレイン 営業代行（成果報酬型）', '株式会社アイランド・ブレイン', 'BtoB専門の営業代行・テレアポ代行。毎月の固定費が不要で、商談1件につき20,000円（税別）の成果報酬です。', 'アイランド・ブレインは、新規開拓営業・アポイント獲得に特化したBtoB向けの営業代行サービスです。公式サイトでは、テレアポ代行、問い合わせフォーム営業代行、営業コンサルティングなどを提供していること、55業種4,500社以上の導入実績があることが案内されています。

料金体系は成果報酬型で、公式サイトには「毎月の固定費は発生しない」「商談のご提供に対する成功報酬」「1件につき20,000円（税別）」と記載されています。最低商談件数は1件から利用できると案内されています。

初期費用の有無など、上記以外の条件はサービス内容によって異なる可能性があります。契約前に、公式サイトまたは担当者へ最新の条件をご確認ください。', null, 'https://www.islandbrain.co.jp/', 'unknown', null, 'free', '固定費なし（公式サイト記載）', '商談1件につき20,000円（税別）', '問い合わせフォーム営業代行には別の料金体系があります。詳細は公式サイトをご確認ください。', '商談の提供（最低1件から）', 'meeting', false, false, 'BtoB営業（業種不問と案内）', array['毎月の固定費が不要（公式サイト記載）', '商談1件につき20,000円（税別）の成果報酬', '55業種4,500社以上の導入実績（公式サイト記載）', 'テレアポ代行・問い合わせフォーム営業代行にも対応']::text[], 'unpartnered', false, true, true, 'https://www.islandbrain.co.jp/price/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'islandbrain' and c.slug = 'sales-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'islandbrain' and c.slug = 'sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('kanzenseika-appointer', '完全成果アポインター（テレアポ代行）', '株式会社完全成果報酬', '成果報酬型のテレアポ代行。アポイント1件15,000円〜。予算規模によって初期費用・月額費用が変わります。', '完全成果アポインターは、株式会社完全成果報酬が提供する、成果報酬型でアポイント獲得を代行するテレアポ代行サービスです。営業代行のプロが電話営業業務を担当し、クライアント企業は商談での受注獲得に集中できると案内されています。同社は訪問営業代行の「完全成果クローザー」も提供しています。

料金は、アポイント1件につき15,000円〜で、別途10%のプロジェクト管理費が必要と公式サイトに記載されています。初期費用と月額費用は、予算が30万円以上の場合は無料、30万円未満の場合はそれぞれ100,000円（月額は月100,000円）と記載されています。つまり、予算規模によっては固定費が発生する点に注意が必要です。

受注成果報酬のプランには、法人設立後3年以上・外部パートナー利用の営業実績1年以上などの条件があると案内されています。詳細は公式サイトでご確認ください。', null, 'https://www.kanzenseika.jp/service/appointer.html', 'paid', '予算30万円以上は無料／30万円未満は100,000円（公式サイト記載）', 'paid', '予算30万円以上は無料／30万円未満は月100,000円（公式サイト記載）', 'アポイント1件につき15,000円〜（別途プロジェクト管理費10%）', null, 'アポイントの獲得', 'appointment', false, false, '法人（受注成果報酬プランは設立3年以上・外部パートナー利用の営業実績1年以上が条件）', array['アポイント1件につき15,000円〜の成果報酬', '予算30万円以上なら初期費用・月額費用が無料（公式サイト記載）', '訪問営業代行「完全成果クローザー」も提供']::text[], 'unpartnered', false, true, true, 'https://www.kanzenseika.jp/service/appointer.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kanzenseika-appointer' and c.slug = 'tele-appointment' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'kanzenseika-appointer' and c.slug = 'sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('orgallo-sales', 'オルガロ 完全成果報酬型の営業代行', '株式会社オルガロ', '電話営業と紹介営業を組み合わせる営業支援。初期費用0円・月額固定費0円の完全成果報酬型です。', 'オルガロは、株式会社オルガロが提供する営業代行・営業支援サービスです。公式サイトでは、電話営業（テレマーケティング）と紹介営業（リファラル）の2つの手法を扱い、商材とターゲットに応じて組み合わせること、成果地点から決める営業支援であることが案内されています。

料金は初期費用0円・月額固定費0円で、成果が出なかった期間の費用は0円と記載されています。テレマーケティングは基本的にアポイント単価、紹介営業はアポイント成果または売上成果での課金とされていますが、具体的な金額は公式サイトに記載がないため、本ページでは「要問い合わせ」としています。

成果地点と手法の無料シミュレーションが用意されており、相談に費用はかからないと案内されています。', null, 'https://orgallo.co.jp/', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', null, '成果報酬の金額は公式サイトに記載がないため、お問い合わせください。', 'アポイント獲得／売上（手法により異なる）', 'appointment', true, true, '公式サイトに記載なし（商材・ターゲットに応じて設計）', array['初期費用0円・月額固定費0円（公式サイト記載）', '電話営業と紹介営業を、商材に応じて組み合わせ', '成果地点と手法の無料シミュレーションあり']::text[], 'unpartnered', false, true, true, 'https://orgallo.co.jp/sales/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'orgallo-sales' and c.slug = 'sales-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'orgallo-sales' and c.slug = 'sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('cybergrip', 'サイバーグリップ（成果報酬型の広告運用）', '株式会社サイバーグリップ', 'サイバーエージェントグループの成果報酬型広告運用。初期費用・固定費なしで、料金は獲得単価（成果単価）のみです。', 'サイバーグリップは、サイバーエージェントグループが2025年11月に設立した、成果報酬型の広告運用に特化した会社です。公式のニュースリリースでは、AIを活用することで料金は成果となる獲得単価のみとなること、初期費用や固定費がないこと、クリエイティブ制作費は無償であることが案内されています。

対象媒体は、Google・Yahoo! JAPAN・Microsoftの検索連動型広告と、Meta広告、TikTok広告です。成果はCV数をはじめとする得られた成果に応じた費用とされています。成果の定義や具体的な単価はケースによって異なるため、本ページでは「要問い合わせ」としています。

成果シミュレーションの申請フォームが用意されています。詳細な条件は公式サイトでご確認ください。', null, 'https://cybergrip.jp/', 'free', 'なし（ニュースリリース記載）', 'free', '固定費なし（ニュースリリース記載）', null, '成果単価は公式サイトに記載がないため、成果シミュレーションまたはお問い合わせでご確認ください。クリエイティブ制作費は無償と案内されています。', 'CV（獲得）など、得られた成果', 'other', true, false, '公式サイトに記載なし', array['初期費用・固定費なし（ニュースリリース記載）', '料金は成果となる獲得単価のみ', 'クリエイティブ制作費は無償', 'Google・Yahoo!・Microsoftの検索広告、Meta広告、TikTok広告に対応']::text[], 'unpartnered', false, true, true, 'https://www.cyberagent.co.jp/news/detail/id=32656', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'cybergrip' and c.slug = 'web-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'cybergrip' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('majizero', 'マジゼロ（完全成果報酬型のウェブ広告代理）', '株式会社ALLI', '運用手数料0%・広告費を代理店が負担する成果報酬型のウェブ広告代理サービス。', 'マジゼロは、株式会社ALLIが提供する完全成果報酬型のウェブ広告代理サービスです。2022年1月のプレスリリースでは、手数料0円・広告費負担0円でウェブ広告の運用代行が実施できること、広告費を代理店が負担し、設定した成果地点で成果単価を支払うモデルであること、広告クリエイティブも無料で制作することが案内されています。

成果地点と成果単価は商材・予算に応じて設定されます。具体的な単価は記載がないため、本ページでは「要問い合わせ」としています。対象は、コスメ・美容、アプリのインストール、保険代理店のリスト獲得、クリニックの来院など多様な業種と案内されています。

本ページの情報はプレスリリース（2022年1月12日）に基づきます。現在の条件は公式サイトでご確認ください。', null, 'https://alli.tokyo/majizero', 'free', '0円（プレスリリース記載）', 'unknown', null, null, '2022年1月のプレスリリースに基づく情報です。成果単価・月額費用の有無は公式サイトでご確認ください。', '商材・予算に応じて設定する成果地点（成果確定時のみ）', 'other', false, false, 'コスメ・美容、アプリ、保険代理店、クリニックなど多様な業種（プレスリリース記載）', array['運用手数料0%・広告費は代理店が負担（プレスリリース記載）', '広告クリエイティブを無料で制作', '成果地点と成果単価を商材・予算に応じて設定']::text[], 'unpartnered', false, true, true, 'https://prtimes.jp/main/html/rd/p/000000002.000092602.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'majizero' and c.slug = 'web-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'majizero' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('lead-seo', 'LEAD SEO（完全成果報酬型のSEO対策）', 'リードクリエーション株式会社', '初期費用0円・完全成果報酬型のSEO対策。成果が発生した翌月に初回成果報酬25万円（税抜）が発生します。', 'LEAD SEOは、リードクリエーション株式会社が提供する、初期費用0円・完全成果報酬型のSEO対策サービスです。企業サイト・ECサイトなど、あらゆる業種・サイトに対応できると案内されています。

料金は、成果発生まで初期費用・固定費が発生せず、成果が発生した翌月に初回成果報酬25万円（税抜）、その後は表示順位に応じた日額が発生すると公式サイトに記載されています。長期契約の縛りはなく、2年目以降は半年単位の契約と案内されています。成果が発生するまでの期間は、短くて1週間〜3ヶ月、長くても半年前後とされています。

何位になれば「成果」とみなされるかなどの詳細な条件は公式サイトに記載がないため、契約前に必ず確認してください。', null, 'https://leadcreation.co.jp/leadseo', 'free', '0円（公式サイト記載）', 'free', '成果発生まで固定費なし（公式サイト記載）', '成果発生の翌月に初回成果報酬25万円（税抜）＋表示順位に応じた日額', '順位別の日額など詳細は公式サイトに記載がないため、お問い合わせください。', 'SEOで成果が発生（成果の定義は公式サイトをご確認ください）', 'other', true, false, '企業サイト・ECサイトなど（業種不問と案内）', array['初期費用0円・成果発生まで固定費なし（公式サイト記載）', '長期契約の縛りなし（2年目以降は半年単位）', '企業サイト・ECサイトなど幅広く対応']::text[], 'unpartnered', false, true, true, 'https://leadcreation.co.jp/leadseo', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'lead-seo' and c.slug = 'seo' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'lead-seo' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('doda-agent', 'doda人材紹介サービス（完全成果報酬型）', 'パーソルキャリア株式会社', '初期費用0円・完全成果報酬型の人材紹介。紹介手数料は採用決定者の理論年収の35％です。', 'doda人材紹介サービスは、パーソルキャリア株式会社が提供する、中途採用向けの人材紹介サービスです。公式サイトでは「初期費用0円・完全成果報酬型」と案内され、業界・職種ごとの専任担当制で、応募が期待できる求人票の作成から、応募者の一次スクリーニング、各種調整の代行までを担当すると説明されています。

費用は、採用が決定した場合に、採用決定者の理論年収の35％を紹介手数料として支払う形です。早期退職の場合は紹介手数料の一部が返金されると案内されています。問い合わせは無料で、電話またはWebから申し込めます。

返金の条件や、職種・年収帯による料率の違いなどの詳細は、公式サイトでご確認ください。', null, 'https://www.saiyo-doda.jp/lp/js/007/', 'free', '0円（公式サイト記載）', 'free', '固定費なし（「完全成果報酬型」と公式サイト記載）', '採用決定者の理論年収の35％（紹介手数料）', '早期退職時は紹介手数料の一部が返金されると案内されています（条件は公式サイトをご確認ください）。', '採用決定', 'hire', true, true, '中途採用を検討している法人', array['初期費用0円・完全成果報酬型（公式サイト記載）', '採用決定者の理論年収の35％が紹介手数料', '早期退職時は紹介手数料の一部を返金', '業界・職種ごとの専任担当制']::text[], 'unpartnered', false, true, true, 'https://www.saiyo-doda.jp/lp/js/007/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'doda-agent' and c.slug = 'recruitment-agency' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'doda-agent' and c.slug = 'recruitment' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('mizusaki-recruitment', 'ミズサキ 成果報酬型採用代行（中途採用プラン）', 'ミズサキ株式会社', '初期費用0円。採用1人につき50万円の定額成果報酬で、入社後の返金保証もある採用代行です。', 'ミズサキの成果報酬型採用代行（中途採用プラン）は、ミズサキ株式会社が提供する、中小企業向けの採用支援サービスです。公式サイトでは「人材紹介の半額以下で、プロの採用支援を」とうたい、求人媒体の導入から求人原稿の作成、スカウト送信、面接日程の調整、応募者対応までをオールインワンで提供すると説明されています。

料金は初期費用0円、採用1人につき50万円の定額の成果報酬です。入社後の定着期間に応じた返金保証として、入社7日以内は100％、14日以内は80％、30日以内は50％の返金が案内されています。30分間の無料相談も用意されています。

月額費用の有無や、求人媒体の掲載費用などの実費の扱いは公式サイトに記載がないため、本ページでは確認できていません。契約前にご確認ください。', null, 'https://mizusaki-inc.com/lp-total-consulting', 'free', '0円（公式サイト記載）', 'unknown', null, '採用1人につき50万円（入社後の返金保証あり）', '返金保証：入社7日以内100％／14日以内80％／30日以内50％（公式サイト記載）。', '採用（入社）', 'hire', false, true, '中小企業', array['初期費用0円、採用1人につき50万円の定額', '入社後の返金保証（7日以内100％・14日以内80％・30日以内50％）', '求人原稿作成・スカウト送信・日程調整までオールインワン', '30分間の無料相談あり']::text[], 'unpartnered', false, true, true, 'https://mizusaki-inc.com/lp-total-consulting', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mizusaki-recruitment' and c.slug = 'recruitment-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'mizusaki-recruitment' and c.slug = 'recruitment' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('gyoseishoshi-tree', '行政書士法人Tree 補助金申請代行（完全成果報酬型）', '行政書士法人Tree', '着手金0円。実際に交付された補助金額の8〜15％（税抜）が成功報酬で、不採択時の報酬は無料です。', '行政書士法人Treeは、補助金の申請代行サービスを提供する事務所です。公式サイトでは、小規模事業者持続化補助金、デジタル化・AI導入補助金、ものづくり補助金、中小企業新事業進出補助金などの主要補助金に対応し、経営計画書・事業計画書・収支計画書の作成と、採択を高める要件適合チェック・加点要素の最大化までをサポートすると説明されています。

料金は着手金0円で、成功報酬は実際に交付された補助金額の8〜15％（税抜）、事業者の口座へ入金された後に支払う形です。不採択時の同事務所の報酬は無料とされていますが、実費・外部専門家費用・採択後の辞退などは除くと記載されています。初回相談料は何度でも無料です。

対象は中小企業・小規模事業者（個人事業主を含む）で、商工会・商工会議所経由の申請にも対応と案内されています。', null, 'https://office-tree.jp/', 'free', '着手金0円（公式サイト記載）', 'free', '固定費なし（「完全成果報酬型」と公式サイト記載）', '実際に交付された補助金額の8〜15％（税抜）', '不採択時の報酬は無料。ただし実費・外部専門家費用・採択後辞退等を除くと記載されています。', '補助金の採択・交付', 'other', true, true, '中小企業・小規模事業者（個人事業主を含む）', array['着手金0円、成功報酬は交付額の8〜15％（税抜）', '不採択時の報酬は無料（実費等を除く）', '初回相談は何度でも無料', '主要な補助金に幅広く対応']::text[], 'unpartnered', false, true, true, 'https://office-tree.jp/blog/subsidy/subsidy-application-success-fee-only/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gyoseishoshi-tree' and c.slug = 'subsidy' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'gyoseishoshi-tree' and c.slug = 'funding' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('ichidokiri-subsidy', 'イチドキリ 補助金申請支援（IT・AI分野）', '株式会社イチドキリ', 'IT・AI分野に特化した補助金申請支援。着手金0円で、成功報酬は補助額の15％です。', 'イチドキリは、株式会社イチドキリが提供する、IT・AI分野の補助金申請支援サービスです。公式サイトでは、IT・AIへの投資を通じて事業を成長させたい企業を対象とし、システム受託開発企業やAI関連企業の支援事例が多いことが案内されています。経済産業省認定の経営革新等支援機関であることも記載されています。

料金は着手金0円で、成功報酬は補助額の15％と記載されています。着手金・相談は0円とされ、サイトの見出しでは「完全成功報酬」と案内されています。月額費用や、採択されなかった場合の扱い・実費の取り扱いは公式サイトに明記がないため、契約前にご確認ください。', null, 'https://ichidokiri.co.jp/', 'free', '着手金0円（公式サイト記載）', 'free', '固定費なし（「完全成功報酬」と公式サイト記載）', '補助額の15％', '不採択時の扱い・実費の取り扱いは公式サイトでご確認ください。', '補助金の採択', 'other', true, true, 'IT・AIへの投資で事業成長を目指す企業', array['着手金0円・相談0円（公式サイト記載）', '成功報酬は補助額の15％', 'IT・AI分野の補助金に特化', '経済産業省認定の経営革新等支援機関（公式サイト記載）']::text[], 'unpartnered', false, true, true, 'https://ichidokiri.co.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ichidokiri-subsidy' and c.slug = 'subsidy' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'ichidokiri-subsidy' and c.slug = 'funding' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('apokuru', 'アポクル（成果報酬テレアポ代行）', '株式会社セールスクルー', 'ネットで発注できる、獲得課金型のテレアポ代行。初期費用・月額費用0円で、キャンセルアポは返金対象です。', 'アポクルは、株式会社セールスクルーが提供する、ネットで簡単に発注でき、最短翌日から獲得課金型でアポイントが得られるテレアポ発注プラットフォームです。

料金は、初期費用0円・月額固定費0円で、アポイントが取れたときだけ獲得課金（成果報酬）が発生します。キャンセルになったアポイントは返金対象と案内されています。1件あたりの単価は、公式サイトでは確認できなかったため「要問い合わせ」としています。

本ページの一部の情報は、2021年9月のプレスリリースに基づきます。最新の条件は公式サイトでご確認ください。', null, 'https://salescrew.jp/apokuru', 'free', '0円（公式サイト記載）', 'free', '0円（公式サイト記載）', null, 'アポイント1件あたりの単価は公式サイトに記載がないため、お問い合わせください。キャンセルアポは返金対象と案内されています。', 'アポイントの獲得（キャンセルアポは返金対象）', 'appointment', true, false, null, array['初期費用0円・月額費用0円（公式サイト記載）', 'アポが取れた時だけ獲得課金', 'ネットで発注でき、最短翌日から稼働（プレスリリース記載）', 'キャンセルアポは返金対象']::text[], 'unpartnered', false, true, true, 'https://www.value-press.com/pressrelease/279636', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apokuru' and c.slug = 'tele-appointment' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'apokuru' and c.slug = 'sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('tanomate', 'タノメイト（完全成果報酬型テレアポ代行）', 'Brainew Co. Ltd.', '初期・固定費ゼロのBtoBテレアポ代行。成果報酬は1件10,000円〜100,000円で、アポが取れなければ0円です。', 'タノメイトは、Brainew Co. Ltd.が提供する、初期費用・固定費ゼロで確度の高いBtoBアポイントを獲得する成果報酬型のテレアポ代行サービスです。公式サイトでは、アポが取れなければ費用は0円であること、最短5日で稼働できること、月間10〜150件の柔軟な件数に対応できることが案内されています。

成果報酬は1件あたり10,000円〜100,000円と記載されています。リード獲得の時点で課金が発生し、その後に商談につながらなかった場合はキャンセル対応になると案内されています。1,000コールのお試しも可能と記載されています。

単価の幅が大きいため、自社の商材・ターゲットでの見積もりを公式サイトで確認してください。', null, 'https://tanomate.net/', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', '1件あたり10,000円〜100,000円', 'リード獲得時点で課金が発生し、商談につながらなかった場合はキャンセル対応と案内されています。', 'リードの獲得（アポイント）', 'appointment', true, false, 'BtoB営業を行う企業', array['初期費用0円・固定費0円（公式サイト記載）', '成果報酬は1件10,000円〜100,000円', '最短5日で稼働、月間10〜150件に対応', '1,000コールのお試しが可能']::text[], 'unpartnered', false, true, true, 'https://tanomate.net/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tanomate' and c.slug = 'tele-appointment' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'tanomate' and c.slug = 'sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('wildcard-ads', 'ワイルドカード（完全成果報酬型広告）', 'Nextrust Co.Ltd.', 'リスティング・SNS広告などを成果報酬で運用。完全成果報酬型は月額0円〜、広告費は成果数に応じた後払いです。', 'ワイルドカードは、Nextrust Co.Ltd.が提供する、成果にこだわる完全成果報酬型の広告運用サービスです。リスティング広告、Facebook広告、Instagram広告、ディスプレイ広告、アドネットワーク、X（Twitter）広告、インフルエンサー広告、TikTok広告、YouTube広告など、多様な媒体に対応すると案内されています。

公式サイトでは、完全成果報酬型の場合は月額0円〜であること、広告費は成果数に応じた後払いで、成果が出なければ費用は0円であることが記載されています。成果の内容は業種により異なり、トライアル購入、定期初回購入、面談完了などが例として挙げられています。

成果の単価や料率、初期費用の有無は公式サイトに記載がないため、「要問い合わせ」としています。', null, 'https://wild-card.tokyo/', 'unknown', null, 'free', '月額0円〜（完全成果報酬型の場合・公式サイト記載）', null, '成果の単価・初期費用は公式サイトに記載がないため、お問い合わせください。広告費は後払い（成果数に応じる）と案内されています。', '業種により異なる（例：トライアル購入、定期初回購入、面談完了）', 'other', false, false, null, array['完全成果報酬型は月額0円〜（公式サイト記載）', '広告費は成果数に応じた後払い', 'リスティング・SNS・動画など多様な媒体に対応']::text[], 'unpartnered', false, true, true, 'https://wild-card.tokyo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'wildcard-ads' and c.slug = 'web-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'wildcard-ads' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('rizap-marketing-consul', 'RIZAPマーケティングコンサル', 'RIZAP株式会社', 'マーケティング戦略設計から広告運用までの費用を負担し、結果が出た後に料金が発生する完全成果報酬型の運用代行です。', 'RIZAPマーケティングコンサルは、RIZAP株式会社が2024年に開始したマーケティング運用代行サービスです。公式のプレスリリースでは、マーケティング戦略設計、クリエイティブ制作、広告出稿などの初期費用は無料であり、広告費もRIZAPが負担すること、結果が出た後に料金が発生する完全成果報酬型であることが案内されています。

成果としては、売上の増加や事業が持つ課題の解決が挙げられています。具体的な料率・金額、月額費用の有無、対象となる企業の条件は、確認できた範囲に記載がないため「要問い合わせ」としています。

本ページの情報は2024年8月のプレスリリースに基づきます。最新の条件は公式ページでご確認ください。', null, 'https://rizap.co.jp/lp/consulting', 'free', '0円（プレスリリース記載。広告費もRIZAPが負担）', 'unknown', null, null, '料率・金額、月額費用の有無は確認できた範囲に記載がありません。2024年8月のプレスリリースに基づく情報です。', '売上の増加や事業課題の解決（結果が出た後に料金が発生）', 'other', false, false, null, array['初期費用0円（プレスリリース記載）', '広告費はRIZAPが負担（プレスリリース記載）', '結果が出た後に料金が発生する完全成果報酬型']::text[], 'unpartnered', false, true, true, 'https://prtimes.jp/main/html/rd/p/000000226.000030866.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'rizap-marketing-consul' and c.slug = 'marketing-consulting' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'rizap-marketing-consul' and c.slug = 'web-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'rizap-marketing-consul' and c.slug = 'consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('trivee-tiktok', 'TriVee（トリビー）TikTok運用代行', 'Givee株式会社', '再生ゼロなら費用ゼロの成果報酬型TikTok運用代行。1再生4円、月額上限は40万円です。', 'TriVee（トリビー）は、Givee株式会社が提供する、成果報酬型のTikTok運用代行サービスです。公式サイトでは「再生ゼロなら費用ゼロ」とうたい、企画から投稿、分析・改善までを一括で対応すると案内されています。

料金は初期費用0円・月額固定費0円で、成果報酬は1再生につき4円、月10本の投稿で月額上限40万円と記載されています。再生数に応じた課金のため、成果の指標は「再生数」です。問い合わせや売上などの成果ではなく、再生数に対する支払いである点を理解して選びましょう。

最低契約期間は公式サイトに記載がありません。無料相談が用意されています。', null, 'https://givee.co.jp/lp/tiktok', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', '1再生につき4円（月10本投稿／月額上限40万円）', '成果の指標は再生数です。最低契約期間は公式サイトに記載がありません。', '動画の再生数', 'click', true, true, 'TikTokで集客・認知拡大を行いたい企業', array['初期費用0円・月額費用0円（公式サイト記載）', '再生ゼロなら費用ゼロ', '1再生4円・月額上限40万円', '企画から投稿・分析改善まで一括対応']::text[], 'unpartnered', false, true, true, 'https://givee.co.jp/lp/tiktok', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'trivee-tiktok' and c.slug = 'sns' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'trivee-tiktok' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('bell-sns', 'BELL SNS運用代行（完全成果報酬）', '株式会社BELL', '現役インフルエンサーが運用する、再生数課金のSNS運用代行。固定費0円で、月額の上限は30万〜50万円です。', 'BELL SNS運用代行は、株式会社BELLが提供する、現役インフルエンサーが運用する完全成果報酬型のSNS運用代行サービスです。TikTok・Instagram・YouTubeの3媒体に対応し、プランによっては2媒体にも対応すると案内されています。

料金は固定費0円の再生数課金で、月額の上限はプランにより50万円・40万円・36万円・30万円の4パターンです。1再生あたりの金額は公式サイトに記載がないため、「要問い合わせ」としています。契約は3か月のお試し契約から用意され、30分の無料相談が案内されています。

初期費用の有無は公式サイトに記載がありません。成果の指標は再生数である点に注意してください。', null, 'https://bell-co.jp/sns/', 'unknown', null, 'free', '固定費0円（公式サイト記載）', null, '再生数課金で、月額の上限はプランにより30万〜50万円。1再生あたりの金額は公式サイトに記載がありません。3か月のお試し契約から。', '動画の再生数（月額上限あり）', 'click', false, true, 'TikTok・Instagram・YouTubeでの集客を行いたい企業', array['固定費0円の再生数課金（公式サイト記載）', '現役インフルエンサーが運用', 'TikTok・Instagram・YouTubeに対応', '30分の無料相談あり']::text[], 'unpartnered', false, true, true, 'https://bell-co.jp/sns/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bell-sns' and c.slug = 'sns' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'bell-sns' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('miloku-inbound-sns', 'MILOKU インバウンド集客SNS運用代行', '株式会社MILOKU', 'インバウンド向けにTikTokなどを一括運用。成果が出なければ費用0円の「完全成果報酬制」を導入しています。', 'MILOKUのインバウンド集客SNS運用代行は、株式会社MILOKUが2026年8月に開始した、外国人観光客の集客に特化したSNS運用代行サービスです。プレスリリースでは、企画から撮影、ネイティブ英語対応、海外広告運用までを一貫して提供し、TikTokをメインにInstagramやYouTube Shortsにも展開すると案内されています。

料金は「成果が出なければ費用0円」の完全成果報酬制とされています。成果の具体的な定義、金額、初期費用・月額費用の有無は確認できた範囲に記載がないため、「要問い合わせ」としています。

対象は、観光・宿泊・小売・美容など、インバウンド集客を目指す企業・団体です。', null, 'https://miloku.co.jp/', 'unknown', null, 'unknown', null, null, '2026年8月のプレスリリースに基づく情報です。成果の定義・金額は公式サイトでご確認ください。', '成果が出た場合のみ（成果の定義は公式サイトをご確認ください）', 'other', false, false, 'インバウンド集客を目指す企業・団体（観光・宿泊・小売・美容など）', array['成果が出なければ費用0円の「完全成果報酬制」（プレスリリース記載）', 'TikTok・Instagram・YouTube Shortsに展開', '企画・撮影・英語対応・海外広告運用まで一貫して提供']::text[], 'unpartnered', false, true, true, 'https://prtimes.jp/main/html/rd/p/000000012.000161719.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'miloku-inbound-sns' and c.slug = 'sns' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'miloku-inbound-sns' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('gaen-seo', 'Gaen SEO対策（成果報酬型）', 'Gaen Inc.', '初期費用無料の完全成果報酬型SEO。10位以内／20位以内保証から選び、表示された日数に応じて日割りで課金されます。', 'Gaenの成果報酬型SEO対策は、毎月の成果に応じて料金が発生する、初期費用無料の完全成果報酬型サービスです。公式サイトでは、希望のキーワードでの上位表示を目指し、外部リンク調整を中心とした施策を行うと案内されています。

成果は「10位以内保証」と「20位以内保証」の2パターンから選びます。成果報酬は日割り計算で、キーワードによって異なります。例として、10位以内保証でYahoo!が月額15万円、Googleが月額10万円の場合に、実際に表示された日数に応じて日割りになると記載されています。20位以内保証は10位以内より成果報酬が低くなると案内されています。

対象はYahoo! JAPANとGoogleです。契約期間・無料相談の有無は公式サイトに記載がありません。', null, 'https://gaen.jp/service/seo-result/', 'free', '0円（公式サイト記載）', 'free', '固定費なし（日割りの成果報酬のみ・公式サイト記載）', '日割りの成果報酬（キーワードにより異なる。例：10位以内保証でGoogle月額10万円相当）', '例示はあくまで一例です。料金はキーワードごとに異なります。', '検索結果で10位以内または20位以内に表示された日（保証順位を選択）', 'other', true, false, 'Yahoo! JAPAN・Googleでの上位表示を目指す企業', array['初期費用0円の完全成果報酬型（公式サイト記載）', '10位以内／20位以内保証から選べる', '表示された日数に応じた日割り課金', 'Yahoo! JAPAN・Googleに対応']::text[], 'unpartnered', false, true, true, 'https://gaen.jp/service/seo-result/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gaen-seo' and c.slug = 'seo' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'gaen-seo' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('hatarakuzo', 'はたらくぞドットコム（採用課金型の求人サイト）', '株式会社はたらくぞ.com', '福岡の採用に強い成果報酬型の求人サイト。初期費用0円で、採用したときだけ費用が発生します。', 'はたらくぞドットコムは、福岡の企業向けの成果報酬型求人サイトです。公式サイトでは、採用したときだけ費用が発生する採用課金モデルであり、初期費用は0円と案内されています。

成果報酬は、正社員・契約社員が10万円、アルバイト・パートが5万円で、研修を含め1日でも出社すると費用が発生します。業務委託・完全歩合制は応募課金で5,000円、人材派遣・紹介業免許を持つ企業は7,000円と記載されています。早期退職に備えた半額保証期間があり、正社員・契約社員は初出社から29日間、アルバイト・パートは6日間以内に報告すると費用が半額になります。

対象地域は福岡で、掲載料・月額費用の記載は確認できませんでした。', null, 'https://www.hatarakuzo.com/pages/lp', 'free', '0円（公式サイト記載）', 'free', '採用したときだけ費用が発生（公式サイト記載）', '正社員・契約社員10万円／アルバイト・パート5万円（採用時）', '業務委託・完全歩合制は応募課金5,000円。半額保証期間：正社員・契約社員は初出社から29日間、アルバイト・パートは6日間。', '採用（研修を含め1日でも出社した時点）', 'hire', true, false, '福岡で採用を行う企業', array['初期費用0円、採用したときだけ費用が発生（公式サイト記載）', '正社員10万円・アルバイト5万円', '半額保証期間あり', '福岡エリア向け']::text[], 'unpartnered', false, true, true, 'https://www.hatarakuzo.com/pages/lp', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hatarakuzo' and c.slug = 'job-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'hatarakuzo' and c.slug = 'recruitment' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('chusho-support-partners', '中小企業支援パートナーズ（補助金申請支援）', '一般社団法人 中小企業支援パートナーズ', '着手金なし。成功報酬は採択発表時に補助金申請額の10％で、税理士・診断士・社労士など専門家が支援します。', '中小企業支援パートナーズは、税理士、中小企業診断士、社会保険労務士、経営者、弁護士、行政書士など11名で編成する専門家グループです。補助金・助成金の獲得支援をはじめ、税務、法律相談、経営コンサルティングまでワンストップで中小企業を支援すると案内されています。

料金は着手金なしで、成功報酬は採択発表時に補助金申請額の10％と記載されています。申請額が高額になる場合は、報酬割合は10％より低くなるとされています。採択から補助金入金までの支援を希望する場合は、補助金入金額の5％または50万円のうち低い金額が別途かかります。無料相談フォームが用意されています。

月額費用や、不採択時の扱いは確認できた範囲に記載がありません。', null, 'https://hojokinpro.com/', 'free', '着手金なし（公式サイト記載）', 'unknown', null, '採択発表時に補助金申請額の10％（高額の場合は料率が下がる）', '採択から補助金入金までの支援を希望する場合は、補助金入金額の5％または50万円のうち低い金額が別途かかります。', '補助金の採択', 'other', false, true, '中小企業', array['着手金なし（公式サイト記載）', '成功報酬は採択発表時に申請額の10％', '税理士・診断士・社労士・弁護士・行政書士など11名で支援', '無料相談フォームあり']::text[], 'unpartnered', false, true, true, 'https://hojokinpro.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'chusho-support-partners' and c.slug = 'subsidy' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'chusho-support-partners' and c.slug = 'funding' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('gyoseishoshi-acala', '行政書士事務所acala 補助金申請サポート', '行政書士事務所acala', '着手金0円。採択成功報酬は15％で、採択されなかった場合の費用は一切かかりません。', '行政書士事務所acalaは、補助金の採択に向けた計画づくりから実績報告までをサポートする行政書士事務所です。公式サイトでは、電話・メール・LINE・問い合わせフォームのいずれからも相談でき、初回相談は無料と案内されています。

料金は着手金0円で、採択成功報酬は15％（山梨県中小企業等生産性向上設備整備等支援補助金は10％）と記載されています。採択されなかった場合は、費用は一切かからないと案内されています。対象は中小企業・小規模事業者・個人事業主などで、補助金ごとに要件が異なります。

月額費用の有無や、実費の扱いは確認できた範囲に記載がありません。契約前に確認してください。', null, 'https://acala-office.com/', 'free', '着手金0円（公式サイト記載）', 'unknown', null, '採択成功報酬15％（山梨県中小企業等生産性向上設備整備等支援補助金は10％）', '採択されなかった場合は費用は一切かからないと案内されています。', '補助金の採択', 'other', false, true, '中小企業・小規模事業者・個人事業主（補助金ごとに要件が異なる）', array['着手金0円（公式サイト記載）', '採択成功報酬は15％', '不採択の場合は費用なし（公式サイト記載）', '初回相談無料']::text[], 'unpartnered', false, true, true, 'https://acala-office.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gyoseishoshi-acala' and c.slug = 'subsidy' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'gyoseishoshi-acala' and c.slug = 'funding' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('rita-cloud-joseikin', 'リタクラウド 助成金申請代行', 'リタクラウド社会保険労務士法人', '着手金0円の助成金申請サポート。申請サポート料は10％（顧問契約なしの場合は15％）です。', 'リタクラウド社会保険労務士法人は、補助金・助成金の申請サポートを行う社会保険労務士法人です。公式サイトでは、キャリアアップ助成金（正社員化コース等）、業務改善助成金、働き方改革推進支援助成金、テレワーク促進助成金、両立支援等助成金、65歳超雇用推進助成金などに対応し、受給率は97.9％と記載されています。

料金は着手金0円で、申請サポート料は10％（顧問契約ありの場合）、顧問契約がない場合は15％と記載されています。「無料相談」の明確な表記は確認できませんでしたが、問い合わせ窓口が用意されています。

月額費用や、不受給の場合の扱いは確認できた範囲に記載がないため、契約前にご確認ください。', null, 'https://rita-cloud.co.jp/lp-joseikin', 'free', '着手金0円（公式サイト記載）', 'unknown', null, '申請サポート料10％（顧問契約なしの場合は15％）', '料率の算出基準（受給額に対する割合か）などの詳細は公式サイトでご確認ください。', '助成金の申請・受給', 'other', false, false, '助成金の活用を検討する企業（社会保険労務士が対応する雇用関連助成金）', array['着手金0円（公式サイト記載）', '申請サポート料は10％（顧問契約なしは15％）', '雇用関連の助成金に幅広く対応', '受給率97.9％（公式サイト記載）']::text[], 'unpartnered', false, true, true, 'https://rita-cloud.co.jp/lp-joseikin', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'rita-cloud-joseikin' and c.slug = 'subsidy' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'rita-cloud-joseikin' and c.slug = 'funding' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('managent-consulting', 'managent 完全成果報酬型コンサルティング', 'managent', '中小企業・個人事業主向けの成果報酬型コンサル。着手金0円で、売上増・経費削減などの成果に応じて報酬が決まります。', 'managentは、中小企業・個人事業主に特化した成果報酬型のコンサルティングサービスです。公式サイトでは、売上増・粗利益増・労働削減・経費削減などの具体的な成果に応じてコンサルティング料金を支払うこと、整体・エステ・士業ビジネスなどに特化していることが案内されています。

料金は、初期費用・着手金が0円（現場訪問費用等は実費請求）で、成果報酬は目標指標、業種・規模、契約年数に応じて変動します。成果は、契約前3か月の平均額を基準に、増加分・削減分で計測されます。請求は月末締め、翌月15日払いと記載されています。

運営会社の正式名称、月額費用の有無、具体的な料率は公式サイトで確認できなかったため、お問い合わせが必要です。', null, 'https://www.managent.org/', 'free', '着手金0円（現場訪問費用等は実費・公式サイト記載）', 'unknown', null, null, '成果報酬は目標指標・業種・規模・契約年数に応じて変動します。運営会社名は公式サイトで確認できませんでした。', '売上増・粗利益増・労働削減・経費削減（契約前3か月の平均を基準に増加分・削減分で計測）', 'other', false, false, '中小企業・個人事業主（整体・エステ・士業ビジネスなどに特化）', array['着手金0円（公式サイト記載）', '成果は契約前3か月の平均を基準に計測', '月末締め・翌月15日払い', '店舗型ビジネスや士業に特化']::text[], 'unpartnered', false, true, true, 'https://www.managent.org/service/about-consulting/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'managent-consulting' and c.slug = 'business-consulting' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'managent-consulting' and c.slug = 'consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('ec-solutions-consulting', '完全成果報酬型コンサルティング（Yahoo!ショッピング出店者向け）', 'ECソリューションズ株式会社', 'Yahoo!ショッピング出店者向けの完全成果報酬型コンサルティング。報酬は売上の10％です。', 'ECソリューションズ株式会社の完全成果報酬型コンサルティングサービスは、Yahoo!ショッピング出店者向けに、売上拡大や店舗運営の課題解決を支援するサービスです。Yahoo!コマースパートナーのサービス紹介ページでは、コマースパートナー初の完全成果報酬型コンサルティングと案内されています。

報酬は売上の10％で、成果報酬方式で支払います。対象は、商品数30以上の出店者、サイト運営地が東京近郊（東京・神奈川・千葉・埼玉）、粗利20％程度を確保できる出店者などと記載され、ブランド品・貴金属・サービス商品は受託できません。

初期費用・月額費用の記載は確認できなかったため、お問い合わせが必要です。', null, 'https://business-ec.yahoo.co.jp/commerce_partner/biz-apps/273/', 'unknown', null, 'unknown', null, '売上の10％', '受託条件：商品数30以上／運営地が東京・神奈川・千葉・埼玉／粗利20％程度の確保／ブランド品・貴金属・サービス商品は不可（公式ページ記載）。', '売上（売上に対する10％）', 'sale', false, false, 'Yahoo!ショッピング出店者（商品数30以上・東京近郊などの条件あり）', array['報酬は売上の10％の成果報酬', 'Yahoo!ショッピング出店者向け', '売上拡大・店舗運営の課題解決を支援']::text[], 'unpartnered', false, true, true, 'https://business-ec.yahoo.co.jp/commerce_partner/biz-apps/273/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ec-solutions-consulting' and c.slug = 'business-consulting' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'ec-solutions-consulting' and c.slug = 'consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('imake-success-fee', 'iMake 成功報酬Webマーケティング支援', '有限会社IMAKE', '初期費用・固定費なしのWebマーケティング支援。申込完了数・注文件数など、計測できるコンバージョンに応じて費用が発生します。', 'iMake（アイメイク）の成功報酬Webマーケティング支援は、有限会社IMAKEが提供する、成果が出たときに報酬が発生する料金体系のサービスです。公式サイトでは、サイト上での受注や成約など、成果ベースで費用が決まり、初期費用や固定費は必要ないと明記されています。

成果の指標は、申込完了数、商品注文件数、電話発信件数など、Webサイト上でコンバージョンとして定量的に計測できるものとされています。成果ベースでフィーを設定するため、通常のフィーよりも割高になる場合があると記載されています。具体的な料率・金額は公式サイトに記載がありません。

相談は「お気軽にご相談ください」と案内されています。', null, 'https://www.imake.jp/', 'free', '不要（公式サイト記載）', 'free', '固定費は不要（公式サイト記載）', null, '成果ベースのフィーは通常のフィーより割高になる場合があると公式サイトに記載されています。料率・金額は公式サイトに記載がありません。', 'Webサイト上で計測できるコンバージョン（申込完了数・商品注文件数・電話発信件数など）', 'lead', true, true, null, array['初期費用・固定費は不要（公式サイト記載）', '申込完了・注文・電話発信など計測できる成果に応じて課金', '成果ベースのため通常フィーより割高になる場合あり']::text[], 'unpartnered', false, true, true, 'https://www.imake.jp/success-reward/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'imake-success-fee' and c.slug = 'marketing-consulting' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'imake-success-fee' and c.slug = 'consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('dt-media-success', 'デザイントランスメディア 成果報酬型Web制作・運用', '株式会社デザイントランスメディア', '企画・制作・運用の費用を売上に対する成果報酬として受け取るWeb制作。制作費を抑える、または初期費用なしの提案も可能です。', 'デザイントランスメディアの成果報酬契約は、Webサイトの運用に関する企画から制作、メディアプラン、マーケティング、SNS運用までを行い、費用を売上に対する成果報酬として受け取る契約形態です。公式サイトでは、例として、200万円の初期制作費用を半額の100万円で制作したり、初期費用をいただかずに制作したりすることも可能と記載されています。

成果報酬は「売上×○％」を月次で請求する形で、料率は契約時に決まります。成果は「Webサイト上から上げられた売上」で、細かなルールは契約時に定めるとされています。新規ビジネスの立ち上げや事業の第二成長期に向いていると案内されています。

具体的な料金は公式サイトに記載がないため、お問い合わせが必要です。', null, 'https://www.dt-media.jp/', 'unknown', null, 'unknown', null, '売上×○％（料率は契約時に決定。月次請求）', '初期制作費を半額にする、または初期費用なしで制作する例が公式サイトに記載されています。条件は個別に決まります。', 'Webサイト上から上げられた売上', 'sale', false, false, '新規ビジネスの立ち上げ・事業の第二成長期にある企業', array['制作・運用費用を売上に対する成果報酬で支払う契約', '制作費を半額にする／初期費用なしの提案も可能（公式サイト記載の例）', '企画・制作・メディアプラン・SNS運用まで対応']::text[], 'unpartnered', false, true, true, 'https://www.dt-media.jp/column/%E3%80%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E3%81%94%E6%A1%88%E5%86%85%E3%80%91%E6%88%90%E6%9E%9C%E5%A0%B1%E9%85%AC%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'dt-media-success' and c.slug = 'web-production' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'dt-media-success' and c.slug = 'production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('valueagent-web', 'バリューエージェント 成功報酬型ホームページ制作＆運用', '株式会社バリューエージェント', '制作費・運用費を半額負担する代わりに売上の5〜20％を成功報酬とする制作・運用。ただし初期費用・月額費用は別途必要です。', 'バリューエージェントの成功報酬型ホームページ制作＆運用は、ホームページの制作費用・運用費を同社が半額負担する代わりに、売上の5％〜20％を成功報酬として受け取るサービスです。

公式サイトでは、初期費用は100万円〜（税抜）、月額は20万円〜（税抜）、最低契約期間は12か月〜と記載されています。固定費ゼロの「完全成果報酬」ではなく、固定費を半額に抑えて成果報酬を組み合わせる形です。

対象は「本気でビジネスを広めたい方」で、新規サービス、地域サービス、広告費を負担できない場合、売上増加時に対応できない組織体制の場合などは対象外と記載されています。無料相談の有無は確認できませんでした。', null, 'https://valueagent.co.jp/webmlp/success', 'paid', '100万円〜（税抜・公式サイト記載）', 'paid', '20万円〜（税抜・公式サイト記載）', '売上の5％〜20％', '最低契約期間は12か月〜。新規サービス・地域サービスなどは対象外と公式サイトに記載されています。', '売上（売上に対する5〜20％）', 'sale', false, false, '本気でビジネスを広めたい企業（対象外の条件あり）', array['制作費・運用費を同社が半額負担し、売上の5〜20％を成功報酬とする', '初期費用100万円〜・月額20万円〜（固定費あり）', '最低契約期間12か月〜']::text[], 'unpartnered', false, true, true, 'https://valueagent.co.jp/webmlp/success', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'valueagent-web' and c.slug = 'web-production' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'valueagent-web' and c.slug = 'production' on conflict do nothing;

insert into articles (slug, title, excerpt, body, category_id, published, published_at) values ('what-is-performance-based-pricing', '成果報酬型サービスとは？固定費型との違いと選び方', '成果報酬型と固定費型の違い、メリット・注意点、比較時に確認したいポイントをまとめました。', '## 成果報酬型とは

成果報酬型とは、あらかじめ決めた「成果」が発生した場合にだけ費用を支払う料金体系です。営業代行ならアポイント獲得や商談実施、採用なら採用決定、広告なら購入や申込といったものが成果にあたります。

## 固定費型との違い

| 項目 | 成果報酬型 | 固定費型 |
|---|---|---|
| 費用が発生するタイミング | 成果が発生したとき | 契約期間中、毎月 |
| 成果が出なかったとき | 原則、成果報酬は発生しない | 費用は発生する |
| 1件あたりの単価 | 固定費型より高めになることがある | 件数が増えるほど割安になりやすい |
| 初期費用・月額費用 | サービスによる（なしの場合もある） | 発生することが多い |

## 比較するときに確認したいポイント

1. **何が「成果」か**：アポイント獲得なのか、商談実施なのか、成約なのか。成果の定義によって、支払うタイミングも金額も変わります。
2. **初期費用・月額費用の有無**：成果報酬と書かれていても、初期費用や月額の固定費が別途かかるサービスがあります。
3. **成果報酬の金額・料率**：1件あたりの単価か、売上に対する料率か。上限や最低金額があるかも確認しましょう。
4. **成果の判定方法**：誰がどのように成果を確認するのか、キャンセル時の扱いはどうなるのかを事前に確認します。
5. **契約期間・解約条件**：最低契約期間や解約時の費用の有無を確認します。

## まとめ

成果報酬型は固定費を抑えやすい一方で、成果の定義や単価によっては総額が大きくなることもあります。複数のサービスを同じ条件で比較し、公式サイトで最新の条件を確認したうえで選びましょう。', (select id from categories where slug = 'other'), true, '2026-10-05T00:00:00+09:00')
  on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, body, category_id, published, published_at) values ('full-performance-based-pricing-checklist', '「完全成果報酬」とは？契約前に確認したいチェックポイント', '「完全成果報酬」と書かれていても条件はさまざま。初期費用や月額費用の有無など、契約前の確認ポイントを整理します。', '## 「完全成果報酬」の意味

成果報酬ナビでは、**固定費・月額費用がなく、成果発生時のみ費用が発生するサービス**を「完全成果報酬」と定義しています。サービス各社が使う「完全成果報酬」「完全成功報酬」という表現が、同じ意味とは限らない点には注意が必要です。

## 契約前に確認したいポイント

- **初期費用・着手金はあるか**：成果報酬のほかに、契約時や業務開始時に費用が発生する場合があります。
- **月額費用・固定費はあるか**：成果報酬と書かれていても、月額の固定費が別途かかるサービスがあります。
- **条件付きの0円ではないか**：「予算が一定額以上なら初期費用無料」など、条件付きの場合があります。
- **成果報酬の算出方法**：1件あたりの単価か、売上・交付額などに対する料率か。別途の管理費や上限・最低金額がないかも確認しましょう。
- **成果の定義**：アポイント獲得なのか、商談実施なのか、成約なのか。どの時点で成果とみなされるのかを確認します。

## 営業代行で見る料金条件の違い（例）

公式サイトの記載を確認した範囲では、[オルガロ](/services/orgallo-sales)は初期費用0円・月額固定費0円と案内されています。[アイランド・ブレイン](/services/islandbrain)は毎月の固定費が不要で、商談1件につき20,000円（税別）の成果報酬です。一方、[完全成果アポインター](/services/kanzenseika-appointer)は、予算が30万円以上の場合に初期費用・月額費用が無料で、30万円未満の場合は固定費が発生すると案内されています。

同じ成果報酬型でも、固定費の考え方は異なります。最新の料金・条件は、必ず各サービスの公式サイトでご確認ください。', (select id from categories where slug = 'sales'), true, '2026-10-05T00:00:00+09:00')
  on conflict (slug) do nothing;
insert into article_services (article_id, service_id, sort_order) select a.id, s.id, 0 from articles a, services s where a.slug = 'full-performance-based-pricing-checklist' and s.slug = 'orgallo-sales' on conflict do nothing;
insert into article_services (article_id, service_id, sort_order) select a.id, s.id, 1 from articles a, services s where a.slug = 'full-performance-based-pricing-checklist' and s.slug = 'kanzenseika-appointer' on conflict do nothing;
insert into article_services (article_id, service_id, sort_order) select a.id, s.id, 2 from articles a, services s where a.slug = 'full-performance-based-pricing-checklist' and s.slug = 'islandbrain' on conflict do nothing;

insert into articles (slug, title, excerpt, body, category_id, published, published_at) values ('fixed-fee-outsourcing-risks', '固定費で外注するリスク｜成果が出なくても費用は発生する', '営業代行・広告運用・採用支援を月額固定費で外注したときに起こりがちなリスクと、成果報酬型を検討するときの考え方を整理します。', '## 固定費の外注で、事業側が背負うリスク

営業代行、広告運用、採用支援などを月額固定費（リテイナー）で外注すると、成果が出るかどうかにかかわらず、毎月の費用が発生します。ここでは、固定費型の外注で起こりがちなリスクを整理します。

### 1. 成果が出なくても費用は発生する

固定費型では、費用は「作業・稼働」に対して支払います。アポイントが取れなくても、広告のコンバージョンが増えなくても、採用が決まらなくても、費用は変わりません。成果が出ないリスクは、すべて発注側が負うことになります。

### 2. 費用が先に出ていく

外注を始めた月から、初期費用や月額費用が発生します。成果が出るまでの期間が長いほど、先行して出ていく費用が増え、資金繰りを圧迫します。創業間もない企業や、少人数で事業を回している企業ほど影響が大きくなります。

### 3. 最低契約期間で、やめどきを失う

固定費型では、3か月・6か月などの最低契約期間が設けられていることがあります。成果が見えない状態でも、契約期間中は支払いを続けることになり、見直しのタイミングを逃しがちです。

### 4. 受託側と、成果へのインセンティブがずれる

報酬が稼働に対して支払われる場合、受託側にとっての売上は成果と直接結びつきません。もちろん成果にこだわる会社も多くありますが、構造としては「成果が出なくても報酬は得られる」状態になります。

### 5. 効果の検証が後回しになる

毎月の費用が決まっていると、効果が出ているかを厳密に検証しないまま、惰性で継続してしまうことがあります。

## 成果報酬型で変わること

成果報酬型では、あらかじめ決めた成果が発生したときに費用が発生します。成果が出るまでの固定費を抑えられるため、事業側のリスクは小さくなります。受託側にとっても、成果が出なければ報酬を得られないため、成果を出すことに直接の動機が働きます。

一方で、成果報酬型にも確認すべき点があります。

- **「何が成果か」の定義**：アポイント獲得・商談実施・成約など、どこを成果とするか
- **単価の水準**：固定費型より1件あたりの単価が高めになることがあります
- **条件付きの「0円」**：予算規模などの条件で、初期費用や月額費用が発生する場合があります
- **成果の判定方法**：誰が・どのように成果を確認するか、キャンセル時の扱いはどうなるか

複数のサービスを同じ条件で比較し、公式サイトで最新の条件を確認したうえで選びましょう。[「完全成果報酬」とは？契約前に確認したいチェックポイント](/articles/full-performance-based-pricing-checklist)もあわせてご覧ください。', (select id from categories where slug = 'other'), true, '2026-10-05T00:00:00+09:00')
  on conflict (slug) do nothing;

insert into articles (slug, title, excerpt, body, category_id, published, published_at) values ('why-performance-based-services-are-confident', '成果報酬で提供できるのは、サービスに自信があるから', '成果が出たときだけ報酬を受け取る料金体系は、提供側にとってリスクが大きい仕組みです。成果報酬を選べる理由と、見極めのポイントをまとめます。', '## 成果報酬は、提供側にとってリスクの大きい料金体系

成果報酬型では、成果が出なければ報酬を受け取れません。提供側は、稼働や広告費、人件費などのコストを先に負担したうえで、成果が出たときに初めて売上になります。

つまり、成果報酬で提供できるのは、**成果を出せるという自信と、それを支えるノウハウ・体制があるから**だといえます。成果が出せないサービスは、この料金体系では事業として成り立ちにくいためです。

## 成果報酬の裏にある、提供側の覚悟

- **成果が出なければ収益にならない**：稼働しても報酬が発生しないため、成果の出し方に再現性がなければ続けられません。
- **コストを先に負担する**：成果が出る前の人件費・広告費・制作費は、提供側が負担することがあります。
- **発注側と同じ方向を向ける**：成果が出ることが双方の利益になるため、成果にこだわる動機が働きます。

## ただし、自信の「根拠」は確認しよう

成果報酬だから安心、とは限りません。次の点を確認しましょう。

1. **実績・事例**：どのような業種・規模で、どの程度の成果が出ているか
2. **成果の定義と判定方法**：成果の基準が曖昧だと、認識のずれからトラブルになりやすくなります
3. **単価・手数料・上限**：提供側のリスクを織り込んで、1件あたりの単価が高めになることがあります
4. **返金保証・条件**：早期退職時の返金など、成果が取り消された場合の扱い

成果報酬ナビでは、成果地点・料金条件を同じ基準で並べて比較できます。公式サイトの情報をもとに、まずは条件を見比べてみてください。', (select id from categories where slug = 'other'), true, '2026-10-05T00:00:00+09:00')
  on conflict (slug) do nothing;

commit;
