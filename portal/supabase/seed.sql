-- 自動生成: `npm run seed:sql`（src/data/seed.json から生成）。直接編集しないでください。
-- 料金・成果報酬条件は公式サイトで確認できたものだけを記載しています。公開前に編集部で再確認してください。
begin;

insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales', '営業', 'sales', '営業代行には固定月額型と成果報酬型があります。成果報酬型では、アポイント獲得や商談実施など、あらかじめ決めた成果が発生した場合のみ料金が発生します。テレアポ・商談獲得・訪問営業・問い合わせフォーム営業など、初期費用を抑えて新規開拓を始められるサービスを比較できます。', 10, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('marketing', 'マーケティング', 'marketing', '成果報酬型の広告運用・SEOなど、成果（コンバージョン・獲得件数・検索順位など）に応じて費用が発生するマーケティング支援を比較できます。広告費の負担方法や成果の定義はサービスごとに異なるため、条件を確認して選びましょう。', 20, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment', '採用', 'recruitment', '人材紹介・採用代行・求人広告のうち、採用決定など成果が出た場合にのみ費用が発生するサービスを比較できます。成功報酬の料率や、早期退職時の返金保証の有無もあわせて確認しましょう。', 30, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('funding', '資金調達', 'funding', '補助金・助成金の申請支援やファクタリングなど、資金調達に関するサービスを比較できます。補助金申請支援では、着手金0円・採択（交付）時のみ成功報酬というサービスもあります。', 40, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('consulting', 'コンサルティング', 'consulting', 'コンサルティングの成果報酬型では、売上の増加分や経費の削減額など、成果に応じてフィーが決まる料金体系があります。成果の測り方（基準となる期間・指標）と料率、対象となる業種・規模を確認して比較しましょう。', 50, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('production', '制作・開発', 'production', 'Webサイト・LP・システムなどの制作・開発のうち、制作費・開発費の一部または全部を、売上やコンバージョンなどの成果で支払う料金体系のサービスを比較できます。初期費用・月額費用が別途かかる場合があるため、条件を確認して比較しましょう。', 60, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('other', 'その他', 'other', '上記以外の、成果報酬で利用できるサービスを掲載します。', 90, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales-outsourcing', 'テレアポ・商談獲得代行', 'sales', 'テレアポ（電話営業）などでアポイントを獲得し、商談につなげる営業代行です。成果報酬型では、アポイント1件・商談1件ごとに費用が発生するのが一般的で、成果の定義（アポの確定か、商談の実施か）と、キャンセル時の返金、別途の管理費を確認して比較しましょう。', 12, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('field-sales', '訪問営業代行', 'sales', '訪問営業代行の成果報酬型では、訪問（商談）1件ごとに費用が発生するプランがあります。1件あたりの単価に加え、別途の管理費、予算規模による固定費、利用条件（営業実績や商材の種類）を確認して比較しましょう。', 13, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('form-sales', 'フォーム営業', 'sales', '問い合わせフォーム営業代行は、企業の問い合わせフォームへ営業文を送信して商談につなげる手法です。送信1通ごとの従量課金、アポイント獲得ごとの成果報酬など、課金の単位がサービスごとに異なります。', 14, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('referral-sales', '紹介営業', 'sales', '紹介営業（リファラル）は、既存の人脈やネットワークを通じて見込み客を紹介してもらう手法です。アポイント成果や売上成果で費用が発生するサービスを比較できます。', 15, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('web-ads', '広告運用', 'marketing', '広告運用の成果報酬型サービスでは、獲得件数（コンバージョン）など成果が発生した場合のみ費用が発生する料金体系があります。広告費を誰が負担するか、運用手数料の有無、成果の定義を確認して比較しましょう。', 21, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sns', 'SNS運用', 'marketing', 'SNS運用の成果報酬型サービスでは、再生数・フォロワー増加数・問い合わせ件数など、あらかじめ決めた指標に応じて費用が発生する料金体系があります。上限額や最低契約期間の有無、成果の指標を確認して比較しましょう。', 24, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('lead-generation', 'リード・問い合わせ獲得', 'marketing', '問い合わせ・資料請求・見積もり依頼などの件数（反響）に応じて費用が発生するリード獲得サービスを比較できます。1件あたりの単価、有効リードの定義（重複・営業電話の除外）、キャンセル時の扱いを確認しましょう。', 26, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('meo', 'MEO（地図検索対策）', 'marketing', 'Googleマップなど地図検索での上位表示（MEO）のうち、順位や来店・問い合わせなどの成果に応じて費用が発生するサービスを比較できます。', 41, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('seo', 'SEO', 'marketing', '成果報酬型のSEO対策では、検索順位が一定以内に入った日・月に応じて費用が発生する料金体系が多く見られます。保証する順位の定義、対象の検索エンジン、日割りや上限の有無を確認して比較しましょう。', 40, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('job-ads', '求人広告', 'recruitment', null, 31, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-agency', '人材紹介', 'recruitment', null, 32, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-outsourcing', '採用代行', 'recruitment', null, 33, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('subsidy', '補助金申請支援', 'funding', '補助金は、経済産業省などが公募する事業の支援金で、審査を経て採択された場合に交付されます。申請支援では、着手金0円・採択（交付）時に成功報酬というサービスがあります。', 41, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('grant', '助成金申請支援', 'funding', '助成金は、雇用の維持・拡大などの要件を満たした場合に受給できる、主に厚生労働省関連の支援金です。社会保険労務士などによる申請サポートの料金体系を比較できます。', 42, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('factoring', 'ファクタリング', 'funding', null, 43, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('business-consulting', '経営・売上改善', 'consulting', null, 51, (select id from categories where slug = 'consulting'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('marketing-consulting', 'マーケティングコンサル', 'consulting', null, 52, (select id from categories where slug = 'consulting'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('site-production', 'サイト制作', 'production', 'ホームページ・Webサイトの制作・運用のうち、制作費や運用費を売上などの成果で支払うサービスを比較できます。', 61, (select id from categories where slug = 'production'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('lp-production', 'LP制作', 'production', 'ランディングページ（LP）制作のうち、コンバージョン率の改善や獲得件数などの成果に応じて制作費が決まるサービスを比較できます。成果の基準（改善率の閾値など）と、広告費の負担を確認しましょう。', 62, (select id from categories where slug = 'production'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('system-development', 'システム開発', 'production', 'システム開発・ソフトウェア開発のうち、開発費を抑える代わりに売上や収益の一部を分配する「レベニューシェア型」のサービスを比較できます。売上が出なければ分配も発生しない一方、成功時の総額が大きくなる点に注意が必要です。', 63, (select id from categories where slug = 'production'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('listing-ads', 'リスティング広告', 'marketing', 'リスティング広告（検索連動型広告）の運用を、獲得件数（コンバージョン）などの成果に応じた費用で依頼できるサービスを比較できます。広告費を誰が負担するか、運用手数料の有無を確認しましょう。', 22, (select id from categories where slug = 'web-ads'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sns-ads', 'SNS広告', 'marketing', 'Meta広告（Facebook・Instagram）やTikTok広告などSNS広告の運用を、成果に応じた費用で依頼できるサービスを比較できます。', 23, (select id from categories where slug = 'web-ads'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('tiktok-ops', 'TikTok運用', 'marketing', 'TikTokの運用代行のうち、再生数などの成果に応じて費用が発生するサービスを比較できます。成果の指標（再生数か、問い合わせ・売上か）と月額の上限を確認しましょう。', 25, (select id from categories where slug = 'sns'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('instagram-ops', 'Instagram運用', 'marketing', 'Instagramの運用代行のうち、再生数やフォロワー数などの成果に応じて費用が発生するサービスを比較できます。', 26, (select id from categories where slug = 'sns'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('youtube-ops', 'YouTube運用', 'marketing', 'YouTube・YouTubeショートの運用代行のうち、再生数・登録者数・問い合わせなどの成果に応じて費用が発生するサービスを比較できます。', 27, (select id from categories where slug = 'sns'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('x-ops', 'X（旧Twitter）運用', 'marketing', 'X（旧Twitter）アカウントの運用代行のうち、フォロワー数・インプレッション・問い合わせなどの成果に応じて費用が発生するサービスを比較できます。', 28, (select id from categories where slug = 'sns'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('line-ops', 'LINE公式アカウント運用', 'marketing', 'LINE公式アカウントの運用代行のうち、友だち追加数・購入などの成果に応じて費用が発生するサービスを比較できます。', 29, (select id from categories where slug = 'sns'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('app-development', 'アプリ開発', 'production', 'スマートフォンアプリやWebアプリの開発のうち、開発費を抑えてレベニューシェアで共同開発するサービスを比較できます。', 64, (select id from categories where slug = 'system-development'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('islandbrain', 'アイランド・ブレイン 営業代行（成果報酬型）', '株式会社アイランド・ブレイン', 'BtoB専門の営業代行・テレアポ代行。毎月の固定費が不要で、商談1件につき20,000円（税別）の成果報酬です。', 'アイランド・ブレインは、新規開拓営業・アポイント獲得に特化したBtoB向けの営業代行サービスです。公式サイトでは、テレアポ代行、問い合わせフォーム営業代行、営業コンサルティングなどを提供していること、55業種4,500社以上の導入実績があることが案内されています。

料金体系は成果報酬型で、公式サイトには「毎月の固定費は発生しない」「商談のご提供に対する成功報酬」「1件につき20,000円（税別）」と記載されています。最低商談件数は1件から利用できると案内されています。

初期費用の有無など、上記以外の条件はサービス内容によって異なる可能性があります。契約前に、公式サイトまたは担当者へ最新の条件をご確認ください。', null, 'https://www.islandbrain.co.jp/', 'unknown', null, 'free', '固定費なし（公式サイト記載）', '商談1件につき20,000円（税別）', '問い合わせフォーム営業代行には別の料金体系があります。詳細は公式サイトをご確認ください。', '商談の提供（最低1件から）', 'meeting', 'success_only', false, false, 'BtoB営業（業種不問と案内）', array['毎月の固定費が不要（公式サイト記載）', '商談1件につき20,000円（税別）の成果報酬', '55業種4,500社以上の導入実績（公式サイト記載）', 'テレアポ代行・問い合わせフォーム営業代行にも対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.islandbrain.co.jp/price/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'islandbrain' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kanzenseika-appointer', '完全成果アポインター（テレアポ代行）', '株式会社完全成果報酬', '成果報酬型のテレアポ代行。アポイント1件15,000円〜。予算規模によって初期費用・月額費用が変わります。', '完全成果アポインターは、株式会社完全成果報酬が提供する、成果報酬型でアポイント獲得を代行するテレアポ代行サービスです。営業代行のプロが電話営業業務を担当し、クライアント企業は商談での受注獲得に集中できると案内されています。同社は訪問営業代行の「完全成果クローザー」も提供しています。

料金は、アポイント1件につき15,000円〜で、別途10%のプロジェクト管理費が必要と公式サイトに記載されています。初期費用と月額費用は、予算が30万円以上の場合は無料、30万円未満の場合はそれぞれ100,000円（月額は月100,000円）と記載されています。つまり、予算規模によっては固定費が発生する点に注意が必要です。

受注成果報酬のプランには、法人設立後3年以上・外部パートナー利用の営業実績1年以上などの条件があると案内されています。詳細は公式サイトでご確認ください。', null, 'https://www.kanzenseika.jp/service/appointer.html', 'paid', '初回30万円未満／2回目以降50万円未満は100,000円、それ以上は無料（公式サイト記載）', 'paid', '初回30万円未満／2回目以降50万円未満は月100,000円、それ以上は無料（公式サイト記載）', 'アポイント1件につき15,000円〜（別途プロジェクト管理費10%）', '全サービスに別途10%のプロジェクト管理費。依頼内容によりテストマーケティング（固定報酬）が必要。成果報酬型は法人設立3年以上・外部営業実績1年以上・即決型商品等の条件あり。', 'アポイントの獲得', 'appointment', 'hybrid', false, false, '法人（受注成果報酬プランは設立3年以上・外部パートナー利用の営業実績1年以上が条件）', array['アポイント1件につき15,000円〜の成果報酬', '予算30万円以上なら初期費用・月額費用が無料（公式サイト記載）', '訪問営業代行「完全成果クローザー」も提供']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.kanzenseika.jp/service/appointer.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kanzenseika-appointer' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('orgallo-sales', 'オルガロ 完全成果報酬型の営業代行', '株式会社オルガロ', '電話営業と紹介営業を組み合わせる営業支援。初期費用0円・月額固定費0円の完全成果報酬型です。', 'オルガロは、株式会社オルガロが提供する営業代行・営業支援サービスです。公式サイトでは、電話営業（テレマーケティング）と紹介営業（リファラル）の2つの手法を扱い、商材とターゲットに応じて組み合わせること、成果地点から決める営業支援であることが案内されています。

料金は初期費用0円・月額固定費0円で、成果が出なかった期間の費用は0円と記載されています。テレマーケティングは基本的にアポイント単価、紹介営業はアポイント成果または売上成果での課金とされていますが、具体的な金額は公式サイトに記載がないため、本ページでは「要問い合わせ」としています。

成果地点と手法の無料シミュレーションが用意されており、相談に費用はかからないと案内されています。', null, 'https://orgallo.co.jp/', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', null, '成果報酬の金額は公式サイトに記載がないため、お問い合わせください。', 'アポイント獲得／売上（手法により異なる）', 'appointment', 'success_only', true, true, '公式サイトに記載なし（商材・ターゲットに応じて設計）', array['初期費用0円・月額固定費0円（公式サイト記載）', '電話営業と紹介営業を、商材に応じて組み合わせ', '成果地点と手法の無料シミュレーションあり']::text[], 'unpartnered', false, true, true, 'verified', 'https://orgallo.co.jp/sales/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'orgallo-sales' and c.slug = 'sales-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'orgallo-sales' and c.slug = 'referral-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('cybergrip', 'サイバーグリップ（成果報酬型の広告運用）', '株式会社サイバーグリップ', 'サイバーエージェントグループの成果報酬型広告運用。初期費用・固定費なしで、料金は獲得単価（成果単価）のみです。', 'サイバーグリップは、サイバーエージェントグループが2025年11月に設立した、成果報酬型の広告運用に特化した会社です。公式のニュースリリースでは、AIを活用することで料金は成果となる獲得単価のみとなること、初期費用や固定費がないこと、クリエイティブ制作費は無償であることが案内されています。

対象媒体は、Google・Yahoo! JAPAN・Microsoftの検索連動型広告と、Meta広告、TikTok広告です。成果はCV数をはじめとする得られた成果に応じた費用とされています。成果の定義や具体的な単価はケースによって異なるため、本ページでは「要問い合わせ」としています。

成果シミュレーションの申請フォームが用意されています。詳細な条件は公式サイトでご確認ください。', null, 'https://cybergrip.jp/', 'free', 'なし（ニュースリリース記載）', 'free', '固定費なし（ニュースリリース記載）', null, '成果単価は公式サイトに記載がないため、成果シミュレーションまたはお問い合わせでご確認ください。クリエイティブ制作費は無償と案内されています。 公式サイトの現行ページで提供状況を確認できなかったため、最新の条件は公式サイトでご確認ください。', 'CV（獲得）など、得られた成果', 'other', 'success_only', true, false, '公式サイトに記載なし', array['初期費用・固定費なし（ニュースリリース記載）', '料金は成果となる獲得単価のみ', 'クリエイティブ制作費は無償', 'Google・Yahoo!・Microsoftの検索広告、Meta広告、TikTok広告に対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.cyberagent.co.jp/news/detail/id=32656', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'cybergrip' and c.slug = 'listing-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'cybergrip' and c.slug = 'sns-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'cybergrip' and c.slug = 'web-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('majizero', 'マジゼロ（完全成果報酬型のウェブ広告代理）', '株式会社ALLI', '運用手数料0%・広告費を代理店が負担する成果報酬型のウェブ広告代理サービス。', 'マジゼロは、株式会社ALLIが提供する完全成果報酬型のウェブ広告代理サービスです。2022年1月のプレスリリースでは、手数料0円・広告費負担0円でウェブ広告の運用代行が実施できること、広告費を代理店が負担し、設定した成果地点で成果単価を支払うモデルであること、広告クリエイティブも無料で制作することが案内されています。

成果地点と成果単価は商材・予算に応じて設定されます。具体的な単価は記載がないため、本ページでは「要問い合わせ」としています。対象は、コスメ・美容、アプリのインストール、保険代理店のリスト獲得、クリニックの来院など多様な業種と案内されています。

本ページの情報はプレスリリース（2022年1月12日）に基づきます。現在の条件は公式サイトでご確認ください。', null, 'https://alli.tokyo/majizero', 'free', '0円（プレスリリース記載）', 'unknown', null, null, '公式ページではレベニューシェア型(成果地点のみ報酬)と案内。単価・月額・広告費負担は公式で確認できず。', '商材・予算に応じて設定する成果地点（成果確定時のみ）', 'other', 'success_only', false, false, 'コスメ・美容、アプリ、保険代理店、クリニックなど多様な業種（プレスリリース記載）', array['運用手数料0%・広告費は代理店が負担（プレスリリース記載）', '広告クリエイティブを無料で制作', '成果地点と成果単価を商材・予算に応じて設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000002.000092602.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'majizero' and c.slug = 'web-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('lead-seo', 'LEAD SEO（完全成果報酬型のSEO対策）', 'リードクリエーション株式会社', '初期費用0円・完全成果報酬型のSEO対策。成果が発生した翌月に初回成果報酬25万円（税抜）が発生します。', 'LEAD SEOは、リードクリエーション株式会社が提供する、初期費用0円・完全成果報酬型のSEO対策サービスです。企業サイト・ECサイトなど、あらゆる業種・サイトに対応できると案内されています。

料金は、成果発生まで初期費用・固定費が発生せず、成果が発生した翌月に初回成果報酬25万円（税抜）、その後は表示順位に応じた日額が発生すると公式サイトに記載されています。長期契約の縛りはなく、2年目以降は半年単位の契約と案内されています。成果が発生するまでの期間は、短くて1週間〜3ヶ月、長くても半年前後とされています。

何位になれば「成果」とみなされるかなどの詳細な条件は公式サイトに記載がないため、契約前に必ず確認してください。', null, 'https://leadcreation.co.jp/leadseo', 'free', '0円（公式サイト記載）', 'free', '成果発生まで固定費なし（公式サイト記載）', '成果発生の翌月に初回成果報酬25万円（税抜）＋表示順位に応じた日額', '順位別の日額など詳細は公式サイトに記載がないため、お問い合わせください。', 'SEOで成果が発生（成果の定義は公式サイトをご確認ください）', 'other', 'success_only', true, false, '企業サイト・ECサイトなど（業種不問と案内）', array['初期費用0円・成果発生まで固定費なし（公式サイト記載）', '長期契約の縛りなし（2年目以降は半年単位）', '企業サイト・ECサイトなど幅広く対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://leadcreation.co.jp/leadseo', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'lead-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('doda-agent', 'doda人材紹介サービス（完全成果報酬型）', 'パーソルキャリア株式会社', '初期費用0円・完全成果報酬型の人材紹介。紹介手数料は採用決定者の理論年収の35％です。', 'doda人材紹介サービスは、パーソルキャリア株式会社が提供する、中途採用向けの人材紹介サービスです。公式サイトでは「初期費用0円・完全成果報酬型」と案内され、業界・職種ごとの専任担当制で、応募が期待できる求人票の作成から、応募者の一次スクリーニング、各種調整の代行までを担当すると説明されています。

費用は、採用が決定した場合に、採用決定者の理論年収の35％を紹介手数料として支払う形です。早期退職の場合は紹介手数料の一部が返金されると案内されています。問い合わせは無料で、電話またはWebから申し込めます。

返金の条件や、職種・年収帯による料率の違いなどの詳細は、公式サイトでご確認ください。', null, 'https://www.saiyo-doda.jp/lp/js/007/', 'free', '0円（公式サイト記載）', 'free', '固定費なし（「完全成果報酬型」と公式サイト記載）', '採用決定者の理論年収の35％（紹介手数料）', '早期退職時は紹介手数料の一部が返金されると案内されています（条件は公式サイトをご確認ください）。', '採用決定', 'hire', 'success_only', true, true, '中途採用を検討している法人', array['初期費用0円・完全成果報酬型（公式サイト記載）', '採用決定者の理論年収の35％が紹介手数料', '早期退職時は紹介手数料の一部を返金', '業界・職種ごとの専任担当制']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.saiyo-doda.jp/lp/js/007/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'doda-agent' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mizusaki-recruitment', 'ミズサキ 成果報酬型採用代行（中途採用プラン）', 'ミズサキ株式会社', '初期費用0円。採用1人につき50万円の定額成果報酬で、入社後の返金保証もある採用代行です。', 'ミズサキの成果報酬型採用代行（中途採用プラン）は、ミズサキ株式会社が提供する、中小企業向けの採用支援サービスです。公式サイトでは「人材紹介の半額以下で、プロの採用支援を」とうたい、求人媒体の導入から求人原稿の作成、スカウト送信、面接日程の調整、応募者対応までをオールインワンで提供すると説明されています。

料金は初期費用0円、採用1人につき50万円の定額の成果報酬です。入社後の定着期間に応じた返金保証として、入社7日以内は100％、14日以内は80％、30日以内は50％の返金が案内されています。30分間の無料相談も用意されています。

月額費用の有無や、求人媒体の掲載費用などの実費の扱いは公式サイトに記載がないため、本ページでは確認できていません。契約前にご確認ください。', null, 'https://mizusaki-inc.com/lp-total-consulting', 'free', '0円（公式サイト記載）', 'free', 'なし（公式サイト記載）', '採用1人につき50万円（入社後の返金保証あり）', '返金保証：入社7日以内100％／14日以内80％／30日以内50％。別途、未経験向けに応募課金型プラン（1応募30,000円〜）もあり。', '採用した候補者が入社し、その後1か月間勤務が継続された時点で報酬確定', 'hire', 'success_only', true, true, '中小企業', array['初期費用0円、採用1人につき50万円の定額', '入社後の返金保証（7日以内100％・14日以内80％・30日以内50％）', '求人原稿作成・スカウト送信・日程調整までオールインワン', '30分間の無料相談あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://mizusaki-inc.com/lp-total-consulting', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mizusaki-recruitment' and c.slug = 'recruitment-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gyoseishoshi-tree', '行政書士法人Tree 補助金申請代行（完全成果報酬型）', '行政書士法人Tree', '着手金0円。実際に交付された補助金額の8〜15％（税抜）が成功報酬で、不採択時の報酬は無料です。', '行政書士法人Treeは、補助金の申請代行サービスを提供する事務所です。公式サイトでは、小規模事業者持続化補助金、デジタル化・AI導入補助金、ものづくり補助金、中小企業新事業進出補助金などの主要補助金に対応し、経営計画書・事業計画書・収支計画書の作成と、採択を高める要件適合チェック・加点要素の最大化までをサポートすると説明されています。

料金は着手金0円で、成功報酬は実際に交付された補助金額の8〜15％（税抜）、事業者の口座へ入金された後に支払う形です。不採択時の同事務所の報酬は無料とされていますが、実費・外部専門家費用・採択後の辞退などは除くと記載されています。初回相談料は何度でも無料です。

対象は中小企業・小規模事業者（個人事業主を含む）で、商工会・商工会議所経由の申請にも対応と案内されています。', null, 'https://office-tree.jp/', 'free', '着手金0円（公式サイト記載）', 'free', '固定費なし（「完全成果報酬型」と公式サイト記載）', '実際に交付された補助金額の8〜15％（税抜）', '不採択時の報酬は無料。ただし実費・外部専門家費用・採択後辞退等を除くと記載されています。 注意：専門家加点費用等の実費が別途かかる場合あり（事前案内）。採択後の実績報告サポートは別途見積の可能性。', '補助金の採択・交付', 'other', 'success_only', true, true, '中小企業・小規模事業者（個人事業主を含む）', array['着手金0円、成功報酬は交付額の8〜15％（税抜）', '不採択時の報酬は無料（実費等を除く）', '初回相談は何度でも無料', '主要な補助金に幅広く対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://office-tree.jp/blog/subsidy/subsidy-application-success-fee-only/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gyoseishoshi-tree' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('ichidokiri-subsidy', 'イチドキリ 補助金申請支援（IT・AI分野）', '株式会社イチドキリ', 'IT・AI分野に特化した補助金申請支援。着手金0円で、成功報酬は補助額の15％です。', 'イチドキリは、株式会社イチドキリが提供する、IT・AI分野の補助金申請支援サービスです。公式サイトでは、IT・AIへの投資を通じて事業を成長させたい企業を対象とし、システム受託開発企業やAI関連企業の支援事例が多いことが案内されています。経済産業省認定の経営革新等支援機関であることも記載されています。

料金は着手金0円で、成功報酬は補助額の15％と記載されています。着手金・相談は0円とされ、サイトの見出しでは「完全成功報酬」と案内されています。月額費用や、採択されなかった場合の扱い・実費の取り扱いは公式サイトに明記がないため、契約前にご確認ください。', null, 'https://ichidokiri.co.jp/', 'unknown', null, 'unknown', null, '補助額の15％', '公式トップでは補助額の15%の成功報酬と初期相談無料のみ確認。着手金0円・不採択時・実費の扱いは未記載。', '補助金の採択', 'other', 'success_only', false, true, 'IT・AIへの投資で事業成長を目指す企業', array['着手金0円・相談0円（公式サイト記載）', '成功報酬は補助額の15％', 'IT・AI分野の補助金に特化', '経済産業省認定の経営革新等支援機関（公式サイト記載）']::text[], 'unpartnered', false, true, true, 'verified', 'https://ichidokiri.co.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ichidokiri-subsidy' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('apokuru', 'アポクル（成果報酬テレアポ代行）', '株式会社セールスクルー', 'ネットで発注できる、獲得課金型のテレアポ代行。初期費用・月額費用0円で、キャンセルアポは返金対象です。', 'アポクルは、株式会社セールスクルーが提供する、ネットで簡単に発注でき、最短翌日から獲得課金型でアポイントが得られるテレアポ発注プラットフォームです。

料金は、初期費用0円・月額固定費0円で、アポイントが取れたときだけ獲得課金（成果報酬）が発生します。キャンセルになったアポイントは返金対象と案内されています。1件あたりの単価は、公式サイトでは確認できなかったため「要問い合わせ」としています。

本ページの一部の情報は、2021年9月のプレスリリースに基づきます。最新の条件は公式サイトでご確認ください。', null, 'https://salescrew.jp/apokuru', 'free', '0円（公式サイト記載）', 'free', '0円（公式サイト記載）', null, 'アポ単価・キャンセル返金条件は公式LPに記載なし。キャンセルアポ返金はプレスリリース由来。', 'アポイントの獲得（キャンセルアポは返金対象）', 'appointment', 'success_only', true, false, null, array['初期費用0円・月額費用0円（公式サイト記載）', 'アポが取れた時だけ獲得課金', 'ネットで発注でき、最短翌日から稼働（プレスリリース記載）', 'キャンセルアポは返金対象']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.value-press.com/pressrelease/279636', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apokuru' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tanomate', 'タノメイト（完全成果報酬型テレアポ代行）', 'Brainew Co. Ltd.', '初期・固定費ゼロのBtoBテレアポ代行。成果報酬は1件10,000円〜100,000円で、アポが取れなければ0円です。', 'タノメイトは、Brainew Co. Ltd.が提供する、初期費用・固定費ゼロで確度の高いBtoBアポイントを獲得する成果報酬型のテレアポ代行サービスです。公式サイトでは、アポが取れなければ費用は0円であること、最短5日で稼働できること、月間10〜150件の柔軟な件数に対応できることが案内されています。

成果報酬は1件あたり10,000円〜100,000円と記載されています。リード獲得の時点で課金が発生し、その後に商談につながらなかった場合はキャンセル対応になると案内されています。1,000コールのお試しも可能と記載されています。

単価の幅が大きいため、自社の商材・ターゲットでの見積もりを公式サイトで確認してください。', null, 'https://tanomate.net/', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', '1件あたり10,000円〜100,000円', 'リード獲得時点で課金が発生し、商談につながらなかった場合はキャンセル対応と案内されています。', 'リードの獲得（アポイント）', 'appointment', 'success_only', true, false, 'BtoB営業を行う企業', array['初期費用0円・固定費0円（公式サイト記載）', '成果報酬は1件10,000円〜100,000円', '最短5日で稼働、月間10〜150件に対応', '1,000コールのお試しが可能']::text[], 'unpartnered', false, true, true, 'verified', 'https://tanomate.net/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tanomate' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('wildcard-ads', 'ワイルドカード（完全成果報酬型広告）', 'Nextrust Co.Ltd.', 'リスティング・SNS広告などを成果報酬で運用。完全成果報酬型は月額0円〜、広告費は成果数に応じた後払いです。', 'ワイルドカードは、Nextrust Co.Ltd.が提供する、成果にこだわる完全成果報酬型の広告運用サービスです。リスティング広告、Facebook広告、Instagram広告、ディスプレイ広告、アドネットワーク、X（Twitter）広告、インフルエンサー広告、TikTok広告、YouTube広告など、多様な媒体に対応すると案内されています。

公式サイトでは、完全成果報酬型の場合は月額0円〜であること、広告費は成果数に応じた後払いで、成果が出なければ費用は0円であることが記載されています。成果の内容は業種により異なり、トライアル購入、定期初回購入、面談完了などが例として挙げられています。

成果の単価や料率、初期費用の有無は公式サイトに記載がないため、「要問い合わせ」としています。', null, 'https://wild-card.tokyo/', 'unknown', null, 'free', '月額0円〜（完全成果報酬型の場合・公式サイト記載）', null, '成果の単価・初期費用は公式サイトに記載がないため、お問い合わせください。広告費は後払い（成果数に応じる）と案内されています。 注意：初期費用・最低出稿額・契約期間の記載なし。動画/LP制作は別途費用の可能性。成果報酬以外の契約では費用発生。', '業種により異なる（例：トライアル購入、定期初回購入、面談完了）', 'other', 'optional_plan', false, false, null, array['完全成果報酬型は月額0円〜（公式サイト記載）', '広告費は成果数に応じた後払い', 'リスティング・SNS・動画など多様な媒体に対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://wild-card.tokyo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'wildcard-ads' and c.slug = 'web-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'wildcard-ads' and c.slug = 'listing-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'wildcard-ads' and c.slug = 'sns-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('trivee-tiktok', 'TriVee（トリビー）TikTok運用代行', 'Givee株式会社', '再生ゼロなら費用ゼロの成果報酬型TikTok運用代行。1再生4円、月額上限は40万円です。', 'TriVee（トリビー）は、Givee株式会社が提供する、成果報酬型のTikTok運用代行サービスです。公式サイトでは「再生ゼロなら費用ゼロ」とうたい、企画から投稿、分析・改善までを一括で対応すると案内されています。

料金は初期費用0円・月額固定費0円で、成果報酬は1再生につき4円、月10本の投稿で月額上限40万円と記載されています。再生数に応じた課金のため、成果の指標は「再生数」です。問い合わせや売上などの成果ではなく、再生数に対する支払いである点を理解して選びましょう。

最低契約期間は公式サイトに記載がありません。無料相談が用意されています。', null, 'https://givee.co.jp/lp/tiktok', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', '1再生につき4円（月10本投稿／月額上限40万円）', '成果指標は再生数。合計1万再生未満は請求0円、月額上限40万円。最低契約期間は記載なし。', '動画の再生数', 'click', 'success_only', true, true, 'TikTokで集客・認知拡大を行いたい企業', array['初期費用0円・月額費用0円（公式サイト記載）', '再生ゼロなら費用ゼロ', '1再生4円・月額上限40万円', '企画から投稿・分析改善まで一括対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://givee.co.jp/lp/tiktok', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'trivee-tiktok' and c.slug = 'tiktok-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('bell-sns', 'BELL SNS運用代行（完全成果報酬）', '株式会社BELL', '現役インフルエンサーが運用する、再生数課金のSNS運用代行。固定費0円で、月額の上限は30万〜50万円です。', 'BELL SNS運用代行は、株式会社BELLが提供する、現役インフルエンサーが運用する完全成果報酬型のSNS運用代行サービスです。TikTok・Instagram・YouTubeの3媒体に対応し、プランによっては2媒体にも対応すると案内されています。

料金は固定費0円の再生数課金で、月額の上限はプランにより50万円・40万円・36万円・30万円の4パターンです。1再生あたりの金額は公式サイトに記載がないため、「要問い合わせ」としています。契約は3か月のお試し契約から用意され、30分の無料相談が案内されています。

初期費用の有無は公式サイトに記載がありません。成果の指標は再生数である点に注意してください。', null, 'https://bell-co.jp/sns/', 'free', '0円（公式サイト記載）', 'free', '固定費0円（公式サイト記載）', null, '再生数課金。月額上限は Premium6 50万/Standard6 40万/Premium4 36万/Standard4 30万円。対応媒体はTikTok・Instagram・YouTube Shorts。3か月お試し契約から。 注意：固定費は確認できないが最低3か月契約の縛りあり。1再生単価は公式に明記なし。', '動画の再生数（月額上限あり）', 'click', 'success_only', true, true, 'TikTok・Instagram・YouTubeでの集客を行いたい企業', array['固定費0円の再生数課金（公式サイト記載）', '現役インフルエンサーが運用', 'TikTok・Instagram・YouTubeに対応', '30分の無料相談あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://bell-co.jp/sns/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bell-sns' and c.slug = 'tiktok-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'bell-sns' and c.slug = 'instagram-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'bell-sns' and c.slug = 'youtube-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gaen-seo', 'Gaen SEO対策（成果報酬型）', 'Gaen Inc.', '初期費用無料の完全成果報酬型SEO。10位以内／20位以内保証から選び、表示された日数に応じて日割りで課金されます。', 'Gaenの成果報酬型SEO対策は、毎月の成果に応じて料金が発生する、初期費用無料の完全成果報酬型サービスです。公式サイトでは、希望のキーワードでの上位表示を目指し、外部リンク調整を中心とした施策を行うと案内されています。

成果は「10位以内保証」と「20位以内保証」の2パターンから選びます。成果報酬は日割り計算で、キーワードによって異なります。例として、10位以内保証でYahoo!が月額15万円、Googleが月額10万円の場合に、実際に表示された日数に応じて日割りになると記載されています。20位以内保証は10位以内より成果報酬が低くなると案内されています。

対象はYahoo! JAPANとGoogleです。契約期間・無料相談の有無は公式サイトに記載がありません。', null, 'https://gaen.jp/service/seo-result/', 'free', '0円（公式サイト記載）', 'free', '固定費なし（日割りの成果報酬のみ・公式サイト記載）', '日割りの成果報酬（キーワードにより異なる。例：10位以内保証でGoogle月額10万円相当）', '例示はあくまで一例です。料金はキーワードごとに異なります。 注意：最低利用期間・最低料金の記載は無く、確認できず。', '検索結果で10位以内または20位以内に表示された日（保証順位を選択）', 'other', 'success_only', true, false, 'Yahoo! JAPAN・Googleでの上位表示を目指す企業', array['初期費用0円の完全成果報酬型（公式サイト記載）', '10位以内／20位以内保証から選べる', '表示された日数に応じた日割り課金', 'Yahoo! JAPAN・Googleに対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://gaen.jp/service/seo-result/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gaen-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('hatarakuzo', 'はたらくぞドットコム（採用課金型の求人サイト）', '株式会社はたらくぞ.com', '福岡の採用に強い成果報酬型の求人サイト。初期費用0円で、採用したときだけ費用が発生します。', 'はたらくぞドットコムは、福岡の企業向けの成果報酬型求人サイトです。公式サイトでは、採用したときだけ費用が発生する採用課金モデルであり、初期費用は0円と案内されています。

成果報酬は、正社員・契約社員が10万円、アルバイト・パートが5万円で、研修を含め1日でも出社すると費用が発生します。業務委託・完全歩合制は応募課金で5,000円、人材派遣・紹介業免許を持つ企業は7,000円と記載されています。早期退職に備えた半額保証期間があり、正社員・契約社員は初出社から29日間、アルバイト・パートは6日間以内に報告すると費用が半額になります。

対象地域は福岡で、掲載料・月額費用の記載は確認できませんでした。', null, 'https://www.hatarakuzo.com/pages/lp', 'free', '0円（公式サイト記載）', 'free', '採用したときだけ費用が発生（公式サイト記載）', '正社員・契約社員10万円／アルバイト・パート5万円（採用時）', '業務委託・完全歩合は応募課金5,000円、派遣・紹介免許保有企業は応募課金7,000円。半額保証あり。', '採用（研修を含め1日でも出社した時点）', 'hire', 'success_only', true, false, '福岡で採用を行う企業', array['初期費用0円、採用したときだけ費用が発生（公式サイト記載）', '正社員10万円・アルバイト5万円', '半額保証期間あり', '福岡エリア向け']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.hatarakuzo.com/pages/lp', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hatarakuzo' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('chusho-support-partners', '中小企業支援パートナーズ（補助金申請支援）', '一般社団法人 中小企業支援パートナーズ', '着手金なし。成功報酬は採択発表時に補助金申請額の10％で、税理士・診断士・社労士など専門家が支援します。', '中小企業支援パートナーズは、税理士、中小企業診断士、社会保険労務士、経営者、弁護士、行政書士など11名で編成する専門家グループです。補助金・助成金の獲得支援をはじめ、税務、法律相談、経営コンサルティングまでワンストップで中小企業を支援すると案内されています。

料金は着手金なしで、成功報酬は採択発表時に補助金申請額の10％と記載されています。申請額が高額になる場合は、報酬割合は10％より低くなるとされています。採択から補助金入金までの支援を希望する場合は、補助金入金額の5％または50万円のうち低い金額が別途かかります。無料相談フォームが用意されています。

月額費用や、不採択時の扱いは確認できた範囲に記載がありません。', null, 'https://hojokinpro.com/', 'free', '着手金なし（公式サイト記載）', 'unknown', null, '採択発表時に補助金申請額の10％（高額の場合は料率が下がる）', '採択から補助金入金までの支援を希望する場合は、補助金入金額の5％または50万円のうち低い金額が別途かかります。', '補助金の採択', 'other', 'hybrid', false, true, '中小企業', array['着手金なし（公式サイト記載）', '成功報酬は採択発表時に申請額の10％', '税理士・診断士・社労士・弁護士・行政書士など11名で支援', '無料相談フォームあり']::text[], 'unpartnered', false, true, false, 'verified', 'https://hojokinpro.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'chusho-support-partners' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gyoseishoshi-acala', '行政書士事務所acala 補助金申請サポート', '行政書士事務所acala', '着手金0円。採択成功報酬は15％で、採択されなかった場合の費用は一切かかりません。', '行政書士事務所acalaは、補助金の採択に向けた計画づくりから実績報告までをサポートする行政書士事務所です。公式サイトでは、電話・メール・LINE・問い合わせフォームのいずれからも相談でき、初回相談は無料と案内されています。

料金は着手金0円で、採択成功報酬は15％（山梨県中小企業等生産性向上設備整備等支援補助金は10％）と記載されています。採択されなかった場合は、費用は一切かからないと案内されています。対象は中小企業・小規模事業者・個人事業主などで、補助金ごとに要件が異なります。

月額費用の有無や、実費の扱いは確認できた範囲に記載がありません。契約前に確認してください。', null, 'https://acala-office.com/', 'free', '着手金0円（公式サイト記載）', 'free', '月額料金なし（公式サイト記載）', '採択成功報酬15％（山梨県中小企業等生産性向上設備整備等支援補助金は10％）', '採択されなかった場合は費用は一切かからないと案内されています。 注意：実費・最低報酬の記載なし（確認できず）。', '補助金の採択', 'other', 'success_only', true, true, '中小企業・小規模事業者・個人事業主（補助金ごとに要件が異なる）', array['着手金0円（公式サイト記載）', '採択成功報酬は15％', '不採択の場合は費用なし（公式サイト記載）', '初回相談無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://acala-office.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gyoseishoshi-acala' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('rita-cloud-joseikin', 'リタクラウド 助成金申請代行', 'リタクラウド社会保険労務士法人', '着手金0円の助成金申請サポート。申請サポート料は10％（顧問契約なしの場合は15％）です。', 'リタクラウド社会保険労務士法人は、補助金・助成金の申請サポートを行う社会保険労務士法人です。公式サイトでは、キャリアアップ助成金（正社員化コース等）、業務改善助成金、働き方改革推進支援助成金、テレワーク促進助成金、両立支援等助成金、65歳超雇用推進助成金などに対応し、受給率は97.9％と記載されています。

料金は着手金0円で、申請サポート料は10％（顧問契約ありの場合）、顧問契約がない場合は15％と記載されています。「無料相談」の明確な表記は確認できませんでしたが、問い合わせ窓口が用意されています。

月額費用や、不受給の場合の扱いは確認できた範囲に記載がないため、契約前にご確認ください。', null, 'https://rita-cloud.co.jp/lp-joseikin', 'free', '着手金0円（公式サイト記載）', 'unknown', null, '申請サポート料10％（顧問契約なしの場合は15％）', '料率は受給した助成金に対する割合（10％、顧問契約なしは15％）。顧問契約の費用は公式LPで確認できません。 注意：10％料率の条件である顧問契約の月額費用の有無は未確認。不支給時の費用の明記なし。', '助成金の申請・受給', 'other', 'success_only', false, false, '助成金の活用を検討する企業（社会保険労務士が対応する雇用関連助成金）', array['着手金0円（公式サイト記載）', '申請サポート料は10％（顧問契約なしは15％）', '雇用関連の助成金に幅広く対応', '受給率97.9％（公式サイト記載）']::text[], 'unpartnered', false, true, true, 'verified', 'https://rita-cloud.co.jp/lp-joseikin', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'rita-cloud-joseikin' and c.slug = 'grant' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('ec-solutions-consulting', '完全成果報酬型コンサルティング（Yahoo!ショッピング出店者向け）', 'ECソリューションズ株式会社', 'Yahoo!ショッピング出店者向けの完全成果報酬型コンサルティング。報酬は売上の10％です。', 'ECソリューションズ株式会社の完全成果報酬型コンサルティングサービスは、Yahoo!ショッピング出店者向けに、売上拡大や店舗運営の課題解決を支援するサービスです。Yahoo!コマースパートナーのサービス紹介ページでは、コマースパートナー初の完全成果報酬型コンサルティングと案内されています。

報酬は売上の10％で、成果報酬方式で支払います。対象は、商品数30以上の出店者、サイト運営地が東京近郊（東京・神奈川・千葉・埼玉）、粗利20％程度を確保できる出店者などと記載され、ブランド品・貴金属・サービス商品は受託できません。

初期費用・月額費用の記載は確認できなかったため、お問い合わせが必要です。', null, 'https://business-ec.yahoo.co.jp/commerce_partner/biz-apps/273/', 'unknown', null, 'free', '最低料金0円（売上がなければ費用なし・公式記載）', '売上の10％', '受託条件あり（商品数30以上、東京・神奈川・千葉・埼玉、粗利20％程度）。販促費は別途必要。 注意：販促費とコンサル費用で売上の約20％の見込みと記載。販促費の負担者は出店者側と読み取れる。', '売上（売上に対する10％）', 'sale', 'success_only', false, false, 'Yahoo!ショッピング出店者（商品数30以上・東京近郊などの条件あり）', array['報酬は売上の10％の成果報酬', 'Yahoo!ショッピング出店者向け', '売上拡大・店舗運営の課題解決を支援']::text[], 'unpartnered', false, true, true, 'verified', 'https://business-ec.yahoo.co.jp/commerce_partner/biz-apps/273/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ec-solutions-consulting' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('imake-success-fee', 'iMake 成功報酬Webマーケティング支援', '有限会社IMAKE', '初期費用・固定費なしのWebマーケティング支援。申込完了数・注文件数など、計測できるコンバージョンに応じて費用が発生します。', 'iMake（アイメイク）の成功報酬Webマーケティング支援は、有限会社IMAKEが提供する、成果が出たときに報酬が発生する料金体系のサービスです。公式サイトでは、サイト上での受注や成約など、成果ベースで費用が決まり、初期費用や固定費は必要ないと明記されています。

成果の指標は、申込完了数、商品注文件数、電話発信件数など、Webサイト上でコンバージョンとして定量的に計測できるものとされています。成果ベースでフィーを設定するため、通常のフィーよりも割高になる場合があると記載されています。具体的な料率・金額は公式サイトに記載がありません。

相談は「お気軽にご相談ください」と案内されています。', null, 'https://www.imake.jp/', 'free', '不要（公式サイト記載）', 'free', '固定費は不要（公式サイト記載）', null, '広告費（媒体費）は顧客負担、LP・バナー制作費はiMake負担。料率は個別契約。', 'Webサイト上で計測できるコンバージョン（申込完了数・商品注文件数・電話発信件数など）', 'lead', 'success_only', true, true, null, array['初期費用・固定費は不要（公式サイト記載）', '申込完了・注文・電話発信など計測できる成果に応じて課金', '成果ベースのため通常フィーより割高になる場合あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.imake.jp/success-reward/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'imake-success-fee' and c.slug = 'marketing-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('dt-media-success', 'デザイントランスメディア 成果報酬型Web制作・運用', '株式会社デザイントランスメディア', '企画・制作・運用の費用を売上に対する成果報酬として受け取るWeb制作。制作費を抑える、または初期費用なしの提案も可能です。', 'デザイントランスメディアの成果報酬契約は、Webサイトの運用に関する企画から制作、メディアプラン、マーケティング、SNS運用までを行い、費用を売上に対する成果報酬として受け取る契約形態です。公式サイトでは、例として、200万円の初期制作費用を半額の100万円で制作したり、初期費用をいただかずに制作したりすることも可能と記載されています。

成果報酬は「売上×○％」を月次で請求する形で、料率は契約時に決まります。成果は「Webサイト上から上げられた売上」で、細かなルールは契約時に定めるとされています。新規ビジネスの立ち上げや事業の第二成長期に向いていると案内されています。

具体的な料金は公式サイトに記載がないため、お問い合わせが必要です。', null, 'https://www.dt-media.jp/', 'unknown', null, 'unknown', null, '売上×○％（料率は契約時に決定。月次請求）', '初期制作費を半額にする、または初期費用なしで制作する例が公式サイトに記載されています。条件は個別に決まります。 注意：初期制作費を半額にする例が中心で、完全無料は一例。条件は個別決定のため固定費が残る可能性あり。', 'Webサイト上から上げられた売上', 'sale', 'optional_plan', false, false, '新規ビジネスの立ち上げ・事業の第二成長期にある企業', array['制作・運用費用を売上に対する成果報酬で支払う契約', '制作費を半額にする／初期費用なしの提案も可能（公式サイト記載の例）', '企画・制作・メディアプラン・SNS運用まで対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.dt-media.jp/column/%E3%80%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E3%81%94%E6%A1%88%E5%86%85%E3%80%91%E6%88%90%E6%9E%9C%E5%A0%B1%E9%85%AC%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'dt-media-success' and c.slug = 'site-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('valueagent-web', 'バリューエージェント 成功報酬型ホームページ制作＆運用', '株式会社バリューエージェント', '制作費・運用費を半額負担する代わりに売上の5〜20％を成功報酬とする制作・運用。ただし初期費用・月額費用は別途必要です。', 'バリューエージェントの成功報酬型ホームページ制作＆運用は、ホームページの制作費用・運用費を同社が半額負担する代わりに、売上の5％〜20％を成功報酬として受け取るサービスです。

公式サイトでは、初期費用は100万円〜（税抜）、月額は20万円〜（税抜）、最低契約期間は12か月〜と記載されています。固定費ゼロの「完全成果報酬」ではなく、固定費を半額に抑えて成果報酬を組み合わせる形です。

対象は「本気でビジネスを広めたい方」で、新規サービス、地域サービス、広告費を負担できない場合、売上増加時に対応できない組織体制の場合などは対象外と記載されています。無料相談の有無は確認できませんでした。', null, 'https://valueagent.co.jp/webmlp/success', 'paid', '100万円〜（税抜・公式サイト記載）', 'paid', '20万円〜（税抜・公式サイト記載）', '売上の5％〜20％', '最低契約12か月〜。制作・運用費の半額を同社が負担。広告費は依頼企業負担。新規・地域限定サービス等は対象外。', '売上（売上に対する5〜20％）', 'sale', 'hybrid', false, false, '本気でビジネスを広めたい企業（対象外の条件あり）', array['制作費・運用費を同社が半額負担し、売上の5〜20％を成功報酬とする', '初期費用100万円〜・月額20万円〜（固定費あり）', '最低契約期間12か月〜']::text[], 'unpartnered', false, true, false, 'verified', 'https://valueagent.co.jp/webmlp/success', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'valueagent-web' and c.slug = 'site-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kanzenseika-closer', '完全成果クローザー（訪問営業代行）', '株式会社完全成果報酬', '成果報酬型の訪問営業代行。訪問1件15,000円〜。予算規模で固定費が変わり、テストマーケティングは固定報酬です。', '完全成果クローザーは、株式会社完全成果報酬が提供する、訪問営業を成果報酬で代行するサービスです。公式サイトでは、プロの営業代行が見込み客を訪問し、ヒアリングにとどまらず、積極的に受注までつなげる提案を行うと案内されています。

料金は、訪問1件につき15,000円〜の成果報酬で、すべてのサービスに別途10％のプロジェクト管理費が必要と記載されています。初期費用と月額費用は、予算が30万円以上の場合は無料、30万円未満の場合は初期費用100,000円・月100,000円の運用費用がかかります。

利用条件として、法人設立後3年以上、外部パートナーを利用した営業実績が1年以上、即決型の商品であること、テストマーケティング（固定報酬）を実施できることが記載されています。固定報酬のテスト期間がある点にも注意してください。', null, 'https://www.kanzenseika.jp/service/closer.html', 'paid', '月発注30万円以上は無料／30万円未満は100,000円', 'paid', '2か月目以降の発注50万円未満は運用費100,000円（50万円以上は無料）', '訪問1件につき15,000円〜（別途プロジェクト管理費10％）', '発注金額分をデポジットとして前払い。テストマーケティング（固定報酬）が条件。', '訪問（商談）の実施', 'meeting', 'hybrid', false, false, '法人設立後3年以上、外部パートナー利用の営業実績1年以上、即決型の商品を扱う企業', array['訪問1件につき15,000円〜の成果報酬', '予算30万円以上なら初期費用・月額費用が無料（公式サイト記載）', '別途10％のプロジェクト管理費が必要', '受注まで見据えた提案を実施']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.kanzenseika.jp/service/closer.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kanzenseika-closer' and c.slug = 'field-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('web-company-lpo', '成果報酬型 LP制作×リスティング広告運用', '株式会社桑原敬事務所', 'LPの導入費は15万円〜。LP制作費や広告運用費を、コンバージョン数や売上に対する成果報酬で契約することも可能です。', '成果報酬型のLP制作×リスティング広告運用は、株式会社桑原敬事務所が提供する、ランディングページのコンバージョン率を改善し、リスティング広告からの見込み顧客を増やすサービスです。

公式サイトでは、LPの導入費は通常30万円〜のところ15万円〜と案内されています（漫画LPの場合は漫画の制作費10万円〜が実費でかかります）。広告費の実費は依頼者の負担ですが、LP制作費や広告運用費は、コンバージョン数や売上金額に対する成果報酬での契約も可能と記載されています。

対象は、BtoB向けの商品・サービスや、個人向けでも比較的高額な商品など、単価や粗利が高めの商品です。具体的な成果報酬の料率は記載がないため、「要問い合わせ」としています。', null, 'https://www.web-company.jp/solution/lpo/', 'paid', 'LP導入費15万円〜（公式サイト記載。漫画LPは別途10万円〜）', 'unknown', 'リスティング広告運用費0円（広告費は実費・月10万円〜目安）', null, '最低契約6か月〜。成果報酬の料率非公開。BtoB・高額・独自性ある商材が対象、コーポレートサイト等は対象外。', 'コンバージョン数・売上金額（成果報酬契約の場合）', 'lead', 'hybrid', false, true, 'BtoB向け、または個人向けでも単価・粗利が比較的高い商品・サービス', array['LP導入費は15万円〜（通常30万円〜と案内）', 'LP制作費・広告運用費を成果報酬で契約することも可能', 'リスティング広告運用とあわせてCV率を改善']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.web-company.jp/solution/lpo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'web-company-lpo' and c.slug = 'lp-production' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'web-company-lpo' and c.slug = 'listing-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kyworks', 'KYWorks 開発費0円のレベニューシェア型共同開発', 'KYWorks', 'アプリ・Webサービスの開発費0円。サーバー等の実費のみで、収益は50:50で分配する共同開発です。', 'KYWorksの開発費0円の共同開発は、アイデアを持つ個人・小規模事業者と、技術を持つKYWorksが対等な立場でリスクと成果を分け合う、レベニューシェア型の共同開発サービスです。iOS・Androidアプリ、Webサービス、LINEアプリなど幅広く対応すると案内されています。

開発費（設計・プログラミング・テスト）は0円で、サービスから発生した広告収入・課金収入などの収益を50:50で分配します。ドメイン・サーバーなどのインフラ実費として、月700円〜3,000円程度（AI機能を使う場合は追加で月3,000円〜）がかかると記載されています。相談は無料です。

収益が出た場合の分配は長期にわたる可能性があるため、契約条件（期間・分配の範囲）を事前に確認してください。', null, 'https://partner.kyworks.jp/', 'free', '開発費0円（設計・プログラミング・テスト。公式サイト記載）', 'paid', 'インフラ実費として月700〜2,000円程度（iPhoneアプリは月1,800〜3,000円程度、AI機能利用時は月3,000円〜追加）', 'サービスから発生した収益を50:50で分配', '開発費0円・収益50:50分配だが、成果の有無に関わらずインフラ実費が発生するため固定費ゼロではない。', 'サービスから発生した収益（広告収入・課金収入など）', 'sale', 'hybrid', false, true, 'アイデアを持つ個人・小規模事業者', array['開発費0円（設計・プログラミング・テスト）', '収益は50:50で分配', 'iOS・Androidアプリ、Webサービス、LINEアプリに対応', '相談無料']::text[], 'unpartnered', false, true, false, 'verified', 'https://partner.kyworks.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kyworks' and c.slug = 'app-development' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'kyworks' and c.slug = 'system-development' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('unicorn-fixed-cpa-listing', '成果報酬型リスティング広告運用代行（CPA固定型）', '株式会社UNICORN', '成果（CV）数×固定CPAで費用が決まる成果報酬型のリスティング広告運用代行。Google・Yahoo!・Bingなど主要媒体に対応します。', 'UNICORNの成果報酬型リスティング広告運用代行は、コンバージョンに応じて費用が発生するCPA固定型のサービスです。公式サイトの解説記事では、費用は「成果数（CV）×固定CPA」で計算され、成果が出なければ費用も発生しない構造と説明されています。Google、Yahoo!、Bingなど主要媒体に対応しています。

同記事には、アカウント診断から目標CPA設計までのサポートが案内されており、リスティング広告について無料で相談できるリンクがあります。事前にCVの定義を明確にして運用する形です。

具体的な固定CPAの金額、初期費用、月額費用、広告費の負担者は公式サイトに記載がないため要問い合わせです。', null, 'https://unicorn.inc/', 'free', '0円（公式サイト記載）', 'free', '0円（公式サイト記載）', '成果数（CV）×固定CPA（金額は公式サイトに記載なし）', '固定CPAの金額は非公開。公式解説記事では広告配信費は運用パートナー(UNICORN)負担の構造と説明。3ヶ月以上の契約を推奨(応相談)。 注意：3ヶ月以上の契約期間を推奨(応相談)、日予算10万円以上を推奨。ただし最低出稿金額・最低料金の定めなし。', '合意したCV（コンバージョン）が発生した場合', 'other', 'success_only', true, true, null, array['成果数×固定CPAの課金モデル', '成果が出なければ費用も発生しない構造と記載', 'Google・Yahoo!・Bingなど主要媒体に対応', 'アカウント診断から目標CPA設計までサポート']::text[], 'unpartnered', false, true, true, 'verified', 'https://unicorn.inc/news/platform/5472/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'unicorn-fixed-cpa-listing' and c.slug = 'listing-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'unicorn-fixed-cpa-listing' and c.slug = 'web-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('lxgic-tiktok-shop', 'TikTok Shop運用代行（完全成果報酬プラン）', '株式会社Lxgic', 'TikTok Shopの運用代行で、完全成果報酬プランは固定運用費0円/月、成果報酬は売上の20%から。広告フォーマットの運用設計にも対応します。', '株式会社Lxgicが2025年7月に発表したTikTok Shop運用代行サービスです。プレスリリースによると、完全成果報酬プランは固定運用費0円/月で、成果報酬は売上の20%からとされています。ほかに、アカウント構築プラン（28万円/回〜、税抜）やフルサポートプラン（26万円/月〜、税抜）も用意されています。

広告運用では、戦略に応じてDynamic Showcase Ads、Product GMV Max、LIVE GMV Max、Spark Adsなどのフォーマットでの運用設計に対応すると記載されています。初期費用の有無、広告費の負担者、無料相談の有無はプレスリリースに記載がないため要問い合わせです。

サービスの中心はTikTok Shop運用であり、広告運用単体の依頼可否は要確認です。', null, 'https://expaus.jp/tiktok-shop/', 'unknown', null, 'free', '0円（完全成果報酬プランの固定運用費）', '売上の20%〜（完全成果報酬プラン）', '公式サイト(expaus.jp)は確認できず、2025年7月プレスリリースに基づく。標準のフルサポートプランは月額26万円(税別)で、完全成果報酬は選択プラン。売上の20%〜。初期費用・広告費負担は記載なし。 公式サイトの現行ページで提供状況を確認できなかったため、最新の条件は公式サイトでご確認ください。', 'TikTok Shopでの売上発生時', 'sale', 'optional_plan', false, false, 'TikTok Shopで販売したい企業・ブランド', array['完全成果報酬プランは固定運用費0円/月', '成果報酬は売上の20%から', 'Spark Ads、GMV Maxなど多彩な広告フォーマットの運用設計に対応', 'アカウント構築・フルサポートの有料プランも用意']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000012.000015918.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'lxgic-tiktok-shop' and c.slug = 'sns-ads' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'lxgic-tiktok-shop' and c.slug = 'web-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('layers-cost-down', '完全成功報酬型コストダウン', '株式会社レイヤーズ・コンサルティング', 'コストダウンが実現した時だけプロフィットシェアで報酬が発生する、成果報酬型のコスト削減サービス。', 'レイヤーズ・コンサルティングの「完全成功報酬型コストダウン」は、価格の適正化と量の適正化の両面からコスト削減を進めるサービスです。

公式サイトには、事前に別途コンサル費用などはかからず、コストダウンが実現した際にだけプロフィットシェアで報酬を受け取る旨が記載されています。ベンチマーク、コスト見積、専門家による分析、リバースオークションなどの手法を用い、業界動向や価格の客観データをもとに既存取引先との相対交渉を行うとしています。

売上規模や業種によっては、成果報酬型のサービスを提供できない場合があると明記されています。具体的な料率・金額、月額費用の有無、無料相談の有無は公式サイトに記載がないため要問い合わせです。', null, 'https://www.layers.co.jp/consulting-service/costreduction/', 'free', '事前に別途コンサル費用などはかからない（公式記載）', 'unknown', null, null, '料率は公式ページに記載がなく、問い合わせが必要。売上規模・業種により提供できない場合あり。', 'コストダウンが実現した際にプロフィットシェア', 'other', 'success_only', false, false, '売上規模・業種により対応可否あり', array['価格の適正化と量の適正化の両面から削減', 'ベンチマーク・コスト見積・専門家分析・リバースオークションを活用', '業界動向や客観データに基づく相対交渉', '社内での継続的なPDCAサイクル構築にも貢献']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.layers.co.jp/consulting-service/costreduction/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'layers-cost-down' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('sailon-cost-reduction', 'コスト削減コンサルティング（セイルオン）', '株式会社セイルオン', '初期費用なしの成果報酬型コスト削減コンサル。平均21%削減、1,000社以上の支援実績を掲げる。', 'セイルオンのコスト削減コンサルティングは、成果報酬型で初期費用なしで始められるコスト削減支援です。

公式サイトでは、報酬は削減額を上回らない水準と説明されています。成功の要素として「現状の見える化」「入札条件の明確化」「現場との連携」を挙げ、平均21%のコスト削減、1,000社以上の支援実績、最短3ヶ月での削減を掲げています。

コスト削減についても無料相談を受け付けています。具体的な料率や月額費用の有無は公式サイトに記載がないため要問い合わせです。', null, 'https://sailon-jp.net/costdown/', 'free', '初期費用は一切いただいておりません（公式記載）', 'unknown', null, '年間の削減額を上回らない水準の成果報酬（料率の記載なし）', '料率は公式に非公開（面談で提示）。削減見込みが約10万円未満の案件は受託しない方針。 注意：月額・最低料金の明記なし。削減見込み約10万円未満の案件は受託不可（実質的な下限）。', 'コスト削減の実現', 'other', 'success_only', false, true, null, array['初期費用なしの成果報酬型', '平均21%のコスト削減実績を掲載', '1,000社以上の支援実績', '最短3ヶ月でのコスト削減を掲げる']::text[], 'unpartnered', false, true, true, 'verified', 'https://sailon-jp.net/costdown/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'sailon-cost-reduction' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('bansow-cost-cut', '経費削減サービス（バンソウ）', '株式会社バンソウ', '全業種対応の成果報酬制の経費削減サービス。報酬は初年度削減額の10ヶ月分、または削減額の30%（3年契約）。', 'バンソウの経費削減サービスは、全業種対応・成果報酬制で1,200社以上の支援実績を掲げる経費削減支援です。

公式サイトには報酬プランとして、プランAが初年度の年間削減額の10ヶ月分、プランBが削減額の30%（3年契約）と記載されています。削減できない場合は費用0円とも説明され、ご相談・お見積りは無料です。

製造業から公務・自治体まで全業種に対応し、売上1億円未満から500億円以上まで企業規模を問わないとしています。初期費用・月額費用の有無は公式サイトの該当ページに明記がないため要問い合わせです。', null, 'https://bansow.co.jp/cost', 'free', '0円（公式サイト記載）', 'free', 'なし（公式サイト記載）', 'プランA：初年度の年間削減額の10ヶ月分／プランB：削減額の30%（3年契約）', '初期費用・月額費用は公式ページに明記がなく要問い合わせ。 注意：プランBは3年契約の縛りあり。固定費は無し。', '経費削減の実現（削減できない場合は費用0円）', 'other', 'success_only', true, true, '全業種・売上1億円未満〜500億円以上', array['報酬は2つのプランから選択', 'ご相談・お見積り無料', '1,200社以上の支援実績', '全業種・幅広い企業規模に対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://bansow.co.jp/cost', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bansow-cost-cut' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('pure-growth-costcut', '成功報酬型コスト削減コンサルティング（ピュアグロース）', 'ピュアグロース株式会社', '住宅関連事業者の購買コストを、購買部出身のプロが交渉代行して削減する成功報酬型サービス。報酬は1年間のみ。', 'ピュアグロースの成功報酬型コスト削減コンサルティングは、1棟あたりのコストダウン金額に一定の料率を乗じ、1年間の完工棟数分を報酬とする仕組みです。

公式サイトでは、成果報酬は1年間のみで、削減できなかった場合は成功報酬はいただかないと記載されています。エリア別の市場価格に基づく指値交渉、購買部出身のプロによるメーカーとの交渉代行、コスト削減診断レポートや業務フロー見直しを提供するとしています。

全国140社・20,000棟以上の支援実績を掲載しています。料率の詳細、初期費用・月額費用、無料相談の有無は公式サイトに記載がないため要問い合わせです。', null, 'https://pure-growth.co.jp/costcut/', 'unknown', null, 'unknown', null, '1棟あたりのコストダウン金額に一定の料率を乗じ、1年間の完工棟数分', '料率は公式ページに記載がなく要問い合わせ。 注意：初期費用・月額の明記はなく固定費なしと断定できない（料率も非公開）。', 'コストダウンの実現（削減できない場合は成功報酬なし）', 'other', 'success_only', false, false, '建設・住宅関連の事業者', array['成果報酬は1年間のみ', 'エリア別市場価格に基づく指値交渉', '購買部出身のプロが交渉を代行', '全国140社・20,000棟以上の支援実績']::text[], 'unpartnered', false, true, true, 'verified', 'https://pure-growth.co.jp/costcut/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'pure-growth-costcut' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mcb-seika-consulting', '完全成果報酬型コンサルティング（MCB）', '株式会社MCB', '売上増・粗利増・人件費や経費の削減など、契約時に決めた基準からの増減に応じて報酬が決まる、医療・介護施設向けコンサル。', 'MCBの完全成果報酬型コンサルティングは、売上増・粗利益増・人件費削減・経費削減などの具体的な成果に応じて報酬を設定するサービスです。

公式サイトでは、成果は契約時に双方で取り決める基準からの増加分・削減分で測定するとしています。医薬品・消耗品の仕入単価調査やレセプト算定漏れ・請求漏れの確認などを含む無料診断（2〜3ヶ月程度）を行う流れで、医療・介護向けのコンサルティングです。実施サポートは別途契約となります。

「無料で始められます」とされ、初回訪問費用も無料ですが、遠方の場合のみ実費がかかる場合があります。成功報酬の料率・金額や月額費用は公式サイトに記載がないため要問い合わせです。', null, 'https://mcb-oita.com/consulting01/', 'free', '相談・診断無料（公式サイト記載）', 'free', '成果報酬以外の費用なし（公式サイト記載）', null, '料率は公式ページに記載がなく要問い合わせ。実施サポートは別途契約。遠方の場合は実費の可能性あり。 注意：実施サポートは別途契約（有料・金額非公開）。遠方は交通実費の可能性。料率は非公開。', '契約時に決定する基準からの売上・粗利の増加分、または人件費・経費の削減分', 'other', 'success_only', true, false, '医療・介護施設', array['売上増・粗利増・コスト削減など成果に連動', '契約時に決めた基準からの増減で成果を測定', '診断は無料（2〜3ヶ月程度）', '初回訪問費用は無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://mcb-oita.com/consulting01/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mcb-seika-consulting' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('akt-success-consulting', '完全成功報酬型コンサルティング（AKTコンサルティング）', 'AKTコンサルティング合同会社', '着手金なしで、コスト削減・売上向上などの成果指標と報酬を事前に合意して進める成功報酬型コンサル。事前相談は無料。', 'AKTコンサルティングの完全成功報酬型コンサルティングは、着手金を受け取らず、成果と報酬の基準を初回面談時に決める方式のサービスです。

公式サイトでは、コスト削減・売上向上・成果物評価など課題に応じた成果指標に対応するとしています。M&Aのみの場合は成約価格の1.3%（最低報酬なし）、専門家サポート手数料は150万円〜と記載されています。事前相談は無料です。

遠距離の場合など、実費精算が発生することがあります。月額費用は公式サイトに記載がないため要問い合わせです。', null, 'https://www.aktconsulting.net/team-3', 'free', '着手金なし', 'unknown', null, '案件により異なる（M&Aのみは成約価格の1.3%、最低報酬なし）', '案件ごとに報酬決定。専門家サポート150万円〜と実費は成果に関わらず発生し得る。', '事前に合意した成果指標（コスト削減・売上向上など）の達成', 'other', 'hybrid', false, true, null, array['着手金なし', '成果の定義と報酬を初回面談時に決定', 'コスト削減・売上向上など複数の成果指標に対応', '事前相談は無料']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.aktconsulting.net/team-3', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'akt-success-consulting' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kigyouka-bank-monozukuri', '新事業ものづくり補助金の申請代行サポート', '起業家バンク', '新事業・ものづくり補助金の申請を代行支援。着手金0円・成功報酬7%などの3プランを用意。', '起業家バンクの「新事業ものづくり補助金の申請代行サポート」は、新事業・ものづくり補助金の申請を支援するサービスです。

公式サイトには3つのプランが掲載されています。「着手金0」プランは着手金0円・成功報酬7%、「業界最安水準」プランは着手金70,000円（税込77,000円）・成功報酬は交付申請予定額の5%、「完全伴走」プランは着手金0円・成功報酬9%です。

LINEでの無料相談を受け付けています。月額費用については公式サイトに記載がないため要問い合わせです。', null, 'https://www.kigyouka-bank.com/plan/jigyo_saikoutiku/', 'paid', 'プランにより0円または70,000円（税込77,000円）', 'unknown', null, 'プランにより7%・5%（交付申請予定額）・9%', '着手金0円のプランと有料のプランがあるため initial_fee_type は paid としています。 注意：プラン02は着手金7万円(税込7.7万円)。プラン01/03は固定費の記載なし。返金条件の記載なし', '補助金に採択された場合', 'other', 'optional_plan', false, true, 'ものづくり補助金の活用を検討する中小企業', array['着手金0円のプランあり（成功報酬7%または9%）', '着手金あり・成功報酬5%のプランも選択可能', '「完全伴走」プランを用意', 'LINEで無料相談を受付']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.kigyouka-bank.com/plan/jigyo_saikoutiku/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kigyouka-bank-monozukuri' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('hanro-kaitaku-madoguchi', '販路開拓の窓口', '株式会社ディアクティブ', '小規模事業者持続化補助金の申請を、着手金0円・交付決定額の15%の成功報酬で支援するサービス。', '「販路開拓の窓口」は株式会社ディアクティブが行政書士しのはら事務所と連携して提供する、小規模事業者持続化補助金の申請支援サービスです。

公式サイトでは、着手金0円、成功報酬は補助金交付決定額の15%で、不採択の場合は申請サポート費用がかからないと記載されています。支払いは採択時50%、事業完了後50%の分割に対応しています。販路開拓の実施費用は個別見積もり（実費）とされています。

申請前のヒアリング・相談段階では費用は発生しません。月額費用については公式サイトに記載がないため要問い合わせです。', null, 'https://dactive.jp/hojyokin', 'free', '0円', 'unknown', null, '補助金交付決定額の15%', '申請サポートは着手金0円・採択時に交付決定額15%。別途、販路開拓の実施費用は個別見積(実費)で採択時・事業終了時に分割請求される。', '補助金に採択された場合のみ発生', 'other', 'hybrid', false, true, '小規模事業者', array['着手金0円', '成功報酬は交付決定額の15%で不採択時は申請サポート費用なし', '行政書士と連携した申請支援', '支払いは採択時50%・事業完了後50%の分割に対応']::text[], 'unpartnered', false, true, false, 'verified', 'https://dactive.jp/hojyokin', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hanro-kaitaku-madoguchi' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('takeuchi-partners-joseikin', '助成金申請サポート', '竹内パートナーズ社労士事務所', '着手金なしの成功報酬型で、助成金申請を全国オンラインで支援する社労士事務所。', '竹内パートナーズ社労士事務所は東京都江戸川区に所在する社会保険労務士事務所で、着手金なしの成功報酬型で助成金申請の代行を行っています。

公式サイトの解説記事によると、初回60分の無料相談を実施し、全国オンラインで対応しています。

成功報酬の具体的な料率や月額費用については該当ページに記載がないため、要問い合わせです。', null, 'https://www.takeuchipartners.com/', 'free', '着手金なし', 'unknown', null, '顧問契約先 受給額の20%、スポット案件 受給額の30%', '助成金申請代行は着手金なし・成功報酬型。顧問契約先20%、スポット30%。社労士顧問料は月2万円〜(別サービス)。', '助成金の受給が確定した場合', 'other', 'hybrid', false, true, '助成金の活用を検討する中小企業', array['着手金なしの成功報酬型', '初回60分の無料相談', '全国オンライン対応']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.takeuchipartners.com/blog/subsidy-no-upfront-fee-sharoushi', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'takeuchi-partners-joseikin' and c.slug = 'grant' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('samurai-jigyo-saikouchiku', '事業再構築補助金サポート', 'さむらい行政書士法人', '事業再構築補助金の申請を着手金10万円・成功報酬10%で支援。募集期間内の再申請は無料。', 'さむらい行政書士法人（株式会社Gunshi／よしの行政書士オフィス）が提供する、事業再構築補助金の申請サポートです。

公式サイトの料金表では、着手金10万円（税別）、成功報酬は採択金額の10%（税別）と記載されています。「募集期間内再申請無料」とされ、不採択の場合の再申請以降は成功報酬のみの対応となります。顧問契約は不要で、実績報告書類作成は15万円です。

相談は無料と明記されています。月額費用の記載はありません。', null, 'https://samurai-law.com/hojokin/price/price02/', 'paid', '10万円（税別）', 'unknown', null, '採択金額の10%（税別）', '事業再構築補助金は後継制度へ移行している可能性があり、最新の対応可否は要問い合わせです。 公式サイトの現行ページで提供状況を確認できなかったため、最新の条件は公式サイトでご確認ください。', '補助金に採択された場合', 'other', 'hybrid', false, true, '補助金の活用を検討する中小企業', array['着手金10万円・成功報酬は採択金額の10%', '募集期間内の再申請は無料', '顧問契約不要', '相談無料']::text[], 'unpartnered', false, true, false, 'verified', 'https://samurai-law.com/hojokin/price/price02/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'samurai-jigyo-saikouchiku' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('horie-consul-it-hojokin', 'デジタル化・AI導入補助金サポート', '堀江コンサルティングオフィス株式会社', 'デジタル化・AI導入補助金の申請を着手金なし・成功報酬150,000円（税別）〜で支援。', '堀江コンサルティングオフィス株式会社は、IT導入補助金（デジタル化・AI導入補助金）の申請サポートを提供しています。

公式サイトでは、着手金なしの完全成功報酬制で、交付申請・実績報告サポートは150,000円（税別）〜、ITツール登録サポートは100,000円（税別）/件〜、不採択・登録できない場合は無料と記載されています。

交付申請・実績報告は2017〜2025年の累計1,990件、採択率は全体平均82.3%と掲載されています。相談は無料です。月額費用の記載はないため要問い合わせです。', null, 'https://support.horieconsul.com/service/ithojokin/', 'free', '着手金なし', 'unknown', null, '交付申請・実績報告サポート 150,000円（税別）〜、ITツール登録サポート 100,000円（税別）/件〜', '成功報酬は定額(採択時)で料率型ではない。効果報告サポートは年15,000円/件〜の別料金。詳細は個別相談。 注意：効果報告サポート15,000円/件/年〜は成果と別に発生(オプション)。成功報酬は定額で、料金は個別相談で変動', '採択された場合（不採択の場合は無料）', 'other', 'success_only', false, true, '補助事業者（中小企業）およびIT導入支援事業者', array['着手金なしの完全成功報酬制', '不採択の場合は無料', '交付申請・実績報告は累計1,990件の実績', '相談無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://support.horieconsul.com/service/ithojokin/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'horie-consul-it-hojokin' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('g1-gyoseishoshi-it-hojokin', 'デジタル化・AI導入補助金サポート（G1）', 'G1行政書士法人', 'IT導入補助金の交付申請を成功報酬15万円（税抜・固定）で支援。初回60分の相談は無料。', 'G1行政書士法人は、IT導入補助金のサポートを提供しています。

公式サイトの記載では、IT導入支援事業者登録・ITツール登録サポートは各2万円（税抜）、交付申請サポートは成功報酬15万円（税抜・一律固定）です。月額費用については公式サイトに記載がないため要問い合わせです。

累計申請数4,977件、累計採択数3,668件（採択率73.7%）を掲載しています。初回相談（60分）は無料で、電話相談は全国対応と記載されています。', null, 'https://g1info.jp/itvendorsupport/', 'paid', '登録サポート各2万円（税抜）', 'unknown', null, '交付申請サポート 15万円（税抜・一律固定）', '登録サポートには各2万円（税抜）の費用がかかります。', '交付申請サポートの成功報酬', 'other', 'hybrid', false, true, 'IT導入支援事業者・ITツール提供事業者', array['交付申請の成功報酬は15万円の固定額', '累計申請数4,977件・採択率73.7%', '初回60分の無料相談', '電話相談は全国対応']::text[], 'unpartnered', false, true, false, 'verified', 'https://g1info.jp/itvendorsupport/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'g1-gyoseishoshi-it-hojokin' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('rivewell-it-vendor-support', 'IT導入支援事業者登録申請サポート', '株式会社リブウェル', 'ITベンダー向けに、IT導入補助金の登録申請を着手金無料・成功報酬30万円（税別）で支援。', '株式会社リブウェルは、IT導入補助金を活用してIT製品を販売したいITベンダー向けに、IT導入支援事業者・ITツールの登録申請サポート（2026）を提供しています。

公式サイトでは、着手金は無料、成功報酬は登録完了時に30万円（税別）、2件目以降のツールは1件ごとに10万円（税別）と記載されています。「採択されなかった場合、一切費用は発生いたしません」とされていますが、自己都合で申請しなかった場合は費用が発生します。

オプションの導入サポートは月額15万円〜（税別）で、15億円以上の補助金・助成金申請をサポートした実績が掲載されています。', null, 'https://www.rivewell.jp/ithojo/sj/', 'free', '無料', 'unknown', null, '30万円（税別）、2件目以降のツールは1件ごとに10万円（税別）', 'オプションの導入サポートは月額15万円〜（税別）です。 注意：顧客の自己都合で申請しなかった場合は料金発生。任意の導入サポートは月額15万円〜(オプション)', 'IT導入支援事業者・ITツールの登録完了時', 'other', 'success_only', false, false, 'IT導入補助金でIT製品を販売するITベンダー', array['着手金無料の成功報酬型', '不採択の場合は費用なし', '15億円以上の申請サポート実績', 'オプションで導入サポートあり']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.rivewell.jp/ithojo/sj/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'rivewell-it-vendor-support' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tokyo-kst-it-hojokin', 'IT導入補助金申請支援', '株式会社東京経営サポーター', 'IT導入補助金の申請支援。着手金50,000円と交付決定成功報酬130,000円。初回相談は無料。', '株式会社東京経営サポーターは、IT導入補助金の申請支援を行っています。

公式サイトでは、料金は着手金50,000円、交付決定成功報酬130,000円、合計180,000円と記載されています。提携店経由の依頼では成功報酬が割引価格になる旨も記載があります。

2,800件超の採択実績を掲載しています。初回相談は無料です。なお代行申請は認められていないため、申請画面への入力は申請者が行い、コンサルタントがZoomでサポートする形式です。月額費用の記載はありません。', null, 'https://www.tokyo-kst.jp/service13.html', 'paid', '50,000円', 'unknown', null, '交付決定成功報酬130,000円', null, '補助金の交付決定時', 'other', 'hybrid', false, true, 'IT導入補助金の活用を検討する中小企業', array['着手金50,000円＋交付決定成功報酬130,000円', '2,800件超の採択実績', 'Zoomでのサポート', '初回相談無料']::text[], 'unpartnered', false, true, false, 'verified', 'https://www.tokyo-kst.jp/service13.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tokyo-kst-it-hojokin' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('support-gyoseishoshi-digital-hojokin', 'デジタル化・AI導入補助金申請サービス', 'サポート行政書士法人', 'IT導入補助金の交付申請を着手金無料・採択後払いの成功報酬制で支援。初回面談は無料。', 'サポート行政書士法人は、IT導入補助金の申請サービスを提供しています。

公式サイトでは、着手金無料・成功報酬制で、報酬は採択後に支払う形と記載されています。料金は交付申請（通常プラン）165,000円〜、インボイス枠110,000円〜、ライトプラン33,000円〜（補助額30万円以下のみ対応）、オプションとして実績報告55,000円、効果報告33,000円です。

2024年度の採択率は通常枠85.3%、インボイス対応90.8%と掲載されています。初回面談は無料です。月額費用の記載はないため要問い合わせです。', null, 'https://www.shigyo.co.jp/search_post/business-subsidy/it/', 'free', '無料', 'unknown', null, '交付申請（通常プラン）165,000円〜、インボイス枠110,000円〜', '報酬は採択後払い（着手金無料）。実績報告55,000円・効果報告33,000円は別途。ライトプラン33,000円〜あり。ベンダー登録220,000円等は別料金。 注意：採択後の実績報告55,000円・効果報告33,000円は別料金。ベンダー登録220,000円・ツール登録150,000円は登録時の固定費型。', '採択後に支払い', 'other', 'optional_plan', false, true, 'IT導入補助金を活用する事業者', array['着手金無料・報酬は採択後払い', '2024年度採択率は通常枠85.3%', '補助額30万円以下向けのライトプランあり', '初回面談は無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.shigyo.co.jp/search_post/business-subsidy/it/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'support-gyoseishoshi-digital-hojokin' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('takano-sharoushi-joseikin', '助成金申請代行', 'タカノ社労士事務所', '着手金・顧問料無料で、助成金入金額の20%を支給決定通知到着時に支払う助成金申請代行。', 'タカノ社労士事務所は、助成金の申請代行を行う社会保険労務士事務所です。

公式サイトの料金案内では、着手金は一切無料、月額の顧問料も一切無料で、報酬は助成金入金額の20%を支給決定通知の到着時に支払う方式と記載されています。万一受給できなかった場合も、準備段階の手間賃などは請求されません。助成金に関する相談はいつでも何度でも無料とされています。

就業規則変更（30,000円）や社会保険の新規適用手続きなどは別途料金です。ビジトラアワード「社労士サービス部門」を受賞したと記載されています。', null, 'https://www.takano-sharoushi.jp/13933542451599', 'free', '一切無料', 'free', '月額顧問料も一切無料', '助成金入金予定額の20%（税別）', '就業規則変更等の付帯手続きは別途料金（税別）。 注意：就業規則変更3万円、雇用契約書作成3万円、ハローワーク求人申込6万円〜、労働保険・社会保険新規適用各3万円（必要時のみ別途）。助成金申請自体の固定費は無し。', '助成金の支給決定通知の到着時', 'other', 'success_only', true, true, '助成金の活用を検討する事業者', array['着手金・月額顧問料が無料', '報酬は助成金入金額の20%', '受給できない場合も準備費用の請求なし', '助成金の相談は何度でも無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.takano-sharoushi.jp/13933542451599', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'takano-sharoushi-joseikin' and c.slug = 'grant' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('scc-collaboration-dev', 'コラボレーション事業開発サービス', '株式会社エスシーシー', 'システム開発費用をゼロ円とし、料金はレベニューシェアで支払う、新規事業向けの共同開発サービス。', '株式会社エスシーシー（SCC）が提供する、レベニューシェア型契約を前提としたコラボレーション事業開発サービスです。2023年7月4日のプレスリリースによれば、新規事業の初期投資として重くなりがちなシステム開発費用がゼロ円で、料金体系はレベニューシェアでの支払いとなり、分配比率は事業内容に応じて協議するとされています。

システムの保守・運用の継続サポートや、サービス設計・業務設計などのコンサルティングにも対応します。事業アイデアはあるものの資金調達が難しい企業を想定したサービスで、複数企業間のコラボレーション機能も特徴です。

具体的な分配比率、月額費用、無料相談の有無はプレスリリースに記載がないため、要問い合わせです。', null, 'https://www.scc-kk.co.jp/', 'free', 'システム開発費用ゼロ円（プレスリリース記載）', 'unknown', null, 'レベニューシェア（分配比率は事業内容に応じて協議）', '分配比率は個別協議で非公開。ソフトウェア開発以外の機材等は契約時調整。 注意：月額費用の有無不明。ソフトウェア開発以外の機材費は契約時に調整（顧客負担の可能性）。', '事業から生じる収益を分配', 'contract', 'success_only', false, false, '資金調達が難しい新規事業の立ち上げ企業', array['システム開発費用ゼロ円', '料金はレベニューシェアで支払い', '保守・運用を継続サポート', 'サービス設計・業務設計のコンサルティングに対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000027.000040510.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'scc-collaboration-dev' and c.slug = 'system-development' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('soelu-seika-homepage', '成果報酬型ホームページ制作・Web集客', '株式会社Soelu', '毎月のコンサル費用不要で、Web経由の成約金額の8〜20%が報酬となる成果報酬型ホームページ制作・集客サービス。', '株式会社Soeluが提供する成果報酬型のホームページ制作・Web集客サービスです。公式ページによれば、毎月のコンサルティング費用は一切かからず、成約や契約につながった金額に対して8〜20%（消費税別）が報酬となり、料率は事業内容により異なります。

Web上のお問い合わせ（メール、電話、FAXなど）で成約した案件が対象で、お問い合わせのみが成果対象となる場合もあります。契約期間は最低1年間、その後は6か月ごとの更新で、契約開始6か月経っても成果が現れない場合は、要望により費用なしで解約できると記載されています。

ホームページ制作から依頼する場合、初期費用をいただかない対応も相談可能とされていますが、具体的な初期費用は公式ページに記載がないため要問い合わせです。無料相談の案内があります。', null, 'https://simple-alpha.com/', 'free', '0円（制作・リニューアル費・公式サイト記載）', 'free', '毎月のコンサルティング費用は一切かからない', '成約1件ごとの固定額（例：15〜30万円・税別）または成約総額の15〜30%＋税', '最低契約期間12か月（以降自動更新）。6か月経過で成果が見えない場合は費用なしで解約可。成果が出ている場合の解約は施策内容に応じ請求あり。', 'Web上のお問い合わせ（メール・電話・FAX等）で成約した案件', 'contract', 'hybrid', false, true, 'Web経由の問い合わせから成約を増やしたい事業者（全国対応）', array['成約金額の8〜20%の成果報酬', '毎月のコンサルティング費用は不要', '6か月経過後に成果がなければ費用なしで解約可', '内部最適化・コンテンツ追加・外部施策を実施']::text[], 'unpartnered', false, true, false, 'verified', 'https://simple-alpha.com/news/2450.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'soelu-seika-homepage' and c.slug = 'site-production' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'soelu-seika-homepage' and c.slug = 'lp-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mybestjob', 'マイベストジョブ', '株式会社ファーストブランド', '初期費用・月額費用が無料の成功報酬型求人サイト。アルバイト・パートは1名5万円、正社員・契約社員は1名10万円（税別）。', 'マイベストジョブは、株式会社ファーストブランドが運営する成功報酬型の求人掲載サービスです。公式サイトでは、初期費用・月額費用・システム利用料ともに無料と案内されています。

料金は採用課金型が基本で、アルバイト・パートは1名採用につき50,000円、正社員・契約社員は1名採用につき100,000円（税別）です。費用が発生するのは、求職者の初日の勤務が完了した時点とされています。業務委託や特定職種は採用課金の対象外で、別途応募課金プランが用意されていると記載があります。

公式サイトにはFAQページへの案内があります。無料相談の明記は確認できなかったため、相談の可否や詳細な条件は公式サイトに記載がないため要問い合わせです。', null, 'https://mybestjob.jp/kyujinkoukoku/', 'free', '無料', 'free', '無料', 'アルバイト・パート1名採用につき50,000円、正社員・契約社員1名採用につき100,000円（税別）', '業務委託・特定職種は採用課金の対象外（応募課金プラン別途）。返金規定の明記なし（誤確定は訂正可、確定期限60日）。', '求職者の初日の勤務が完了した時点で課金（採用課金型）', 'hire', 'success_only', true, false, 'アルバイト・パート・正社員等を採用したい企業', array['初期費用・月額費用・システム利用料が無料', 'アルバイト・パートは1名5万円、正社員・契約社員は1名10万円（税別）', '初日の勤務完了時点で料金が発生', '業務委託・特定職種向けに応募課金プランあり']::text[], 'unpartnered', false, true, true, 'verified', 'https://mybestjob.jp/kyujinkoukoku/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mybestjob' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('recruit-direct-scout', 'リクルートダイレクトスカウト', '株式会社Indeed Recruit Partners', '初期費用無料で、入社時のみ入社者の理論年収15％の採用決定手数料が発生するダイレクトリクルーティングサービス。', 'リクルートダイレクトスカウトは、株式会社Indeed Recruit Partnersが運営する中途採用向けのダイレクトリクルーティングサービスです。公式サイトでは、初期費用は無料と案内されています。

採用が決まった場合の採用決定手数料は、入社時のみ、入社者の理論年収の15％と記載されています。月額やデータベース使用料については、確認したページに明確な記載がなかったため、要問い合わせです。

公式サイトにはお問い合わせボタンがあり、サービス利用開始の流れや利用料金について相談できます。ただし「無料相談」という表現は確認できていません。', null, 'https://directscout.recruit.co.jp/biz/', 'free', '初期費用無料', 'unknown', null, '入社者の理論年収×15％', '月額・データベース使用料は公式サイトに記載がないため要問い合わせ。', '入社時のみ採用決定手数料が発生', 'hire', 'success_only', false, false, '中途採用でダイレクトリクルーティングを行いたい企業', array['初期費用無料', '採用決定手数料は入社者の理論年収の15％', '入社時のみ手数料が発生', '料金やサービスの流れを問い合わせ可能']::text[], 'unpartnered', false, true, true, 'verified', 'https://directscout.recruit.co.jp/biz/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'recruit-direct-scout' and c.slug = 'recruitment-agency' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'recruit-direct-scout' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('rise-for-business', 'RISE for Business', '株式会社ウイルテック', '外国人エンジニア採用に特化した完全成功報酬型マッチング。初期費用0円・月額0円で、成功報酬は1名40万円または60万円。', 'RISE for Businessは、株式会社ウイルテックが運営する外国人エンジニア採用に特化したマッチングサービスです。公式ページでは、初期費用0円、月額費用0円で、内定承諾まで一切費用はかからないと案内されています。

100万人超の独自コミュニティの求職者に対し、応募・スカウト・面接・内定までの支援を行うと記載があります。成功報酬はSプランが1名40万円、Mプランが1名60万円と掲載されています。税区分や各プランの詳細な違いは、確認したページでは明記がなく、要問い合わせです。

18年の海外人財事業と1,300人超の外国人の日本受け入れの経験があると紹介されています。無料相談の明記は確認できなかったため、詳細は公式サイトに記載がないため要問い合わせです。', null, 'https://www.risefor-business.com/landing/top', 'free', '0円', 'free', '0円', 'Sプラン40万円/名、Mプラン60万円/名', 'Sは返金規定なし、Mは返金規定あり。税区分は未確認', '内定承諾時に発生（Mプランは返金規定あり）', 'hire', 'success_only', true, false, '外国人エンジニアを採用したい企業', array['外国人エンジニア採用に特化', '初期費用0円・月額費用0円', 'Sプラン40万円/名、Mプラン60万円/名', '応募・スカウト・面接・内定までを支援']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.risefor-business.com/landing/top', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'rise-for-business' and c.slug = 'recruitment-agency' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'rise-for-business' and c.slug = 'recruitment-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('shufu-job', 'しゅふJOB', '株式会社ビースタイル メディア', '主婦・主夫層向け求人サイト。応募課金は多くの職種で1応募7,500円、採用課金プランは月額10,000円に成果課金。', 'しゅふJOBは、株式会社ビースタイル メディアが運営する主婦・主夫層向けの求人掲載サービスです。公式の料金案内には、応募課金・掲載課金・採用課金の3つのプランが掲載されています。

応募課金プランは応募1件ごとの課金で、多くの職種で1応募につき7,500円と記載され、応募が集まるまで掲載費用は発生しないとされています。採用課金プランは月額利用料10,000円（アカウント毎）に加え、採用成功時の費用が別途かかり、金額は職種等により異なると記載されています。

求人作成代行は初回2求人まで無料、3求人目以降は3,000円です。電話での問い合わせ窓口も案内されていますが、初期費用の有無は確認できなかったため要問い合わせです。', null, 'https://part.shufu-job.jp/business/', 'unknown', null, 'paid', '採用課金プランは月額10,000円（アカウント毎）。応募課金プランは応募が集まるまで掲載費用なし', '応募課金プラン：多くの職種で1応募につき7,500円。採用課金プラン：採用成功時の費用は別途（金額は職種等により異なる）', '3プラン(応募課金・掲載課金・採用課金)。掲載課金が最多選択の標準プラン 注意：採用課金プランは月額10,000円の固定費あり。標準の掲載課金は掲載時課金', '応募課金プランは応募1件ごとに課金', 'lead', 'optional_plan', false, false, '主婦・主夫層を採用したい企業', array['応募課金・掲載課金・採用課金の3プラン', '応募課金は多くの職種で1応募7,500円', '応募が集まるまで掲載費用は発生しない（応募課金）', '求人作成代行は初回2求人まで無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://part.shufu-job.jp/business/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'shufu-job' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('techcamp-jinzai-shokai', 'テックキャンプ 人材紹介', 'div株式会社', 'プログラミングスクール卒業生を紹介する人材紹介サービス。初期費用0円の完全成果報酬制で、入社後の退職時は規定に沿って返金。', 'テックキャンプ人材紹介は、div株式会社が提供するエンジニア向けの人材紹介サービスです。公式ページでは、初期費用0円、完全成果報酬制で採用まで費用は一切かからないと案内されています。成功報酬の金額・料率と月額費用は確認したページに記載がなく、要問い合わせです。

紹介する人材は、前職を辞めて600時間の学習をやりきった人材で、90%以上が前職IT業界ではないと紹介されています。契約から最短1週間で内定を出せるとしています。

万一入社後に退職した場合は、規定に沿って返金すると記載があります。問い合わせ後、担当者が1営業日以内に連絡し、面談・ヒアリングは無料とされています。', null, 'https://di-v.co.jp/tech-camp/recruitment', 'free', '0円', 'unknown', null, null, '成功報酬の金額・料率は公式ページに記載がないため要問い合わせ。', '採用まで費用はかからない（完全成果報酬制）', 'hire', 'success_only', false, true, 'エンジニアを採用したい企業', array['初期費用0円の完全成果報酬制', '入社後に退職した場合は規定に沿って返金', '契約から最短1週間で内定を出せる', '面談・ヒアリングは無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://di-v.co.jp/tech-camp/recruitment', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'techcamp-jinzai-shokai' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kanmo-success-plan', 'KANMO 成果報酬プラン', 'いぬのて', '中小企業向け採用ソリューションKANMOの完全成果報酬型プラン。初期費用・月額0円、入社1名につき30万円（税別）。', 'KANMO（カンモー）は、いぬのてが提供する中小企業向けの採用ソリューションです。2026年7月1日に開始した「成果報酬プラン」は、初期費用0円・月額費用0円で、入社が決定した場合にのみ費用が発生するプランと発表されています。

成果報酬は入社1名につき30万円（税別）で、成果の定義は対象ポジションへの入社日到達とされています。採用戦略の設計、求人原稿の最適化、媒体選定の支援を行い、求人の掲載、応募者対応、面接は依頼企業側が担当すると記載があります。

リリースでは2026年7月10日までの申し込み限定で1名10万円（税別）とするキャンペーンも案内されていました。無料相談の明記は確認できなかったため、要問い合わせです。', null, 'https://inunote.jp/service/kanmo', 'free', '0円', 'free', '0円', '入社1名につき300,000円（税別、入社時150,000円+30日後150,000円）', '標準は月額10万円~の固定費プランで成果報酬プランは選択肢の一つ。2026年7月10日までの10万円キャンペーンは終了 注意：成果報酬プラン自体は固定費なし。10万円キャンペーンは終了済み', '対象ポジションへの入社日到達', 'hire', 'optional_plan', false, false, '中小企業', array['初期費用0円・月額費用0円', '入社1名につき30万円（税別）', '採用戦略設計・求人原稿最適化・媒体選定を支援', '掲載・応募者対応・面接は依頼企業側が担当']::text[], 'unpartnered', false, true, true, 'verified', 'https://pr-free.jp/2026/174048/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kanmo-success-plan' and c.slug = 'recruitment-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'kanmo-success-plan' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('findy-freelance-enterprise', 'Findy Freelance', 'ファインディ株式会社', '案件掲載は無料、初期費用0円で、人材の参画決定時に成功報酬が発生するフリーランスエンジニア採用サービス。', 'Findy Freelanceは、Findy Inc.が提供する、フリーランスエンジニアの活用を検討する企業向けの採用サービスです。公式ページには、案件の掲載に関して料金は発生せず、初期費用は0円で、採用決定時に成功報酬として料金をいただくと記載されています。

紹介した人材の参画が決定するまで無料で利用できると案内されています。成功報酬の具体的な金額は料金表が別ページにあるとされ、確認したページには表示がなかったため、要問い合わせです。月額費用の有無も記載が確認できていません。

ページには「まずはお気軽にお問い合わせください」との案内があります。無料相談の明記は確認できていません。', null, 'https://freelance.findy-code.io/enterprise-service/', 'free', '0円', 'unknown', null, null, '成功報酬の金額は公式ページ上に表示がないため要問い合わせ。', '紹介した人材の参画が決定した時点で成功報酬が発生', 'hire', 'success_only', false, false, 'フリーランスエンジニアを採用したい企業（スタートアップ等）', array['案件の掲載は無料', '初期費用は0円', '参画が決定するまで無料で利用可能', '採用決定時に成功報酬が発生']::text[], 'unpartnered', false, true, true, 'verified', 'https://freelance.findy-code.io/enterprise-service/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'findy-freelance-enterprise' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('dgloss-appopro', 'ディグロス 成果報酬型テレアポ代行・インサイドセールス', '株式会社ディグロス', '初期費用・固定費なしで、新規アポイント1件10,000円〜35,000円の成果報酬型テレアポ代行・インサイドセールス。', 'ディグロスの成果報酬型テレアポ代行・インサイドセールスは、公式サイトで「初期費用・固定費用無し」とされています。新規アプローチのアポイント単価は1件10,000円〜35,000円と記載されています。

契約は1か月単位で、初回契約は2か月以上が条件とされています。課金はアポイント獲得時点で、訪問できなかった場合はキャンセル対応（相殺・返金）があると記載されています。公式サイトでは、アポイント成約率が平均30%以上、コミット達成率89.8%以上などの実績値が示されています。

レポートはオプションで、1回30,000円または60,000円の費用が別途記載されています。相談は電話またはお問い合わせフォームから可能です。業種別の単価の内訳は公式サイトに記載がないため要問い合わせです。', null, 'https://dgloss.co.jp/tele-appointment/', 'free', '0円（初期費用なし）', 'free', '固定費なし', '新規アプローチ1件10,000円〜35,000円', '初期費用・月額なし。リスト作成費(リスト提供時のみ)とレポートオプション(1回3万/6万円)は別途。初回契約2ヶ月〜、10件から利用可。 注意：最低保証・違約金の記載なし。初回契約期間2ヶ月、リスト提供時のみリスト作成費、レポートは有償オプション(3万/6万円)。', 'アポイント獲得時点で課金', 'appointment', 'success_only', true, true, 'BtoB企業', array['初期費用・固定費用なしの成果報酬型', 'アポイント単価10,000円〜35,000円（新規アプローチ）', '訪問できなかった場合はキャンセル対応（相殺・返金）', '1か月単位の契約（初回は2か月以上）']::text[], 'unpartnered', false, true, true, 'verified', 'https://dgloss.co.jp/tele-appointment/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'dgloss-appopro' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('salesdrive-outbound', 'セールスドライブ 完全成果報酬型営業代行', 'セールスドライブ株式会社', '初期費用・月額費用0円で、アポイント1件4万円〜の成果報酬型営業代行。月1件から利用可能。', 'セールスドライブ株式会社の営業代行は、公式サイトで初期費用0円・月額費用0円、アポイント単価は4万円〜と記載されています。最低利用期間はなく、月に1件から利用できるプランとされています。

リストやスクリプトなども無償で提供されると記載されています。50プロジェクト以上の支援実績があり、契約後最短2週間でセールスチームを構築できるとされています。

資料請求、御見積依頼、無料のオンライン相談に対応しています。単価の「〜」の上限や条件の詳細は公式サイトに記載がないため要問い合わせです。', null, 'https://www.salesdrive.co.jp/outboundsales', 'free', '0円', 'free', '0円', 'アポイント単価4万円〜', '単価4万円〜。レポート、手紙アプローチ、定例会は有償オプション。 注意：最低契約期間・最低件数・違約金の明記なし。レポート・手紙送付・定例会は有償オプション。', 'アポイント獲得に対して費用が発生', 'appointment', 'success_only', true, true, 'BtoB企業', array['初期費用0円・月額費用0円', '月1件から利用でき最低利用期間なし', 'リストやスクリプトなども無償で提供', '契約後最短2週間でセールスチームを構築']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.salesdrive.co.jp/outboundsales', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'salesdrive-outbound' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('takecoco-instagram', 'TakeCoco（テイクココ）', 'セスグモ株式会社 / TAKECOCO Inc.', 'Instagram運用を月額3万円の固定費とフォロワー1人あたり80円〜150円の成果報酬で依頼できる運用代行。', 'TakeCocoは、Instagramアカウント運用を成果報酬を組み合わせた料金で依頼できる運用代行サービスです。公式サイトには、トライアルプラン（成果報酬1フォロワー増加あたり150円〜、月額固定3万円、契約期間3か月）とスタンダードプラン（1フォロワー増加あたり80円〜、月額固定3万円、契約期間6か月）の2種類が掲載されています。

成果の指標は主にフォロワー増加数ですが、公式サイトには、フォロワー数に限らず自社HPへの誘導や商品販売などに合わせてカスタマイズできると記載されています。また予算条件の設定が可能と案内されています。月額固定費が標準で発生するため、完全成果報酬ではなく固定費併用型です。

初期費用の有無および税表記は公式サイトに記載がないため要問い合わせ。対応媒体はInstagramのほかTwitter等と記載されています。', null, 'https://take-coco.com/', 'unknown', null, 'paid', '30,000円（税表記は公式に記載なし）', 'トライアル150円〜/フォロワー増加、スタンダード80円〜/フォロワー増加', '月額3万円の固定費と最低契約期間（3か月/6か月）が必須。単価は「150円〜」「80円〜」と下限表記。初期費用・税表記は公式に記載なし。', 'フォロワー増加数（1人あたり単価）。自社HP誘導や商品販売などへのカスタマイズも可能と記載', 'other', 'hybrid', false, false, 'Instagram運用を予算内で外部委託したい企業', array['フォロワー増加1人あたり80円〜の成果報酬', 'トライアル(3か月)とスタンダード(6か月)の2プラン', '成果指標はHP誘導・商品販売などにカスタマイズ可能', '予算条件の設定が可能']::text[], 'unpartnered', false, true, false, 'verified', 'https://take-coco.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'takecoco-instagram' and c.slug = 'instagram-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'takecoco-instagram' and c.slug = 'x-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('belka-shukyaku-seo', '集客SEO(成果報酬型)', '株式会社ベルカ', '初期費用ゼロ円、上位表示しなければ費用もゼロ円とうたう成果報酬型SEO。1日500円からの料金設定。', '株式会社ベルカ(神奈川県横浜市)が提供する成果報酬型のSEO対策サービスです。公式サイトでは「初期費用ゼロ円、上位表示しなければ費用もゼロ円」と案内され、料金は1日500円からとされています。毎月固定でかかる一般的なSEOの料金体系とは異なる点も説明されています。

内部対策と外部リンク施策を組み合わせ、サイト診断は10営業日以内に行うとされています。契約期間は初回順位表示から6か月で、以降は6か月ごとの更新です。月次の順位レポートも提供されます。

無料相談・無料見積の明記は確認できませんでした。月額の固定費の有無や、順位の具体的な達成条件は公式サイトに記載がないため要問い合わせです。', null, 'http://www.belka.co.jp/', 'free', 'ゼロ円', 'unknown', null, '1日500円から', '公式に月額固定費の記載なし。具体単価は要問い合わせ。6か月契約。 注意：契約期間6か月の縛り。最低料金・月額固定の有無は公式に明記なし', '検索結果で上位表示された場合に課金(順位の具体的条件は要問い合わせ)', 'other', 'success_only', false, false, null, array['上位表示しなければ費用ゼロ円とうたう成果報酬型', '内部対策と外部リンク施策を組み合わせ', 'サイト診断は10営業日以内', '月次の順位レポートを提供']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.belka.co.jp/seo_brochure/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'belka-shukyaku-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('pluse-seika-seo', '成果報酬型SEO対策', '株式会社プラスイー', '10位以内に入った日数分のみ日割りで課金する成果報酬型SEO。初期費用は0円、月額8,000円から。', '株式会社プラスイーが提供する成果報酬型のSEO対策サービスです。公式サイトでは、基本的に10位以内にランクインした場合にのみ料金が発生し、上位表示した日数分を日割りで請求すると説明されています。ただし難易度の高いキーワードなどには例外があります。

初期費用は0円で、月額は8,000円からと記載されています。公式サイトによれば、約80%のお客様は月額19,800円から39,800円の範囲に収まるとされています。初期契約期間があり、その間は解約できない旨も明記されていますが、期間の長さは同ページに記載がありません。

HTML最適化、被リンク対策、コンテンツ制作などに対応します。目標キーワードとサイトURLを送ると、1営業日以内にお見積りが提出されます。', null, 'https://seo-nagoya.net/', 'free', '0円', 'paid', '月額8,000円から(約80%のお客様は19,800円〜39,800円)', '10位以内に入った日数分を日割りで請求', '初期契約期間中は解約不可と公式に記載(期間は要問い合わせ)。', '対象キーワードで検索10位以内にランクインした日数(競合の強いキーワードには例外あり)', 'other', 'hybrid', false, false, null, array['10位以内の日数分のみ日割り課金', '初期費用0円・月額8,000円から', 'HTML最適化・被リンク・コンテンツ制作に対応', 'キーワードとURL送付で1営業日以内に見積提出']::text[], 'unpartnered', false, true, false, 'verified', 'https://seo-nagoya.net/seo/seo_contents03', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'pluse-seika-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('getlead-teleapo', 'ゲットリード', '株式会社日本テレアポセンター', '初期費用・月額費用0円で、商談が実施されたタイミングで費用が発生する成果報酬型のテレアポ代行。契約期間の縛りもありません。', 'ゲットリードは、株式会社日本テレアポセンターが提供するテレアポ代行サービスです。公式サイトでは初期費用・月額費用ともに0円で、商談が実施されたタイミングで費用が発生する仕組みと案内されています。

BtoB・BtoCの両方に対応し、人材紹介、コンサルティング、SaaS、不動産投資、保険、リフォーム、健康食品など幅広い業種が例として挙げられています。最低契約期間や縛りはなく、トークスクリプトやリストを用意しなくても依頼できるとされています。

Slackを活用した進捗共有に対応し、月間アポイント数100件/社の実績を掲げています。成果報酬の具体的な単価は公式サイトに記載がないため要問い合わせです。無料オンライン相談の予約ができます。', null, 'https://teleapo-center.co.jp/getlead/', 'paid', '0円', 'free', '0円', null, '初期費用無料はキャンペーン中の記載。成果報酬単価は非公開。', '商談が実施されたタイミングで費用が発生', 'meeting', 'success_only', false, true, 'BtoB・BtoC問わず幅広い業種', array['商談実施時に費用が発生', '最低契約期間・縛りなし', 'トークスクリプト・リスト不要で依頼可能', 'Slackを活用した進捗共有']::text[], 'unpartnered', false, true, true, 'verified', 'https://teleapo-center.co.jp/getlead/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'getlead-teleapo' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('shift-teleapo-seika', '成果報酬型テレアポ代行サービス', 'SHIFT inc.', '初期費用・月額固定費0円で、アポイント1件あたり法人10,000円〜の成果報酬型テレアポ代行。キャンセル時は返金対応があります。', 'SHIFT inc.の成果報酬型テレアポ代行サービスは、公式サイトで月額固定費も初期費用も全て0円と案内されています。料金はアポイント1件あたり法人10,000円〜、個人20,000円〜と記載されています。

課金はアポイント取得日に発生し、アポイントのキャンセル等が発生した場合はキャンセル・返金対応となるとされています。週報・日報、リスト作成、トークスクリプト作成はオプションで依頼できます。

アポイントの最低契約数は10件と記載されています。無料相談の明記は確認できず、詳細は公式サイトからの問い合わせが必要です。', null, 'https://shift-inc.net/call01/', 'free', '0円', 'free', '0円（月額固定費なし）', 'アポイント1件あたり 法人10,000円〜、個人20,000円〜', 'アポイント最低契約数は10件。週報・日報、リスト作成、トークスクリプト作成はオプション。', 'アポイント取得日に課金。キャンセル等が発生した場合は返金対応', 'appointment', 'hybrid', false, false, '法人・個人向けのアポイント獲得', array['アポイント1件あたり法人10,000円〜の成果報酬', 'キャンセル時は返金対応', '週報・日報はオプションで対応', 'リスト・トークスクリプト作成はオプション']::text[], 'unpartnered', false, true, false, 'verified', 'https://shift-inc.net/call01/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'shift-teleapo-seika' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('salesneeds-referral', '完全成果報酬型リファーラルマーケティング', '株式会社セールスニーズ', '初期費用・月額費用ゼロの人脈紹介型マーケティング。成約・成果報酬ベースで、広告費をかけずに見込み客へ接点を持てます。', '株式会社セールスニーズの「成果報酬型リファーラル（人脈紹介）マーケティング」は、公式サイトで初期費用ゼロ円・月額費用ゼロ円と案内されています。成約・成果報酬ベースで対応するとされています。

完全紹介制による人脈活用型で、対面・面談型のマーケティングに特化し、「高い信頼性」「質の高いターゲット」「ミスマッチ削減」などを特徴に挙げています。マーケティング代行や営業リソース不足の企業が対象です。

成果報酬の金額・料率や無料相談の有無は公式ページに記載がないため、公式サイトに記載がないため要問い合わせです。', null, 'https://www.salesneeds.jp/marketing', 'free', 'ゼロ円', 'free', 'ゼロ円', null, '成果報酬の金額・料率は公式サイトに記載がないため要問い合わせ。', '成約、成果報酬ベースで対応', 'matching', 'success_only', true, false, 'マーケティング代行が必要な企業、営業リソース不足に課題のある企業', array['完全紹介制の人脈活用型マーケティング', '初期費用・月額費用ゼロ', '対面・面談型マーケティングに特化', 'ミスマッチ削減をうたう']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.salesneeds.jp/marketing', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'salesneeds-referral' and c.slug = 'referral-sales' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'salesneeds-referral' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('roots-alpha-sales', 'ルーツアルファ営業代行', 'Roots Alpha', '会員情報を活用した営業代行。初期費用・月額費用0円で、商談訪問時に1件10,000円〜の成果報酬が発生します。', 'Roots Alphaの営業代行サービスは、公式サイトで初期費用0円・月額費用0円と案内されています。成果報酬は1件につき10,000円〜で、営業代行で獲得した商談へ訪問する際に発生すると記載されています。

会員情報を活用した営業代行で、生命保険、投資用不動産、損害保険コンサル、リノベーション、外壁塗装・防水工事などの業種が対象例として挙げられています。アポイント確定後はアポイント表を随時更新し、メールで送付するとされています。

問い合わせフォームと電話相談が用意されていますが、「無料相談」の明記は確認できないため、詳細は要問い合わせです。', null, 'https://roots-alpha.com/', 'free', '0円', 'free', '0円', '1件につき10,000円〜', null, '獲得した商談へ訪問する際に発生', 'appointment', 'success_only', true, false, '生命保険、投資用不動産、損害保険コンサル、リノベーション、外壁塗装・防水工事等', array['初期費用・月額費用0円', '1件10,000円〜の成果報酬', '会員情報を活用した営業代行', 'アポイント表を随時更新してメール送付']::text[], 'unpartnered', false, true, true, 'verified', 'https://roots-alpha.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'roots-alpha-sales' and c.slug = 'sales-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'roots-alpha-sales' and c.slug = 'field-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('apodol-hpg', 'アポドル', 'H.P.G. 服部プロセスグループ', '初期費用0円・固定費0円の完全成果報酬型テレアポ営業代行。リスト・スクリプト作成から架電まで対応します。', 'アポドルは、H.P.G. 服部プロセスグループが運営する完全成果報酬型のテレアポ営業代行サービスです。公式サイトでは初期費用0円・固定費0円とされ、1件あたりの料金で獲得件数に応じて請求すると案内されています。月次の獲得上限は10件から設定でき、実績が上限に満たない場合は獲得数分のみの請求とされています。

アタックリスト作成、トークスクリプト作成、架電に対応し、展示会で得た名刺や休眠顧客リストへの架電も可能と記載されています。契約は月単位で1か月から利用でき、長期契約の縛りはないとされています。

料金は案件内容に応じて商談時に個別提示されるため、公式サイトに記載がなく要問い合わせです。お問い合わせフォームから相談・資料請求ができます。', null, 'https://apodol.jp/', 'free', '0円', 'free', '0円', null, '初期0円・月額0円・スクリプト修正0円、最低契約1か月（解約違約金の記載なし）。単価は案件ごとに個別見積で公式に金額記載なし。', 'アポイント獲得件数に応じて請求。上限に満たない場合は獲得数分のみ', 'appointment', 'success_only', true, true, 'テレアポで新規顧客開拓をしたい企業', array['初期費用0円・固定費0円', 'リスト作成・スクリプト作成・架電に対応', '展示会名刺・休眠顧客リストへの架電が可能', '1か月から契約可能、長期縛りなし']::text[], 'unpartnered', false, true, true, 'verified', 'https://apodol.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apodol-hpg' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('movie-penguin-tiktok', 'Movie Penguin TikTok運用代行', '株式会社Movie Penguin', '1再生2.5円の再生数連動報酬に月額撮影費5万円〜を組み合わせたTikTok運用代行。', '株式会社Movie PenguinのTikTok運用代行は、公式サイトで「1再生2.5円」の成果報酬を提示しています。1本あたりの支払いには4万円の上限が設けられていると記載されています。

固定費として月額の撮影費5万円〜が別途かかる体系で、例として30万再生なら75万円（税別）に撮影費を加算、100万再生では上限適用で96万円（税別）に撮影費を加算と示されています。最低契約期間は初回3か月、更新時は半年単位です。

TikTok・Instagram・YouTubeの3媒体への同時投稿が標準で、撮影、編集、投稿、ハッシュタグ選定、定例会での報告・相談が含まれます。無料相談・資料請求は毎月3社限定で受け付けているとされています。初期費用の有無および最低保証の詳細は、公式サイトに記載がないため要問い合わせです。ページの最終更新日も確認できませんでした。', null, 'https://rikito-movie-marketing.com/tiktok/', 'unknown', null, 'paid', '撮影費 月額5万円〜', '1再生2.5円（1本あたりの支払い上限4万円）', '最低契約期間は初回3か月（更新時は半年単位）。月額撮影費5万円〜は再生数に関係なく発生。ページの最終更新日は確認できず、現行提供は掲載ページの存在のみで確認。 公式サイトの現行ページで提供状況を確認できなかったため、最新の条件は公式サイトでご確認ください。', '投稿動画の再生数', 'other', 'hybrid', false, true, null, array['再生数連動の成果報酬（1再生2.5円）', '撮影・編集・投稿まで込み', '定例会での報告・相談', 'TikTok・Instagram・YouTubeに同時投稿']::text[], 'unpartnered', false, true, false, 'verified', 'https://rikito-movie-marketing.com/tiktok/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'movie-penguin-tiktok' and c.slug = 'tiktok-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'movie-penguin-tiktok' and c.slug = 'instagram-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'movie-penguin-tiktok' and c.slug = 'youtube-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('revive-line-success-plan', 'Revive 完全成果報酬プラン(LINE運用)', 'Canvas Inc.', 'LINE公式アカウントの戦略設計から運用・改善までを、初期費用0円・月額0円のCV数×成果単価で提供する成果報酬プラン。', 'ReviveはLINE公式アカウントを活用した新規顧客獲得の戦略設計から実行・改善までを支援するサービスで、公式の料金ページに「完全成果報酬プラン」が掲載されています。

公式の料金ページでは、初期費用0円(アカウント開設、シナリオ設計、リッチメニュー制作などを含む)・月額利用料0円(顧客分析、効果測定、レポートなどを含む)と明記され、料金は「CV数×成果単価」で発生する体系とされています。成果単価の具体的な金額、およびCV(コンバージョン)の具体的な定義は公式サイトに記載がないため要問い合わせです。

注意点として、同ページには最低契約期間が12ヶ月と記載されています。また、対象となるサイトやLPのモバイル月間PVの目安(5万〜10万PV程度。商材や成果単価によっては5万PV以下での実施も相談可能)が示されています。別途、アカウントや運用状況に応じて見積もる「運用代行プラン」も用意されています。', null, 'https://revive-chat.io/', 'free', '0円(公式料金ページに記載)', 'free', '0円(公式料金ページに記載)', 'CV数×成果単価(単価は公式に記載なし、要問い合わせ)', '最低契約期間は12ヶ月。対象サイト/LPのモバイル月間PVが5万〜10万程度が目安(商材や単価により5万以下も相談可)。成果単価とCVの定義は公式に記載がないため要問い合わせ。', 'LINE経由のCV(コンバージョン)発生。具体的な定義は公式サイトに記載がないため要問い合わせ', 'lead', 'success_only', true, false, 'LINEで新規顧客獲得を行いたい事業者(サイト/LPのモバイル月間PV5万〜10万程度が目安)', array['LINE公式アカウントの戦略設計から実行・改善まで一気通貫', '初期費用0円・月額0円で成果報酬のみ', '運用代行プラン(見積もり制)も選択可', '累計300社以上の運用支援実績を公式に掲載']::text[], 'unpartnered', false, true, true, 'verified', 'https://revive-chat.io/price', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'revive-line-success-plan' and c.slug = 'line-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('ceeev-reel-view-based', 'Ceeev 完全成果報酬型SNS運用代行（再生数課金）', '株式会社Ceeev', 'Instagramリール/TikTok等のショート動画運用を、再生数×4円の課金で依頼できる。月額上限プランあり。', '株式会社Ceeevが提供する完全成果報酬型のSNS運用代行です。公式ブログ記事（2026年版）によると、課金は再生された分だけで1再生あたり4円（例：月間10万回再生なら40万円）とされ、月額固定の運用費は設けられていません。対象はInstagramリールやTikTokなどのショート動画です。

月額の支払い上限として30万円・40万円・50万円の3つのプランが示されており、プランごとに投稿本数と基準再生数が異なります（例：上限50万円のプランは月10本・基準再生数12.5万回が目安）。基準の再生数に満たなかった場合は、その差分を同社負担の広告で補填する仕組みも記載されています。企画・撮影・編集・投稿・分析・広告運用まで自社で対応すると説明されています。

課金対象は再生数であり、フォロワー数や売上は課金指標ではありません。初期費用の有無、最低契約期間、解約条件、再生数のカウント条件の詳細は公式サイトに記載がないため要問い合わせです。公式サービスページ自体には料金の記載がなく、料金情報は公式ブログ記事で確認しました。', null, 'https://ceeev.co.jp/', 'unknown', null, 'free', '月額固定費なし（再生数課金のみ。月額上限30万/40万/50万円のプランあり）', '1再生あたり4円（月額上限30万円・40万円・50万円のプラン）', '初期費用・解約条件は公式ブログに記載なし（要問い合わせ）。同ブログ内に「最低契約期間（多くは6ヶ月〜）」との言及があるが、同社固有の条件かは不明のため契約前に要確認。上限額は月額支払い上限であり固定請求ではないと読み取れる。基準再生数未達分は同社負担の広告で補填とされる。公式サービスページ・トップページには料金記載なし。', '投稿した動画の再生数（Instagramリール・TikTok等）', 'other', 'success_only', false, false, 'ショート動画での認知獲得を固定費なしで試したい企業', array['再生数×4円の成果報酬課金', '月額上限プラン（30/40/50万円）', '企画から撮影・編集・投稿・分析まで一括対応', '基準再生数未達分を自社負担の広告で補填']::text[], 'unpartnered', false, true, true, 'verified', 'https://ceeev.co.jp/blog/performance-based-sns-management-guide-2026-v2/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ceeev-reel-view-based' and c.slug = 'instagram-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'ceeev-reel-view-based' and c.slug = 'sns' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('lead-one-tiktok-seika', 'TikTok運用代行 成果報酬プラン（月額上限あり）', '合同会社LEAD ONE', '福岡発のTikTok運用代行。再生数1回あたり3円（2023年公式プレスリリース記載）の成果報酬で、月額上限が設定され、月額固定費はかからない。最低契約期間は3か月。', '合同会社LEAD ONE（福岡）が提供するTikTokの企画・撮影・編集・運用代行の成果報酬プランです。公式サイトのTikTok運用代行ページでは「成果報酬型×月額上限あり」「月額固定費はかからず、成果に応じて支払う」と案内されています。公式プレスリリース（2023年6月26日）では、課金は再生数1回あたり3円、初期費用は不要と記載され、月間の請求上限は月10本投稿で25万円、月15本で33万円、月20本で40万円（税別）とされています。

現行の公式ページでは具体的な単価・上限額は資料請求で案内するとされており、プレスリリース時点の金額が現在も同一かは公式サイトに記載がないため要問い合わせです。

別途費用として、撮影スタジオ代、演者のキャスティング代は含まれず、撮影地が福岡・沖縄以外の場合は博多からの往復交通費がかかるとプレスリリースに記載があります。公式サイトのFAQでは最低契約期間は3か月からとされ、柔軟に対応可能とも書かれています。広告費の扱いは公式サイトに記載がないため要問い合わせです。対応可能な社数には限りがあるとプレスリリースに記載されています。', null, 'https://lead-one.info/', 'free', '不要（プレスリリースに明記）', 'free', '月額固定費はかからない（公式サイトFAQに明記）', '再生数1回あたり3円（2023年プレスリリース記載。月間上限：10本25万円/15本33万円/20本40万円、税別）', '最低契約期間は3か月から（公式FAQ、柔軟対応可とあるが詳細は要問い合わせ）。月間請求上限あり（2023年プレスリリース時点：月10本25万円/15本33万円/20本40万円、税別）。現行の公式ページでは単価・上限額は資料請求で案内のため、現在の金額は要確認。別途、スタジオ代・キャスティング費、福岡/沖縄以外での撮影時の博多からの往復交通費（福岡市内は交通費無料）。広告費・解約条件は公式に記載を確認できず要問い合わせ。', 'TikTok動画の再生数', 'other', 'success_only', true, true, 'TikTokでの集客・認知を狙う企業（福岡・九州中心、全国対応可）', array['企画・台本・撮影・編集・運用・分析をワンストップで対応', '課金は再生数連動の成果報酬で月額上限あり', '月額固定費なし（最低契約期間は3か月）', '福岡市内は交通費無料、全国オンライン対応可']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000001.000098295.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'lead-one-tiktok-seika' and c.slug = 'tiktok-ops' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'lead-one-tiktok-seika' and c.slug = 'sns' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('malnage-connect-shiryo', 'まるなげコネクト（まるなげ資料請求）', '株式会社インデンコンサルティング', '掲載料・初期費用・月額費用0円で、本申込後の1件につき3,000円を支払う成果報酬型のリード獲得サービス。', 'まるなげコネクトは、見込み客からの資料請求・問い合わせ獲得を成果報酬で支援するサービスです。公式サイトでは、掲載料・初期費用・月額費用がいずれも0円と案内されており、費用は成果報酬として1件あたり3,000円（本申込後）のみと記載されています。

契約は月額費用なしの単月契約で、無料トライアルでは1か月間、掲載料・初期費用・月額費用がすべて0円で利用できるとされています。

課金対象となる「申込」の詳細な定義、業種・案件ごとに単価が変わるかどうか、最低件数の有無、広告媒体への出稿費や制作費が別途必要になるかどうかは、公式サイトに記載がないため要問い合わせです。', null, 'https://malnage.com/', 'free', '0円', 'free', '0円', '1件あたり3,000円（本申込後）', '公式記載は掲載料・初期費用・月額費用0円、成果報酬3,000円/件のみ（本申込後）、単月契約。最低件数・業種別単価・広告費等の別途費用の有無は公式サイトに記載がないため要問い合わせ。', 'お申込（問い合わせ・資料請求）が発生した件数', 'lead', 'success_only', true, false, 'BtoB企業をはじめ、IT・不動産・FCなど見込み客獲得を目指す企業', array['掲載料・初期費用・月額費用0円', '申込1件3,000円の成果報酬', '月額費用なしの単月契約', '1か月の無料トライアルあり']::text[], 'unpartnered', false, true, true, 'verified', 'https://malnage.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'malnage-connect-shiryo' and c.slug = 'lead-generation' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'malnage-connect-shiryo' and c.slug = 'web-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('howma-sales-reaction', 'HowMa売り反響獲得システム', 'コラビット株式会社', '不動産売却の売主反響に対して1反響1万円（税別）〜課金。システム使用料ほか固定費用なし、月5件から上限設定可。', 'HowMa売り反響獲得システムは、売却意欲の高い売主からの問い合わせ（反響）を不動産会社に届けるサービスです。公式ページでは、反響単価は1反響あたり10,000円（税別）からで、システム使用料ほか固定費用はないと記載されています。AI査定利用者に意思確認を行ったうえで送客される仕組みとされています。

初期費用は通常50,000円（税別）ですが、現在は初期費用無料キャンペーン中です。契約は1か月から可能で契約期間の縛りはなく、不適合と感じた場合はすぐに解約できるとされ、月間の反響上限も5件から設定できます。

10,000円を超える単価がどの条件で適用されるか、キャンペーン終了時期は公式サイトに記載がないため要問い合わせです。', null, 'https://bservice.collab-it.net/service/howma-sales-reaction', 'paid', '通常50,000円（税別）。キャンペーン中は0円', 'free', '0円（システム使用料ほか固定費用なし）', '1反響10,000円（税別）〜', '初期費用は通常50,000円（税別）で、無料はキャンペーン期間中のみ。契約は1か月から、契約期間の縛りなし。10,000円は「〜」の下限表記で、上振れ条件は公式サイトに記載がないため要問い合わせ。', '売却意欲の高い売主からの問い合わせ（反響）の件数', 'lead', 'success_only', false, false, '不動産売却の反響を獲得したい不動産会社', array['1反響10,000円（税別）〜の反響課金', 'システム使用料ほか固定費用なし', '1か月から契約・縛りなし', '月5件から月間上限を設定可能']::text[], 'unpartnered', false, true, true, 'verified', 'https://bservice.collab-it.net/service/howma-sales-reaction', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'howma-sales-reaction' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('eq-create-me-q', 'ME-Q（成果報酬型MEO対策）', 'EQクリエイト', '上位3位以内にランクインした日数×700円のみで課金される、初期費用・月額固定費0円の完全成果報酬型MEO対策。', 'ME-Qは、Googleマップ検索（MEO）で対策キーワードが上位3位以内にランクインした日数に応じて課金される成果報酬型のMEO対策サービスです。

公式サイトでは「上位3位以内にランクインした日数×700円だけの完全成果報酬型」と案内されており、初期費用は0円、月額の固定費も0円と記載されています。「結果が出なければ料金は一切かかりません」との説明があり、価格は税別表示です。

3つのプランが用意されているとされていますが、プランの詳細は画像で提示されており、テキストでは内容を確認できませんでした。最低契約期間や解約条件については公式サイトに記載がないため要問い合わせです。', null, 'https://eq-create.jp/me-q/', 'free', '0円', 'free', '0円', '1日あたり700円（税別）', '最低契約期間・解約条件は公式ページに記載なし（要問い合わせ）。3プランの違いは画像表記のため確認できず。料金は税別。', '対象キーワードでGoogleマップ上位3位以内にランクインした日数', 'other', 'success_only', true, false, '店舗・地域ビジネス', array['上位3位以内の日数課金', '初期費用0円・月額固定費0円', '3プラン展開', 'MEO（Googleマップ）対策']::text[], 'unpartnered', false, true, true, 'verified', 'https://eq-create.jp/me-q/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'eq-create-me-q' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('greenhill-meo-hack', 'MEO HACK', '株式会社GreenHill', 'Googleマップで上位3位以内に入った日のみ日額300円が発生する、初期費用0円・月額固定費なしの成果報酬型MEO。', 'MEO HACKは株式会社GreenHillが提供する成果報酬型のMEO対策サービスです。

公式サイトでは初期費用0円、上位3位以内にランクインした日について日額300円が課金される仕組みと記載されています。月額固定費は公式ページに明示的な記載がなく、成果報酬型である旨の説明から固定月額は設定されていないと読み取れます。「効果が出た分だけ費用が発生する」との説明があります。

上位表示成功率約80%との記載や最安値表記は事業者自身の主張です。税表記、最低契約期間、解約条件、対象キーワード数の上限は公式サイトに記載がないため要問い合わせです。', null, 'https://g-hill.jp/meo/', 'free', '0円', 'unknown', null, '日額300円', '月額固定費の明確な記載なし（成果報酬型の説明のみ）。最低契約期間・税表記・解約条件は公式ページに記載なし（要問い合わせ）。', 'Googleマップで上位3位以内にランクインした日数', 'other', 'success_only', false, false, '店舗・地域ビジネス', array['日額300円の日数課金', '初期費用0円', '成果報酬型で固定月額の設定なし', 'MEO対策']::text[], 'unpartnered', false, true, true, 'verified', 'https://g-hill.jp/meo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'greenhill-meo-hack' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gh-japan-meo', 'GH MEO対策', 'GH株式会社', '上位3位以内表示の達成日数×2,000円のみで課金される、初期費用0円の成果報酬型MEO対策。', 'GH株式会社のMEO対策は、Googleマップで対策キーワードが上位3位以内に表示された日数に応じて費用が発生する成果報酬型サービスです。

公式サイトでは初期費用0円、料金は「上位3位以内表示達成日数×2,000円（税別、非表示日は課金なし）」と記載されています。順位は自社の計測ツールによるGoogleマップ検索結果の定期確認で判定されます。

月額固定費の明示的な記載はありません。最低契約期間や解約の通知条件は「個別にご案内」とされ、具体的な内容は公式サイトに記載がないため要問い合わせです。無料診断の申し込み窓口があります。', null, 'https://www.ghjapan.jp/meo/', 'free', '0円', 'unknown', null, '1日あたり2,000円（税別）', '最低契約期間・解約通知は個別案内で公式ページに具体記載なし。月額固定費の明記はないが、月額料金は達成日数×単価の成果報酬と記載。消費税は別途。', 'Googleマップで上位3位以内表示を達成した日数', 'other', 'success_only', false, true, '店舗・地域ビジネス', array['上位3位以内の日数課金', '非表示日は課金なし', '初期費用0円', '無料診断あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.ghjapan.jp/meo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gh-japan-meo' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('meo-kobo-seika', 'MEO工房', '富山工房 × Gleaner', '上位3位以内に入った日のみ日給1,200円。初期費用・月額基本料0円だが契約期間は6か月。', 'MEO工房は、富山工房とGleanerが運営する成果報酬型のMEO対策サービスです。

公式サイトでは上位3位以内に入った日のみ日給1,200円が課金され、初期費用0円、月額費用は成果報酬のみで基本料金なしと案内されています。定期投稿代行、写真アップロード、口コミ返信対応、独自管理ツールの提供が含まれると記載されています。

契約期間は6か月で、7か月目以降は1か月ごとの自動更新です。ただし期間中も固定費の記載はなく、課金は上位表示日のみです。税表記や解約条件の詳細は公式サイトに記載がないため要問い合わせです。', null, 'https://studio-meo.com/meo/', 'free', '0円', 'free', '0円（基本料金なし）', '1日あたり1,200円', '契約期間6か月（7か月目以降は1か月ごとの自動更新）。固定費の記載はなく課金は上位表示日のみ。税表記・解約条件は公式ページに記載なし（要問い合わせ）。', '希望キーワードでGoogleマップ上位3位以内に入った日数', 'other', 'success_only', true, true, '店舗・地域ビジネス', array['上位3位以内の日給課金', '投稿・写真・口コミ運用込み', '独自管理ツール付き', '契約期間6か月']::text[], 'unpartnered', false, true, true, 'verified', 'https://studio-meo.com/meo/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'meo-kobo-seika' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('myseo-seika-seo', 'MY SEO（完全成果報酬型SEO）', '株式会社マイスタースタジオ', '対策キーワードの上位表示日数に応じ日額500円〜で課金される完全成果報酬型SEO。返金対象の預託金が必要。', 'MY SEOは株式会社マイスタースタジオが提供する完全成果報酬型のSEO対策です。

公式サイトでは初期費用・月額基本料とも無料で、上位表示を達成した日について日額500円〜（税込550円）が課金されると記載されています。月間の上位化日数が24日以内なら「月額料金÷30日×上位化日数」の日割り、25日以上なら月額料金の全額請求という計算方式です。

契約時に月額1か月分相当の預託金が必要で、解約時に全額返金されると記載されています。最低契約期間と解約条件は公式サイトに記載がないため要問い合わせです。', null, 'https://myseo.jp/lp001/', 'paid', '初期費用は無料。ただし契約時に月額1か月分相当の預託金が必要（解約時に全額返金と記載）', 'free', '0円', '日額500円〜（税込550円）', '契約時に1か月分相当の預託金が必要（解約時に全額返金と公式記載）。最低契約期間・解約条件は要問い合わせ。月25日以上の上位化で月額料金の全額請求。', '対策キーワードが上位表示された日数', 'other', 'success_only', false, false, '自社サイトの検索順位を上げたい企業', array['上位表示日数課金', '月25日以上で月額満額の計算方式', '預託金は解約時に全額返金', 'SEO対策']::text[], 'unpartnered', false, true, true, 'verified', 'https://myseo.jp/lp001/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'myseo-seika-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('raksul-apo-daiko', 'ラクスル アポ代行', 'ラクスル株式会社', '有効商談1件40,000円（税抜）の成果報酬型BtoB営業代行。初期費用0円・月額固定費なし・最低契約期間なしで月1件から利用できる。', 'ラクスルのBPO事業が提供するBtoB向けの営業代行（アポ代行）サービスです。公式サイトでは、通常プランの課金は有効商談1件あたり40,000円（税抜）の成果報酬で、初期費用は0円、月額固定費も0円、月1件から利用できると案内されています。

有効商談とは、日程が確定しており、事前にヒアリングした内容や合意事項が明確になっている商談を指し、日程だけを確保した状態は対象外とされています。BtoB向けページには最低契約期間の定めはなくいつでも解約できると記載されています。

難易度の高いターゲットなどは内容に応じた個別見積もりとなり、1コール400円のコール課金型も別プランとして案内されていますが、コール課金は作業量への課金であり、成果連動の標準料金ではありません。個別見積もり時の具体的な金額、キャンセル時の扱いなどは公式サイトに記載がないため要問い合わせです。', null, 'https://bpo-appointment.raksul.com/', 'free', '0円', 'free', '0円（月額固定費なし、月1件から）', '有効商談1件40,000円（税抜）', '通常プランは有効商談課金のみ。最低契約期間なし（BtoB向けページ記載）。難易度の高いターゲット等は個別見積もり。コール課金（1コール400円）は別プランで作業量課金のため標準の成果報酬とは別。', '有効商談の成立（日程が確定し、事前ヒアリング内容・合意事項が明確な商談）', 'meeting', 'success_only', true, false, 'BtoB企業', array['有効商談1件につき課金する成果報酬', '初期費用0円・月額固定費0円・月1件から', '最低契約期間なし・いつでも解約可', '有効商談は日程確定かつ合意事項が明確な商談と定義']::text[], 'unpartnered', false, true, true, 'verified', 'https://bpo-appointment.raksul.com/bpo-btob', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'raksul-apo-daiko' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mubiapo-teleapo', 'ムビアポ', '市川貴教（個人事業）', '採用動画制作会社・採用SNS運用代行会社向けのテレアポ代行。日時確定商談1アポ30,000円、契約獲得型は1社600,000円の成果報酬。', 'ムビアポは、採用動画制作会社や採用目的のSNS運用代行会社に特化したテレアポ・営業代行です。公式サイトの料金ページでは、テレアポ代行は決裁者または決裁関与者との日時確定商談1アポにつき30,000円（税抜）、契約獲得まで対応する完全営業代行は契約1社につき600,000円（税抜）と案内されています。

初期費用は0円、月額固定費はなく、最低契約期間や違約金もありません。支払いは成果確定月の翌月末の後払いです。先方都合の商談キャンセルは課金対象外で、再調整後に実施された時点で課金対象となります。

運営は個人事業主の市川貴教氏で、新規案件は月3社までの受付上限があります。対象は採用動画制作会社・SNS運用代行会社で、全国対応・オンライン完結とされています。実績数値の第三者検証の有無は公式サイトに記載がないため要問い合わせです。', null, 'https://tokutei-ginou-teleapo-senmon.com/', 'free', '0円', 'free', '0円（月額固定費なし）', 'テレアポ代行 1アポ30,000円（税抜）／完全営業代行 契約1社600,000円（税抜）', '最低契約期間・違約金なし。成果確定月の翌月末の後払い。新規案件は月3社までの受付上限あり。先方都合のキャンセルは課金対象外（再調整後の実施時に課金）。', '決裁者または決裁関与者との日時確定商談の成立（テレアポ代行）／契約獲得（完全営業代行）', 'appointment', 'success_only', true, false, '採用動画制作会社、採用目的のSNS運用代行会社', array['決裁者・決裁関与者との日時確定商談を成果として課金', '契約獲得型は1社600,000円', '初期費用0円・最低契約期間と違約金なし', '採用動画・採用SNS運用代行会社に特化']::text[], 'unpartnered', false, true, true, 'verified', 'https://tokutei-ginou-teleapo-senmon.com/price/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mubiapo-teleapo' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('apo100-eigyo-hack', 'アポ100', '株式会社営業ハック', '初期費用・稼働費・運営固定費・デポジットが無料で、アポイント獲得時のみ費用が発生する成果報酬型テレアポ代行。単価は非公開。', 'アポ100は、株式会社営業ハックが提供する成果報酬型のテレアポ代行サービスです。2026年6月1日の公式プレスリリースでは、初期費用・稼働費・運営固定費・デポジットがいずれも無料で、アポイントを獲得した場合にのみ費用が発生し、アポが0件なら費用も0円と案内されています。

アポイント1件あたりの単価、成果（アポ）の具体的な定義、最低契約期間、キャンセル時の扱いは、公式プレスリリースに記載がないため要問い合わせです。公式サイトのトップページでも料金情報は確認できませんでした。

第三者の比較記事には単価の目安が掲載されている場合がありますが、公式確認はできていないため掲載していません。契約前に単価と成果の定義、契約期間を必ず確認してください。', null, 'https://eigyou-hack.com/', 'free', '0円', 'free', '運営固定費0円', null, '単価・アポの定義・最低契約期間・キャンセル時の扱いは公式に記載がなく要問い合わせ。', 'アポイントの獲得（アポ0件なら費用0円）', 'appointment', 'success_only', true, false, null, array['アポ獲得時のみ費用が発生', 'アポ0件なら費用0円', '初期費用・稼働費・運営固定費・デポジットが無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000630.000050843.html', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apo100-eigyo-hack' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('matcher-scout', 'Matcher Scout', 'Matcher株式会社', '新卒向けダイレクトリクルーティングで、スカウト運用まで任せられ、内定承諾時のみ1名70万円が発生する成功報酬型サービス。', 'Matcher Scoutは、新卒採用向けのダイレクトリクルーティングサービスです。公式サイトには、採用するまで費用は一切かからず、初期設定やスカウト運用業務もすべて無料で行うと記載されています。

課金は、内定承諾が出た場合に紹介手数料として1名あたり70万円を支払う仕組みです。入社に至らなかった場合は全額返金すると公式に記載されています。初期費用・運用費用・月額固定費はかからないとされています。

スカウト送信の対象や運用の具体的な進め方、契約期間、プランの適用条件などの詳細は、公式サイトに記載がないため要問い合わせです。', null, 'https://enterprise.matcher.jp/', 'free', '0円（公式に初期設定は無料と記載）', 'free', '0円（公式に運用費用無料・月額固定費なしと記載）', '70万円/人', '公式トップページで確認できる課金は内定承諾時の70万円/人のみ。契約期間・最低件数・解約条件などの詳細は公式に記載がなく要問い合わせ。', '新卒の内定承諾が出た場合（入社に至らなかった場合は全額返金）', 'hire', 'success_only', true, false, '新卒採用を行う企業', array['新卒向けダイレクトリクルーティング', 'スカウト運用業務まで無料で対応', '初期費用・運用費用・月額固定費なし', '入社に至らない場合は全額返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://enterprise.matcher.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'matcher-scout' and c.slug = 'recruitment-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'matcher-scout' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gigabaito-apply-billing', 'ギガバイト 応募課金プラン', 'GALOIS Inc.', '初期費用0円・月額基本料0円で、求職者からの応募1件につき2,500円〜が発生するアルバイト向け求人媒体。', 'ギガバイトは、GALOIS Inc.が運営するアルバイト向けの求人掲載サービスです。公式の企業向け料金ページには、応募課金プランとして初期費用0円、月額基本料0円、1応募あたり2,500円〜と記載されています。

応募課金とは別に、掲載課金プランも用意されている旨の記載があります。ただし、その価格は公式サイトに記載がありません。

最低出稿額、掲載期間、無効応募の扱いについても公式サイトに記載がないため要問い合わせです。なお、応募の発生は採用の成立を保証するものではありません。', null, 'https://gigabaito.com/forkigyo', 'free', '0円', 'free', '0円（月額基本料）', '1応募あたり2,500円〜', '最低出稿額・掲載期間・無効応募の扱いは公式に記載がなく要確認。別途、掲載課金プランも存在するため、応募課金プランを選んで申し込む必要がある。応募の発生は採用を保証しない。', '求職者からの応募件数（1応募ごとに課金）', 'lead', 'optional_plan', false, false, 'アルバイト採用を行う企業', array['応募1件ごとの課金', '初期費用・月額基本料0円', 'アルバイト採用向け', '掲載課金プランも別途あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://gigabaito.com/forkigyo', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gigabaito-apply-billing' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gratitude-factory-referral', 'Gratitude Factory 完全成功報酬型人材紹介', '株式会社Gratitude Factory', '採用決定まで費用がかからず、紹介料が一律50万円（年収401万円以上は年収の25%）の完全成功報酬型の人材紹介。', '株式会社Gratitude Factoryは、完全成功報酬型の人材紹介サービスを提供しています。公式サイトには、初期費用・月額固定費はなく、料金は一律50万円（消費税別）と記載されています。年収401万円以上の求人については年収の25%が請求されます。

返金規定は、基本の50万円の場合、採用した人材が30日以内に退職したときに半額返金です。年収の25%で請求する場合は、30日以内の退職で70%、3か月以内の退職で50%が返金されると記載されています。

対象は正社員・契約社員・パート・アルバイト・留学生・外国籍人材で、ホテル、介護、IT、物流倉庫、製造、飲食小売などの業種に対応しています。ご利用の流れや紹介までの期間などの詳細は、公式サイトに記載がないため要問い合わせです。', null, 'https://gratitude-factory.com/employer/recruit-service', 'free', '0円（公式に初期費用なしと記載）', 'free', '0円（公式に月額固定費なしと記載）', '一律50万円（税別）。年収401万円以上の求人は年収の25%', '返金規定の期間を過ぎた退職は返金対象外。年収401万円以上は50万円ではなく年収の25%となり、金額が上がる点に注意。', '紹介した人材の採用決定時', 'hire', 'success_only', true, false, '正社員・契約社員・パート・アルバイト・外国籍人材を採用したい企業', array['完全成功報酬型で初期費用・月額固定費なし', '紹介料は一律50万円（高年収は年収の25%）', '早期退職時の返金規定あり', '外国籍人材・アルバイトも対象']::text[], 'unpartnered', false, true, true, 'verified', 'https://gratitude-factory.com/employer/recruit-service', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gratitude-factory-referral' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('wizardz-plus-costdown', '完全成功報酬型コスト削減コンサルティング', '株式会社ウィザーズプラス', '初期費用・月額固定費なしで、コスト削減が実現できた場合のみ、年間削減額に一定料率を掛けた額が報酬となるコスト削減コンサルティング。', '株式会社ウィザーズプラスが提供する、コスト削減の完全成功報酬型コンサルティングです。公式サイトでは、企業側に特定の初期費用や毎月発生する固定費用の負担が一切なく、コンサルフィーは削減が実現できた場合のみ発生すると説明されています。

報酬は年間削減額に一定の料率を掛けた額のみとされ、1年間のコスト削減額を基準とするため、未来永劫フィーが発生するものではないと記載されています。公式FAQでは、報酬料率は支援する案件の数や1件あたりのボリュームなどを勘案し、支払い条件を含めてお客様ごとに設定するとされています。

公式サイトでは削減成功率97%、平均削減効果は年間10%、平均3～4ヶ月で削減を実現するとしています。具体的な料率、最低料金、契約期間、対象となるコスト費目の範囲は公式サイトに記載がないため要問い合わせです。', null, 'https://www.wizardz-plus.jp/services/costdown', 'free', 'なし(公式記載)', 'free', 'なし(公式記載)', '年間削減額に一定の料率を掛けた額(具体的な料率は公式サイトに記載なし。案件ごとに個別設定)', '料率の具体値、最低料金、契約期間は公式サイトに記載がないため要問い合わせ。報酬料率・支払い条件は案件数やボリュームを勘案して顧客ごとに設定される。1年間の削減額を基準とする旨の記載あり。', 'コスト削減が実現した場合のみ。年間削減額が課金対象の指標', 'other', 'success_only', true, false, 'コスト削減を検討する企業', array['初期費用・月額固定費なしと公式に明記', '削減額に応じた報酬のみが発生', '1年間の削減額を基準とし永続的な課金ではない', '料率・支払い条件は顧客ごとに個別設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.wizardz-plus.jp/services/costdown', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'wizardz-plus-costdown' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('shoubaisekkei-seika-lp', '成果報酬型LP制作(セールスライティング)', '商売設計株式会社', '売上の7～10%、またはリード1件550～880円の成果報酬で制作するLP制作プラン。着手金は累計成果報酬が50万円に達した後に差し引かれる。', '商売設計株式会社が提供する、セールスライターによる成果報酬型のLP制作プランです。公式ページでは、記事LP・販売用LPは着手金55,000円(ライティングのみ)または77,000円(ライティング+デザイン)に加え、売上の7%または10%が成果報酬と示されています。

LINEやメルマガ登録などのオプトインLPは、着手金が同額で、リスト1件あたり550円(ライティングのみ)または880円(ライティング+デザイン)の成果報酬です。金額はいずれも税込で、成果は定価ベースで計算され、値引き価格は含まれません。

着手金は、累計成果報酬額が50万円に到達した後、次回請求時に差し引かれる(値引き処理)と記載されています。また、この成果報酬型は突然取り止める場合があると公式ページに注記されています。契約期間や最低保証の有無は公式サイトに記載がないため要問い合わせです。', null, 'https://the-saleswriting.com/lp/lp-performance-reward/', 'paid', '着手金55,000円(ライティングのみ)/77,000円(ライティング+デザイン)税込。累計成果報酬額が50万円に到達後の次回請求時に差し引き', 'unknown', null, '売上の7%(ライティングのみ)/10%(ライティング+デザイン)、オプトインLPは1件550円/880円(税込)', '着手金が必ず発生し、累計成果報酬が50万円に達するまで差し引かれない(成果が出ない場合は返金等の記載なし)。値引き価格は成果に含まれない。この成果報酬型は突然取り止める可能性があると公式に注記。契約期間・最低保証・月額費用は公式サイトに記載なし。', '記事LP・販売用LPは売上、オプトインLPはリスト(登録)獲得件数。定価ベースで計算', 'lead', 'success_only', false, false, 'LP制作を成果連動で依頼したい事業者', array['売上連動(7%/10%)またはリスト1件単価(550円/880円)の料金表を公開', 'ライティングのみ/デザイン込みの2プラン', '着手金は累計成果報酬50万円到達後に差し引き', '月額固定費の記載なし(契約条件は要問い合わせ)']::text[], 'unpartnered', false, true, true, 'verified', 'https://the-saleswriting.com/lp/lp-performance-reward/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'shoubaisekkei-seika-lp' and c.slug = 'lp-production' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'shoubaisekkei-seika-lp' and c.slug = 'marketing-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('leadhunter-fullflat', 'LeadHunter(リードハンター)', 'ふるふら合同会社', 'アポイント獲得数に応じて1件20,000円が発生する成果報酬型の営業代行サービス。', '全国100万社以上のリストからターゲットを抽出し、AIを活用して公開メールアドレスへ直接アプローチする営業代行。成果報酬プランに月額固定費はなく、事前に定義したアポイント条件を満たした場合のみ1件20,000円が課金されます。商談対応は依頼企業側で行います。ただし初期費用50,000円〜が別途必要です。', null, 'https://leadhunter.jp/', 'paid', '50,000円〜', 'free', 'なし(成果報酬プラン)', 'アポイント1件あたり20,000円', '公式ページ上は初期費用50,000円〜、月額固定費なし。アプローチ手法はメール営業が中心です。', '事前に合意したアポイントの定義を満たす商談が成立すること。', 'appointment', 'success_only', false, true, '新規事業やテストマーケティングを行う中小企業から大手企業まで', array['全国100万社以上のリストから抽出', 'AI活用でターゲットを最適化', '初期5営業日でアプローチ開始可能', 'アポイント定義を事前に設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://leadhunter.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'leadhunter-fullflat' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kyworks-revenue-share', 'KYWorks レベニューシェア型アプリ開発', 'KYWorks', '開発費0円で共同開発し、収益が出たら50:50で分配するレベニューシェア型のアプリ・Webサービス開発。', 'アイデアを持つパートナーと技術を持つKYWorksが対等な立場で組む共同開発モデル。設計・プログラミング・テストの開発費は0円で、サービスから発生した広告収入や課金収入を50:50で分配します。収益が出なければ分配金もありません。運営の実費(ドメイン、サーバー、外部API)は別途かかります。', null, 'https://partner.kyworks.jp/', 'free', '0円(開発費)', 'paid', '運営実費のみ(Webサービス月700〜2,000円程度、iPhoneアプリ月1,800〜3,000円程度)', 'サービス収益の50%', '月額は開発会社への固定費ではなく運営の実費(ドメイン・サーバー・API利用料など)ですが、毎月発生します。法令違反や収益化の見込みがない案件は対応不可です。', 'サービスで広告収入・課金収入が発生した場合に、その50%を分配する。', 'sale', 'success_only', false, true, 'アイデアはあるが開発費がない個人・事業者', array['開発費0円', '収益50:50の折半', '着手まで通常1〜3週間', '相談無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://partner.kyworks.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kyworks-revenue-share' and c.slug = 'app-development' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'kyworks-revenue-share' and c.slug = 'system-development' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('scc-co-bs', 'co-Bs コラボレーション事業開発サービス', '株式会社SCC', 'システム開発費をSCCが負担し、事業で生じた収益を分配するレベニューシェア型の共同事業開発。', '依頼企業の事業構想とSCCのIT技術を組み合わせ、新規事業のシステムを共同で立ち上げます。システム開発費用はSCCが負担するため、依頼側は初期投資が不要。収益は両者で分配し、比率は事業検討時に協議します。', null, 'https://collaboration.scc-kk.co.jp/', 'free', '0円(システム開発費はSCC負担)', 'unknown', null, '事業収益の一部を分配(比率は協議)', '分配比率は公開されておらず、月額費用の記載もありません。要問い合わせ。アプリ専用ではなく新規事業向けのシステム開発全般が対象です。', '共同事業で収益が発生した場合に、合意した比率で分配する。', 'sale', 'success_only', false, true, '事業アイデアがあり、初期投資リスクを抑えたい企業', array['開発費をSCCが負担', '収益分配型の契約', '保守・運用も継続支援', 'サービス設計・業務設計の支援']::text[], 'unpartnered', false, true, true, 'verified', 'https://collaboration.scc-kk.co.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'scc-co-bs' and c.slug = 'system-development' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('givee-apo', 'Givee 完全成果報酬型アポ獲得', 'Givee株式会社', 'テレアポ・フォーム営業・紹介を組み合わせ、アポが獲得できた分だけ費用が発生する成果報酬型のアポ獲得サービス。', 'ターゲットリスト作成から営業代行(テレアポ・フォーム営業・FAXDM・紹介など)、レポーティングまでを一貫して担うアポ獲得サービス。公式ページでは初期費用・月額費用ともに無料で、アポが獲得できなければ費用は発生しないとされています。商材に応じてチャネルを組み合わせます。', null, 'https://givee.co.jp/lp/apo', 'free', '0円', 'free', '0円', null, 'アポ1件あたりの単価は公式ページに記載がなく、要問い合わせ。最低契約期間は「柔軟に対応」とのみ記載。「月間5社まで」「条件に合致したお客様のみ」の受付制限が表示されています。', 'アポイントが獲得できた件数に応じて費用が発生(アポの定義は要問い合わせ)。', 'appointment', 'success_only', true, true, 'SaaS・飲食・人材・美容・不動産・コンサルなど', array['テレアポ・フォーム営業・紹介を組み合わせ', '初期費用・月額費用0円', 'ターゲット設計からレポートまで一貫対応', '無料相談あり']::text[], 'unpartnered', false, true, true, 'verified', 'https://givee.co.jp/lp/apo', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'givee-apo' and c.slug = 'sales-outsourcing' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'givee-apo' and c.slug = 'form-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('apo-project', 'アポプロジェクト', 'アポプロジェクト', '提携営業マンの紹介ネットワークで、有効なアポイントが提供できた場合のみ課金される紹介営業型アポ獲得サービス。', '数百名の提携営業マンのネットワークを使い、関心を持つ企業・個人を紹介する紹介営業型のアポ獲得サービス。初期費用0円・月額0円で、有効なアポイントが提供できなければ費用は発生しません。BtoB/BtoC両対応。対応地域は東京・神奈川・千葉・埼玉。', null, 'https://apo-project.com/', 'free', '0円', 'free', '0円', null, 'アポ単価は非公開(見積制)。運営会社名はページ上で確認できていません。無効なアポは課金されない旨の記載あり。', '有効なアポイントの提供', 'appointment', 'success_only', true, true, 'BtoB・BtoC事業者(東京・神奈川・千葉・埼玉)', array['紹介営業(テレアポではない)', '提携営業マン数百名のネットワーク', 'BtoB/BtoC両対応', '無効アポは課金なし']::text[], 'unpartnered', false, true, true, 'verified', 'https://apo-project.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apo-project' and c.slug = 'referral-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('growth-innovation-appoint', '人材特化のアポイント代行', 'Growth innovation株式会社', '人材業界に特化し、初期費用0円・月額0円・アポ単価2万円〜の成果報酬で決裁者アポを獲得するサービス。', '人材業界(人材紹介・派遣等)に特化したアポイント代行。事前に定義したアポイント獲得時のみ課金され、初期費用0円・月額固定費0円、アポ単価2万円〜(業種・難易度で変動)です。', null, 'https://growth-in.co.jp/', 'free', '0円', 'free', '0円', 'アポ1件2万円〜', 'ターゲット業種・難易度により単価が変動します。', '事前に定義したアポイント(商談設定)の獲得', 'appointment', 'success_only', true, false, '人材業界関連企業', array['人材業界特化のトーク・リスト設計', '決裁者・有効商談を重視', '初期費用・月額0円']::text[], 'unpartnered', false, true, true, 'verified', 'https://growth-in.co.jp/service-appoint', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'growth-innovation-appoint' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('toreru-sales', '獲れるセールス', '獲れるコトバ執筆社', 'フォーム営業(文面作成・リスト抽出・送信)は無料で、アポ獲得1件29,800円のみ課金される成果報酬サービス。', '500万社データベースから6軸でターゲットを抽出し、AIと人間のコピーで問い合わせフォームへ営業文を送信します。セールスコピー作成・リスト抽出・フォーム送信は無料で、アポ獲得時のみ1件29,800円。初期費用0円・月額0円・契約期間の縛りなし。', null, 'https://toreru-kotoba.co.jp/', 'free', '0円', 'free', '0円', 'アポ1件29,800円', '税表記は公式ページで未確認です。', 'アポイントが獲得できたとき', 'appointment', 'success_only', true, false, 'BtoB企業', array['フォーム営業を成果報酬で提供', '500万社DBから6軸ターゲティング', 'AIパーソナライズ+人間のコピー', '契約期間なし']::text[], 'unpartnered', false, true, true, 'verified', 'https://toreru-kotoba.co.jp/sales', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'toreru-sales' and c.slug = 'form-sales' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'toreru-sales' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('linoarc-teleapo', '完全成果報酬型テレアポ代行', '株式会社リノアーク', '契約金・基本料金なしで、アポ単価(1万円〜、上限2万円)×商談実施件数のみ課金されるテレアポ代行。', 'テレアポ特化の完全成果報酬型代行。契約金、基本料金、トークスクリプト作成費は不要で、費用は「アポ単価×商談実施件数」のみ。1アポ10,000円〜、単価上限は20,000円。キャンセル時は取り直し対応。依頼は月20件程度から。', null, 'https://linoarc.co.jp/', 'free', '0円', 'free', '0円', 'アポ1件10,000円〜(上限20,000円)', '公式サイトを直接取得できず、検索結果に表示された公式ページの内容で確認しています。最新の条件は公式サイトでご確認ください。月間依頼は基本20件〜。', '商談が実施されたアポ', 'meeting', 'success_only', true, false, 'BtoB企業(取得難易度が極端に高くない商材)', array['アポ単価×商談実施件数のみ', 'トーク作成等の費用なし', 'アポ単価上限2万円', 'キャンセル時の取り直し対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://linoarc.co.jp/telephone.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'linoarc-teleapo' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('alfans-teleapo', 'IT・SaaS専門の完全成果報酬テレアポ代行', '株式会社alfans', 'IT/SaaS領域に特化し、初期費用無料・アポ獲得分のみの成果報酬で、リスト・スクリプト作成も料金内のテレアポ代行。', 'IT・SaaS企業向けに特化した完全成果報酬制のテレアポ代行。初期費用無料で、リスト作成・スクリプト作成・週次MTG・市場調査などはアポ費用に含まれオプション費用なし。1か月からのお試し契約が可能。', null, 'https://alfans.jp/', 'free', '無料', 'free', '成果報酬のみ(固定月額の記載なし)', null, 'アポ単価は非公開(要問い合わせ)。', 'アポイント獲得', 'appointment', 'success_only', true, true, 'IT・SaaS企業などBtoB', array['IT/SaaS特化', 'リスト・スクリプト作成が料金内', '専任ディレクター', '1か月から契約可']::text[], 'unpartnered', false, true, true, 'verified', 'https://alfans.jp/service/telapo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'alfans-teleapo' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('apobizco', 'アポビズコ', '株式会社シンシア', 'BtoB向けテレアポ代行。初期費用0円・月額0円で、アポ獲得時のみ課金(平均2万円前後)が基本プラン。', 'BtoB特化のテレアポ代行。基本プランは初期費用0円・月額固定費0円の成果報酬で、平均アポ単価は約2万円(9,000円〜50,000円の例)。検証フェーズ向けにコール課金を併用する任意プランもあります。', null, 'https://apobizco.com/', 'free', '0円', 'free', '0円', '平均20,000円/件(9,000円〜50,000円の例)', '成果報酬が基本。コール課金併用は任意のオプションです。', 'アポイント獲得時', 'appointment', 'optional_plan', false, true, 'SaaS、製造、士業、建設、IT等のBtoB企業', array['成果報酬が基本プラン', '業界別カスタムスクリプト', '決裁者アポ重視', '全国対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://apobizco.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'apobizco' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('sales-academia-shodan', '完全成果報酬型の商談獲得サービス', '株式会社セールスアカデミア', '1,500社ネットワークへのアンケートで関心企業を絞り込み、選んだ商談1件2万円(税別)のみ課金される紹介型サービス。', '1,500社のネットワークにアンケートを実施し、ニーズのある企業のリストを提示。依頼企業が商談したい先を選び、選択した分のみ支払います。初期費用0円・月額0円・最低契約期間なし。BtoB商材専用。', null, 'https://anketo-research.com/', 'free', '0円', 'free', '0円', '1商談あたり20,000円(税別)', '選択した商談のみ課金。競合する既存顧客の商材は対象外です。', '提示された関心企業リストから依頼企業が選択した商談', 'meeting', 'success_only', true, true, 'BtoB商材を持つ企業', array['アンケートで関心企業を事前選別', '選んだ分のみ支払い', '最低契約期間なし']::text[], 'unpartnered', false, true, true, 'verified', 'https://anketo-research.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'sales-academia-shodan' and c.slug = 'referral-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('takuwil-sales', 'タクウィル セールス', '株式会社エスプール', '顧問ネットワークを通じ、大手企業の経営層・決裁者との商談を設定する、月額固定費ゼロの成果型商談設定サービス。', '従業員1,000名以上の大手企業の役員・決裁者との商談設定に特化し、1.4万件超のデータベースを活用。月額固定費ゼロで商談単位の成果報酬です。', null, 'https://takuwil.spool.co.jp/', 'unknown', null, 'free', '0円(月額固定費ゼロ)', null, '商談単価は問い合わせ制。初期費用はページ上で確認できませんでした。', '決裁者との商談設定', 'meeting', 'success_only', false, true, '大手企業(従業員1,000名以上)の決裁者に商談を求めるBtoB企業', array['経営層・決裁者との商談設定', '顧問ネットワーク活用', '月額固定費ゼロ']::text[], 'unpartnered', false, true, true, 'verified', 'https://takuwil.spool.co.jp/about/takuwil-sales/lp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'takuwil-sales' and c.slug = 'referral-sales' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('remosell-call', 'REMOSELL Call', '株式会社エージェント', 'HR業界向けに、フリーランスが電話営業を行い、商談設定1件1〜5万円の成果報酬プランを選べるサービス。', '人事・採用担当宛の電話営業に特化。成果報酬プランは初期設定費10万円(税別)で月額固定なし、商談設定1万〜5万円または資料請求2,000〜10,000円(難易度で決定)。固定月額・従量課金のプランも別にあります。', null, 'https://agent-network.com/remosell/', 'paid', '100,000円(税別)', 'free', '成果報酬プランでは月額なし', '商談設定10,000〜50,000円/件 または 資料請求2,000〜10,000円/件', '法人向けのみ。他に月額固定・従量課金プランあり。', '商談設定または資料請求の獲得', 'appointment', 'optional_plan', false, false, 'HR・採用領域に営業する法人', array['HR業界特化', '求人サイト100以上からリスト化', '商談設定か資料請求を選択']::text[], 'unpartnered', false, true, true, 'verified', 'https://agent-network.com/remosell/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'remosell-call' and c.slug = 'sales-outsourcing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('soil-seika-influencer', '成果報酬型インフルエンサーマーケティング', 'SOIL株式会社', '初期費用0円・月額なしで、購入やLINE登録1件ごとに課金するインフルエンサー施策。', '初期費用0円、月額費用なしで、購入1件・LINE登録1件など成果地点ごとの単価で課金します。SNSライクな広告クリエイティブ制作とインフルエンサーネットワークを活用。', null, 'https://soilmkt.jp/', 'free', '0円', 'free', 'なし', '購入1件・LINE登録1件ごと(具体額は非公開)', '単価は公式ページ上で伏字、案件ごとの見積り。', '購入・LINE登録などの成果発生', 'sale', 'success_only', true, false, 'D2C・EC・アプリ等の事業者', array['初期費用0円・月額なし', '購入/LINE登録の件数課金', 'インフルエンサーネットワーク']::text[], 'unpartnered', false, true, true, 'verified', 'https://soilmkt.jp/service/influencer/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'soil-seika-influencer' and c.slug = 'sns' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('buzzil-seika-influencer', 'buzzil(バジル)', 'Performance Technologies Inc.', '売上が発生するまで費用ゼロの成果報酬型インフルエンサーマーケティング。', '初期費用・固定費ゼロで、売上発生に対してのみ費用が生じるインフルエンサーマーケティング。購買をゴールに設定し、データ解析で購買意欲の高いユーザーを特定します。', null, 'https://buzzil.co/', 'free', '0円', 'free', '0円', '売上に対する成果報酬(単価・料率は非公開)', '具体単価は非掲載。新規受付は月5社限定と案内されています。', '購買(売上)の発生', 'sale', 'success_only', true, false, 'コスメ・アパレル・ガジェット・SaaS等の事業者', array['初期費用・固定費ゼロ', '購買をゴールとした成果課金', '新規受付は月5社限定']::text[], 'unpartnered', false, true, true, 'verified', 'https://buzzil.co/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'buzzil-seika-influencer' and c.slug = 'sns' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('penglue-line-seika', 'Penglue(ペングルー)', '株式会社アイトリガー', 'LINE誘導とチャットボット接客を初期0円・月額0円・成果報酬で提供するサービス。', 'サイト離脱ユーザーをポップアップからLINEへ誘導し、チャットボット接客とプッシュ通知でフォローします。シナリオ制作・運用・分析まで含み、初期費用0円・月額0円で成果報酬額は案件ごとの合意。審査あり。', null, 'https://penglue.jp/', 'free', '0円', 'free', '0円', '案件ごとに合意(金額は非公開)', 'LINE公式アカウント費用は別途。成果地点・単価は公式ページに明記なし。実施には審査が必要です。', '両社合意の成果(案件ごと)', 'other', 'success_only', true, false, '自社サイトからLINE経由でCV獲得したい事業者', array['初期費用0円・月額0円', 'LINE誘導とチャットボット接客', '審査制']::text[], 'unpartnered', false, true, true, 'verified', 'https://penglue.jp/price/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'penglue-line-seika' and c.slug = 'line-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('zeals-chat-commerce-line', 'ZEALS チャットコマース', '株式会社ZEALS', 'AIチャットボットの制作・運用コスト不要で、成果が出るまで費用がかからないLINE活用型接客サービス。', 'LINE公式アカウントを使ったAIチャットボットによる接客・CV獲得を、制作費や運用コスト不要で提供。成果が上がるまで費用は発生しない旨が公式ページに明記されています。', null, 'https://zeals.co.jp/', 'free', '0円', 'unknown', null, null, '成果報酬の単価・成果地点・月額は公式ページに記載がなく、要問い合わせです。LINE公式アカウント費用は別途。審査あり。', '成果発生(具体条件は非公開)', 'other', 'success_only', false, false, 'LINEでの接客・CV獲得を行いたいEC等の事業者', array['制作・運用コスト不要', '成果が出るまで費用なし', '審査制']::text[], 'unpartnered', false, true, true, 'verified', 'https://chatcommerce.zeals.co.jp', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'zeals-chat-commerce-line' and c.slug = 'line-ops' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('prored-cost-management', 'プロレド・パートナーズ コストマネジメント', '株式会社プロレド・パートナーズ', '人件費以外50費目以上を対象に、削減できた金額に応じて報酬が発生する成果報酬型コスト削減コンサル。', '電気料金・不動産施設関連費・クレジットカード手数料など人件費以外50費目以上を対象に、分析・交渉・実行までを支援する成果報酬型のコスト削減サービス。報酬は実際の削減額に連動します。同社の他テーマには固定報酬型もあり、本件はコストマネジメント領域のみが対象です。', null, 'https://www.prored-p.com/', 'unknown', null, 'unknown', null, null, '公式FAQは成果報酬型と明記していますが、料率・初期費用の数値は非公開(要問い合わせ)です。', 'コスト削減が実現し成果が確定した場合に、削減額に応じて報酬が発生', 'other', 'success_only', false, false, '人件費以外の経費が一定規模ある法人', array['50費目以上に対応', '成果確定まで実行支援', '東証プライム上場']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.prored-p.com/business/low_cost_management/faq/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'prored-cost-management' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('citrus-app-monodukuri-support', 'Citrus App ものづくり補助金サポート', '合同会社Citrus App', 'ものづくり補助金の申請支援を、着手金なし・採択金額の12%で提供。不採択なら無料。', '補助金サポートからアプリ開発までワンストップで対応する合同会社Citrus Appのものづくり補助金支援。着手金はなく、採択された場合のみ採択金額の12%を支払います。不採択なら費用はかかりません。アプリ開発は別途見積もりで対象外です。', null, 'https://citrusapp.jp/', 'free', '0円', 'unknown', null, '採択金額の12%', '月額の記載はありません。アプリ開発は別途見積もり。', '補助金が採択された場合のみ', 'other', 'success_only', false, false, 'ものづくり補助金を検討する中小企業', array['着手金0円', '採択金額の12%', '不採択時は無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://citrusapp.jp/posts/monodukuri-hojo-app-develop', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'citrus-app-monodukuri-support' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('united-advisors-jizokuka', '持続化補助金申請支援(ユナイテッド・アドバイザーズ)', 'ユナイテッド・アドバイザーズ株式会社', '着手金なし・交付決定額の20%の成功報酬後払いで持続化補助金の申請を支援。', '小規模事業者持続化補助金の申請支援。着手金は不要で、補助金入金後に交付決定額の20%(税別)を支払う後払い方式。不採択の場合は報酬を請求しません。採択後の伴走支援を含みます。', null, 'https://jizokuka-hojokin.com/', 'free', '0円', 'unknown', null, '交付決定額の20%(税別)', '補助金入金後の後払い。月額の記載なし。', '補助金の交付が決定した場合のみ', 'other', 'success_only', false, false, '小規模事業者持続化補助金を申請する小規模事業者', array['着手金なし', '成功報酬後払い', '不採択時は請求なし']::text[], 'unpartnered', false, true, true, 'verified', 'https://jizokuka-hojokin.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'united-advisors-jizokuka' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('result-hojyokin-it-subsidy', 'リザルト IT導入補助金申請支援', '株式会社リザルト', '着手金なしの完全成功報酬で、採択された月に定額20万円(税抜)を請求するIT導入補助金支援。', 'IT導入補助金の申請から実績報告までを支援。着手金・月額なしで、採択された月にのみ申請支援料20万円(税抜)を請求します。不採択の場合は請求なし。料率ではなく定額の成功報酬です。', null, 'https://result-hojyokin.com/', 'free', '0円', 'free', '0円', '申請支援20万円(税抜)', '採択発表のあった月に請求。IT導入支援事業者登録+ツール登録は別途13万円(税抜)。', '補助金の採択が発表された場合のみ', 'other', 'success_only', true, false, 'IT導入補助金を利用したい事業者', array['着手金なし', '採択月に請求', '定額の成功報酬']::text[], 'unpartnered', false, true, true, 'verified', 'https://result-hojyokin.com/it_dounyu_hojyokin/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'result-hojyokin-it-subsidy' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('linkup-jizokuka-support', '経営サポートLINK UP 持続化補助金サポート', '経営サポート LINK UP', '持続化補助金を着手金0円・成功報酬後払いで支援(補助金額により20%/15%、上限25万円)。', '小規模事業者持続化補助金の申請支援。着手金は無料で、補助金50万円までは20%、51万円以上は15%(上限25万円)の手数料を補助金入金後に後払い。採択されなければ費用は請求されません。', null, 'https://temanashi-hojokin-support.com/', 'free', '0円', 'free', 'なし', '補助金50万円まで20%、51万円以上15%(上限25万円)', '屋号のみで、法人名は公式ページ上で確認できていません。補助金入金後の後払い。', '補助金が採択され受給した場合のみ', 'other', 'success_only', true, false, '事業開始1年以上・正社員5名以下の小規模事業者', array['着手金0円', '上限25万円の手数料', '後払い']::text[], 'unpartnered', false, true, true, 'verified', 'https://temanashi-hojokin-support.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'linkup-jizokuka-support' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('costsakugen-kanzen-seikou', '株式会社コスト削減 賃料・固定資産税適正化', '株式会社コスト削減', '賃料適正化・固定資産税・物件費の削減を、完全成功報酬・初期費用と固定費なしで提供。', '賃料適正化(平均5〜15%)や物件費削減(平均20%)、固定資産税の適正化を完全成功報酬制で実施し、削減できなければ費用は発生しません。固定資産税は還付金の入金後に報酬を支払います。', null, 'https://costsakugen.co.jp/', 'free', '0円(機器代金を除く)', 'free', '0円', null, '成功報酬率は非公開(要問い合わせ)。節電機器販売は別建て見積もりで対象外です。', '賃料・固定資産税・物件費が実際に削減(還付)できた場合', 'other', 'success_only', true, false, '賃借・不動産を保有する法人', array['賃料適正化', '固定資産税の適正化', '還付金入金後に報酬']::text[], 'unpartnered', false, true, true, 'verified', 'https://costsakugen.co.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'costsakugen-kanzen-seikou' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('solutionbank-cost-reduction', 'ソリューションバンク 間接コスト削減', '株式会社ソリューションバンク', '年間1000万円以上の間接コストを対象に、削減実績連動で報酬が発生するコスト削減サービス。', '賃料適正化やリバースオークション等で10〜50%程度の削減を目指すサービス。対象は年間1000万円以上(電力は4000万円以上)。支払いは実績連動型です。', null, 'https://solutionbank.jp/', 'unknown', null, 'unknown', null, null, '公式に「実績連動型支払い」と記載。料率・初期費用の数値は非公開(要問い合わせ)です。', 'コスト削減の実績に応じて支払い', 'other', 'success_only', false, false, '対象費目が年間1000万円以上(電力は4000万円以上)の企業', array['賃料適正化', 'リバースオークション', '削減率10〜50%']::text[], 'unpartnered', false, true, true, 'verified', 'https://solutionbank.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'solutionbank-cost-reduction' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('loosey-seika-hp', 'LOOSEY 完全成果報酬型ホームページ制作', 'LOOSEY株式会社', '制作費・月額・修正費0円でHPを制作し、成果が出て初めて報酬を受け取る制作会社。', 'ドメイン・サーバー費も含め制作費・月額・追加修正費を0円とし、問い合わせ・予約型、検索順位型、売上型、アクセス型の4モデルから成果に応じて報酬が発生します。制作後の運用サポートも実施。', null, 'https://loosey.net/', 'free', '0円', 'free', '0円', null, '単価・率は実例ページで案内され、トップでは非公開。実績掲載は2021年3月時点のため、最新の条件は公式サイトでご確認ください。', '問い合わせ/予約数・検索順位・売上・アクセス数のいずれかの成果が出た場合', 'lead', 'success_only', true, false, '集客目的のHPを持ちたい中小事業者', array['制作費・月額0円', '4種の成果モデル', '運用サポート付き']::text[], 'unpartnered', false, true, true, 'verified', 'https://loosey.net/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'loosey-seika-hp' and c.slug = 'site-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('bruceclay-seika-lp', 'ブルースクレイ・ジャパン 成果報酬型LP制作', 'ブルースクレイ・ジャパン株式会社', '現行LP比でCVRが120%以上改善した場合のみ制作費が発生するLP制作。', '現行LPと新LPをスプリットランテストし、CVR改善比120%以上のときに限り改善率に応じた制作費が発生します。未達なら費用ゼロ。', null, 'https://bruceclay.jpn.com/', 'free', '0円', 'unknown', null, '改善率に応じた制作費(非公開)', '金額は個別見積もり。月額の記載なし。', 'A/Bテストで現行LP比CVRが120%以上改善した場合', 'other', 'success_only', false, true, '既存LPを持つ広告・EC・不動産・人材などの事業者', array['CVR120%未満は無料', 'A/Bテストで検証']::text[], 'unpartnered', false, true, true, 'verified', 'https://bruceclay.jpn.com/lp/plp/pc/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bruceclay-seika-lp' and c.slug = 'lp-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('cvrbooster-seika-lp', 'CVRブースター 完全成果報酬型LP改善', 'ダブルビーゼット株式会社', '既存LPの改善は、CVRが110%改善するまで費用0円の成果報酬LPサービス。', '既存LP改善は初期費用・月額0円で、CVRが110%改善するまで費用は発生せず、改善しなければ全額無料。広告運用を依頼する場合は運用手数料10%。', null, 'https://cvrbooster.com/', 'free', '0円(既存LP改善の場合)', 'free', '0円', null, '成果報酬額は非公開。新規LP制作は15万円からで対象外。広告運用は別途手数料10%。', 'CVRが110%以上改善した場合', 'other', 'success_only', true, false, '既存LPを持ち広告集客している事業者', array['CVR110%達成まで0円', '初期費用・月額0円']::text[], 'unpartnered', false, true, true, 'verified', 'https://cvrbooster.com/service/lp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'cvrbooster-seika-lp' and c.slug = 'lp-production' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('takumi-lauren-seo', '匠Lauren 成果報酬型SEO', '匠Lauren株式会社', '1ページ目表示まで費用ゼロ、表示後は日額課金の成果報酬型SEO。', '対象キーワードが検索1〜10位に表示された場合のみ料金が発生し、達成の翌月末に請求。固定月額はなく、対策期間は無料。日額単価はキーワードごとの見積もり。契約期間は24か月。', null, 'https://takumi-lauren.co.jp', 'free', '0円', 'free', 'なし', 'キーワードごとの日額(非公開・見積)', '契約期間24か月。単価は個別見積。', '対象キーワードが検索1ページ目(1〜10位)に表示された日', 'other', 'success_only', true, true, null, array['1ページ目到達まで無料', '日々の順位で日額計算', '契約期間24か月']::text[], 'unpartnered', false, true, true, 'verified', 'https://takumi-lauren.co.jp/service/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'takumi-lauren-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('richall-seika-seo', 'リッチオール 完全成果報酬SEO', '株式会社リッチオール', '初期費用0円で、契約順位に到達してから料金が発生する成果報酬型SEO。', '希望キーワードが契約順位(10位または20位以内)に入って初めて日割りで課金される成果報酬プラン。10ヶ月・20ヶ月の契約単位です。', null, 'https://www.richall.jp/', 'free', '0円', 'unknown', null, '順位達成後の日割り課金(キーワードにより異なる)', '月額固定型プランは別にあり、本件は成果報酬プランのみ。月額は公式で未確認。', '希望キーワードが契約順位に入った日', 'other', 'success_only', false, false, 'SEOで上位表示を狙う事業者', array['初期費用0円', '順位達成後のみ課金', '10/20ヶ月契約']::text[], 'unpartnered', false, true, true, 'verified', 'https://richall.jp/plan1.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'richall-seika-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('crosswalk-seo-performance', 'クロスウォーク 成果報酬型SEO', '株式会社クロスウォーク', '指定順位(1〜10位から選択)に入った日数分だけ日割り課金する成果報酬型SEO。初期費用無料。', '契約キーワードが保証順位にランクインした日のみ課金。25日以上で月額全額、24日以内は日割り。初期費用は無料で、1か月分の保証金は終了時に返金されます。上位化後6か月契約。', null, 'https://crosswalk.co.jp', 'free', '0円(保証金として1か月分を預託・契約終了時に返金)', 'free', '固定費なし(ランクイン時のみ日割り)', '1キーワード日額100円(税込110円)〜、5キーワード月額15,000円(税込16,500円)が上限', '保証金あり。別ページの月額固定型プランは固定費が必要なため対象外で、成果報酬プランのみ該当。契約開始後4か月はキーワード変更不可。', '対象キーワードが選択した保証順位(1〜10位)に表示された日', 'other', 'success_only', false, false, '小規模〜大規模サイト', array['日割りの成果課金', '順位は1〜10位から選択', '保証金は返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.crosswalk-seo.com/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'crosswalk-seo-performance' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tonosama-reward-seo', 'TONOSAMA 成果報酬型SEO', '株式会社TONOSAMA', 'Googleで月4回以上10位以内に入ると課金される成果報酬型SEO。初期費用15,000円。', '成果報酬型プランは月額固定費なし。Googleで1か月に4回以上10位以内に表示された場合のみ課金し、月3回以下は無料。日額は1日400円〜でキーワード次第。契約6か月。', null, 'https://seo-taisacu.jp', 'paid', '15,000円', 'free', 'なし', '日額400円〜', '月額固定SEOも別プランで提供(選択制)。契約6か月。', 'Googleで1か月に4回以上10位以内に表示', 'other', 'optional_plan', false, false, null, array['10位以内で課金', '月3回以下は無料', '月額固定型と選択可']::text[], 'unpartnered', false, true, true, 'verified', 'https://seo-taisacu.jp/reward/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tonosama-reward-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('first-agent-seo', 'ファーストエージェント 成果報酬型SEO', '株式会社ファーストエージェント', '10位以内に入ったときのみ課金、1日96円〜の成果報酬SEO。', 'Yahoo・Google別の料金設定で、10位以内に表示された場合のみ料金が発生。月2,980円(日額約96円)から。10位以内に入らない場合は返金対応。', null, 'https://first-agent.jp', 'unknown', null, 'free', '固定費なし', '1日96円〜(月2,980円〜)', '初期費用・契約期間はページに記載なし(要問い合わせ)。', '10位以内に表示された場合', 'other', 'success_only', false, false, null, array['日額96円〜', 'Yahoo/Google別料金', '未達時は返金対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://first-agent.jp/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'first-agent-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('lintu-lawyer-branding-seo', '弁護士ブランディングラボ 成果報酬SEO', '株式会社リントゥ(デザイン事業部)', '弁護士向け。Google10位以内から日額1,100円、月額上限33,000円の成果報酬SEO。', '初期費用0円・月額固定費なし。Google検索で10位以内に達した日から課金開始し、日額1,100円(税込)、月額上限は33,000円(税込)。契約期間は1年で以降半年ごと更新。', null, 'https://lawyer-b-labo.jp', 'free', '0円', 'free', 'なし(月額上限33,000円・税込)', '日額1,100円(税込)/月額上限33,000円(税込)', '契約1年(以降半年更新)。', 'Google検索順位10位以内に達した日', 'other', 'success_only', true, false, '弁護士・法律事務所', array['弁護士業界特化', '月額上限あり', '初期費用0円']::text[], 'unpartnered', false, true, true, 'verified', 'https://lawyer-b-labo.jp/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'lintu-lawyer-branding-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('diamond-seo', 'DIAMOND SEO', 'ダイヤモンドグループ株式会社', 'Yahoo!・Google両方で10位以内、10日以上の達成を条件とする成果報酬SEO。', '初期費用0円・月額固定費なし。Yahoo!・Google検索ともに上位10位以内に掲載された日数に応じて日割りで報酬が発生し、10日以上の上位表示が成果達成条件。契約期間1年〜。', null, 'https://highdimension.co.jp', 'free', '0円', 'free', 'なし', 'キーワードごとに算出(非公開)', '契約1年〜。単価は非公開。', 'Yahoo!・Google両方で10位以内、かつ10日以上の上位表示', 'other', 'success_only', true, false, null, array['両エンジン10位以内', '10日以上の達成条件', '初期費用0円']::text[], 'unpartnered', false, true, true, 'verified', 'https://highdimension.co.jp/diamondseo/service/index.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'diamond-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('second8-seo', 'セカンドエイト 成果報酬課金型SEO', 'セカンド八株式会社', '初期費用あり、順位別日額(1〜5位3,064円/日など)の成果報酬SEO。固定月額なし。', '1〜20位の順位に応じた日額課金。1〜5位3,064円、6〜10位2,190円、11〜20位1,532円。初期費用は1ドメイン50,000円とキーワードごとのページチューニング15,000円。6か月更新制。', null, 'https://www.second8.co.jp', 'paid', '50,000円/ドメイン+15,000円/キーワード(税別)', 'free', '固定費なし', '1〜5位3,064円/日、6〜10位2,190円/日、11〜20位1,532円/日', '特定ジャンル(健康食品・ギャンブル・金融等)は保証金あり。6か月更新。', '20位以内に表示された日(順位帯別単価)', 'other', 'success_only', false, false, null, array['20位以内まで課金対象', '順位別単価', '6か月更新']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.second8.co.jp/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'second8-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('migoeito-seo-llmo-writing', '完全成果報酬SEO・LLMOライティング', '株式会社ミゴエイト', '記事へのアクセス(検索クリック)発生分だけ課金する成果報酬型SEO・LLMOライティング。', '初期費用0円・月額固定費0円。成果は検索からのクリック数で、アクセスゼロなら無料。月額の上限金額を設定でき、上限超過分は課金されません。月産1〜20記事。', null, 'https://migoeito.com', 'free', '0円', 'free', '0円', 'アクセス(クリック)単価は非公開、月額上限あり', '単価は個別設定。順位改善のみでは課金されません。', '記事への検索流入(クリック)の発生', 'click', 'success_only', true, true, null, array['月額上限設定可', 'LLMO/GEO/AIO対応', '専門ライター制作']::text[], 'unpartnered', false, true, true, 'verified', 'https://migoeito.com/lp/seo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'migoeito-seo-llmo-writing' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('whitefocus-seo-writing', '成果報酬型SEO記事制作(WHiTE Focus)', 'WHiTE Focus', '予約・問い合わせ・LINE登録・資料請求のCV件数に応じて課金する店舗向けSEO記事制作。', '初期費用0円・月額固定費0円で、費用はCV件数×成果報酬単価。CV対象はWEB予約、問い合わせ、LINE友だち追加、資料請求。飲食・サロン・治療院など店舗ビジネス向け。', null, 'https://www.whitefocus.jp', 'free', '0円', 'free', '0円', 'CV件数×成果報酬単価(個別見積)', '法人格は公式ページ上で確認できていません(屋号・個人運営の可能性)。アクセス解析環境のない事業者は非推奨。', 'WEB予約・問い合わせ送信・LINE友だち追加・資料請求のCV発生', 'lead', 'success_only', true, false, '飲食店・サロン・治療院などの店舗ビジネス', array['CV連動課金', 'GA4/ヒートマップ分析', '店舗集客特化']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.whitefocus.jp/seo-writing/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'whitefocus-seo-writing' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('cooboo-meo-performance', 'コーボー MEO対策 成果報酬プラン', '株式会社コーボー', 'Googleマップ3位以内の日のみ日額700円、月間上限21,700円の成果報酬プラン(固定プランと選択制)。', '4キーワードを対象に3位以内に表示された日に日額700円を課金、月間上限21,700円。初期費用0円。月額固定プランも別にありますが、成果報酬プランは固定費不要。契約6か月〜、口コミ獲得ツール付属。', null, 'https://www.cooboo.co.jp', 'free', '0円', 'free', '成果報酬プランは固定費なし(月間上限21,700円)', '日額700円(月間上限21,700円)', '固定プラン等と選択制。最低6か月。', '指定キーワードでGoogleマップ3位以内に表示された日', 'other', 'optional_plan', false, false, '店舗ビジネス', array['3位以内で日額課金', '月間上限あり', '口コミ獲得ツール付属']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.cooboo.co.jp/special/meo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'cooboo-meo-performance' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('actway-meo-performance', 'アクトウエイ 成果報酬型MEO', 'アクトウエイ株式会社', '指定キーワードがGoogleマップ上位3位以内の日のみ課金する成果報酬型MEO。', '初期費用0円、月額固定費なし。指定キーワードが1件以上上位3位以内に入った日のみ課金。契約時に1か月分の保証金を預かり解約時に返金。最大4か月の準備期間で未達なら解約可能。', null, 'https://actway.co.jp', 'free', '0円(保証金1か月分・返金)', 'free', 'なし', null, '日額単価は確認できず(要問い合わせ)。保証金あり。', '指定キーワードで1件以上3位以内に入った日', 'other', 'success_only', false, false, null, array['3位以内の日のみ課金', '保証金返金', '未達時解約可']::text[], 'unpartnered', false, true, true, 'verified', 'https://actway.co.jp/meo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'actway-meo-performance' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('growth-meo', 'グロースMEO', '株式会社トライハッチ', '来店予約1件ごとに800円〜課金する予約成功報酬型MEO。初期費用・月額0円。', '初期費用0円、月額固定費0円〜(広告出稿時は広告費実費)。予約成功報酬は800円〜で業種・エリア・客単価により個別見積。GBP最適化に加え予約導線(LP・広告)を組み合わせます。', null, 'https://growthmeo.jp', 'free', '0円', 'free', '0円〜(広告出稿時は実費)', '予約1件800円〜(個別見積)', '公式サイトを直接取得できず、同社のリリースで確認しています。広告費は別途実費。', '来店予約の発生(件数)', 'sale', 'success_only', true, false, '来店型ビジネス全般', array['予約件数連動', '順位ではなく予約で課金']::text[], 'unpartnered', false, true, true, 'verified', 'https://meo.tryhatch.co.jp/newsrelease/growth-meo-release', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'growth-meo' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('commit-monster', 'コミットモンスター', '株式会社エネイブル', '広告費も会社負担、問い合わせ等のCV単価で請求する完全成果報酬Web広告。', '初期費用0円で広告費も同社が負担し、月額料金はなし。請求は事前に取り決めた成果単価×CV数。成果は問い合わせ・見積依頼・資料ダウンロード。テスト運用3か月後は翌月から違約金なしで解約可。', null, 'https://commit-monster.ena-ble.com', 'free', '0円(広告費も当社負担)', 'free', 'なし', '成果単価×CV数(例:20,000円/件、個別設定)', '単価は事前合意。', '問い合わせ・見積依頼・資料ダウンロードの発生', 'lead', 'success_only', true, false, null, array['広告費負担0円', 'CV単価制', 'テスト3か月後違約金なし解約']::text[], 'unpartnered', false, true, true, 'verified', 'https://commit-monster.ena-ble.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'commit-monster' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('propagate-shukyaku-agent', '集客エージェント', '株式会社プロパゲート', '広告費・制作費込みで問い合わせ件数に応じ課金する成果報酬の集客代行。月間プロモ費200万円以上が対象。', '初期費用0円・月額0円、広告費・手数料・クリエイティブ・LP制作費も無料で、問い合わせ件数に応じて成果報酬を支払います。1業種1社限定、月間プロモーション費200万円以上の企業が対象。', null, 'https://www.shukyaku-agent.com', 'free', '0円', 'free', '0円', '問い合わせ1件あたりの単価(都度見積)', '対象は月間プロモ費200万円以上の企業に限定。', '問い合わせ件数', 'lead', 'success_only', true, false, '月間プロモーション費200万円以上の企業(1業種1社)', array['広告費・LP費も負担', '最短8週間で開始', '全国対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.shukyaku-agent.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'propagate-shukyaku-agent' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('gate-merchant-os', 'GATE 成果報酬型マーチャントOS', '株式会社イデア・レコード', '外食向け。予約は1人150円の成果報酬で、初期費用・月額固定費0円。', '集客・予約管理・注文・決済・CRMを一体運用する外食特化OS。初期費用0円・月額固定費0円で、予約成立1人あたり150円、在庫連携20円/件、オンライン決済は売上連動。', null, 'https://gate-series.com', 'free', '0円', 'free', '0円', '予約1人150円、在庫連携20円/件、オンライン決済は売上比例', '売上比例の料率は公式で未確認。', '成立した予約(人数)・オンライン決済の売上', 'sale', 'success_only', true, false, '飲食店・外食企業', array['予約人数課金', '集客から決済まで一体', '外食特化']::text[], 'unpartnered', false, true, true, 'verified', 'https://gate-series.com/allinone/package/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'gate-merchant-os' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('seika-plus-on', '成果プラスオン', '株式会社大信SE', '売上の20%を成果報酬とするWEB集客代行。初期費用・月額0円。', '法人・個人事業主向け。初期費用0円・月額固定費0円で、成果報酬は売上の20%。出張サービス業などニッチ業種に強く、ポータル・EC制作、SNS・広告を使った集客に対応。', null, 'https://plus-profits.com', 'free', '0円', 'free', '0円', '売上の20%', '売上連動のため、測定方法は契約時の確認が必要です。', '集客により発生した売上', 'sale', 'success_only', true, false, '法人・個人事業主(出張サービス業など)', array['売上連動20%', '初期費用0円', '全国対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://plus-profits.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'seika-plus-on' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('offerbox-success-plan', 'OfferBox 成功報酬型プラン', '株式会社i-plug', '新卒ダイレクトリクルーティングの成功報酬型プラン。初期費用・月額なしで内定承諾時のみ45万円/名。', '初期費用0円・月額固定費なしで、学生の入社合意(内定承諾)が発生した時点で1名45万円が課金されます。内定辞退時は全額返金。オファー枠40枠、利用期間最長13か月。', null, 'https://offerbox.jp/', 'free', '0円', 'free', '0円', '45万円/名', '早期定額型との選択制。', '学生の内定承諾(入社合意)時に課金。内定辞退は全額返金', 'hire', 'optional_plan', false, false, '新卒採用を少人数・低リスクで行いたい企業', array['内定承諾時のみ課金', '内定辞退は全額返金', '最長13か月利用可']::text[], 'unpartnered', false, true, true, 'verified', 'https://offerbox.jp/company/fee', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'offerbox-success-plan' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('paiza-tenshoku', 'paiza転職', 'paiza株式会社', 'ITエンジニア特化のスカウト型採用。初期費用・掲載費0円の成功報酬型。', 'ITエンジニア向けスキルチェック型の転職・スカウトサービス。初期費用・掲載費用0円で、採用が決まるまで費用がかかりません。成果報酬は理論年収の30%(ランクにより変動)。', null, 'https://paiza.jp/', 'free', '0円', 'free', '0円', '理論年収の30%(ランクにより変動)', 'ランク別率の詳細は公式ページ上で未確認。', '採用(入社)決定時に課金', 'hire', 'success_only', true, false, 'ITエンジニアを採用したい企業', array['初期費用・掲載費0円', 'スキルランクで候補者を可視化', 'スカウト送信']::text[], 'unpartnered', false, true, true, 'verified', 'https://paiza.jp/pages/recruiters/career/service', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'paiza-tenshoku' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mynavi-tenshoku-agent-booster', 'マイナビ転職AGENT Booster', '株式会社マイナビ', '求人広告の成果報酬型サービス。初期費用0円、入社時に理論年収の35%。', 'マイナビ転職への掲載を無料で行い、採用が決まった時のみ理論年収の35%(税別)を支払う成果報酬型の求人サービス。入社月末請求、入社90日以内の自己都合退職は50%返金。', null, 'https://tenshoku.mynavi.jp/', 'free', '0円', 'free', '0円(月額の記載なし)', '理論年収の35%(税別)', 'ハローワーク求人不受理期間の法人は対象外。', '入社(採用決定)時に課金', 'hire', 'success_only', true, false, '中途採用を行う法人', array['初期費用0円', '入社月末請求', '90日以内の早期退職で50%返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://tenshoku.mynavi.jp/publish_inquire/service/booster', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mynavi-tenshoku-agent-booster' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mynavi-tenshoku-agent', 'マイナビ転職AGENT(法人向け人材紹介)', '株式会社マイナビ', '人材紹介。初期費用0円、入社時に理論年収の35%の成功報酬。', 'マイナビの中途人材紹介サービス。求人登録・掲載は無料で、入社が確定した時点で理論年収×35%(税別)を支払います。入社90日以内の自己都合退職等は紹介手数料の50%を返金。', null, 'https://mynavi-agent.jp/', 'free', '0円', 'free', '成功報酬のみ(記載なし)', '理論年収の35%(税別)', '例:理論年収500万円・4月入社で4月末に175万円請求。', '入社確定時', 'hire', 'success_only', true, false, '中途採用を行う企業', array['初期費用0円', '入社月末請求', '90日以内の早期退職で50%返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://tenshoku.mynavi.jp/publish_inquire/service/agent', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mynavi-tenshoku-agent' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('recruit-agent', 'リクルートエージェント', '株式会社リクルート', '大手人材紹介。初期コストなしの成功報酬型。', 'リクルートの中途人材紹介サービス。申込から採用成立まで初期コストは発生せず、採用決定時のみ紹介手数料が発生します。早期退職時は契約の返金規定に基づき返金。', null, 'https://www.r-agent.com/business/', 'free', '0円', 'unknown', null, null, '料率は公式ページ非掲載(要問い合わせ)。入社6か月以内の自己都合退職は契約規定により返金。', '採用決定(入社)時に課金', 'hire', 'success_only', false, true, '中途採用を行う企業全般', array['初期コストなし', '早期退職時返金', '全職種対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.r-agent.com/business/service/price/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'recruit-agent' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('levtech-career-hire', 'レバテックキャリア(企業向け人材紹介)', 'レバテック株式会社', 'IT・クリエイター特化の人材紹介。入社まで費用なしの成功報酬型。', 'ITエンジニア・クリエイター向けの人材紹介。採用が決定して入社するまで費用は一切かからず、理論年収に応じた紹介手数料のみを支払います。', null, 'https://levtech.jp/partner/', 'free', '0円', 'unknown', null, '理論年収に応じた紹介手数料(料率非公開)', '公式記事は具体料率・月額に言及なし(要問い合わせ)。', '採用決定・入社時', 'hire', 'success_only', false, false, 'IT・クリエイター人材を採用したい企業', array['成功報酬型', 'IT・クリエイター特化']::text[], 'unpartnered', false, true, true, 'verified', 'https://levtech.jp/partner/guide/article/detail/280/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'levtech-career-hire' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('workgate-per-application', 'ワークゲート 応募課金プラン', 'ワークゲート株式会社', '掲載無料・応募発生時のみ課金。多数の求人サイトへ一括配信。', '一括配信型の求人広告サービス。初期費用・掲載料は無料で、応募1件ごとに課金。アルバイト・派遣系は1件3,300円〜、正社員系は6,600円〜(税別目安)。不自然な応募の課金除外申請制度あり。', null, 'https://www.workgate.co.jp/', 'free', '0円', 'free', '0円', '応募1件 3,300円〜(バイト・派遣系)/6,600円〜(正社員系)', '公式ページには税込3,850円/7,700円(基本)、5,500円/11,000円(プレミアム)の表記もあります。', '応募発生時に課金', 'lead', 'success_only', true, false, 'アルバイト・派遣・正社員を募集する企業', array['掲載無料', '応募課金', '課金除外申請制度']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.workgate.co.jp/inquiry/service/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'workgate-per-application' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('machbaito-success-plan', 'マッハバイト 成功報酬プラン', '株式会社リブセンス', 'アルバイト求人。初勤務まで掲載費無料、採用1名あたり5万円〜。', 'アルバイト求人サイトの採用課金プラン。初期費用・掲載費は無料で、採用者の初勤務完了後に課金。1採用5万円〜(エリア別)。掲載課金プランも別にあります。', null, 'https://machbaito.jp/', 'free', '0円', 'free', '0円', '1採用50,000円〜(エリアにより変動)', '都道府県・拠点数で変動。', '採用者の初勤務完了時に課金', 'hire', 'optional_plan', false, false, 'アルバイト採用を行う企業', array['掲載費無料', '初勤務後課金', 'エリア別単価']::text[], 'unpartnered', false, true, true, 'verified', 'https://machbaito.jp/lp/publication_plan', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'machbaito-success-plan' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('jobmedley-success', 'ジョブメドレー(成功報酬型)', '株式会社メドレー', '医療・介護・福祉の求人。初期費用・月額0円、採用1名7.2万円〜。', '医療・介護・福祉の求人サイト。初期費用0円・月額0円の成功報酬型で、入職して初めて採用1名あたり7.2万円〜(税込)が発生。毎月200通の無料スカウト。入職30日以内は最大90%返金。', null, 'https://job-medley.com/', 'free', '0円', 'free', '0円', '採用1名あたり7.2万円〜(税込)', '職種・雇用形態で変動。', '求職者の入職時に課金', 'hire', 'success_only', true, false, '医療・介護・福祉・保育施設', array['初期費用・月額0円', '月200通の無料スカウト', '早期退職返金保証']::text[], 'unpartnered', false, true, true, 'verified', 'https://employer.job-medley.com/services/job-medley', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'jobmedley-success' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('indeed-sponsored-jobs', 'Indeed スポンサー求人', 'Indeed Japan株式会社', '無料掲載+クリック課金。固定掲載料・採用成功報酬なし。', '求人検索エンジンIndeed。求人掲載は無料で、有料のスポンサー求人はクリック課金のみ。固定の月額料金や採用成功報酬はなく、予算は自社で設定できます。', null, 'https://jp.indeed.com/', 'free', '0円', 'free', '0円(固定費なし)', 'クリック課金(単価は入札により変動)', '採用の成否ではなくクリック数に応じた課金です。', '求人広告がクリックされた時に課金', 'click', 'optional_plan', false, false, 'あらゆる規模の求人企業', array['無料掲載', 'クリック課金', '予算・上限を自社設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://jp.indeed.com/hire/pricing', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'indeed-sponsored-jobs' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('stanby-cpc', 'スタンバイ クリック課金', '株式会社スタンバイ', '初期費用・掲載料無料、クリック課金のみ。成功報酬なし。', '求人検索エンジンスタンバイ。初期費用・掲載料金は無料で、クリック課金(1クリック20円〜)のみ。応募・採用時の追加料金はなく、日次・月次の予算上限設定が可能。', null, 'https://jinji.stanby.co.jp/', 'free', '0円', 'free', '固定費なし(最低出稿額の記載なし)', '1クリック20円〜', '採用の成否ではなくクリック数に応じた課金です。雇用形態で下限が異なります。', '求人のクリック時に課金', 'click', 'success_only', false, true, '正社員・アルバイト採用の企業', array['初期費用無料', 'クリック課金', '予算上限設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://jinji.stanby.co.jp/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'stanby-cpc' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('paiza-shinsotsu', 'paiza新卒', 'paiza株式会社', 'IT系新卒向けスカウト。初期費用・掲載費0円、成果報酬60万円から。', 'ITエンジニア志望の新卒学生向けスカウトサービス。初期費用・掲載費用0円で、成果報酬は採用1名あたり60万円から。インターン募集は初期費用・成果報酬とも0円。', null, 'https://paiza.jp/pages/recruiters/student/service', 'free', '0円', 'free', '0円', '60万円〜/名', 'インターン利用は初期費用・成果報酬0円。', '採用決定時に課金', 'hire', 'success_only', true, false, 'IT系新卒を採用したい企業', array['初期費用0円', 'スキルチェックで学生を可視化', 'インターン募集は無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://paiza.jp/pages/recruiters/student/service', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'paiza-shinsotsu' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('welmy-job', 'ウェルミージョブ', '株式会社エス・エム・エス', '介護・医療・障害福祉・保育特化の採用課金型求人媒体。初期・月額0円。', '介護・医療・障害福祉・保育の45以上の職種に特化した求人媒体。掲載数・期間の制限がなく、初期費用・月額費用は0円で、採用が決定した時点でのみ費用が発生します。早期退職時の段階的返金制度あり。', null, 'https://www.business.kaigojob.com/', 'free', '0円', 'free', '0円', '職種・資格・雇用形態により異なる(介護職員192,000円〜、看護師360,000円〜)', '早期退職時は3日以内100%、4〜14日70%、15〜30日50%返金。', '採用決定', 'hire', 'success_only', true, false, '介護・医療・障害福祉・保育事業者', array['初期・月額0円', '45職種以上対応', '掲載数・期間無制限', '早期退職返金制度']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.business.kaigojob.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'welmy-job' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('co-medical', 'コメディカルドットコム', '2ndLabo, Inc.', '医療・福祉36職種の採用時成果報酬型求人サイト。掲載無料。', '医療・福祉36職種に対応し、初期費用・月額0円、採用1人あたり4万円〜の成果報酬型。掲載期間・件数の制限なし。スカウト・選考管理機能も無料で、入職30日以内の退職には段階的な返金保証があります。', null, 'https://www.co-medical.com/', 'free', '0円', 'free', '0円', '1人4万円〜(看護師24万円〜、介護職6.4万円〜)', '7日以内100%、14日以内80%、30日以内50%返金。', '採用(入職)', 'hire', 'success_only', true, false, '病院・クリニック・介護施設・薬局等', array['36職種対応', '掲載件数・期間無制限', 'スカウト無料', '入職後30日返金保証']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.co-medical.com/publication_info/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'co-medical' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kaigo-tenshoku-navi', '介護転職ナビ', '株式会社ReSTA', '介護特化の完全成功報酬(人材紹介・採用課金)サービス。', '介護職に特化し、人材紹介と求人広告経由の採用課金の2種類を、採用が決まるまで費用がかからない成功報酬制で提供します。報酬額は職種・資格で異なります。', null, 'https://kaigo-career.jp/', 'free', '0円', 'unknown', null, '職種・資格により異なる(具体額は非公開)', '月額費用の明記はありません(要問い合わせ)。', '採用決定', 'hire', 'success_only', false, false, '介護事業所', array['人材紹介と採用課金の2形態', '事前面談によるマッチング', '完全成功報酬制度']::text[], 'unpartnered', false, true, true, 'verified', 'https://kaigo-career.jp/data.php?c=client', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kaigo-tenshoku-navi' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('go-job-driver', 'GOジョブ', 'GO Job Inc.', 'ドライバー専門の完全成功報酬型採用サービス。', 'ドライバー採用に特化し、求人票の作成代行や提携14媒体への掲載を含めて初期費用・月額0円。採用決定まで費用負担がなく、早期退職時の返金規定もあります。', null, 'https://gojob.go.goinc.jp/lp/client', 'free', '0円', 'free', '0円', null, '成功報酬額は公式ページに記載なし(要問い合わせ)。', '採用決定', 'hire', 'success_only', true, false, '運送・ドライバー採用企業', array['求人票作成代行無料', '大手14媒体と提携', '早期退職返金規定']::text[], 'unpartnered', false, true, true, 'verified', 'https://gojob.go.goinc.jp/lp/client', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'go-job-driver' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tsukulink-job', 'ツクリンクジョブ', 'ツクリンク株式会社', '建設業特化の採用課金型求人サイト。掲載無料。', '建設業に特化した求人サイトで、初期費用・掲載費用0円の採用課金型。アルバイト10万円、事務等の正社員30万円、職人の正社員50万円を1名採用ごとに課金します。', null, 'https://tsukulink.co.jp/', 'free', '0円', 'free', '0円', 'アルバイト10万円/正社員(事務等)30万円/正社員(職人)50万円(1名)', '公式ニュースにオープン記念の半額期間の記載があり、通常額を掲載しています。最新の条件は公式サイトでご確認ください。', '応募者の採用', 'hire', 'success_only', true, false, '建設会社・工務店・職人事業者', array['建設業特化', '採用課金型', 'SNS拡散機能']::text[], 'unpartnered', false, true, true, 'verified', 'https://tsukulink.co.jp/news/7/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tsukulink-job' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('jobken', 'ジョブケン', '株式会社Contraft', '建築・建設特化の求人サイト兼エージェント。完全成功報酬。', '建築・建設業界に特化した求人サイト。初期・月額費用は無料、掲載数無制限、スカウト機能も無料。エージェント利用時は職種・年齢により年収の20〜35%で、採用決定まで費用なし。', null, 'https://jobken.jp/', 'free', '0円', 'free', '0円', 'エージェント利用時は年収の20〜35%', '採用者の年収を聞き取って請求。早期退職時の返金規定あり。', '採用決定', 'hire', 'success_only', true, false, '建設・建築企業', array['掲載数無制限', 'スカウト無料', '早期退職返金規定']::text[], 'unpartnered', false, true, true, 'verified', 'https://jobken.jp/client/intro', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'jobken' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mynavi-yakuzaishi-employer', 'マイナビ薬剤師(企業向け)', '株式会社マイナビ', '薬剤師の成功報酬型人材紹介。初期・月額なし。', '薬剤師専任のアドバイザーが在籍し、採用が決まり内定者が入社するまで費用は発生しません。紹介手数料は理論年収の30〜35%で、早期退職時は成功報酬の一部返金制度があります。', null, 'https://pharma.mynavi.jp/employer/', 'free', '0円', 'free', '0円', '理論年収の30〜35%', '難易度・スキームで変動。', '内定者の入社', 'hire', 'success_only', true, false, '薬局・ドラッグストア・病院', array['成功報酬', '薬剤師専任アドバイザー', '早期退職一部返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://pharma.mynavi.jp/employer/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mynavi-yakuzaishi-employer' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('mynavi-kangoshi-employer', 'マイナビ看護師(企業向け)', '株式会社マイナビ', '看護師の成功報酬型人材紹介。', '医療業界専任のキャリアアドバイザーが在籍。初期費用ゼロで、看護師が入職するまで費用は発生しません。紹介手数料は理論年収の20〜35%、早期退職時は一部返金あり。', null, 'https://kango.mynavi.jp/employer/', 'free', '0円', 'free', '0円', '理論年収の20〜35%', '難易度・スキームで変動。', '看護師の入職', 'hire', 'success_only', true, false, '病院・クリニック・施設', array['成功報酬', '面接調整・条件交渉代行', '早期退職一部返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://kango.mynavi.jp/employer/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'mynavi-kangoshi-employer' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('nursepower-introduction', 'ナースパワー 看護師紹介', '株式会社ナースパワー人材センター', '初期費用ゼロの成功報酬型看護師紹介。', '全国に拠点を持つ看護師人材紹介。初期費用ゼロ・月額なしで、紹介看護師が入職した時点で料金が発生します。早期退職時の返金制度あり。', null, 'https://www.nursepower.co.jp/', 'free', '0円', 'free', '0円', null, '具体的な手数料率は非公開(要問い合わせ)。', '看護師の入職', 'hire', 'success_only', true, false, '病院・施設・クリニック', array['成功報酬', '全国拠点', '返金制度']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.nursepower.co.jp/saiyou/nurse_introduction/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'nursepower-introduction' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('shiftworks', 'シフトワークス 応募課金プラン', 'HR Solutions CORP.', 'アルバイト求人。応募課金プランは初期費用0円・応募が入るまで課金なし。', 'シフト型アルバイト求人。応募課金プランは初期費用0円で、応募1件7,500円〜(プランにより異なる)。月額固定費なし。掲載課金プランも別にあり、選択制です。', null, 'https://sftworks.jp/', 'free', '0円', 'free', '0円', '1応募7,500円〜22,000円(プランにより異なる)', '掲載課金プラン(4週25,000円〜)は固定費型で別プランです。', '応募の発生', 'lead', 'optional_plan', false, false, 'アルバイト採用企業・店舗', array['応募課金プラン', 'シフト条件マッチング', '複数シフト募集']::text[], 'unpartnered', false, true, true, 'verified', 'https://sftworks.jp/s/employers', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'shiftworks' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('careertasu-shukatsu-agent', 'キャリタス就活エージェント', '株式会社キャリタス', '内定決定時課金の成功報酬型新卒紹介。', '新卒採用の紹介サービスで初期費用・月額費用なし。内定決定の段階で報酬が発生し、採用が成立しなければ費用は一切かかりません。', null, 'https://www.career-tasu.co.jp/', 'free', '0円', 'free', '0円', null, '報酬額は公式ページに記載なし(要問い合わせ)。', '内定決定', 'hire', 'success_only', true, false, '新卒採用企業', array['成功報酬', 'ターゲット採用', '志向ヒアリング']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.career-tasu.co.jp/service/graduate/careertasu-shukatsu-agent/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'careertasu-shukatsu-agent' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('circus-agent', 'circusAGENT', 'circus.Inc', '約1,700社の人材紹介会社へ一括依頼できる成功報酬型プラットフォーム。', '求人を一度掲載すると約1,700社の紹介会社から推薦が届くプラットフォーム。初期・月額0円で、採用が決まった時のみ費用が発生します。契約・請求も一本化できます。', null, 'https://service.circus-group.jp/circus/forrecruiting/', 'free', '0円', 'free', '0円', '求人ごとに設定(報酬額は公式ページに記載なし)', '検索結果上の目安(中途は理論年収の34.5%)は公式以外の情報のため採用していません。', '入社(採用決定)', 'hire', 'success_only', true, false, '中途・新卒採用企業', array['約1,700社に一括依頼', '選考データ自動蓄積', '契約・請求一本化']::text[], 'unpartnered', false, true, true, 'verified', 'https://service.circus-group.jp/circus/forrecruiting/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'circus-agent' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('atgp-tenshoku', 'atGP転職', '株式会社ゼネラルパートナーズ', '障害者専門の成功報酬型転職メディア。', '障害者採用に特化し、スカウト送信は追加費用なし。採用成立時のみ理論年収の15%または25%が発生します。', null, 'https://www.atgp.jp/', 'free', '0円', 'unknown', null, '理論年収の15%または25%', '主要エリアで年収200万円以上は25%、それ以外は15%。初期・月額の明示はありません。', '採用成立', 'hire', 'success_only', false, false, '障害者雇用を行う企業', array['障害者専門', 'スカウト無料', '求人票作成〜配信まで支援']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.atgp.jp/employer/media', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'atgp-tenshoku' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('koujob', 'コウジョブ', '株式会社京栄センター', '工場・製造業特化の応募課金型求人サイト。', '初期費用0円・掲載料0円・掲載数無制限で、応募が入ってから1応募15,000円(職種・エリアで変動)を請求します。重複・いたずら応募は除外。原稿作成は無料。', null, 'https://koujob.com/', 'free', '0円', 'free', '0円', '1応募15,000円(変動)', '月末締め翌月末払い。', '応募の発生(重複・いたずら除く)', 'lead', 'success_only', true, false, '工場・製造業', array['応募課金', '掲載無制限', '予算上限設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://koujob.com/contents/company', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'koujob' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('senior-job', 'シニアジョブ', '株式会社シニアジョブ', '50歳以上特化の成功報酬型求人サイト。採用決定費2万円〜。', '50歳以上を採用する企業のみが掲載する求人サイト。掲載から採用まで無料で、採用決定費は2万円〜。オファー送信数に制限なし。返金制度はありません。', null, 'https://seniorjob.jp/', 'free', '0円', 'free', '0円', '採用決定費2万円〜', '返金制度なし(公式LPに明記)。1日でも就業した時点で採用扱い。', '採用決定(1日でも就業)', 'hire', 'success_only', true, false, '50歳以上を採用する企業', array['50歳以上特化', '掲載無制限', 'オファー無制限']::text[], 'unpartnered', false, true, true, 'verified', 'https://corp.senior-job.co.jp/service/seniorjob', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'senior-job' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('hoteres-success', 'HOTERES 成果報酬型サービス', '株式会社オータパブリケイションズ', 'ホテル業界専門求人サイトの成果報酬プラン。', '初期・月額0円で、入社時に成果報酬が発生。プランは4種で正社員は年収の3〜15%、パートは2万〜5万円。入社後30日以内の退職は100%返金。', null, 'https://hotel-ya.com/', 'free', '0円', 'free', '0円', '正社員は年収の3〜15%、パートは2万〜5万円(プランにより異なる)', 'プランにより料率が異なります。', '採用者の入社', 'hire', 'success_only', true, false, 'ホテル・宿泊施設', array['ホテル業界専門', '4つの料率プラン', '返金規定']::text[], 'unpartnered', false, true, true, 'verified', 'https://hotel-ya.com/contents/recruiter/success', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hoteres-success' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('hotel-ryokan-kyujin-com', 'ホテル・旅館求人コム', '株式会社プライムコンセプト', '掲載無料・採用決定時のみ課金の宿泊業特化求人サイト。', '求人掲載とスカウト送付は無料で、採用決定時のみ成果報酬が発生。初期費用0円。登録会員1万人超。', null, 'https://ryokankyujin.com/', 'free', '0円', 'unknown', null, null, '成果報酬額・月額は公式ページ上で確認できず、要問い合わせ。', '採用決定', 'hire', 'success_only', false, false, 'ホテル・旅館', array['掲載無料', 'スカウト無制限', '宿泊業特化']::text[], 'unpartnered', false, true, true, 'verified', 'https://ryokankyujin.com/info/rec/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hotel-ryokan-kyujin-com' and c.slug = 'job-ads' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('sekokan-kyujin-navi', '施工管理求人ナビ 人材紹介', 'ウィルオブ・コンストラクション', '施工管理等の建設技術者向け成功報酬型紹介。', '土木・建築・管工事・電気等の専門職を対象に、初期費用0円・月額なしの成功報酬型で紹介。入社時に手数料が発生し、早期退職時は返金保証があります。', null, 'https://sekokan-navi.jp/', 'free', '0円', 'free', '0円', null, '手数料率は要問い合わせ。', '候補者の入社', 'hire', 'success_only', true, false, '建設会社・設備工事会社', array['成功報酬', '専任営業・アドバイザー', '早期退職返金保証']::text[], 'unpartnered', false, true, true, 'verified', 'https://sekokan-navi.jp/saiyo/service/shokai/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'sekokan-kyujin-navi' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('globalstaff-construction', 'グローバルスタッフ 建設業人材紹介', '株式会社グローバルスタッフ', '建設業特化の成功報酬型紹介。理論年収の35%。', '建設業界特化のコンサルタントがピンポイント採用や非公開採用に対応。初期費用・月額・面接費用は無料で、採用決定時のみ理論年収の35%が発生します。', null, 'https://www.globalstaff.co.jp/', 'free', '0円', 'free', '0円', '理論年収の35%', 'フルコミッション営業職等は紹介困難。', '採用決定', 'hire', 'success_only', true, false, '建設・設備関連企業', array['建設業特化', '非公開採用対応', '面接費用無料']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.globalstaff.co.jp/field/introduction.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'globalstaff-construction' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('jaic-second-career', 'ジェイック 第二新卒紹介サービス', '株式会社ジェイック', '第二新卒・既卒の成功報酬型紹介。', '研修を受けた若手求職者と会える合同面接会に無料で参加でき、採用が決まった場合にのみ費用が発生します。初期・月額費用は無料で、早期退職時は返金保証があります。', null, 'https://www.jaic-g.com/', 'free', '0円', 'free', '0円', null, '報酬額は公式ページに記載なし(要問い合わせ)。', '採用決定', 'hire', 'success_only', true, false, '第二新卒・既卒を採用する企業', array['合同面接会に無料参加', '事前研修済み人材', '返金保証']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.jaic-g.com/service/adoption/midcareer_recruting_saiyo_college-4/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'jaic-second-career' and c.slug = 'recruitment-agency' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('seo-succeed', 'SEOサクセス', 'エクスファクション株式会社', '1ページ目表示日のみ日額課金の成果報酬SEO。', '指定キーワードが合意順位内に入った日のみ1日500円(税別)から課金し、ランク外の日は費用が発生しません。AI活用の被リンク施策とLLMO対策を併用。', null, 'https://seo-succeed.com/', 'unknown', null, 'free', '固定費なし', '1キーワード1日500円(税別)〜(順位達成日のみ)', '単価はキーワード難易度とサイト状況で個別見積もり。初期費用は公式ページに明記なし(要問い合わせ)。', '対象キーワードが合意した順位内(1ページ目)に表示された日', 'other', 'success_only', false, true, '不動産・士業・医療・EC等の中小〜大企業', array['順位達成日のみ日額課金', 'ランク外の日は無料', 'LLMO対策も併用']::text[], 'unpartnered', false, true, true, 'verified', 'https://seo-succeed.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'seo-succeed' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('social-link-seo', '成果報酬SEO対策', '株式会社ソーシャルリンク', '初期費用0円・月額固定費0円で、10位以内の日のみ順位帯別の日額を課金するSEO。', 'キーワードが10位以内に入った日だけ課金する日割り型の成果報酬SEO。1〜3位は1,500円〜、4〜6位は1,280円〜、7〜10位は980円〜(1キーワード1日あたり)。内部・外部対策を含む。', null, 'https://socal-link.jp/', 'free', '0円', 'free', '0円', '1〜3位1,500円〜/日、4〜6位1,280円〜/日、7〜10位980円〜/日', '税込表記か否かは公式ページに明記なし。', '対象キーワードが10位以内に表示された日', 'other', 'success_only', true, false, '自社サイトの検索順位を上げたい事業者', array['順位帯別の日額課金', '月額固定費0円', '内部・外部SEO対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://socal-link.jp/service/service-category3/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'social-link-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('hubnet-seo', '成果報酬SEO対策(大阪プラット)', '株式会社ハブネット', '着手料なし、Google10位以内の日のみキーワードランク別の日額を課金する大阪のSEO。', '着手料など成果報酬以外の費用は不要で、10位以内表示日のみ課金。Aランク1,404円/日、B 1,188円/日、C 864円/日。契約は1年単位。', null, 'https://osaka-plat.net/', 'free', '0円', 'free', '0円', 'A:1,404円/日、B:1,188円/日、C:864円/日', '契約は1年毎、最初の6か月は中途解約不可。1サイト2キーワードまで。', '対象キーワードがGoogle10位以内に表示された日', 'other', 'success_only', true, false, '大阪を中心とした中小企業', array['着手料0円', 'ランク別日額単価', '1サイト2キーワードまで']::text[], 'unpartnered', false, true, true, 'verified', 'https://osaka-plat.net/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'hubnet-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tomoshibi-seo', '成果報酬型SEO対策(トモシビ)', '株式会社トモシビ', '10位以内に入るまで費用0円、達成後にキーワード難易度別の月額成果報酬が発生。', '初期費用0円・固定費0円で、10位以内に入るまで費用なし。達成後は簡単な語15,000円〜、標準30,000円〜、競合の強い語50,000円〜(月額)。契約6か月で、期間内に入らなければ費用なしで終了。', null, 'https://tomo-shibi.co.jp/', 'free', '0円', 'free', '0円(達成後のみ成果報酬)', '月15,000円〜(簡単)、30,000円〜(標準)、50,000円〜(高難度)', '契約6か月、原則途中解約不可。', '検索順位が10位以内に入ること', 'other', 'success_only', true, false, '大阪を中心とした中小企業', array['10位以内到達まで0円', '難易度別3段階', '6か月で未達なら無料終了']::text[], 'unpartnered', false, true, true, 'verified', 'https://tomo-shibi.co.jp/service/seo-marketing/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tomoshibi-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('four-class-seo', '完全成果報酬型SEO対策(フォークラス)', 'フォークラス', '初期費用無料、順位に応じて日額課金し月額上限も設定できるSEO。', '成果が出なければ無料の成果報酬型SEO。順位帯ごとに単価が異なる日割りで、月額上限を設定できます。サブ5キーワードを無料で対策。', null, 'https://www.four-class.jp/', 'free', '0円', 'free', '成果連動(固定ではない)', '順位帯別の日額課金(単価は見積もりツールで確認)', '月額は成果連動の目安額で固定費ではありません。月額上限の設定が可能。', '対象キーワードが10位以内に表示された日', 'other', 'success_only', true, false, '自社サイトの順位向上を図る事業者', array['順位帯別の日額課金', '月額上限設定可', 'オンライン見積もりツール']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.four-class.jp/service/estimate/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'four-class-seo' and c.slug = 'seo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('star-meo', '成果報酬型MEOサービス(STAR)', 'STAR Co., Ltd', 'Googleマップ上位3位表示の日のみ1,000円/日を課金する店舗向けMEO。', '指定キーワードがGoogleマップの上位3位以内に表示された日のみ1日1,000円(税別)。最大6キーワードを設定でき、順位チェックツールを提供。契約期間は6か月。', null, 'https://star-inc.co/', 'free', '0円', 'free', '0円', '1,000円/日(税別)', '契約期間6か月。', '指定キーワードがGoogleマップ上位3位以内に表示された日', 'other', 'success_only', true, false, '飲食店・美容室・クリニック等の店舗型ビジネス', array['上位3位の日のみ日額課金', '最大6キーワード', '順位チェックツール']::text[], 'unpartnered', false, true, true, 'verified', 'https://star-inc.co/service/meo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'star-meo' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('frontier-meo', 'FRONTIER MEO(1日800円)', 'Smart FRONTIER', '名古屋エリア特化、Googleマップ上位3位の日のみ800円/日の成果報酬MEO。', '対策ワードが3位以内に表示された日のみ800円/日が発生。初期費用0円、1か月更新で最大8キーワードまで対応。', null, 'https://www.frontier-web.co.jp/', 'free', '0円', 'free', '0円', '800円/日', '契約は1か月更新。税表記は公式に明記なし。', '対策ワードが3位以内に表示された日', 'other', 'success_only', true, false, '名古屋エリアの店舗型事業者', array['800円/日の日額課金', '最大8キーワード', '1か月更新']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.frontier-web.co.jp/meo/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'frontier-meo' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('meo-innovation', 'MEO Innovation', 'ファーストイノベーション', '初期費用0円・日額1,000円、Googleマップ3位以内の日のみ課金するMEO。', '4つのキーワードのうち1つ以上が上位3位に入った日に1日1,000円を課金。3位以内に入らなければ費用なし。初期費用0円。', null, 'https://meo-innovation.com/', 'free', '0円', 'free', '0円', '1,000円/日', '最低契約期間・解約条件は公式ページに明記なし(要問い合わせ)。', '選定4キーワードの1つ以上がGoogleマップ上位3位に表示された日', 'other', 'success_only', true, false, '店舗型ビジネス', array['3位以内の日のみ課金', '4キーワード同時対策', '初期費用0円']::text[], 'unpartnered', false, true, true, 'verified', 'https://meo-innovation.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'meo-innovation' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('majisemi', 'マジセミ', 'マジセミ株式会社', 'BtoB向けウェビナー集客・運営。申込(リード)数に応じた課金。', 'ウェビナー企画から集客・運営まで一括支援。単発プランは初期費用・固定費不要で集客できた人数に応じて課金。1リード14,500円〜の単発型のほか、月額パッケージ型もあります。', null, 'https://majisemi.com/', 'free', '0円', 'unknown', null, '1リード14,500円〜(単発)、追加リード10,000円〜(Liteプラン)', '公式は「初期費用・固定費は一切不要」としていますが、月額・期間パッケージ型のプランも並存します。固定費なしは単発プランが対象と思われるため、契約前にご確認ください。', 'ウェビナーへの申込(リード)獲得', 'lead', 'optional_plan', false, false, 'IT・BtoBソリューション提供企業', array['25万人の独自データベース', '集客人数に応じた課金', '商談保証プランあり']::text[], 'unpartnered', false, true, true, 'verified', 'https://majisemi.com/service/lp_webinar/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'majisemi' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('target-media-whitepaper', 'BtoB成果報酬型リード獲得サービス', 'ターゲットメディア株式会社', 'ホワイトペーパーDL・ウェビナー申込を成果報酬で獲得するBtoBリード獲得。', '初期費用・月額費用・企画費なしの成果報酬型。ホワイトペーパーDLは3,500〜10,000円超(部署別)、ウェビナー申込は12,000円〜。最低予算や契約期間の縛りなし。', null, 'https://btobmarketing.tmedia.co.jp/', 'free', '0円', 'free', '0円', '資料DL 3,500〜10,000円超、ウェビナー申込12,000円〜', '問い合わせ・資料DLの単価は商材により異なります。', 'ホワイトペーパー・資料のダウンロード、ウェビナー参加申込', 'lead', 'success_only', true, false, 'BtoB商材を扱う企業', array['成果報酬のみ', '最低予算・期間縛りなし', '1〜3週間で配信開始']::text[], 'unpartnered', false, true, true, 'verified', 'https://btobmarketing.tmedia.co.jp/service/affiliate/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'target-media-whitepaper' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('bizocean-seminar', 'BtoB向け成果報酬型セミナー集客', 'Tribeck Inc.', '全国の会員基盤にセミナーを告知し、申込1件15,000円の成果報酬で集客。', '書式・テンプレートサイトbizoceanの会員にセミナーを告知。成果は申込1件15,000円で、開催2週間未満の場合は18,750円。', null, 'https://www.bizocean.jp/', 'unknown', null, 'unknown', null, '申込1件15,000円(開催2週間未満は18,750円)', '初期費用・月額は公式ページに記載なし(要問い合わせ)。', 'セミナーへの申込み1件', 'lead', 'success_only', false, false, '中小企業向けにセミナーを開催するBtoB事業者', array['成果報酬型(申込1件)', '会員基盤にセミナー告知']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.bizocean.jp/lp/insertion/seminar_2306/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bizocean-seminar' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('seminarbase-success', '完全成果報酬型セミナー・ウェビナー集客代行', 'XLab', 'セミナー申込1件を成果とし、目標未達分は返金する成果報酬のセミナー集客代行。', 'BtoBセミナー・ウェビナーの集客を代行し、申込確定1件を成果として課金。単価は個別決定。未達成分は返金する条項があります。', null, 'https://seminarbase.com/', 'unknown', '面談後お見積もり(ディレクション費・LP制作費)', 'free', '固定の月額費用なし', '申込1件あたり(単価は個別決定)', '初期の制作費の要否・金額は面談後の見積もり。', 'セミナー申込の確定1件', 'lead', 'success_only', false, true, '中小企業経営者向けにBtoBセミナーを開く事業者', array['申込1件で課金', '未達成分は返金', '個別単価設定']::text[], 'unpartnered', false, true, true, 'verified', 'https://seminarbase.com/service/customer/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'seminarbase-success' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('meetsmore-pro', 'ミツモア(事業者向け)', '株式会社ミツモア', '登録・月額0円で、成約時のみ手数料が発生する見積もり比較プラットフォーム。', '依頼者と事業者をつなぐ見積もりプラットフォーム。成約課金型は登録費・月額・応募手数料0円で成約手数料8〜35%。非対象依頼では見積もり送信料150円〜の応募課金型もあります。', null, 'https://meetsmore.com/', 'free', '0円', 'free', '0円', '成約手数料8〜35%(サービスにより異なる)、応募課金型は見積もり送信料150円〜', '応募課金型は成約前に見積もり送信料が発生します。', '依頼者との成約', 'matching', 'success_only', false, false, '士業・リフォーム・撮影・引越し等の事業者', array['登録費・月額0円', '成約時のみ手数料', '自動応募機能']::text[], 'unpartnered', false, true, true, 'verified', 'https://lp.meetsmore.com/lps/pro', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'meetsmore-pro' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('minimo-salon', 'minimo(ミニモ)サロン掲載', '株式会社MIXI', '初期費用・月額0円で、予約成立時のみ手数料がかかる美容系予約サービス。', '美容師・ネイリスト等の個人プロフィールから直接予約を受けられるサービス。初期費用・月額0円で、予約成立時のみ手数料(110〜880円・税込)が発生します。', null, 'https://minimodel.jp/', 'free', '0円', 'free', '0円', '予約1件あたり110〜880円(税込、施術料金により変動)', 'サロン都合のキャンセルにも手数料が発生します。', 'お客様の予約成立', 'other', 'success_only', true, false, '美容師・ネイリスト・エステティシャン等', array['予約成立時のみ課金', '初期費用・月額0円', '個人プロフィール型の直接予約']::text[], 'unpartnered', false, true, true, 'verified', 'https://minimodel.jp/info', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'minimo-salon' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('dental-jihi-shukanku', '歯科医院専門・自費患者の集患代行', '株式会社WEBマーケティング総合研究所', '歯科の自費診療向け。相談予約1件25,000円、有効電話1件3,000円の成果報酬(初期費用あり)。', '矯正・入れ歯・インプラント向けに治療特化サイトを制作し、SEOや広告も含めて運用。月額基本料は0円で、相談予約1件25,000円、20秒以上の電話1件3,000円を課金します。初期設定は10万円。', null, 'https://www.akibare-shika.jp/', 'paid', '100,000円(通常300,000円の割引価格)', 'free', '0円', '相談予約1件25,000円、有効電話(20秒以上)1件3,000円', '来院の有無にかかわらず予約・電話で課金。契約期間1年、以降は月次自動更新。', '相談予約フォーム送信、または20秒以上の電話着信', 'lead', 'success_only', false, false, '自費診療に注力する歯科医院', array['治療別の専用サイト制作', 'SEO・広告込みで運用', '予約・電話に課金']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.akibare-shika.jp/jihi', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'dental-jihi-shukanku' and c.slug = 'lead-generation' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('invox-cost-analysis', 'invoxコスト分析', '株式会社invox', '電気・ガス・複合機・通信費など多数の費目を削減できた場合のみ課金されるコスト削減サービス。', '電気、ガス、複合機、通信費、清掃、警備、決済手数料など幅広い固定費を分析・削減。初期費用・月額費用は不要で、実際に削減できた年間削減額に契約年数別の料率を掛けた額のみ支払います。', null, 'https://invox.jp/cost/', 'free', '0円', 'free', '0円', '年間削減額の30〜50%(契約年数で逓減)', '削減できた場合のみ費用が発生します。', '実際にコスト削減が実現した場合のみ、削減額に応じて報酬が発生', 'other', 'success_only', true, true, 'コスト削減を図る法人全般', array['多費目に対応', '初期費用・分析費用0円', '削減額ベースの料率']::text[], 'unpartnered', false, true, true, 'verified', 'https://invox.jp/cost/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'invox-cost-analysis' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('enecloud-denki-sakugen-cloud', '電気削減クラウド', 'エネクラウド株式会社', '電力会社の入札で法人の電気料金を削減し、削減できた分の一部のみを受け取るサービス。', '全国の電力会社による競争入札で法人の電気料金を見直します。実際に削減できた電気代の一部をいただく仕組みで、削減できなければ無料。', null, 'https://enecloud.co.jp/', 'unknown', null, 'unknown', null, '実際に削減できた電気代の一部(料率は非公開)', '削減できなければ完全無料と記載。初期費用・月額の明示記載は確認できず、料率も非公開(要問い合わせ)。', '電気代が実際に削減できた場合のみ課金', 'other', 'success_only', false, true, '電力使用量の多い法人', array['電力会社の入札', '毎年の再オークション']::text[], 'unpartnered', false, true, true, 'verified', 'https://enecloud.co.jp/sakugen/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'enecloud-denki-sakugen-cloud' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('kwin-credit-fee-reduction', 'クレジット決済手数料削減(クリニック向け)', '株式会社Kwin', 'クリニックのクレジット決済手数料を下げ、削減額に応じて課金される成果報酬サービス。', 'VISA/Mastercardを2.5%以下、JCB/AMEXを4.0%まで引き下げる決済手数料削減サービス。初期費用・月額費用は無料で、削減できた分に応じた成功報酬のみを支払います。', null, 'https://kwin.co.jp/', 'free', '0円', 'free', '0円', '月次の削減額に対する一定割合(料率は非公開)', null, 'クレジット決済手数料が実際に削減された場合', 'other', 'success_only', true, false, 'クリニック', array['決済手数料を引き下げ', '新規開業から既存院まで対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://kwin.co.jp/service/credit/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'kwin-credit-fee-reduction' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('actpro-chinryo-gengaku-concierge', '賃料減額コンシェルジュ', 'アクトプロ', '賃料の減額交渉を代行し、減額できた場合のみ減額月数分の報酬を受け取るサービス。', 'オフィス・店舗・倉庫等の賃料減額を支援。着手金・コンサル費用なしで、減額できなければ0円。報酬は月額削減額の10か月分(一括)または12か月分(分割)。', null, 'https://chinryo-gengaku.com/', 'free', '0円', 'free', '0円', '月額削減額の10か月分(一括)または12か月分(分割)', '対象は月額賃料100万円以上の物件など条件あり。', '賃料の減額が成立した場合', 'other', 'success_only', true, true, '月額賃料100万円以上の物件を賃借する法人', array['無料査定', '減額月数分の成功報酬']::text[], 'unpartnered', false, true, true, 'verified', 'https://chinryo-gengaku.com/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'actpro-chinryo-gengaku-concierge' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('bizcube-rent-optimization', '賃料適正化コンサルティング', 'ビズキューブ・コンサルティング株式会社', '店舗・オフィスの賃料減額交渉を初期費用・調査料ゼロで行い、成立時のみ報酬が発生。', '多店舗の小売・飲食などの賃料を適正化。初期費用・調査料はゼロで、減額が成立しない場合は報酬が発生しません。', null, 'https://bizcube.co.jp/', 'free', '0円', 'unknown', null, '減額分に応じた報酬(料率は当該ページに記載なし)', '月額固定費の明示はありません(要問い合わせ)。', '賃貸借契約書の更新や覚書の締結により賃料減額が成立した場合', 'other', 'success_only', false, false, '多店舗の小売・飲食、複数物件を持つ企業', array['初期費用・調査料ゼロ', '減額成立時のみ報酬']::text[], 'unpartnered', false, true, true, 'verified', 'https://bizcube.co.jp/service/support/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'bizcube-rent-optimization' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('wiz-rent-optimization', '賃料適正化サービス(ワイズクラウド)', '株式会社Wiz', '店舗・オフィスの賃料を減額した場合のみ、減額幅の一部を報酬とするサービス。', '不動産鑑定士と弁護士のサポートで貸主との関係を維持しつつ賃料減額を交渉。着手金・月額なし、報酬は減額幅の一部。適正賃料診断は無料。', null, 'https://012cloud.jp/', 'free', '0円', 'free', '0円', '減額幅の一部(料率は非公開)', '適正賃料より高い物件のみ対象。', '賃料が減額された場合', 'other', 'success_only', true, true, '店舗・オフィスを賃借する企業', array['適正賃料診断が無料', '不動産鑑定士・弁護士が支援']::text[], 'unpartnered', false, true, true, 'verified', 'https://012cloud.jp/service/rent_optimization', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'wiz-rent-optimization' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('jpm-one-day-dx-consulting', '1日実践型DXコンサル', 'Japan Product Management合同会社', '業務改善で削減できた時間を金額換算した1年分のみ支払う、成果が出なければ0円のDXコンサル。', 'HP・LP制作、動画、簡易アプリ、事務作業などを1日で改善するDXコンサル。初期費用・月額費用なしで、削減時間を金額換算した1年分が報酬。', null, 'https://japanproductmanagement.com/', 'free', '0円', 'free', '0円', '削減時間を金額換算した1年分(12回分割可)', '事前に対象業務と測定方法を合意します。', '改善前後の工数比較で削減時間が確認できた場合', 'other', 'success_only', true, false, '業務効率化したい企業', array['削減時間を金額換算して課金', '12回分割払い選択可']::text[], 'unpartnered', false, true, true, 'verified', 'https://japanproductmanagement.com/services/dx-consulting', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'jpm-one-day-dx-consulting' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('yushi-daiko-pro', '融資代行プロ', '株式会社融資代行プロ', '着手金・月額0円、融資が実行された場合のみ融資額の1〜5%を支払う資金調達支援。', '元銀行員・公庫職員のコンサルタントが銀行融資などの資金調達を支援。相談・サポート費用は0円で、資金が実行された後にのみ成果報酬を請求します。', null, 'https://financing.web-matching.com/', 'free', '0円', 'free', '0円', '調達額の1〜5%(融資額が大きいほど料率が下がる)', '最低報酬や追加費用なし、顧問契約の義務なしと記載。', '金融機関から融資が実行された場合', 'contract', 'success_only', true, true, '創業期・中小・中堅企業', array['全国対応', '専門家のネットワーク']::text[], 'unpartnered', false, true, true, 'verified', 'https://financing.web-matching.com/lp/loan-agency/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'yushi-daiko-pro' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('freee-founding-loan-support', 'freee創業融資サポート', 'freee株式会社', '日本政策金融公庫の創業融資の獲得を支援し、融資実行後のみ融資額の5%を支払うサービス。', '事業計画書の作成から面談対策まで融資コンサルタントが一貫して支援。着手金0円で、融資が実行された場合にのみ融資額の5%が発生します。', null, 'https://www.freee.co.jp/', 'free', '0円', 'unknown', null, '融資額の5%', '月額の明示はありません。融資不承認なら費用なし。', '融資が実行された場合', 'contract', 'success_only', false, true, '創業・開業予定の事業者', array['日本公庫の創業融資に対応', '全国オンライン対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.freee.co.jp/founding-loan-support/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'freee-founding-loan-support' and c.slug = 'business-consulting' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('sucmof-digital-ai-subsidy', 'デジタル化・AI導入補助金 申請支援', '株式会社サクモフ', '手付金なしで、採択後に補助額の10〜15%を支払う補助金の申請支援。', 'デジタル化・AI導入補助金(旧IT導入補助金)の申請を支援。手付金なしで、申請支援は補助額の10%(最低8万円)、フルサポートは15%(最低12万円)。', null, 'https://sucmof.jp/', 'free', '0円', 'unknown', null, '補助額の10%(最低8万円)または15%(最低12万円)', '契約後に自己都合で申請しない場合は8.8万円が発生。月額の明示はありません。', '補助金が採択された場合', 'other', 'success_only', false, true, '中小企業', array['手付金なし', '支援範囲で10%/15%を選択']::text[], 'unpartnered', false, true, true, 'verified', 'https://sucmof.jp/it/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'sucmof-digital-ai-subsidy' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('azuma-gyosei-jizokuka', '小規模事業者持続化補助金 申請代行', '東亮介行政書士事務所', '着手金不要、採択時のみ補助額の15%を支払う持続化補助金の申請代行。', '大阪の行政書士事務所が小規模事業者持続化補助金の申請を代行。事前ヒアリングは無料で、採択時にのみ補助金額の15%を成功報酬として請求。不採択なら報酬なし。', null, 'https://www.azuma-gyosei.net/', 'free', '0円', 'unknown', null, '採択額の15%', '月額の記載なし。', '補助金が採択された場合', 'other', 'success_only', false, true, '小規模事業者・個人事業主', array['着手金不要', '行政書士による申請書作成']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.azuma-gyosei.net/lp-jizokuka.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'azuma-gyosei-jizokuka' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('ski-keiei-joseikin', '助成金 着手金無料の完全報酬制', 'ski経営サポートオフィス', '着手金無料で、助成金が支給されたときのみ25%(顧問契約時15%)を支払う助成金申請代行。', '神戸・姫路の社労士事務所が40種類以上の雇用関係助成金の申請を代行。着手金無料で、成果報酬は助成金額の25%(顧問契約時15%)。不支給の場合は全額返金。', null, 'https://keiei-sakai.com/', 'free', '0円', 'free', '0円', '助成金額の25%(顧問契約時は15%)', '顧問契約は任意。', '助成金が支給された場合', 'other', 'success_only', true, false, '雇用保険加入事業所', array['40種類以上に対応', '不支給なら全額返金']::text[], 'unpartnered', false, true, true, 'verified', 'https://keiei-sakai.com/joseikin/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ski-keiei-joseikin' and c.slug = 'grant' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('ykfc-shinjigyo-shinshutsu', '新事業進出補助金 申請支援(着手金0円プラン)', '株式会社YKフューチャーコンサルティング', '着手金0円プラン(成功報酬15%)を選択できる補助金申請支援。', '新事業進出補助金の申請を支援。基本プランは着手金あり、着手金0円プランは成功報酬15%(最低225万円)。不採択時は着手金無料で再申請(2回まで)。', null, 'https://ykfc.tokyo/', 'free', '0円', 'unknown', null, '補助額の15%(最低225万円)※着手金0円プランの場合', '基本プランは着手金150〜200万円+成功報酬10%。着手金0円プランは任意選択です。', '補助金が採択された場合', 'other', 'optional_plan', false, true, '新事業進出補助金を申請する中小企業', array['着手金0円プランあり', '不採択時は着手金無料で再申請']::text[], 'unpartnered', false, true, true, 'verified', 'https://ykfc.tokyo/services/subsidies-and-grants/shinjigyo-shinshutsu/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'ykfc-shinjigyo-shinshutsu' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('s-roots-shoryokuka', '中小企業省力化投資補助金(一般型) 申請支援', '株式会社ルーツ', '完全成果報酬型または着手金+成果報酬型を選べる補助金申請支援。', '東京・神奈川を中心に省力化投資補助金(一般型)の申請を支援。完全成果報酬型、または着手金+成果報酬から選択できます。', null, 'https://s-roots.com/', 'free', '0円', 'unknown', null, null, '成功報酬率は当該ページに記載なし(要問い合わせ)。案件により完全成果報酬が選べない場合があります。', '補助金が採択された場合', 'other', 'optional_plan', false, true, '省力化投資を行う中小企業', array['完全成果報酬型を選択可能']::text[], 'unpartnered', false, true, true, 'verified', 'https://s-roots.com/service/%E4%B8%AD%E5%B0%8F%E4%BC%81%E6%A5%AD%E7%9C%81%E5%8A%9B%E5%8C%96%E6%8A%95%E8%B3%87%E8%A3%9C%E5%8A%A9%E4%BA%8B%E6%A5%AD%EF%BC%88%E4%B8%80%E8%88%AC%E5%9E%8B%EF%BC%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 's-roots-shoryokuka' and c.slug = 'subsidy' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('tyco-on-meo-seika', 'MEO成果報酬サービス(TYCO-ON)', '株式会社TYCO-ON', '主要キーワードがGoogleマップ上位3位に入った場合のみ課金されるMEO対策。', '契約前に設定したキーワードで3位以内を達成した分のみ料金が発生し、未達成の月は料金ゼロ。追加請求や作業費はありません。', null, 'https://tycoon.co.jp/', 'unknown', null, 'unknown', null, '3位以内達成回数・キーワード数により変動(単価は非公開)', '初期費用の明示記載は確認できず、単価も非公開(要問い合わせ)。', '設定キーワードがGoogleマップ上位3位以内に表示された場合', 'other', 'success_only', false, false, '店舗・地域ビジネス', array['上位3位以内のみ課金', '未達成月は料金ゼロ']::text[], 'unpartnered', false, true, true, 'verified', 'https://tycoon.co.jp/service2/', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'tyco-on-meo-seika' and c.slug = 'meo' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('three-with-performance-influencer', 'THREE With(成果報酬型インフルエンサーマーケティング)', '株式会社3well', '初期費用0円・月額0円で、成果が出た分だけ支払う成果報酬型インフルエンサー施策。', 'Instagram・YouTubeなど複数SNSのインフルエンサー(審査制)を活用し、企画・分析・ディレクションまで行う成果報酬型サービス。初期費用・月額費用は0円で、請求は投稿月の月末、支払いは翌月末。', null, 'https://www.threewith.com/', 'free', '0円', 'free', '0円', null, '成果単価・成果の定義は公式ページに記載なし(要問い合わせ)。', '成果が出た分のみ支払い(成果指標の詳細は公式ページに記載なし)', 'other', 'success_only', true, false, '20〜30代女性向け商材のBtoC企業', array['初期費用0円・月額0円', 'インフルエンサーネットワーク', '企画・分析・ディレクションまで対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://www.threewith.com/client', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'three-with-performance-influencer' and c.slug = 'sns' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, pricing_model, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, review_status, source_url, last_verified_at)
values ('yaaha-tiktok-seika', 'TikTok広告運用代行(完全成果報酬型)', '株式会社Yaaha', 'TikTokのショート動画広告を、初期費用・運用手数料・動画制作費0円の成果報酬で運用。', 'TikTokを中心とした縦型ショート動画広告の企画・撮影・編集・配信・運用を一貫して請け負い、成果単価×成果件数のみで課金されます。', null, 'https://yaaha.co.jp/', 'free', '0円', 'free', '0円', '成果単価×成果件数(単価は要問い合わせ)', '公式サイト本文を取得できず、料金は同社のプレスリリースと公式サービス概要の記載で確認しています。最新の条件は公式サイトでご確認ください。', '広告経由のコンバージョン(定義は個別に合意)', 'other', 'success_only', true, false, 'TikTok広告で新規獲得を狙うBtoC企業・アプリ事業者', array['初期費用・運用手数料・動画制作費0円', '動画の量産', '企画から運用・PDCAまで一貫対応']::text[], 'unpartnered', false, true, true, 'verified', 'https://prtimes.jp/main/html/rd/p/000000007.000157690.html', '2026-10-06')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'yaaha-tiktok-seika' and c.slug = 'sns-ads' on conflict do nothing;

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
