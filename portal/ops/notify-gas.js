/**
 * 成果報酬ナビ：フォーム通知（Google スプレッドシート記録 ＋ メール通知）
 *
 * セットアップ（無料・約5分）
 * 1. Google スプレッドシートを新規作成（名前は何でも可）
 * 2. 拡張機能 → Apps Script を開き、このファイルの内容を貼り付けて保存
 * 3. 左の「プロジェクトの設定」→ スクリプト プロパティに追加
 *      SECRET = 任意の長いランダム文字列（Vercel の NOTIFY_WEBHOOK_SECRET と同じ値）
 *      NOTIFY_TO = 通知を受け取るメールアドレス（カンマ区切りで複数可）
 * 4. 右上「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
 *      実行ユーザー: 自分 / アクセスできるユーザー: 全員 → デプロイ（権限を承認）
 * 5. 表示された ウェブアプリ URL を Vercel の NOTIFY_WEBHOOK_URL に設定
 * ※ コードを修正したら「デプロイを管理」から新しいバージョンで再デプロイすること
 */
const HEADERS = {
  listing: ["受信日時", "種別", "会社名", "サービス名", "サービスURL", "課金の仕組み", "担当者名", "メール", "電話", "相談内容"],
  lead: ["受信日時", "請求サービス", "会社名", "法人番号", "氏名", "メール", "携帯電話", "検討時期", "従業員数", "業種", "部署", "役職", "ご要望", "流入元", "medium", "campaign"],
};
const SHEET = { listing: "掲載問い合わせ", lead: "資料請求" };

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (_) { return out("bad request"); }
  if (!props.getProperty("SECRET") || d.secret !== props.getProperty("SECRET")) return out("forbidden");
  const type = d.type === "lead" ? "lead" : "listing";

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET[type]) || ss.insertSheet(SHEET[type]);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS[type]);

  const at = Utilities.formatDate(new Date(d.at || Date.now()), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
  const row = type === "lead"
    ? [at, d.services, d.company, d.corporate_number, d.name, d.email, d.phone, d.timing, d.employees, d.industry, d.department, d.job_title, d.message, d.source, d.medium, d.campaign]
    : [at, d.topic_label, d.company, d.service_name, d.service_url, d.billing, d.name, d.email, d.phone, d.message];
  // 先頭が = + - @ のセルは数式として解釈されないよう文字列化
  sheet.appendRow(row.map((v) => (typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v == null ? "" : v)));

  const to = props.getProperty("NOTIFY_TO");
  if (to) {
    const subject = type === "lead"
      ? "[成果報酬ナビ] 資料請求: " + d.services
      : "[成果報酬ナビ] " + d.topic_label + ": " + d.company;
    const body = HEADERS[type].map((h, i) => h + ": " + (row[i] == null ? "" : row[i])).join("\n") + "\n\n" + ss.getUrl();
    MailApp.sendEmail(to, subject.slice(0, 200), body);
  }
  return out("ok");
}

function out(s) { return ContentService.createTextOutput(s); }
