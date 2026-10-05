// 依存ゼロの静的サイトジェネレータ。content/articles/*.md → dist/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const cfg = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const NAME = cfg.name;
const BASE = (process.env.SITE_URL || cfg.baseUrl).replace(/\/$/, '');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonLd = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const fmtDate = d => { const [y, m, dd] = d.split('-').map(Number); return `${y}年${m}月${dd}日`; };

/* ---------- markdown ---------- */
function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('frontmatter がありません');
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if (v.startsWith('[')) v = v.slice(1, -1).split(/,(?!\d)/).map(s => s.trim()).filter(Boolean);
    else v = v.replace(/^"(.*)"$/, '$1');
    data[line.slice(0, i).trim()] = v;
  }
  return { data, body: m[2] };
}

function affiliate(url) {
  try {
    const u = new URL(url);
    const h = u.hostname;
    if (/(^|\.)amazon\.co\.jp$/.test(h)) {
      if (cfg.amazonTag) u.searchParams.set('tag', cfg.amazonTag);
      return { href: u.toString(), sponsored: true };
    }
    // 楽天: ID設定後は楽天アフィリエイトの汎用リンク形式に包む（未設定の間は通常URLのまま）
    if (/(^|\.)rakuten\.co\.jp$/.test(h) && !/^hb\.afl\./.test(h)) {
      if (cfg.rakutenId) return { href: `https://hb.afl.rakuten.co.jp/hgc/${encodeURIComponent(cfg.rakutenId)}/?pc=${encodeURIComponent(url)}&m=${encodeURIComponent(url)}`, sponsored: true };
      return { href: url, sponsored: true };
    }
    if (/(^|\.)(a\.r10\.to|hb\.afl\.rakuten\.co\.jp)$/.test(h)) return { href: url, sponsored: true };
  } catch { /* 無効なURLはそのまま */ }
  return { href: url, sponsored: false };
}

function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (_, t, u) => {
    const a = affiliate(u.replace(/&amp;/g, '&'));
    return `<a href="${esc(a.href)}" rel="noopener nofollow${a.sponsored ? ' sponsored' : ''}" target="_blank">${t}</a>`;
  });
  s = s.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" rel="noopener nofollow" target="_blank">$2</a>');
  return s;
}

function imgSize(src) {
  try {
    const f = fs.readFileSync(path.join('public', src));
    if (f.slice(0, 4).toString() === 'RIFF' && f.slice(8, 12).toString() === 'WEBP') {
      const k = f.slice(12, 16).toString();
      if (k === 'VP8 ') return ` width="${f.readUInt16LE(26) & 0x3fff}" height="${f.readUInt16LE(28) & 0x3fff}"`;
      if (k === 'VP8L') { const b = f.readUInt32LE(21); return ` width="${(b & 0x3fff) + 1}" height="${((b >> 14) & 0x3fff) + 1}"`; }
      if (k === 'VP8X') return ` width="${f.readUIntLE(24, 3) + 1}" height="${f.readUIntLE(27, 3) + 1}"`;
    }
  } catch { /* 寸法なしでも表示できる */ }
  return '';
}

function md(src, ctx = {}) {
  const lines = src.split('\n');
  let out = '', i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,4})\s+(.*)/))) { out += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>\n`; i++; continue; }
    if ((m = l.match(/^@video\s+(.+)$/))) { out += `<div class="vone">${videoFigure(m[1])}<p class="vnote">YouTubeの動画です。再生ボタンを押すとYouTubeから読み込まれます。</p></div>\n`; i++; continue; }
    if ((m = l.match(/^@cta\s+(.+)$/))) {
      const o = (ctx.offers || []).find(x => x.name === m[1].trim());
      if (!o) throw new Error(`@cta の対象が cta にありません: ${m[1]}`);
      out += `<div class="offers offers-inline">${offerCard(o, o.img)}</div>${CTA_FOOT(o.shops)}\n`; i++; continue;
    }
    if ((m = l.match(/^!\[([^\]]*)\]\((\/[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/))) {
      const [credit, curl] = (m[3] || '').split('|');
      const dim = imgSize(m[2]);
      out += `<figure class="fig"><img src="${esc(m[2])}" alt="${esc(m[1])}" loading="lazy"${dim}>` +
        `<figcaption>${esc(m[1])}${credit ? `　<span class="credit">画像：${curl ? `<a href="${esc(curl)}" target="_blank" rel="noopener nofollow">${esc(credit)}</a>` : esc(credit)}</span>` : ''}</figcaption></figure>\n`;
      i++; continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(rows[0]), body = rows.slice(2).map(cells);
      out += '<div class="tw" tabindex="0"><table><thead><tr>' + head.map(c => `<th scope="col">${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        body.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>\n';
      continue;
    }
    if (/^[-*]\s/.test(l)) {
      out += '<ul>';
      while (i < lines.length && /^[-*]\s/.test(lines[i])) out += `<li>${inline(lines[i++].replace(/^[-*]\s/, ''))}</li>`;
      out += '</ul>\n'; continue;
    }
    if (/^\d+\.\s/.test(l)) {
      out += '<ol>';
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) out += `<li>${inline(lines[i++].replace(/^\d+\.\s/, ''))}</li>`;
      out += '</ol>\n'; continue;
    }
    if (l.startsWith('>')) {
      const q = [];
      while (i < lines.length && lines[i].startsWith('>')) q.push(lines[i++].replace(/^>\s?/, ''));
      out += `<blockquote>${inline(q.join(' '))}</blockquote>\n`; continue;
    }
    const p = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|\||[-*]\s|\d+\.\s|>)/.test(lines[i])) p.push(lines[i++]);
    out += `<p>${inline(p.join(' '))}</p>\n`;
  }
  return out;
}


/* ---------- 動画・商品リンク ---------- */
const ytId = v => /^[\w-]{11}$/.test(v) ? v : null;
const videoFigure = v => {
  const [id, title = '動画', status = '投稿元は未確認'] = v.split('|').map(x => x.trim());
  if (!ytId(id)) throw new Error(`動画IDが不正です: ${v}`);
  return `<figure class="video"><div class="vframe"><a href="https://www.youtube.com/watch?v=${id}" data-yt="${id}" target="_blank" rel="noopener" aria-label="${esc(title)}を再生">
<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><span class="play" aria-hidden="true"></span></a></div>
<figcaption><strong>${esc(title)}</strong><br><span>${esc(status)}　<a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener nofollow">YouTubeで開く</a></span></figcaption></figure>`;
};
const videoBlock = videos => `<section class="videos"><h2 id="videos">動画で見る</h2>
<p class="vnote">YouTubeの動画です。再生ボタンを押すとYouTubeから読み込まれます。投稿元の確認状況は各動画の下に記載しています。内容の正確さは、この記事の出典（公式情報）を優先してください。</p>
<div class="vgrid">${videos.map(videoFigure).join('')}</div></section>`;
const productBlock = names => `<section class="products"><h2 id="products">商品ページを探す</h2>
<p class="vnote">商品名で検索した結果ページへのリンクです。取り扱いの有無・価格・在庫は各サイトでご確認ください。購入前に、この記事の出典（公式情報）もあわせてご確認ください。</p>
<ul class="plist">${names.map(n => `<li><strong>${esc(n)}</strong><span><a href="${inlineUrl('https://www.amazon.co.jp/s?k=' + encodeURIComponent(n))}" target="_blank" rel="noopener nofollow sponsored">Amazonで検索</a><a href="${inlineUrl('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(n) + '/')}" target="_blank" rel="noopener nofollow sponsored">楽天市場で検索</a></span></li>`).join('')}</ul></section>`;
const inlineUrl = u => esc(affiliate(u).href);


/* ---------- CTA ---------- */
const parseOffers = a => (a.cta || []).map(x => {
  const [name, label, url, price = '', note = '', shops = '', badge = '', img = '', tagline = '', points = '', audience = ''] = x.split('|').map(v => v.trim());
  if (!/^https?:\/\//.test(url || '')) throw new Error(`${a.slug}: cta のURLが不正です: ${x}`);
  return { name, label, url, price, note, shops: shops === 'shops', badge, img, tagline, points: points ? points.split('／').map(v => v.trim()).filter(Boolean) : [], audience };
});
const outLink = u => esc(affiliate(u).href);
const shopLinks = n => `<a class="btn-sub" href="${outLink('https://www.amazon.co.jp/s?k=' + encodeURIComponent(n))}" target="_blank" rel="noopener nofollow sponsored">Amazonで探す</a><a class="btn-sub" href="${outLink('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(n) + '/')}" target="_blank" rel="noopener nofollow sponsored">楽天市場で探す</a>`;
const ctaBtn = (o, cls = '') => `<a class="btn-cta${cls}" href="${outLink(o.url)}" target="_blank" rel="noopener nofollow" data-cta="${esc(o.name)}"><span>${esc(o.label)}</span><i class="arr" aria-hidden="true"></i></a>`;
// 製品カード：画像 → 名前 → 紹介文 → 特徴3点 → 向く人 → 価格の目安（補助）→ ボタン
const offerCard = (o, img) => `<div class="offer">${img ? `<img class="offer-img${/moflin|go2|neo/.test(img) ? ' is-photo' : ''}" src="${esc(img)}" alt="${esc(o.name)}の画像" loading="lazy">` : ''}<div class="offer-main">
<p class="offer-name">${esc(o.name)}${o.badge ? `<span class="offer-badge">${esc(o.badge)}</span>` : ''}</p>
${o.tagline ? `<p class="offer-tagline">${esc(o.tagline)}</p>` : ''}
${o.points.length ? `<ul class="offer-points">${o.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
${o.audience ? `<p class="offer-audience"><strong>向いている人</strong>${esc(o.audience)}</p>` : ''}
${o.price || o.note ? `<p class="offer-price"><span class="offer-price-k">価格の目安</span>${esc(o.price)}${o.note ? `<span class="offer-note">${esc(o.note)}</span>` : ''}</p>` : ''}
<div class="offer-btns">${ctaBtn(o)}${o.shops ? shopLinks(o.name) : ''}</div></div></div>`;
const CTA_FOOT = anyShops => `<p class="cta-foot">※外部サイトへ移動します。価格・在庫は変動するため、リンク先の最新情報と、この記事の確認日・出典もあわせてご確認ください。${anyShops ? 'Amazon・楽天市場のリンクは広告（アフィリエイト）を含みます。' : ''}</p>`;
const inlineCta = (offers, img) => `<section class="cta-block" aria-label="製品の紹介と公式サイト"><p class="cta-kicker">PRODUCT</p><h2 class="cta-title">${offers.length > 1 ? 'この記事で取り上げた製品' : `${esc(offers[0].name)}を、あらためて紹介`}</h2>
<div class="offers${offers.length > 1 ? ' offers-multi' : ''}">${offers.map(o => offerCard(o, o.img || (offers.length === 1 ? img : ''))).join('')}</div>${CTA_FOOT(offers.some(o => o.shops))}</section>`;
// PC右側：1製品なら紹介つきのボタン、複数なら製品ごとに行を分けて、どの製品に飛ぶかを明示する
const asideCta = (offers, img) => offers.length === 1
  ? `<div class="side-cta"><p class="side-cta-kicker">この製品を見る</p>${img ? `<img class="side-cta-img" src="${esc(img)}" alt="" loading="lazy">` : ''}<p class="side-cta-name">${esc(offers[0].name)}</p>${offers[0].tagline ? `<p class="side-cta-tag">${esc(offers[0].tagline)}</p>` : ''}${ctaBtn(offers[0], ' btn-block')}<p class="side-cta-note">外部サイトへ移動します</p></div>`
  : `<div class="side-cta"><p class="side-cta-kicker">製品の公式ページ</p><ul class="side-list">${offers.map(o => `<li><span class="side-list-name">${esc(o.name)}</span>${o.badge ? `<span class="offer-badge">${esc(o.badge)}</span>` : ''}<a class="btn-cta btn-sm btn-block" href="${outLink(o.url)}" target="_blank" rel="noopener nofollow"><span>${esc(o.label)}</span><i class="arr" aria-hidden="true"></i></a></li>`).join('')}</ul><p class="side-cta-note">外部サイトへ移動します</p></div>`;
const stickyCta = (offers, target) => offers.length === 1
  ? `<div class="sticky-cta" id="sticky-cta" aria-hidden="true"><div class="sticky-cta-in"><div class="sticky-cta-text"><strong>${esc(offers[0].name)}</strong><span>${esc(offers[0].tagline || '公式サイトで確認')}</span></div>${ctaBtn(offers[0], ' btn-sm')}</div></div>`
  : `<div class="sticky-cta" id="sticky-cta" aria-hidden="true"><div class="sticky-cta-in"><div class="sticky-cta-text"><strong>${offers.length}製品の公式ページ</strong><span>${esc(offers.map(o => o.name).join('・'))}</span></div><a class="btn-cta btn-sm" href="${target}"><span>製品を選ぶ</span><i class="arr" aria-hidden="true"></i></a></div></div>`;
const endCta = (offers, img, next) => `<section class="end-cta" id="end-cta"><div class="wrap"><p class="cta-kicker">BEFORE YOU BUY</p><h2>気になったら、<wbr>公式サイトで詳細と最新情報を確認</h2>
<p class="end-lead">製品の仕様・価格・在庫は予告なく変わります。この記事の確認日は記事冒頭に記載しています。</p>
<div class="offers${offers.length > 1 ? ' offers-multi' : ''} offers-dark">${offers.map(o => offerCard(o, o.img || (offers.length === 1 ? img : ''))).join('')}</div>${CTA_FOOT(offers.some(o => o.shops))}
${next ? `<a class="end-next" href="/articles/${next.slug}/"><span class="end-next-k">次に読む</span><span class="end-next-t">${esc(next.title)}</span><i class="arr" aria-hidden="true"></i></a>` : ''}</div></section>`;
const STICKY_JS = `<script>(function(){var b=document.getElementById('sticky-cta');if(!b)return;var e=document.getElementById('end-cta'),i=document.getElementById('cta-inline'),ve=false,vi=false;function u(){var s=window.scrollY>480&&!ve&&!vi;b.classList.toggle('on',s);b.setAttribute('aria-hidden',s?'false':'true')}addEventListener('scroll',u,{passive:true});if('IntersectionObserver'in window){var o=new IntersectionObserver(function(x){x.forEach(function(t){if(t.target===e)ve=t.isIntersecting;if(t.target===i)vi=t.isIntersecting});u()});e&&o.observe(e);i&&o.observe(i)}u()})();</script>`;

/* ---------- イラスト（オリジナルのSVG。製品写真は使わない） ---------- */
const ICONS = {
  'AIペット': `<svg viewBox="0 0 120 120" role="img" aria-label="AIペットのイラスト"><ellipse cx="60" cy="106" rx="30" ry="5" fill="#0d6e66" opacity=".15"/><path d="M30 44 22 18 46 32Z M90 44 98 18 74 32Z" fill="#0d6e66"/><ellipse cx="60" cy="68" rx="38" ry="34" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><circle cx="46" cy="64" r="6" fill="#13201e"/><circle cx="74" cy="64" r="6" fill="#13201e"/><circle cx="48" cy="62" r="2" fill="#fff"/><circle cx="76" cy="62" r="2" fill="#fff"/><path d="M54 78q6 6 12 0" fill="none" stroke="#13201e" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="36" cy="76" rx="6" ry="4" fill="#e8431f" opacity=".35"/><ellipse cx="84" cy="76" rx="6" ry="4" fill="#e8431f" opacity=".35"/></svg>`,
  '人型ロボット': `<svg viewBox="0 0 120 120" role="img" aria-label="人型ロボットのイラスト"><ellipse cx="60" cy="112" rx="26" ry="4" fill="#0d6e66" opacity=".15"/><path d="M60 8v14" stroke="#0d6e66" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="8" r="5" fill="#e8431f"/><rect x="36" y="22" width="48" height="36" rx="12" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><rect x="45" y="34" width="10" height="12" rx="5" fill="#13201e"/><rect x="65" y="34" width="10" height="12" rx="5" fill="#13201e"/><rect x="34" y="64" width="52" height="30" rx="10" fill="#0d6e66"/><rect x="50" y="72" width="20" height="8" rx="4" fill="#fffefb" opacity=".8"/><rect x="16" y="64" width="14" height="28" rx="7" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><rect x="90" y="64" width="14" height="28" rx="7" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><rect x="40" y="96" width="14" height="16" rx="5" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><rect x="66" y="96" width="14" height="16" rx="5" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/></svg>`,
  '購入ガイド': `<svg viewBox="0 0 120 120" role="img" aria-label="購入ガイドのイラスト"><rect x="22" y="14" width="64" height="86" rx="10" fill="#fffefb" stroke="#0d6e66" stroke-width="4"/><path d="M34 36h30M34 52h40M34 68h24" stroke="#0d6e66" stroke-width="5" stroke-linecap="round" opacity=".45"/><circle cx="82" cy="78" r="22" fill="#fffefb" stroke="#e8431f" stroke-width="5"/><path d="M98 94l14 14" stroke="#e8431f" stroke-width="7" stroke-linecap="round"/><path d="M72 78l7 7 12-14" fill="none" stroke="#0d6e66" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
ICONS.default = ICONS['購入ガイド'];
const iconFor = c => ICONS[c] || ICONS.default;

const HERO_ART = `<svg viewBox="0 0 440 400" role="img" aria-label="AIペットと小型ロボットのイラスト">
<ellipse cx="220" cy="370" rx="190" ry="16" fill="#13201e" opacity=".08"/>
<g transform="translate(40 120)"><path d="M62 78 40 14 106 52Z M198 78 220 14 154 52Z" fill="#0d6e66"/><ellipse cx="130" cy="150" rx="104" ry="92" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/><circle cx="96" cy="140" r="14" fill="#13201e"/><circle cx="164" cy="140" r="14" fill="#13201e"/><circle cx="101" cy="134" r="5" fill="#fff"/><circle cx="169" cy="134" r="5" fill="#fff"/><path d="M112 176q18 18 36 0" fill="none" stroke="#13201e" stroke-width="7" stroke-linecap="round"/><ellipse cx="66" cy="170" rx="16" ry="10" fill="#e8431f" opacity=".3"/><ellipse cx="194" cy="170" rx="16" ry="10" fill="#e8431f" opacity=".3"/></g>
<g transform="translate(270 40)"><path d="M70 6v26" stroke="#0d6e66" stroke-width="7" stroke-linecap="round"/><circle cx="70" cy="6" r="9" fill="#e8431f"/><rect x="22" y="30" width="96" height="76" rx="24" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/><rect x="42" y="56" width="18" height="24" rx="9" fill="#13201e"/><rect x="80" y="56" width="18" height="24" rx="9" fill="#13201e"/><rect x="18" y="116" width="104" height="92" rx="22" fill="#0d6e66"/><rect x="48" y="138" width="44" height="18" rx="9" fill="#fffefb" opacity=".85"/><circle cx="62" cy="180" r="5" fill="#e8431f"/><circle cx="78" cy="180" r="5" fill="#fffefb" opacity=".6"/><rect x="-6" y="120" width="26" height="70" rx="13" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/><rect x="120" y="120" width="26" height="70" rx="13" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/><rect x="34" y="212" width="30" height="40" rx="10" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/><rect x="76" y="212" width="30" height="40" rx="10" fill="#fffefb" stroke="#0d6e66" stroke-width="6"/></g>
<circle cx="378" cy="300" r="34" fill="none" stroke="#e8431f" stroke-width="7"/><path d="M402 324l24 24" stroke="#e8431f" stroke-width="10" stroke-linecap="round"/><path d="M362 300l12 12 22-26" fill="none" stroke="#0d6e66" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const LOGO_MARK = `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#0d6e66"/><rect x="8" y="12" width="24" height="18" rx="7" fill="#fffefb"/><circle cx="15" cy="21" r="2.8" fill="#13201e"/><circle cx="25" cy="21" r="2.8" fill="#13201e"/><path d="M20 12V7" stroke="#fffefb" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="6" r="2.6" fill="#ff7a59"/></svg>`;

/* ---------- layout ---------- */
const css = fs.readFileSync('src/style.css', 'utf8');
const cssHash = crypto.createHash('md5').update(css).digest('hex').slice(0, 8);
const OG = '/og.png';

const YT_JS = `<script>document.addEventListener('click',function(e){var a=e.target.closest('a[data-yt]');if(!a)return;e.preventDefault();var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+a.dataset.yt+'?autoplay=1&rel=0';f.allow='accelerometer;autoplay;encrypted-media;picture-in-picture';f.allowFullscreen=true;f.title=a.getAttribute('aria-label')||'YouTube';a.replaceWith(f);});</script>`;
const layout = ({ title, desc, body, url, type = 'website', ld = [], nav = '', noindex = false, ogImage = OG }) => `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#0d6e66"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${BASE}${url}">`}
<link rel="alternate" type="application/rss+xml" title="${esc(NAME)}" href="/rss.xml">
<meta property="og:site_name" content="${esc(NAME)}"><meta property="og:locale" content="ja_JP">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${BASE}${url}">
<meta property="og:image" content="${BASE}${ogImage}">${ogImage === OG ? '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">' : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/style.css?v=${cssHash}">${ld.map(jsonLd).join('')}</head><body>
<a class="skip" href="#main">本文へスキップ</a>
<header class="site-header"><div class="wrap">
<a class="logo" href="/" aria-label="${esc(NAME)} トップ">${LOGO_MARK}<span>${esc(NAME)}<small>HARD AI NAVI</small></span></a>
<nav class="nav" aria-label="メイン"><a href="/#articles"${nav === 'articles' ? ' aria-current="page"' : ''}>記事一覧</a><a href="/about/"${nav === 'about' ? ' aria-current="page"' : ''}>運営方針・広告表示</a><a class="nav-cta" href="/articles/ai-pet-robot-3year-cost/">3年の費用を比べる</a></nav>
</div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="wrap"><div class="footer-grid">
<div><a class="logo" href="/">${LOGO_MARK}<span>${esc(NAME)}<small>HARD AI NAVI</small></span></a>
<p>${esc(cfg.tagline)}。公式情報と出典をもとに整理するメディアです。当サイトはアフィリエイト広告を利用しています。詳細は<a href="/about/">運営方針・広告表示</a>をご覧ください。</p></div>
<nav class="footer-nav" aria-label="フッター"><a href="/#articles">記事一覧</a><a href="/about/">運営方針・広告表示</a><a href="/rss.xml">RSS</a><a href="/sitemap.xml">サイトマップ</a></nav>
</div><div class="copy">© ${new Date().getFullYear()} ${esc(NAME)}</div></div></footer>
${body.includes('data-yt=') ? YT_JS : ''}${body.includes('id="sticky-cta"') ? STICKY_JS : ''}</body></html>`;

const PR = `<div class="notice"><strong>【PR・広告表示】</strong>この記事にはアフィリエイト広告（Amazonアソシエイト、楽天アフィリエイト等）のリンクが含まれる場合があります。リンク経由で購入されると当サイトに報酬が入りますが、掲載順位・評価は報酬の有無・多寡で決めていません。</div>`;
const ALERT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 7v5M12 16h.01"/></svg>`;

/* ---------- 出力 ---------- */
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
if (fs.existsSync('public')) fs.cpSync('public', 'dist', { recursive: true });
fs.writeFileSync('dist/style.css', css);
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join('dist', p)), { recursive: true }); fs.writeFileSync(path.join('dist', p), s); };

const articles = fs.readdirSync('content/articles').filter(f => f.endsWith('.md')).map(f => {
  const { data, body } = parseFrontmatter(fs.readFileSync(path.join('content/articles', f), 'utf8'));
  for (const k of ['title', 'description', 'date', 'updated', 'sources']) if (!data[k]) throw new Error(`${f}: frontmatter "${k}" がありません`);
  const slug = f.replace(/\.md$/, '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !/^\d{4}-\d{2}-\d{2}$/.test(data.updated)) throw new Error(`${f}: 日付は YYYY-MM-DD`);
  if (!/https?:\/\//.test(body)) throw new Error(`${f}: 本文に出典URLがありません`);
  return { ...data, category: data.category || 'その他', slug, body };
}).sort((a, b) => b.date.localeCompare(a.date) || b.updated.localeCompare(a.updated));

const isNew = a => (Date.now() - new Date(a.date).getTime()) / 864e5 <= 14;
const metaRow = a => `<div class="meta"><span>公開 <time datetime="${a.date}">${fmtDate(a.date)}</time></span><span>最終更新 <time datetime="${a.updated}">${fmtDate(a.updated)}</time></span></div>`;
const thumb = a => a.image
  ? `<div class="card-thumb has-img"><img src="${esc(a.image)}" alt="" loading="lazy">${a.imageCredit ? `<span class="thumb-credit">画像：${esc(a.imageCredit.split('|')[0])}</span>` : ''}</div>`
  : `<div class="card-thumb">${iconFor(a.category)}</div>`;
const card = (a, feature = false) => `<a class="card${feature ? ' card-feature' : ''}" href="/articles/${a.slug}/">${thumb(a)}<div class="card-body"><div><span class="tag">${esc(a.category)}</span>${isNew(a) ? '<span class="tag tag-new">NEW</span>' : ''}</div><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p>${metaRow(a)}<span class="more">記事を読む<i class="arr" aria-hidden="true"></i></span></div></a>`;

for (const a of articles) {
  const url = `/articles/${a.slug}/`;
  // 冒頭の引用ブロック（確認日の注記）は専用の注意書きとして切り出す
  let body = a.body.replace(/^\s+/, '');
  let verify = '';
  const vm = body.match(/^((?:>.*\n?)+)/);
  if (vm) { verify = `<aside class="verify" role="note">${ALERT_ICON}<p>${inline(vm[1].replace(/^>\s?/gm, ' ').trim())}</p></aside>`; body = body.slice(vm[0].length); }

  const offers = parseOffers(a);
  const many = offers.length > 1;
  const chunks = md(body, { offers }).split(/(?=<h2>)/).filter(s => s.trim());
  const toc = [];
  const sections = chunks.map((c, idx) => {
    const m = c.match(/^<h2>(.*?)<\/h2>/);
    if (!m) return `<section>${c}</section>`;
    const id = `s${idx + 1}`;
    const text = m[1];
    toc.push({ id, text });
    const cls = /^結論/.test(text.replace(/<[^>]+>/g, '')) ? 'conclusion' : /^出典/.test(text) ? 'sources' : /^[①②③④⑤]/.test(text) ? 'rank-sec' : '';
    const h2 = cls === 'conclusion' ? `<h2 id="${id}"><span>CONCLUSION</span>${text}</h2>` : `<h2 id="${id}">${text}</h2>`;
    return `<section${cls ? ` class="${cls}"` : ''}>${h2}${c.slice(m[0].length)}</section>`;
  });
  if (offers.length && a.ctaMode !== 'inline') {
    sections.splice(Math.min(1, sections.length), 0, inlineCta(offers, a.image).replace('<section class="cta-block"', '<section class="cta-block" id="cta-inline"'));
    toc.splice(Math.min(1, toc.length), 0, { id: 'cta-inline', text: many ? '公式サイトで確認する' : `${offers[0].name}を公式サイトで確認` });
  }
  const extraTop = a.videos && a.videos.length ? videoBlock(a.videos) : '';
  const extraBottom = a.products && a.products.length ? productBlock(a.products) : '';
  if (extraTop) { const at = Math.min(offers.length && a.ctaMode !== 'inline' ? 2 : 1, sections.length); sections.splice(at, 0, extraTop); toc.splice(Math.min(at, toc.length), 0, { id: 'videos', text: '動画で見る' }); }
  if (extraBottom) {
    const si = sections.findIndex(x => x.startsWith('<section class="sources"'));
    sections.splice(si < 0 ? sections.length : si, 0, extraBottom);
    const ti = toc.findIndex(t => /^出典/.test(t.text));
    toc.splice(ti < 0 ? toc.length : ti, 0, { id: 'products', text: '商品ページを探す' });
  }
  const prose = sections.join('\n').replace(/<h3>(【重要】)/g, '<h3 class="alert">$1');
  const tocHtml = toc.length > 1 ? `<div class="toc-box"><h2>目次</h2><ol>${toc.map(t => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')}</ol></div>` : '';
  const minutes = Math.max(1, Math.ceil(a.body.replace(/\s/g, '').length / 500));
  const nextArticle = x => articles.find(o => o.slug !== x.slug && o.slug === (x.next || 'ai-pet-robot-3year-cost')) || null;
  const others = articles.filter(o => o.slug !== a.slug).sort((x, y) => (y.category === a.category) - (x.category === a.category)).slice(0, 3);

  write(`articles/${a.slug}/index.html`, layout({
    title: `${a.title} | ${NAME}`, desc: a.description, url, type: 'article', nav: 'articles', ogImage: a.image || OG,
    ld: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.description, inLanguage: 'ja',
      datePublished: a.date, dateModified: a.updated, mainEntityOfPage: `${BASE}${url}`, image: `${BASE}${a.image || OG}`,
      author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME }
    }, {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: NAME, item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: a.title, item: `${BASE}${url}` }]
    }],
    body: `<div class="wrap"><header class="article-head">
<ol class="crumbs"><li><a href="/">ホーム</a></li><li><a href="/#articles">記事一覧</a></li><li aria-current="page">${esc(a.category)}</li></ol>
<span class="tag">${esc(a.category)}</span><h1>${esc(a.title)}</h1><p class="desc">${esc(a.description)}</p>
<div class="meta"><span>公開 <time datetime="${a.date}">${fmtDate(a.date)}</time></span><span>最終更新 <time datetime="${a.updated}">${fmtDate(a.updated)}</time></span><span>読了目安 約${minutes}分</span></div>
${PR}${verify}</header>
<div class="article-grid"><article class="prose">${tocHtml ? `<details class="toc-mobile"><summary>目次を開く</summary>${tocHtml}</details>` : ''}${prose}</article>
<aside class="toc" aria-label="目次">${offers.length ? asideCta(offers, a.image) : ''}${tocHtml}</aside></div></div>
${offers.length ? endCta(offers, a.image, nextArticle(a)) : ''}${offers.length ? stickyCta(offers, '#end-cta') : ''}
${others.length ? `<section class="related"><div class="wrap"><div class="section-head"><div><p class="kicker">Related</p><h2>あわせて読みたい</h2></div></div><div class="cards">${others.map(o => card(o)).join('')}</div></div></section>` : ''}`
  }));
}

write('index.html', layout({
  title: `${NAME} | ${cfg.tagline}`, desc: `${cfg.tagline}。AIペット・家庭用ロボット・AIガジェットを、公式情報と出典つきで整理します。`, url: '/', nav: 'articles',
  ld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: `${BASE}/`, inLanguage: 'ja', description: cfg.tagline }],
  body: `<section class="hero"><div class="wrap"><div>
<p class="eyebrow">AI Pet ・ Robot ・ Gadget</p>
<h1>家庭で使える<wbr>AIロボット・<wbr>AIガジェットを、<wbr><em>出典つき</em>で<wbr>比較する</h1>
<p class="lead">AIペット、家庭用ロボット、小型ヒューマノイド。気になる製品の価格や仕様を、メーカー公式ページとプレスリリースで確認して整理します。</p>
<ul class="chips"><li>公式情報だけで整理</li><li>価格には確認日つき</li><li>実機レビューではありません</li></ul>
<div class="btns"><a class="btn-cta btn-lg" href="/articles/ai-pet-robot-3year-cost/"><span>3年間の費用を比べる</span><i class="arr" aria-hidden="true"></i></a><a class="btn btn-ghost" href="#pick">目的から記事を探す</a></div>
<p class="hero-note">本体価格だけでなく、継続費用まで含めた総額の試算です。</p>
</div><div class="hero-art">${HERO_ART}</div></div></section>
<section class="section pick" id="pick"><div class="wrap">
<div class="section-head"><div><p class="kicker">Find Yours</p><h2>目的から選ぶ</h2></div><p>気になる項目から、該当する記事へ</p></div>
<div class="pick-grid">
<a class="pick-card" href="/articles/ai-pet-robot-3year-cost/"><span class="pick-q">まず安く試したい</span><span class="pick-a">3年間の試算で、Moflinは約8万円・Qooboは本体のみ17,600円</span><span class="pick-go">費用を比べる<i class="arr" aria-hidden="true"></i></span></a>
<a class="pick-card" href="/articles/aibo-guide/"><span class="pick-q">犬型ロボットが気になる</span><span class="pick-a">aiboは2026年6月に国内の新規販売終了が発表。特徴と既存サービスを整理</span><span class="pick-go">aiboの現状を見る<i class="arr" aria-hidden="true"></i></span></a>
<a class="pick-card" href="/articles/lovot-guide/"><span class="pick-q">長く一緒に暮らしたい</span><span class="pick-a">LOVOT 3.0は10月26日に値上げ予定。現行価格は10月25日まで</span><span class="pick-go">LOVOTの費用を見る<i class="arr" aria-hidden="true"></i></span></a>
<a class="pick-card" href="/articles/1x-neo-home-humanoid/"><span class="pick-q">家事を任せたい</span><span class="pick-a">1X NEOは月額499ドルまたは20,000ドル。米国で先行提供</span><span class="pick-go">NEOの条件を見る<i class="arr" aria-hidden="true"></i></span></a>
<a class="pick-card" href="/articles/humanoid-robot-price-and-how-to-buy/"><span class="pick-q">開発・学習用に触りたい</span><span class="pick-a">Unitree R1は4,900ドルから、Go2は1,600ドルから</span><span class="pick-go">R1の条件を見る<i class="arr" aria-hidden="true"></i></span></a>
<a class="pick-card" href="/articles/try-before-buying-ai-robot/"><span class="pick-q">買う前に試したい</span><span class="pick-a">LOVOTはレンタルと体験施設（MUSEUM）で試せる</span><span class="pick-go">試し方を見る<i class="arr" aria-hidden="true"></i></span></a>
</div></div></section>
<section class="section" id="articles"><div class="wrap">
<div class="section-head"><div><p class="kicker">Articles</p><h2>記事一覧</h2></div><p>全${articles.length}本 ／ 価格は月1回、公式ページで再確認します</p></div>
<div class="cards">${articles.map((a, i) => card(a, i === 0)).join('')}</div></div></section>
<section class="section pledge"><div class="wrap">
<div class="section-head"><div><p class="kicker">Our Rules</p><h2>このメディアの4つの約束</h2></div><p><a href="/about/">編集方針の全文を見る</a></p></div>
<div class="pledge-grid">
<div class="pledge-item"><h3>出典を必ず明記</h3><p>価格・仕様・日付は、メーカー公式やプレスリリースで確認した値だけを載せ、記事末尾に出典URLを記載します。</p></div>
<div class="pledge-item"><h3>価格には確認日</h3><p>価格は変動します。いつ確認した値かを明記し、確認できなかった項目は「未確認」と書きます。</p></div>
<div class="pledge-item"><h3>体験談を装わない</h3><p>実機を使っていない製品について、使用感や口コミ風の文章、架空の評価点は書きません。</p></div>
<div class="pledge-item"><h3>報酬で順位を変えない</h3><p>アフィリエイト報酬の有無・多寡で、掲載順位や評価を変えることはありません。</p></div>
</div></div></section>
<section class="end-cta"><div class="wrap"><p class="cta-kicker">START HERE</p><h2>迷ったら、まず<wbr>3年間の総額から</h2><p class="end-lead">本体価格が6万円台でも、継続費用が加わると差が開く製品があります。公式の料金をもとに試算しました。</p><div class="btns" style="justify-content:center"><a class="btn-cta btn-lg" href="/articles/ai-pet-robot-3year-cost/"><span>3年間の費用を比べる</span><i class="arr" aria-hidden="true"></i></a></div></div></section>`
}));

const about = md(fs.readFileSync('content/about.md', 'utf8').replace(/^---[\s\S]*?---\n/, ''));
write('about/index.html', layout({
  title: `運営方針・広告表示 | ${NAME}`, desc: '当サイトの編集方針と広告表示について', url: '/about/', nav: 'about',
  body: `<div class="wrap page"><ol class="crumbs"><li><a href="/">ホーム</a></li><li aria-current="page">運営方針・広告表示</li></ol><h1>運営方針・広告表示</h1><div class="prose">${about.split(/(?=<h2>)/).map(s => `<section>${s}</section>`).join('')}</div></div>`
}));

write('404.html', layout({
  title: `ページが見つかりません | ${NAME}`, desc: 'お探しのページは見つかりませんでした。', url: '/404.html', noindex: true,
  body: `<div class="wrap nf"><p class="big">404</p><h1>ページが見つかりません</h1><p>URLが変更されたか、削除された可能性があります。</p><div class="btns" style="justify-content:center"><a class="btn btn-primary" href="/">トップへ戻る</a></div></div>`
}));

const urls = [['/', articles[0]?.updated], ['/about/'], ...articles.map(a => [`/articles/${a.slug}/`, a.updated])];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(([u, d]) => `<url><loc>${BASE}${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ''}</url>`).join('')}</urlset>`);
write('rss.xml', `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(NAME)}</title><link>${BASE}</link><description>${esc(cfg.tagline)}</description><language>ja</language>${articles.map(a => `<item><title>${esc(a.title)}</title><link>${BASE}/articles/${a.slug}/</link><guid>${BASE}/articles/${a.slug}/</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join('')}</channel></rss>`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
console.log(`built ${articles.length} articles → dist/`);
