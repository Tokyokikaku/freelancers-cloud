/**
 * 外注ドットコム お問い合わせ受け口（Google Apps Script）
 * フォーム → Vercel(/api/contact) → このスクリプト → スプレッドシート追記 + メール通知
 *
 * セットアップは README の「お問い合わせフォーム」を参照。
 * スクリプトプロパティに SECRET（Vercel の CONTACT_WEBHOOK_SECRET と同じ値）を登録しておくこと。
 */
var NOTIFY_TO = 'info@tyokikaku.co.jp';
var SHEET_NAME = '問い合わせ';
var HEADERS = ['受信日時', 'お名前', '会社名', 'メールアドレス', 'ご相談内容', 'User-Agent'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || data.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    lock.waitLock(10000);
    var now = new Date();
    var sheet = getSheet_();
    sheet.appendRow([now, data.name, data.company, data.email, data.message, data.userAgent]);
    lock.releaseLock();

    var body = [
      '外注ドットコムのフォームからお問い合わせがありました。',
      '',
      'お名前: ' + data.name,
      '会社名: ' + (data.company || '(未入力)'),
      'メール: ' + data.email,
      '',
      '【ご相談内容】',
      data.message,
      '',
      '記録: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
    ].join('\n');
    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: data.email, // 返信すると相手に届く
      subject: '【外注ドットコム】お問い合わせ: ' + data.name + ' 様',
      body: body
    });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
