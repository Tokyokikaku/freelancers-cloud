/**
 * スプレッドシート → Wix ブログ 自動投稿 (Google Apps Script)
 *
 * 「ステータス」が STATUS_READY (承認済み) の行を Wix Blog API で投稿し、
 * 結果 (記事ID / URL / 投稿日時 / エラー) をシートへ書き戻す。
 * セットアップは README.md を参照。
 */

const CONFIG = {
  SHEET_NAME: '', // 空なら先頭のシート
  STATUS_READY: '承認済み', // 人が「投稿してよい」と判断した行
  STATUS_DRAFTED: 'Wix下書き済み',
  STATUS_PUBLISHED: '公開済み',
  STATUS_ERROR: 'エラー',
  MAX_PER_RUN: 3, // 1回の実行で処理する最大件数 (6分の実行時間制限対策)
  // Markdown 変換時に有効にする Ricos プラグイン。変換結果がおかしい場合はここを調整する。
  RICOS_PLUGINS: ['HEADING', 'LINK', 'BLOCKQUOTE', 'DIVIDER'],
};

const COL = {
  TITLE: '記事タイトル',
  BODY: '本文',
  STATUS: 'ステータス',
};
const EXTRA_HEADERS = ['Wix記事ID', '投稿URL', '投稿日時', 'エラー'];

const WIX_API = 'https://www.wixapis.com';

/** メイン処理。時間トリガーから呼ぶ。 */
function postApprovedArticles() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10 * 1000)) return; // 二重実行を防ぐ
  try {
    const props = loadProps_();
    const sheet = getSheet_();
    const h = ensureHeaders_(sheet);
    const values = sheet.getDataRange().getValues();

    let done = 0;
    for (let r = 1; r < values.length && done < CONFIG.MAX_PER_RUN; r++) {
      const row = values[r];
      if (String(row[h[COL.STATUS]]).trim() !== CONFIG.STATUS_READY) continue;
      done++;

      const rowNo = r + 1;
      const set = (header, value) => sheet.getRange(rowNo, h[header] + 1).setValue(value);
      try {
        const title = String(row[h[COL.TITLE]]).trim();
        const body = String(row[h[COL.BODY]]);
        if (!title || !body.trim()) throw new Error('記事タイトルまたは本文が空です');

        // 前回「下書き作成だけ成功して公開に失敗」した行は、下書きを作り直さない
        let draftId = String(row[h['Wix記事ID']] || '').trim();
        if (!draftId) {
          const richContent = markdownToRicos_(props, prepareMarkdown_(body));
          draftId = createDraft_(props, title, richContent);
          set('Wix記事ID', draftId);
        }

        if (props.publish) {
          publishDraft_(props, draftId);
          set('投稿URL', getPostUrl_(props, draftId));
          set(COL.STATUS, CONFIG.STATUS_PUBLISHED);
        } else {
          set(COL.STATUS, CONFIG.STATUS_DRAFTED);
        }
        set('投稿日時', new Date());
        set('エラー', '');
      } catch (e) {
        set(COL.STATUS, CONFIG.STATUS_ERROR);
        set('エラー', String(e.message || e).slice(0, 500));
      }
    }
  } finally {
    lock.releaseLock();
  }
}

/** 1時間ごとに postApprovedArticles を実行するトリガーを作る (1回だけ実行)。 */
function installTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'postApprovedArticles')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('postApprovedArticles').timeBased().everyHours(1).create();
}

/**
 * 投稿者に使える member ID を調べるための補助関数 (セットアップ時に1回だけ手動実行)。
 * 結果は 表示 → ログ に出る。API キーに「Read Members」権限が一時的に必要。
 */
function listMembers() {
  const props = loadProps_({ needMember: false });
  const res = wixFetch_(props, '/members/v1/members?paging.limit=50', 'get');
  (res.members || []).forEach((m) => {
    const nickname = m.profile && m.profile.nickname;
    Logger.log([m.id, m.loginEmail || '', nickname || '', m.privacyStatus || ''].join('  |  '));
  });
}

/**
 * AI が書いた Markdown を Wix 投稿用に整える。
 *  - 先頭の「# タイトル」は Wix 側のタイトルと重複するので削る
 *  - 「> 📷 画像候補：…」「> 📊【図解候補】…」の引用ブロックは制作メモなので削る (他社画像の無断転載も防ぐ)
 */
const IMAGE_NOTE_START = /^>\s*(?:[📷📊📈🖼]|【?(?:画像|図解)候補)/u;

function prepareMarkdown_(md) {
  const lines = String(md).replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let skippingImageNote = false;
  let seenContent = false;

  for (const line of lines) {
    if (IMAGE_NOTE_START.test(line)) {
      skippingImageNote = true;
      continue;
    }
    if (skippingImageNote) {
      if (/^>/.test(line)) continue; // キャプション行など、同じ引用ブロックの続き
      skippingImageNote = false;
    }
    if (!seenContent && line.trim() === '') continue;
    if (!seenContent && /^#\s+/.test(line)) {
      seenContent = true;
      continue;
    }
    seenContent = true;
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function markdownToRicos_(props, markdown) {
  const res = wixFetch_(props, '/ricos/v1/ricos-document/convert/to-ricos', 'post', {
    markdown: markdown,
    options: { plugins: CONFIG.RICOS_PLUGINS },
  });
  if (!res.document) throw new Error('Markdown 変換の結果が空です: ' + JSON.stringify(res).slice(0, 200));
  return res.document;
}

function createDraft_(props, title, richContent) {
  const res = wixFetch_(props, '/blog/v3/draft-posts', 'post', {
    draftPost: { title: title, memberId: props.memberId, richContent: richContent },
    fieldsets: ['URL', 'RICH_CONTENT'],
  });
  return res.draftPost.id;
}

function publishDraft_(props, draftId) {
  wixFetch_(props, '/blog/v3/draft-posts/' + draftId + '/publish', 'post', {});
}

/** 公開後の記事URL。取得に失敗しても投稿自体は成功扱いにする。 */
function getPostUrl_(props, postId) {
  try {
    const res = wixFetch_(props, '/blog/v3/posts/' + postId + '?fieldsets=URL', 'get');
    const url = res.post && res.post.url;
    return url ? url.base.replace(/\/$/, '') + url.path : '';
  } catch (e) {
    return '';
  }
}

function wixFetch_(props, path, method, payload) {
  const options = {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: props.apiKey, 'wix-site-id': props.siteId },
    muteHttpExceptions: true,
  };
  if (payload !== undefined) options.payload = JSON.stringify(payload);
  const res = UrlFetchApp.fetch(WIX_API + path, options);
  const code = res.getResponseCode();
  const text = res.getContentText();
  if (code < 200 || code >= 300) throw new Error('Wix API ' + code + ' ' + path + ': ' + text.slice(0, 300));
  return text ? JSON.parse(text) : {};
}

function loadProps_(opts) {
  const p = PropertiesService.getScriptProperties();
  const props = {
    apiKey: p.getProperty('WIX_API_KEY'),
    siteId: p.getProperty('WIX_SITE_ID'),
    memberId: p.getProperty('WIX_MEMBER_ID'),
    publish: p.getProperty('PUBLISH') === 'true', // 既定は下書き止まり
  };
  const required = opts && opts.needMember === false ? ['apiKey', 'siteId'] : ['apiKey', 'siteId', 'memberId'];
  required.forEach((k) => {
    if (!props[k]) throw new Error('スクリプトプロパティが未設定です: ' + k);
  });
  return props;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return CONFIG.SHEET_NAME ? ss.getSheetByName(CONFIG.SHEET_NAME) : ss.getSheets()[0];
}

/** ヘッダー名 → 列番号(0始まり) の対応を返す。投稿結果用の列が無ければ右端に足す。 */
function ensureHeaders_(sheet) {
  let headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  EXTRA_HEADERS.forEach((name) => {
    if (headers.indexOf(name) === -1) {
      sheet.getRange(1, headers.length + 1).setValue(name);
      headers.push(name);
    }
  });
  const map = {};
  headers.forEach((name, i) => (map[name] = i));
  [COL.TITLE, COL.BODY, COL.STATUS].forEach((name) => {
    if (!(name in map)) throw new Error('見出し行に「' + name + '」列がありません');
  });
  return map;
}
