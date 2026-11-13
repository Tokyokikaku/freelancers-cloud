# アイコンを入れるバージョン（追記規定）

必要なシーンに限りアイコンを入れたい場合に、上のプロンプトへ追記して適用する規定。出典: 同上の記事。

## アイコン規定（追加）

### 使うもの
アイコンは Google の Material Symbols（Outlined・太さ400・塗りなし）だけを使う。絵文字・画像・他のアイコン集は使わない。
HTMLの<head>に次の1行を入れる。
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0" rel="stylesheet">
CSSは次を使う（色は配色規定のメイン色に置き換える）。
.material-symbols-outlined{font-size:32px;line-height:1;color:メイン色;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 32}
置き方は <span class="material-symbols-outlined">factory</span> のように、公式の名前をそのまま書く。

### 名前は次の一覧から選ぶ（一覧外は使わない）
人：person（人・担当者・個人顧客）groups（チーム・複数の人）badge（社員・従業員）engineering（技術者）support_agent（コールセンター・CS）supervisor_account（管理者・上司）manage_accounts（人事）account_box（会員・ユーザー）person_pin（現地の担当者）contact_page（顧客台帳）family_restroom（家族・世帯）school（学校）
組織・拠点：corporate_fare（企業・本社）domain（事業所・法人顧客）apartment（不動産・集合住宅）home（家庭・個人宅）storefront（店舗）store（販売店・代理店）local_mall（商業施設・量販店）factory（工場）warehouse（倉庫・物流拠点）account_balance（銀行・行政）local_atm（ATM・金融窓口）local_hospital（病院）local_pharmacy（薬局）medical_services（医療サービス）stethoscope（医師・診療）hotel（宿泊）restaurant（飲食）local_police（警察）local_post_office（郵便局）meeting_room（会議体）agriculture（農業・生産者）real_estate_agent（不動産業者）newspaper（メディア）cell_tower（通信事業者）solar_power（発電事業者）construction（建設業者）work（法人顧客・職場）business_center（オフィス）shield（保証・保険）umbrella（保険）health_and_safety（安全衛生）policy（規制当局・監査）
設備・輸送：precision_manufacturing（製造ライン）conveyor_belt（搬送ライン）forklift（荷役）local_shipping（トラック・物流会社）directions_boat（船・海運）flight（航空）train（鉄道）directions_bus（バス）directions_car（自動車）point_of_sale（レジ・POS）
システム：router（ネットワーク機器）database（データベース）storage（ストレージ）dns（サーバ）cloud（クラウド）lan（社内ネットワーク）computer（PC）devices（端末群）memory（半導体）smart_toy（AI）api（API連携）hub（プラットフォーム）network_node（ノード）
チャネル：shopping_cart（EC）shopping_bag（購買者）
一覧にない主体は、一覧の中で最も近い名前を使う（例：港→directions_boat、組合→groups）。近いものが無ければ、その主体にはアイコンを置かない。名前を作らない。

### 置き方
- 置くのは「主体」（人・組織・拠点・設備・システム・顧客）のノードだけ。工程・段階・KPI・表・グラフ・見出し・箇条書きの行頭には置かない。可否は図形で描き、チェックや矢印のアイコンは使わない
- 大きさは32px（密なレーンは24px。そのときは opsz も24）。ラベルの左に12px空けて横置き。丸や塗り面の中に入れない。1枚では1サイズ
- 色はメイン色1色。メイン色で塗った面の上だけ白にする。強調色はアイコンに使わない
- 1枚の個数は主体の数と同じにする（全部に置くか、置かない）。上限は7
- アイコンのあるページは資料の3割まで。種類は資料全体で8まで。同じ主体には同じアイコン（主体→名前の辞書を先に決め、資料を通して守る）
- アイコンのために型や主体の数を変えない。アイコンを全部消しても資料が成立すること
- 主体が出てこない資料（グラフ・表・工程が中心）は0個が正解。その場合は「アイコンなしを推奨する理由」を1文で返し、入れるなら「主体が現れる型に1枚だけ置き換える」案を示す

### 安全弁（必ず入れる）
存在しない名前が混ざるとアイコンの位置に英字が表示される。それを防ぐため、</body>の直前に次のスクリプトを入れる。フォントの読み込み後に、アイコン化されなかったもの（幅が文字サイズの1.3倍を超えるもの）を空にする。
<script>document.fonts.ready.then(function(){document.querySelectorAll('.material-symbols-outlined').forEach(function(e){var w=e.getBoundingClientRect().width,h=parseFloat(getComputedStyle(e).fontSize);if(w>h*1.3){e.setAttribute('data-invalid-icon',e.textContent.trim());e.textContent='';}});});</script>

### 報告
出力の最後に1行で報告する：「アイコン：n個・m種・p/Nページ（主体辞書：工場=factory、量販店=storefront …）」。一覧外の名前を使わなかったことも添える。
