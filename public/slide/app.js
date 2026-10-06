(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    form: $('form'), code: $('code'), background: $('background'), reader: $('reader'),
    pages: $('pages'), brand: $('brand'), icons: $('icons'), material: $('material'),
    start: $('start'), status: $('status'), empty: $('empty'), design: $('design'),
    designActions: $('design-actions'), feedback: $('feedback'), revise: $('revise'),
    toHtml: $('to-html'), copyDesign: $('copy-design'), viewDesign: $('view-design'),
    viewSlides: $('view-slides'), frame: $('frame'), dlHtml: $('dl-html'), print: $('print'),
    back: $('back'), raw: $('raw'), tabDesign: $('tab-design'), tabSlides: $('tab-slides')
  };

  var messages = [];
  var lastDesign = '';
  var lastHtml = '';
  var busy = false;

  try { els.code.value = sessionStorage.getItem('slide-code') || ''; } catch (e) { /* ignore */ }

  function setStatus(text, isError) {
    els.status.textContent = text || '';
    els.status.className = 'status' + (isError ? ' error' : '');
  }

  function setBusy(on) {
    busy = on;
    [els.start, els.revise, els.toHtml, els.copyDesign, els.dlHtml, els.print, els.back].forEach(function (b) {
      b.disabled = on;
    });
  }

  function showTab(name) {
    var slides = name === 'slides';
    els.viewDesign.hidden = slides;
    els.viewSlides.hidden = !slides;
    els.tabDesign.setAttribute('aria-selected', String(!slides));
    els.tabSlides.setAttribute('aria-selected', String(slides));
  }

  function renderMarkdown(text) {
    if (window.marked && window.DOMPurify) {
      els.design.className = 'md';
      els.design.innerHTML = window.DOMPurify.sanitize(window.marked.parse(text));
    } else {
      els.design.className = 'md';
      els.design.style.whiteSpace = 'pre-wrap';
      els.design.textContent = text;
    }
  }

  function extractHtml(text) {
    var m = text.match(/```html\s*\n([\s\S]*?)```/);
    if (m) return m[1].trim();
    m = text.match(/```html\s*\n([\s\S]*)$/); // 途中で切れた場合
    if (m) return m[1].trim();
    var i = text.search(/<!doctype html|<html/i);
    return i >= 0 ? text.slice(i).trim() : '';
  }

  // プレビュー用：1920px幅のスライドを枠幅に縮小し、印刷時は1枚1ページにする
  var PREVIEW_INJECT =
    '<style>html{overflow-y:scroll}@media print{@page{size:1920px 1080px;margin:0}' +
    'html,body{margin:0!important}body{zoom:1!important}section{break-after:page;page-break-after:always}' +
    '*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>' +
    '<script>(function(){function f(){document.body.style.zoom=String(document.documentElement.clientWidth/1920)}' +
    'addEventListener("load",f);addEventListener("resize",f);f();' +
    'addEventListener("message",function(e){if(e.data==="print")print()})})();<\/script>';

  function showSlides(html) {
    var doc = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, function () { return PREVIEW_INJECT + '</body>'; })
      : html + PREVIEW_INJECT;
    els.frame.srcdoc = doc;
    els.tabSlides.disabled = false;
    showTab('slides');
  }

  async function run() {
    setBusy(true);
    setStatus('生成中…');
    els.raw.hidden = false;
    els.raw.textContent = '';
    var text = '';
    try {
      var res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Code': els.code.value },
        body: JSON.stringify({ messages: messages, icons: els.icons.checked })
      });
      if (!res.ok) {
        var msg = '';
        try { msg = (await res.json()).error; } catch (e) { /* ignore */ }
        throw new Error(msg || ('エラー（' + res.status + '）'));
      }
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      for (;;) {
        var r = await reader.read();
        if (r.done) break;
        text += decoder.decode(r.value, { stream: true });
        els.raw.textContent = text;
        els.raw.scrollTop = els.raw.scrollHeight;
        setStatus('生成中… ' + text.length.toLocaleString() + '字');
      }
      text += decoder.decode();
      if (!text.trim()) throw new Error('出力が空でした。もう一度お試しください。');
      return text;
    } finally {
      els.raw.hidden = true;
    }
  }

  function remember() {
    try { sessionStorage.setItem('slide-code', els.code.value); } catch (e) { /* ignore */ }
  }

  function firstMessage() {
    var v = function (s, d) { return (s || '').trim() || d; };
    return [
      '## 背景',
      '- ' + v(els.background.value, '（空欄）'),
      '',
      '## 入力',
      '- 読み手：' + v(els.reader.value, '（おまかせ）'),
      '- 枚数：' + v(els.pages.value, '（おまかせ）'),
      '- 出力：A 設計図だけ（私がOKを出したらB HTMLスライドに進む）',
      '- ブランド色：' + v(els.brand.value, '（指定なし。既定の青）'),
      '',
      '---この下に素材---',
      els.material.value.trim()
    ].join('\n');
  }

  async function runDesign(userText) {
    if (busy) return;
    remember();
    messages.push({ role: 'user', content: userText });
    try {
      var out = await run();
      messages.push({ role: 'assistant', content: out });
      lastDesign = out;
      els.empty.hidden = true;
      els.design.hidden = false;
      els.designActions.hidden = false;
      renderMarkdown(out);
      showTab('design');
      setStatus('設計図ができました。ヘッドを縦に読んで筋が通るか確認してください。');
    } catch (e) {
      messages.pop();
      setStatus(e.message, true);
    } finally {
      setBusy(false);
    }
  }

  els.form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    messages = [];
    lastHtml = '';
    els.tabSlides.disabled = true;
    runDesign(firstMessage());
  });

  els.revise.addEventListener('click', function () {
    var fb = els.feedback.value.trim();
    if (!fb) { setStatus('修正指示を入力してください。', true); return; }
    els.feedback.value = '';
    runDesign('設計図（A）を次の指示で直して、全体を出し直して。HTMLはまだ作らない。\n' + fb);
  });

  els.toHtml.addEventListener('click', async function () {
    if (busy) return;
    remember();
    var fb = els.feedback.value.trim();
    var text = '設計図でOK。' + (fb ? '次の点を反映して、' : '') +
      'B形式（1枚ごとに1920×1080の<section>を縦に並べた単一HTML）で出力して。前置きなし、コードブロック1つだけ。' +
      (fb ? '\n' + fb : '');
    els.feedback.value = '';
    messages.push({ role: 'user', content: text });
    try {
      var out = await run();
      var html = extractHtml(out);
      if (!html) throw new Error('HTMLを取り出せませんでした。もう一度お試しください。');
      messages.push({ role: 'assistant', content: out });
      lastHtml = html;
      showSlides(html);
      setStatus('HTMLスライドができました。');
    } catch (e) {
      messages.pop();
      setStatus(e.message, true);
    } finally {
      setBusy(false);
    }
  });

  els.tabDesign.addEventListener('click', function () { showTab('design'); });
  els.tabSlides.addEventListener('click', function () { showTab('slides'); });
  els.back.addEventListener('click', function () { showTab('design'); });

  els.copyDesign.addEventListener('click', function () {
    if (!navigator.clipboard) { setStatus('このブラウザではコピーできません。', true); return; }
    navigator.clipboard.writeText(lastDesign).then(
      function () { setStatus('設計図をコピーしました。'); },
      function () { setStatus('コピーに失敗しました。', true); }
    );
  });

  els.dlHtml.addEventListener('click', function () {
    if (!lastHtml) return;
    var url = URL.createObjectURL(new Blob([lastHtml], { type: 'text/html;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'slides.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  els.print.addEventListener('click', function () {
    if (els.frame.contentWindow) els.frame.contentWindow.postMessage('print', '*');
  });
})();
