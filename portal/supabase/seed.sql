-- 自動生成: `npm run seed:sql`（src/data/seed.json から生成）。直接編集しないでください。
-- 料金・成果報酬条件は公式サイトで確認できたものだけを記載しています。公開前に編集部で再確認してください。
begin;

insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales', '営業', 'sales', '営業代行には固定月額型と成果報酬型があります。成果報酬型では、アポイント獲得や商談実施など、あらかじめ決めた成果が発生した場合のみ料金が発生します。', 10, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('marketing', 'マーケティング', 'marketing', 'Web広告・SEO・アフィリエイト・SNS運用など、成果（クリック・問い合わせ・購入など）に応じて費用が発生するマーケティング施策を比較できます。', 20, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('customer-acquisition', '集客', 'acquisition', '店舗集客・MEO・インフルエンサーマーケティングなど、来店や予約といった成果に応じて費用が発生するサービスを比較できます。', 30, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment', '採用', 'recruitment', '求人広告・人材紹介・採用代行・スカウト代行のうち、採用決定など成果が出た場合にのみ費用が発生するサービスを比較できます。', 40, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('ec', 'EC', 'ec', 'EC集客・Amazon運用・楽天運用など、売上や注文に応じて費用が発生するEC支援サービスを比較できます。', 50, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('mna', 'M&A', 'mna', 'M&A仲介・事業承継支援サービスを比較できます。着手金や月額報酬の有無、成約時の成功報酬の考え方はサービスごとに異なるため、条件を確認して比較してください。', 60, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('funding', '資金調達', 'funding', '補助金・助成金の申請支援やファクタリングなど、資金調達に関するサービスを比較できます。', 70, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('other', 'その他', 'other', '上記以外の、成果報酬で利用できるサービスを掲載します。', 80, null, true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sales-outsourcing', '営業代行', 'sales', null, 11, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('tele-appointment', 'テレアポ代行', 'sales', null, 12, (select id from categories where slug = 'sales'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('web-ads', 'Web広告', 'marketing', null, 21, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('seo', 'SEO', 'marketing', null, 22, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('affiliate', 'アフィリエイト', 'marketing', 'アフィリエイトは、広告主が設定した成果（購入・申込・資料請求など）が発生した場合に広告費を支払う成果報酬型の広告です。サービスによって初期費用・月額固定費・手数料の有無が異なります。', 23, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('sns', 'SNS運用', 'marketing', null, 24, (select id from categories where slug = 'marketing'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('meo', 'MEO', 'acquisition', null, 31, (select id from categories where slug = 'customer-acquisition'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('influencer', 'インフルエンサーマーケティング', 'acquisition', null, 32, (select id from categories where slug = 'customer-acquisition'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('job-ads', '求人広告', 'recruitment', null, 41, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-agency', '人材紹介', 'recruitment', null, 42, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('recruitment-outsourcing', '採用代行', 'recruitment', null, 43, (select id from categories where slug = 'recruitment'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('ma-brokerage', 'M&A仲介', 'mna', null, 61, (select id from categories where slug = 'mna'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('subsidy', '補助金・助成金支援', 'funding', null, 71, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;
insert into categories (slug, name, icon, description, sort_order, parent_id, published) values ('factoring', 'ファクタリング', 'funding', null, 72, (select id from categories where slug = 'funding'), true)
  on conflict (slug) do update set name = excluded.name, icon = excluded.icon, description = excluded.description, sort_order = excluded.sort_order, parent_id = excluded.parent_id;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('masouken', 'M&A総合研究所', '株式会社M&A総合研究所', 'M&A・事業承継の仲介サービス。公式サイトに「着手金無料」「完全成功報酬制」との記載があります。', 'M&A総合研究所は、株式会社M&A総合研究所が提供するM&A・事業承継の仲介サービスです。公式サイトでは、譲渡企業（売り手）はM&A成約までの費用が不要であること、譲受企業（買い手）も着手金が無料であること、および「完全成功報酬制」を採用していることが案内されています。

M&A仲介の費用は、着手金・月額報酬・中間報酬・成功報酬など複数の項目で構成されるのが一般的で、会社ごとに条件が異なります。成功報酬の算出方法や料率、最低報酬額、対象となる案件規模などの詳細は、本ページには掲載していません。契約前に必ず公式サイトまたは担当者へ確認してください。', null, 'https://masouken.com/', 'free', '着手金なし（公式サイト記載）', 'free', '月額報酬なし（公式サイト記載）', null, '成功報酬の算出方法・料率は公式サイトをご確認ください。', 'M&Aの成約', 'contract', true, false, 'M&A・事業承継を検討している譲渡企業・譲受企業', array['公式サイトに「完全成功報酬制」との記載あり', '着手金が無料（譲渡企業・譲受企業とも）', 'M&A・事業承継の仲介に対応']::text[], 'unpartnered', false, true, true, 'https://masouken.com/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'masouken' and c.slug = 'ma-brokerage' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'masouken' and c.slug = 'mna' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('nihon-ma-center', '日本M&Aセンター', '株式会社日本M&Aセンター', 'M&A・事業承継の仲介サービス。着手金あり・成約時に成功報酬が発生する料金体系です。', '日本M&Aセンターは、株式会社日本M&Aセンターが提供するM&A・事業承継の仲介サービスです。公式サイトでは、中小企業から上場企業までを対象に、全国の地方銀行・信用金庫・会計事務所などと連携したネットワークを持つことが案内されています。

料金面では、着手金が発生すること（調査・資料作成の開始時に譲渡側から、本格的な情報提供の開始時に譲受側から）、成約時に成功報酬が発生することが公式サイトに記載されています。つまり固定費がゼロの「完全成果報酬」ではありませんが、成約時の成功報酬を含む料金体系のため、条件を比較する対象として掲載しています。具体的な金額・料率は本ページには掲載していませんので、公式サイトでご確認ください。', null, 'https://www.nihon-ma.co.jp/', 'paid', '着手金あり（金額は公式サイトをご確認ください）', 'unknown', null, '成約時に成功報酬が発生（算出方法は公式サイトをご確認ください）', null, 'M&Aの成約', 'contract', false, false, '中小企業から上場企業まで', array['M&A・事業承継の仲介に対応', '地方銀行・信用金庫・会計事務所などと連携したネットワーク', '着手金あり・成約時に成功報酬が発生']::text[], 'unpartnered', false, true, true, 'https://www.nihon-ma.co.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'nihon-ma-center' and c.slug = 'ma-brokerage' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'nihon-ma-center' and c.slug = 'mna' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('afb', 'afb（アフィb）', '株式会社フォーイット', '成果報酬型のアフィリエイト広告サービス。料金の詳細は公式サイトをご確認ください。', 'afb（アフィb）は、成果報酬型のアフィリエイト広告サービスです。公式サイトでは、累計の広告プロモーション実績やパートナーサイトのネットワーク規模が案内されています。

アフィリエイト広告は、広告主が設定した成果（購入・申込・資料請求など）が発生した場合に広告費を支払う仕組みです。ただし、初期費用・月額の固定費・手数料の有無や金額はサービスや契約内容によって異なります。広告主向けの具体的な料金は本ページでは確認できていないため、「要問い合わせ」としています。出稿を検討する場合は、公式サイトで最新の条件をご確認ください。', null, 'https://www.afi-b.com/', 'unknown', null, 'unknown', null, null, '広告主向けの料金体系は公式サイトをご確認ください。', '広告主が設定する成果（購入・申込など）', 'other', false, false, 'アフィリエイト広告の出稿を検討している広告主', array['成果報酬型のアフィリエイト広告', '多数のパートナーサイトのネットワーク（公式サイト記載）']::text[], 'unpartnered', false, true, true, 'https://www.afi-b.com/advertiser/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'afb' and c.slug = 'affiliate' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'afb' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('valuecommerce', 'バリューコマース', 'バリューコマース株式会社', '国内のアフィリエイトサービス。広告主向けの料金は公式サイトをご確認ください。', 'バリューコマースは、バリューコマース株式会社が提供するアフィリエイトサービスです。公式サイトでは、1999年にサービスを開始した国内のアフィリエイトサービスプロバイダーであること、多数の広告主とアフィリエイトサイトが登録されていることが案内されています。

アフィリエイト広告は、成果が発生した場合に広告費を支払う成果報酬型の広告手法です。ただし、広告主向けの初期費用・月額費用・手数料などの条件は、本ページでは確認できていないため「要問い合わせ」としています。出稿を検討する場合は、公式サイトの広告出稿に関する案内で最新の条件をご確認ください。', null, 'https://www.valuecommerce.ne.jp/', 'unknown', null, 'unknown', null, null, '広告主向けの料金は公式サイトの広告出稿に関する案内をご確認ください。', '広告主が設定する成果（購入・申込など）', 'other', false, false, 'アフィリエイト広告の出稿を検討している広告主', array['1999年にサービスを開始したアフィリエイトサービス（公式サイト記載）', '多数の広告主・アフィリエイトサイトが参加']::text[], 'unpartnered', false, true, true, 'https://www.valuecommerce.ne.jp/', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'valuecommerce' and c.slug = 'affiliate' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'valuecommerce' and c.slug = 'marketing' on conflict do nothing;

insert into services (slug, name, company_name, summary, description, logo_url, website_url, initial_fee_type, initial_fee, monthly_fee_type, monthly_fee, success_fee, pricing_note, success_condition, outcome_type, is_full_success_fee, has_free_consultation, target_companies, features, partner_status, featured, show_in_popular, published, source_url, last_verified_at)
values ('felmat', 'felmat（フェルマ）', 'ロンバード株式会社', 'アフィリエイトサービス。広告主向けの料金は公式サイトをご確認ください。', 'felmat（フェルマ）は、ロンバード株式会社が運営するアフィリエイトサービスです。公式サイトから広告出稿を検討する広告主向けの案内に進むことができます。

アフィリエイト広告は、成果が発生した場合に広告費を支払う成果報酬型の広告手法です。ただし、広告主向けの初期費用・月額費用・手数料などの条件は、本ページでは確認できていないため「要問い合わせ」としています。出稿を検討する場合は、公式サイトで最新の条件をご確認ください。', null, 'https://www.felmat.net/', 'unknown', null, 'unknown', null, null, '広告主向けの料金は公式サイトをご確認ください。', '広告主が設定する成果（購入・申込など）', 'other', false, false, 'アフィリエイト広告の出稿を検討している広告主', array['成果報酬型のアフィリエイト広告', '公式サイトから広告出稿の案内に進める']::text[], 'unpartnered', false, true, true, 'https://www.felmat.net/advertiser', '2026-10-05')
  on conflict (slug) do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, true from services s, categories c where s.slug = 'felmat' and c.slug = 'affiliate' on conflict do nothing;
insert into service_categories (service_id, category_id, is_primary) select s.id, c.id, false from services s, categories c where s.slug = 'felmat' and c.slug = 'marketing' on conflict do nothing;

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

insert into articles (slug, title, excerpt, body, category_id, published, published_at) values ('full-performance-based-pricing-checklist', '「完全成果報酬」とは？契約前に確認したいチェックポイント', '「完全成果報酬」と書かれていても条件はさまざま。着手金や月額費用の有無など、契約前の確認ポイントを整理します。', '## 「完全成果報酬」の意味

成果報酬ナビでは、**固定費・月額費用がなく、成果発生時のみ費用が発生するサービス**を「完全成果報酬」と定義しています。サービス各社が使う「完全成果報酬」「完全成功報酬」という表現が、同じ意味とは限らない点には注意が必要です。

## 契約前に確認したいポイント

- **着手金・初期費用はあるか**：成功報酬のほかに、契約時や業務開始時に費用が発生する場合があります。
- **月額報酬・リテイナーフィーはあるか**：M&A仲介などでは、月額で報酬が発生する料金体系もあります。
- **中間報酬・実費の扱い**：基本合意時などに中間報酬が発生するか、調査費用などの実費が別途かかるかを確認します。
- **成功報酬の算出方法**：取引金額に応じた料率なのか、定額なのか。最低報酬額が設定されていることもあります。
- **成果の定義**：どの時点で成果とみなされるのかを確認します。

## 掲載サービスの例（M&A仲介）

公式サイトの記載を確認した範囲では、[M&A総合研究所](/services/masouken)は着手金無料・完全成功報酬制と案内されています。一方、[日本M&Aセンター](/services/nihon-ma-center)は着手金が発生し、成約時に成功報酬が発生する料金体系と案内されています。同じM&A仲介でも、固定費の考え方が異なることが分かります。

最新の料金・条件は、必ず各サービスの公式サイトでご確認ください。', (select id from categories where slug = 'mna'), true, '2026-10-05T00:00:00+09:00')
  on conflict (slug) do nothing;
insert into article_services (article_id, service_id, sort_order) select a.id, s.id, 0 from articles a, services s where a.slug = 'full-performance-based-pricing-checklist' and s.slug = 'masouken' on conflict do nothing;
insert into article_services (article_id, service_id, sort_order) select a.id, s.id, 1 from articles a, services s where a.slug = 'full-performance-based-pricing-checklist' and s.slug = 'nihon-ma-center' on conflict do nothing;

commit;
