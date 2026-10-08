// 記事管理画面（/admin/）。サーバーなし：ブラウザから GitHub Contents API を直接呼んで記事を保存する。
const cfg = JSON.parse(document.getElementById('admin-config').textContent);
const $ = (id) => document.getElementById(id);
const TOKEN_KEY = 'yupir_admin_token';
const state = { token: '', path: null, sha: null, imageFile: null, ogImage: '' };

/* ---------- 汎用 ---------- */
const enc = (s) => {
  const b = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < b.length; i += 0x8000) bin += String.fromCharCode(...b.subarray(i, i + 0x8000));
  return btoa(bin);
};
const dec = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, '')), (c) => c.charCodeAt(0)));
const fileToB64 = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
const today = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const isUrl = (s) => {
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const csv = (s) => s.split(/[,、，]/).map((x) => x.trim()).filter(Boolean);
const dirname = (p) => p.slice(0, p.lastIndexOf('/'));

/* ---------- GitHub API ---------- */
async function gh(method, path, body) {
  const url =
    `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/` +
    path.split('/').map(encodeURIComponent).join('/') +
    (method === 'GET' ? `?ref=${encodeURIComponent(cfg.branch)}` : '');
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${state.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = '';
    try {
      msg = (await res.json()).message;
    } catch {}
    const err = new Error(`GitHub ${res.status}: ${msg || res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/* ---------- 最小 YAML（記事の frontmatter 用） ---------- */
function splitFlow(s) {
  const out = [];
  let cur = '';
  let q = null;
  for (const ch of s) {
    if (q) {
      cur += ch;
      if (ch === q) q = null;
    } else if (ch === '"' || ch === "'") {
      q = ch;
      cur += ch;
    } else if (ch === ',') {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  out.push(cur);
  return out.map((x) => x.trim()).filter((x) => x !== '');
}
function parseScalar(v) {
  v = v.trim();
  if (v === '') return '';
  if (v[0] === '"') {
    try {
      return JSON.parse(v);
    } catch {
      return v.slice(1, -1);
    }
  }
  if (v[0] === "'" && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  if (v[0] === '[' && v.endsWith(']')) return splitFlow(v.slice(1, -1)).map(parseScalar);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null' || v === '~') return null;
  return v.replace(/\s+#.*$/, '');
}
function parseYaml(text) {
  const lines = text.split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim() !== '' && !l.trim().startsWith('#'));
  const indentOf = (l) => l.match(/^ */)[0].length;
  const KV = /^([A-Za-z0-9_]+):(?:\s+(.*))?$/;
  let i = 0;
  const block = (indent) => (lines[i].trim().startsWith('- ') ? list(indent) : map(indent));
  function map(indent) {
    const obj = {};
    while (i < lines.length && indentOf(lines[i]) === indent && !lines[i].trim().startsWith('- ')) {
      const m = lines[i].trim().match(KV);
      i++;
      if (!m) continue;
      const [, k, v = ''] = m;
      if (v === '') {
        const next = lines[i];
        if (next && (indentOf(next) > indent || (indentOf(next) === indent && next.trim().startsWith('- ')))) obj[k] = block(indentOf(next));
        else obj[k] = '';
      } else obj[k] = parseScalar(v);
    }
    return obj;
  }
  function list(indent) {
    const arr = [];
    while (i < lines.length && indentOf(lines[i]) === indent && lines[i].trim().startsWith('- ')) {
      const rest = lines[i].trim().slice(2);
      if (KV.test(rest) && !/^["']/.test(rest)) {
        lines[i] = ' '.repeat(indent + 2) + rest;
        arr.push(map(indent + 2));
      } else {
        arr.push(parseScalar(rest));
        i++;
      }
    }
    return arr;
  }
  return lines.length ? map(indentOf(lines[0])) : {};
}
const RESERVED = /^(true|false|null|yes|no|on|off|~|[-+]?[0-9][0-9.,]*(e[0-9]+)?)$/i;
function q(s) {
  s = String(s);
  if (s === '' || RESERVED.test(s) || /^\d{4}-\d{2}-\d{2}/.test(s) || /^[\s\-?:,[\]{}#&*!|>'"%@`]/.test(s) || /:\s|:$|\s#|\s$|[\n\r\t]/.test(s))
    return JSON.stringify(s);
  return s;
}
const arr = (a) => `[${a.map(q).join(', ')}]`;

/* ---------- フォーム <-> データ ---------- */
function readForm() {
  const metrics = [...document.querySelectorAll('#metrics .metric-row')].map((r) => ({
    label: r.querySelector('[data-k=label]').value.trim(),
    value: r.querySelector('[data-k=value]').value.trim(),
    sourceUrl: r.querySelector('[data-k=sourceUrl]').value.trim(),
    checkedAt: r.querySelector('[data-k=checkedAt]').value.trim(),
  }));
  return {
    slug: $('f-slug').value.trim(),
    title: $('f-title').value.trim(),
    description: $('f-description').value.trim(),
    publishedAt: $('f-published').value,
    updatedAt: $('f-updated').value,
    type: $('f-type').value,
    category: $('f-category').value,
    tags: csv($('f-tags').value),
    draft: $('f-draft').checked,
    service: {
      name: $('f-sname').value.trim(),
      url: $('f-surl').value.trim(),
      developerName: $('f-dname').value.trim(),
      developerXHandle: $('f-dx').value.trim().replace(/^@/, ''),
      techStack: csv($('f-tech').value),
      launchedAt: $('f-launched').value,
    },
    metrics,
    ogImage: state.ogImage,
    body: $('f-body').value.replace(/\s+$/, ''),
  };
}

function validate(d) {
  const e = [];
  const need = (v, msg) => !v && e.push(msg);
  if (!state.path) {
    need(d.slug, 'ファイル名を入力してください。');
    if (d.slug && !/^[a-z0-9][a-z0-9-]*$/.test(d.slug)) e.push('ファイル名は、半角の英小文字・数字・ハイフンだけにしてください。');
  }
  need(d.category, 'カテゴリを選んでください。');
  need(d.title, 'タイトルを入力してください。');
  need(d.description, '説明文を入力してください。');
  if (!isDate(d.publishedAt)) e.push('公開日を入力してください。');
  if (d.updatedAt && !isDate(d.updatedAt)) e.push('更新日の形式が正しくありません。');
  need(d.service.name, 'サービス名を入力してください。');
  if (!isUrl(d.service.url)) e.push('サービスURLは、https:// から始まるURLで入力してください。');
  need(d.service.developerName, '開発者名を入力してください。');
  if (d.service.launchedAt && !isDate(d.service.launchedAt)) e.push('サービス公開日の形式が正しくありません。');
  d.metrics.forEach((m, i) => {
    const n = i + 1;
    if (!m.label || !m.value) e.push(`数字 ${n}：項目名と値を入力してください。`);
    if (!isUrl(m.sourceUrl)) e.push(`数字 ${n}：出典URLがありません。出典のない数字は掲載できません。`);
    if (!isDate(m.checkedAt)) e.push(`数字 ${n}：確認日を入力してください。`);
  });
  need(d.body, '本文を入力してください。');
  return e;
}

function toMarkdown(d) {
  const L = ['---', `title: ${q(d.title)}`, `description: ${q(d.description)}`, `publishedAt: ${d.publishedAt}`];
  if (d.updatedAt) L.push(`updatedAt: ${d.updatedAt}`);
  L.push(`tags: ${arr(d.tags)}`, `type: ${d.type}`, `category: ${d.category}`, 'service:');
  L.push(`  name: ${q(d.service.name)}`, `  url: ${q(d.service.url)}`, `  developerName: ${q(d.service.developerName)}`);
  if (d.service.developerXHandle) L.push(`  developerXHandle: ${q(d.service.developerXHandle)}`);
  L.push(`  techStack: ${arr(d.service.techStack)}`);
  if (d.service.launchedAt) L.push(`  launchedAt: ${d.service.launchedAt}`);
  if (d.metrics.length) {
    L.push('metrics:');
    for (const m of d.metrics) L.push(`  - label: ${q(m.label)}`, `    value: ${q(m.value)}`, `    sourceUrl: ${q(m.sourceUrl)}`, `    checkedAt: ${m.checkedAt}`);
  }
  if (d.ogImage) L.push(`ogImage: ${q(d.ogImage)}`);
  if (d.draft) L.push('draft: true');
  L.push('---', '', d.body, '');
  return L.join('\n');
}

function addMetric(m = {}) {
  const row = document.createElement('div');
  row.className = 'metric-row grid gap-2 rounded-2xl border border-line p-3 md:grid-cols-[1fr_1fr_1.4fr_9rem_auto] md:items-end';
  const f = (k, label, type, ph) => {
    const w = document.createElement('div');
    const l = document.createElement('label');
    l.className = 'adm-label';
    l.textContent = label;
    const i = document.createElement('input');
    i.className = 'adm-in';
    i.type = type;
    i.dataset.k = k;
    i.placeholder = ph || '';
    i.value = m[k] ?? '';
    i.addEventListener('input', refreshOut);
    w.append(l, i);
    return w;
  };
  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'btn btn-sm';
  del.textContent = '削除';
  del.addEventListener('click', () => {
    row.remove();
    refreshOut();
  });
  row.append(f('label', '項目名', 'text', 'ユーザー数'), f('value', '値', 'text', '1,200人'), f('sourceUrl', '出典URL（必須）', 'url', 'https://'), f('checkedAt', '確認日（必須）', 'date'), del);
  $('metrics').append(row);
}

function fillForm(d, { path = null, sha = null } = {}) {
  state.path = path;
  state.sha = sha;
  state.imageFile = null;
  state.ogImage = d.ogImage || '';
  $('f-slug').value = d.slug || '';
  $('f-slug').disabled = !!path;
  $('f-title').value = d.title || '';
  $('f-description').value = d.description || '';
  $('f-published').value = d.publishedAt || today();
  $('f-updated').value = d.updatedAt || '';
  $('f-type').value = d.type === 'interview' ? 'interview' : 'introduction';
  $('f-tags').value = (d.tags || []).join(', ');
  if (d.category) $('f-category').value = d.category;
  $('f-draft').checked = !!d.draft;
  const s = d.service || {};
  $('f-sname').value = s.name || '';
  $('f-surl').value = s.url || '';
  $('f-dname').value = s.developerName || '';
  $('f-dx').value = s.developerXHandle || '';
  $('f-tech').value = (s.techStack || []).join(', ');
  $('f-launched').value = s.launchedAt || '';
  $('metrics').replaceChildren();
  (d.metrics || []).forEach(addMetric);
  $('f-body').value = d.body || '';
  $('f-image').value = '';
  showImage();
  $('errors').hidden = true;
  $('result').textContent = '';
  $('delete').hidden = !path;
  $('editor-title').textContent = path ? `3. 記事を編集（${path.split('/').pop()}）` : '3. 新規記事';
  $('editor').hidden = false;
  refreshOut();
}

const dateStr = (v) => (v ? String(v).slice(0, 10) : '');
function fromMarkdown(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('frontmatter（先頭の --- で囲まれた部分）が見つかりません。');
  const y = parseYaml(m[1]);
  const s = y.service || {};
  return {
    title: y.title || '',
    description: y.description || '',
    publishedAt: dateStr(y.publishedAt),
    updatedAt: dateStr(y.updatedAt),
    type: y.type,
    tags: Array.isArray(y.tags) ? y.tags.map(String) : [],
    category: y.category || '',
    draft: y.draft === true,
    ogImage: y.ogImage || '',
    service: {
      name: s.name || '',
      url: s.url || '',
      developerName: s.developerName || '',
      developerXHandle: String(s.developerXHandle || '').replace(/^@/, ''),
      techStack: Array.isArray(s.techStack) ? s.techStack.map(String) : [],
      launchedAt: dateStr(s.launchedAt),
    },
    metrics: (Array.isArray(y.metrics) ? y.metrics : []).map((x) => ({
      label: String(x.label ?? ''),
      value: String(x.value ?? ''),
      sourceUrl: String(x.sourceUrl ?? ''),
      checkedAt: dateStr(x.checkedAt),
    })),
    body: m[2].replace(/^\n+/, '').replace(/\s+$/, ''),
  };
}

/* ---------- プレビュー（最小 Markdown） ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => (/^(https?:\/\/|\/|#)/.test(u) ? `<a href="${u}" rel="noopener noreferrer nofollow" target="_blank">${t}</a>` : t));
  return s;
}
function renderMd(src) {
  const out = [];
  let list = null;
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const line of src.split('\n')) {
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      close();
      const n = Math.min(m[1].length + 1, 4);
      out.push(`<h${n}>${inline(m[2])}</h${n}>`);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      close();
      out.push(`<blockquote>${inline(m[1])}</blockquote>`);
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      if (list !== 'ul') {
        close();
        out.push('<ul>');
        list = 'ul';
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      if (list !== 'ol') {
        close();
        out.push('<ol>');
        list = 'ol';
      }
      out.push(`<li>${inline(m[1])}</li>`);
    } else if (line.trim() === '') close();
    else {
      close();
      out.push(`<p>${inline(line)}</p>`);
    }
  }
  close();
  return out.join('\n');
}

function refreshOut() {
  const d = readForm();
  $('desc-count').textContent = [...d.description].length;
  $('preview').innerHTML = renderMd(d.body) || '<p class="text-sub">本文を入力するとここに表示されます。</p>';
  $('md-out').textContent = toMarkdown(d);
}

function showImage() {
  const img = $('image-preview');
  if (state.imageFile) {
    img.src = URL.createObjectURL(state.imageFile);
    img.hidden = false;
  } else img.hidden = true;
  $('clear-image').hidden = !(state.imageFile || state.ogImage);
  $('image-path').textContent = state.imageFile ? `保存時にアップロードされます（${state.imageFile.name}）` : state.ogImage ? `現在の画像：${state.ogImage}` : '';
}

/* ---------- 画面操作 ---------- */
function showErrors(list) {
  const box = $('errors');
  box.hidden = list.length === 0;
  box.replaceChildren();
  if (!list.length) return;
  const t = document.createElement('b');
  t.textContent = '保存できません。次の点を直してください。';
  const ul = document.createElement('ul');
  ul.className = 'mt-2 list-disc pl-5';
  for (const m of list) {
    const li = document.createElement('li');
    li.textContent = m;
    ul.append(li);
  }
  box.append(t, ul);
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
const setResult = (text, href) => {
  const r = $('result');
  r.replaceChildren();
  r.append(document.createTextNode(text));
  if (href) {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'ml-2 text-accent';
    a.textContent = 'コミットを見る';
    r.append(a);
  }
};

async function listArticles() {
  const ul = $('article-list');
  ul.replaceChildren();
  const root = await gh('GET', cfg.contentDir);
  const files = [];
  for (const e of root) {
    if (e.type === 'file' && /\.mdx?$/.test(e.name)) files.push(e);
    else if (e.type === 'dir' && e.name !== 'images') (await gh('GET', e.path)).filter((x) => x.type === 'file' && /\.mdx?$/.test(x.name)).forEach((x) => files.push(x));
  }
  if (!files.length) ul.innerHTML = '<li class="py-4 text-sub">記事はまだありません。</li>';
  for (const f of files) {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between gap-3 py-3';
    const name = document.createElement('span');
    name.className = 'break-all';
    name.textContent = f.path.replace(`${cfg.contentDir}/`, '');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn btn-sm shrink-0';
    b.textContent = '編集';
    b.addEventListener('click', () => openArticle(f.path));
    li.append(name, b);
    ul.append(li);
  }
}

async function openArticle(path) {
  try {
    const f = await gh('GET', path);
    const d = fromMarkdown(dec(f.content));
    fillForm(d, { path, sha: f.sha });
    $('editor').scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    alert(`読み込めませんでした：${e.message}`);
  }
}

async function connect() {
  const status = $('auth-status');
  state.token = $('token').value.trim() || getToken();
  if (!state.token) {
    status.textContent = 'トークンを入力してください。';
    return;
  }
  status.textContent = '接続中…';
  try {
    await listArticles();
    const store = $('remember').checked ? localStorage : sessionStorage;
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    store.setItem(TOKEN_KEY, state.token);
    status.textContent = `接続しました（${cfg.owner}/${cfg.repo} の ${cfg.branch} ブランチ）。`;
    $('token').value = '';
    $('list-card').hidden = false;
  } catch (e) {
    $('list-card').hidden = true;
    status.textContent =
      e.status === 404
        ? `接続できません：${cfg.contentDir} が ${cfg.branch} ブランチにありません。サイトの Pull Request をマージしたか、トークンの対象リポジトリが合っているかを確認してください。`
        : `接続できません：${e.message}`;
  }
}
function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

async function save() {
  const d = readForm();
  const errs = validate(d);
  showErrors(errs);
  if (errs.length) return;
  const isNew = !state.path;
  const path = state.path || `${cfg.contentDir}/${d.slug}.md`;
  const msg = d.draft
    ? '下書きとして保存します（公開はされません）。よろしいですか？'
    : `「${d.title}」を ${cfg.branch} ブランチに保存し、公開します。よろしいですか？\n\n確認なしで公開されます。数字の出典と、本人確認の状態を見直してください。`;
  if (!confirm(msg)) return;
  const btn = $('save');
  btn.disabled = true;
  setResult('保存中…');
  try {
    if (state.imageFile) {
      const ext = (state.imageFile.name.split('.').pop() || 'jpg').toLowerCase().replace('jpeg', 'jpg');
      const imgPath = `${dirname(path)}/images/${d.slug || path.split('/').pop().replace(/\.mdx?$/, '')}-og.${ext}`;
      let imgSha;
      try {
        imgSha = (await gh('GET', imgPath)).sha;
      } catch {}
      await gh('PUT', imgPath, { message: `画像を追加: ${imgPath.split('/').pop()}`, content: await fileToB64(state.imageFile), branch: cfg.branch, ...(imgSha ? { sha: imgSha } : {}) });
      d.ogImage = `./images/${imgPath.split('/').pop()}`;
      state.ogImage = d.ogImage;
      state.imageFile = null;
      showImage();
    }
    const res = await gh('PUT', path, {
      message: `${isNew ? '記事を追加' : '記事を更新'}: ${path.split('/').pop()}`,
      content: enc(toMarkdown(d)),
      branch: cfg.branch,
      ...(state.sha ? { sha: state.sha } : {}),
    });
    state.path = path;
    state.sha = res.content.sha;
    $('f-slug').disabled = true;
    $('delete').hidden = false;
    $('editor-title').textContent = `3. 記事を編集（${path.split('/').pop()}）`;
    setResult(d.draft ? '下書きとして保存しました。' : '保存しました。自動デプロイが走り、数分で公開サイトに反映されます。', res.commit?.html_url);
    listArticles();
  } catch (e) {
    setResult(e.status === 422 && isNew ? '保存できません：同じファイル名の記事がすでにあります。別のファイル名にしてください。' : `保存できませんでした：${e.message}`);
  } finally {
    btn.disabled = false;
  }
}

async function remove() {
  if (!state.path || !confirm(`${state.path.split('/').pop()} を削除します。公開サイトからも消えます。よろしいですか？`)) return;
  try {
    const res = await gh('DELETE', state.path, { message: `記事を削除: ${state.path.split('/').pop()}`, sha: state.sha, branch: cfg.branch });
    $('editor').hidden = true;
    state.path = null;
    await listArticles();
    alert('削除しました。数分で公開サイトに反映されます。');
    return res;
  } catch (e) {
    setResult(`削除できませんでした：${e.message}`);
  }
}

/* ---------- イベント ---------- */
$('connect').addEventListener('click', connect);
$('token').addEventListener('keydown', (e) => e.key === 'Enter' && (e.preventDefault(), connect()));
$('reload').addEventListener('click', () => listArticles().catch((e) => alert(e.message)));
$('new-article').addEventListener('click', () => fillForm({ type: 'introduction', publishedAt: today() }));
$('close-editor').addEventListener('click', () => ($('editor').hidden = true));
$('add-metric').addEventListener('click', () => (addMetric(), refreshOut()));
$('save').addEventListener('click', save);
$('delete').addEventListener('click', remove);
$('check').addEventListener('click', () => {
  const errs = validate(readForm());
  showErrors(errs);
  if (!errs.length) setResult('問題ありません。保存できます。');
});
$('copy-md').addEventListener('click', () => navigator.clipboard?.writeText($('md-out').textContent).then(() => ($('copy-md').textContent = 'コピーしました')));
$('editor').addEventListener('input', refreshOut);
$('editor').addEventListener('submit', (e) => e.preventDefault());
$('f-image').addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) return alert('画像は5MB以下にしてください。');
  state.imageFile = f;
  showImage();
});
$('clear-image').addEventListener('click', () => {
  state.imageFile = null;
  state.ogImage = '';
  $('f-image').value = '';
  showImage();
  refreshOut();
});
$('open-import').addEventListener('click', () => $('import-dialog').showModal());
$('do-import').addEventListener('click', () => {
  try {
    const d = fromMarkdown($('import-text').value);
    const keep = { path: state.path, sha: state.sha };
    fillForm(d, keep);
    $('import-dialog').close();
    $('import-text').value = '';
    setResult('取り込みました。内容を確認して「入力を検証する」を押してください。');
  } catch (e) {
    alert(`取り込めません：${e.message}`);
  }
});

// 保存済みトークンがあれば自動接続
if (getToken()) {
  $('token').placeholder = '（保存済みのトークンを使います）';
  connect();
}
