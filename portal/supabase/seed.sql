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
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales-outsourcing', '営業代行', 'sales', null, 11, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('tele-appointment', 'テレアポ代行', 'sales', null, 12, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('web-ads', '広告運用', 'marketing', '広告運用の成果報酬型サービスでは、獲得件数（コンバージョン）など成果が発生した場合のみ費用が発生する料金体系があります。広告費を誰が負担するか、運用手数料の有無、成果の定義を確認して比較しましょう。', 21, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('seo', 'SEO', 'marketing', null, 22, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sns', 'SNS運用', 'marketing', null, 23, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('job-ads', '求人広告', 'recruitment', null, 31, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-agency', '人材紹介', 'recruitment', null, 32, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-outsourcing', '採用代行', 'recruitment', null, 33, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('subsidy', '補助金・助成金支援', 'funding', null, 41, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('factoring', 'ファクタリング', 'funding', null, 42, (select id from categories where slug = 'funding'), true)
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

commit;
