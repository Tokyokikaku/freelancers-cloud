/* =========================================================
   外注ドットコム スマホ用 縦スワイプLP
   767px以下のときだけスライドを組み立てて表示する（PCは従来LPのまま）
   ========================================================= */
(function () {
  'use strict';
  var MQ = '(max-width: 767px) and (pointer: coarse)';
  var mq = window.matchMedia ? window.matchMedia(MQ) : null;
  var root = document.documentElement;
  var built = false, el, track, slides = [], segs = [], countEl, cta, cur = -1, seen = {};

  var ARR = '<span class="slp-arr"><svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></span>';
  var IMG = function (name, alt, cls) {
    return '<img src="/' + name + '.webp" alt="' + (alt || '') + '"' + (cls ? ' class="' + cls + '"' : '') + ' decoding="async">';
  };
  var chip = function (img, label, isIcon) {
    return '<span class="slp-chip">' + IMG(img, '', isIcon ? 'ic' : '') + label + '</span>';
  };
  var ROW1 = chip('r-ic-web', 'Web制作', 1) + chip('r-av-1', 'デザイナー') + chip('r-ic-code', 'システム開発', 1) +
             chip('r-av-2', 'エンジニア') + chip('r-ic-sns', 'SNS運用', 1) + chip('r-av-3', 'SNSプランナー');
  var ROW2 = chip('r-ic-ads', '広告運用', 1) + chip('r-av-4', '広告運用者') + chip('r-av-pm', '専属PM') +
             chip('r-ic-consult', 'コンサルティング', 1) + chip('r-av-5', 'コンサルタント') + chip('r-ic-plus', 'その他の業務', 1);
  var BUILDING = '<svg viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" stroke-width="1.6" stroke-linejoin="round"><path d="M4 21V5l8-2v18M12 8l8 2.5V21M2 21h20"/><path d="M7 8h2M7 11.5h2M7 15h2M15 13h2M15 16.5h2" stroke-linecap="round"/></svg>';

  var SLIDES = [
    /* 01 FV */
    '<section class="slp-s slp-fv" data-name="top" aria-label="トップ"><div class="slp-inner">' +
      '<h1 class="slp-h1 a">その仕事、<br><em>プロ</em>に任せませんか？</h1>' +
      '<p class="slp-lead a">優秀なフリーランスと、あなたのビジネスをつなぐ。<br>専属PMが、外注の「探す・頼む・進める」をまるごと支えます。</p>' +
      '<div class="slp-stats a">' +
        '<div class="slp-stat slp-stat1"><span class="slp-avs">' + IMG('r-av-1') + IMG('r-av-2') + IMG('r-av-3') + '</span>' +
          '<span><small>認定フリーランス</small><span class="num">100</span><span class="unit">名以上</span></span></div>' +
        '<div class="slp-stat slp-stat2"><small>対応領域</small><span class="num">5</span><span class="unit">領域</span></div>' +
      '</div></div>' +
      '<div class="slp-band" aria-hidden="true"><div class="slp-mq">' +
        '<div class="slp-mq-row">' + ROW1 + ROW1 + '</div><div class="slp-mq-row rev">' + ROW2 + ROW2 + '</div>' +
      '</div><div class="slp-hint"><i></i>上にスワイプ</div></div>' +
    '</section>',

    /* 02 お悩み */
    '<section class="slp-s alt" data-name="problem" aria-label="よくあるお悩み"><div class="slp-inner">' +
      '<p class="slp-eb a">PROBLEM</p>' +
      '<h2 class="slp-h2 a">外注で、こんなお悩み<br>ありませんか？</h2>' +
      '<ul class="slp-worry">' +
        '<li class="a">誰に頼めばいいか、わからない</li>' +
        '<li class="a">やりたいことを、うまく伝えられない</li>' +
        '<li class="a">進行管理まで、手が回らない</li>' +
        '<li class="a">予算内に収まるか、不安</li>' +
      '</ul>' +
      '<p class="slp-turn a">そのお悩み、<br><em>専属PM</em>にお任せください。</p>' +
    '</div></section>',

    /* 03 専属PMがあいだに立つ */
    '<section class="slp-s" data-name="pm" aria-label="専属PM"><div class="slp-inner">' +
      '<p class="slp-eb a">PROJECT MANAGER</p>' +
      '<h2 class="slp-h2 a">専属PMが、<br>あいだに立ちます。</h2>' +
      '<div class="slp-tri a">' +
        '<div class="slp-node"><span class="ph">' + BUILDING + '</span>お客様</div>' +
        '<span class="slp-link"></span>' +
        '<div class="slp-node pm"><span class="ph">' + IMG('r-av-pm', '専属PM') + '</span>専属PM</div>' +
        '<span class="slp-link"></span>' +
        '<div class="slp-node"><span class="ph"><span class="duo">' + IMG('r-av-1') + IMG('r-av-2') + '</span></span>認定<br>フリーランス</div>' +
      '</div>' +
      '<p class="slp-txt a">経験豊富な専属PMが、プロジェクトの企画から納品まで一貫してサポート。はじめての外注でも、<strong>窓口はひとつだけ</strong>です。</p>' +
    '</div></section>',

    /* 04 PMが担当すること */
    '<section class="slp-s alt" data-name="pm-role" aria-label="専属PMが担当すること"><div class="slp-inner">' +
      '<p class="slp-eb a">SUPPORT</p>' +
      '<h2 class="slp-h2 a">面倒な調整は、<br><em>専属PM</em>がまるごと担当</h2>' +
      '<ul class="slp-check">' +
        '<li class="a">要件整理・仕様策定</li>' +
        '<li class="a">人材選定</li>' +
        '<li class="a">スケジュール・進行管理</li>' +
        '<li class="a">金額交渉・条件調整</li>' +
        '<li class="a">トラブル対応</li>' +
      '</ul>' +
    '</div></section>',

    /* 05 選ばれる理由 */
    '<section class="slp-s" data-name="reason" aria-label="選ばれる3つの理由"><div class="slp-inner">' +
      '<p class="slp-eb a">REASON</p>' +
      '<h2 class="slp-h2 a">選ばれる3つの理由</h2>' +
      '<div class="slp-rs">' +
        '<div class="slp-r a"><span class="n">01</span><div><h3>専属PMが伴走</h3><p>企画から納品まで、専属PMが一貫してサポート。要件整理や進行管理もお任せください。</p></div></div>' +
        '<div class="slp-r a"><span class="n">02</span><div><h3>100名以上の認定フリーランス</h3><p>厳正な審査を通過した、大手企業の支援実績も豊富なプロが多数在籍しています。</p></div></div>' +
        '<div class="slp-r a"><span class="n">03</span><div><h3>予算に合わせた最適提案</h3><p>PMがご予算に合わせて、価格交渉までサポートします。</p></div></div>' +
      '</div>' +
      '<a class="slp-more a" href="https://freelancers-cloud-showcase.vercel.app/showcase" data-slp-cta="showcase">実績を見る →</a>' +
    '</div></section>',

    /* 06 対応範囲 */
    '<section class="slp-s alt" data-name="service" aria-label="対応範囲"><div class="slp-inner">' +
      '<p class="slp-eb a">SERVICE</p>' +
      '<h2 class="slp-h2 a">対応範囲</h2>' +
      '<p class="slp-sub a">ビジネスに必要な業務を、認定フリーランスのプロに。</p>' +
      '<div class="slp-sv">' +
        '<a class="a" href="/contact" data-slp-cta="service-web">' + IMG('r-ic-web') + '<b>Web制作</b><small>コーポレートサイト・LP</small></a>' +
        '<a class="a" href="/contact" data-slp-cta="service-dev">' + IMG('r-ic-code') + '<b>システム開発</b><small>業務システム・Webアプリ</small></a>' +
        '<a class="a" href="/contact" data-slp-cta="service-sns">' + IMG('r-ic-sns') + '<b>SNS運用</b><small>戦略設計から運用まで</small></a>' +
        '<a class="a" href="/contact" data-slp-cta="service-ads">' + IMG('r-ic-ads') + '<b>広告運用</b><small>Google・SNS広告</small></a>' +
        '<a class="a" href="/contact" data-slp-cta="service-consult">' + IMG('r-ic-consult') + '<b>コンサルティング</b><small>事業戦略・業務改善</small></a>' +
        '<a class="a" href="/contact" data-slp-cta="service-other">' + IMG('r-ic-plus') + '<b>その他の業務</b><small>まずはPMにご相談を</small></a>' +
      '</div>' +
    '</div></section>',

    /* 07 ご利用の流れ */
    '<section class="slp-s" data-name="flow" aria-label="ご利用の流れ"><div class="slp-inner">' +
      '<p class="slp-eb a">FLOW</p>' +
      '<h2 class="slp-h2 a">ご利用の流れ</h2>' +
      '<ol class="slp-flow">' +
        '<li class="a"><span class="n">1</span><div><h3>ご相談</h3><p>フォームまたはお電話で、課題やご要望をお聞かせください。</p></div></li>' +
        '<li class="a"><span class="n">2</span><div><h3>ヒアリング</h3><p>目的・ご予算・スケジュールを専任PMが詳しく伺います。</p></div></li>' +
        '<li class="a"><span class="n">3</span><div><h3>ご提案</h3><p>最適な人材と、具体的なプラン・お見積りをご提案します。</p></div></li>' +
        '<li class="a"><span class="n">4</span><div><h3>開始</h3><p>ご契約後、専任PMのサポートのもとプロジェクトを開始します。</p></div></li>' +
      '</ol>' +
    '</div></section>',

    /* 08 よくある質問 */
    '<section class="slp-s alt" data-name="faq" aria-label="よくある質問"><div class="slp-inner">' +
      '<p class="slp-eb a">FAQ</p>' +
      '<h2 class="slp-h2 a">よくある質問</h2>' +
      '<div class="slp-faq">' +
        '<div class="slp-qa a"><p class="slp-q">予算が少なくても相談できますか？</p><p class="slp-a">はい。ご予算に合わせて、業務範囲や体制を調整しながら最適な進め方をご提案します。</p></div>' +
        '<div class="slp-qa a"><p class="slp-q">依頼内容が固まっていなくても<br>大丈夫ですか？</p><p class="slp-a">問題ありません。専属PMがヒアリングし、要件整理から一緒に進めます。</p></div>' +
        '<div class="slp-qa a"><p class="slp-q">トラブルが起きた場合は？</p><p class="slp-a">専属PMが間に入り、事実確認・条件整理・進行調整などを行います。</p></div>' +
      '</div>' +
    '</div></section>',

    /* 09 お問い合わせ */
    '<section class="slp-s slp-ct" data-name="contact" aria-label="お問い合わせ"><div class="slp-inner">' +
      '<p class="slp-eb a">CONTACT</p>' +
      '<h2 class="slp-h2 a">まずは、専属PMに<br>相談してみませんか。</h2>' +
      '<p class="t a">ご相談は無料です。<br>要件が固まっていなくても大丈夫です。</p>' +
      '<a class="slp-btn w a" href="/contact" data-slp-cta="contact-main">無料で相談する' + ARR + '</a>' +
      '<a class="slp-btn o a" href="https://freelancers-cloud-showcase.vercel.app/showcase" data-slp-cta="showcase">実績を見る</a>' +
    '</div>' +
    '<div class="slp-foot"><a href="/media">外注ガイド</a><a href="/contact">お問い合わせ</a><br>運営会社：東京企画合同会社 © 外注ドットコム</div>' +
    '</section>'
  ];

  function track_(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params); } catch (e) {}
    try { if (typeof window.clarity === 'function' && params && params.slide_name) window.clarity('event', name + '_' + params.slide_name); } catch (e) {}
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function setActive(i) {
    if (i < 0 || i >= slides.length || i === cur) return;
    cur = i;
    for (var k = 0; k < slides.length; k++) {
      slides[k].classList.toggle('on', k === i);
      segs[k].classList.toggle('on', k <= i);
    }
    countEl.innerHTML = '<b>' + pad(i + 1) + '</b> / ' + pad(slides.length);
    cta.classList.toggle('hide', i === slides.length - 1);
    var name = slides[i].getAttribute('data-name');
    if (!seen[i]) { seen[i] = 1; track_('slp_view', { slide_index: i + 1, slide_name: name }); }
  }

  /* 小さい画面ではみ出すスライドだけ縮小して1画面に収める */
  function fit() {
    if (!built || !root.classList.contains('slp-on')) return;
    for (var k = 0; k < slides.length; k++) {
      var s = slides[k], inner = s.querySelector('.slp-inner');
      if (!inner) continue;
      inner.style.transform = ''; inner.style.marginBottom = '';
      var cs = getComputedStyle(s);
      var avail = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      for (var c = s.firstElementChild; c; c = c.nextElementSibling) {
        if (c !== inner && getComputedStyle(c).position !== 'absolute') avail -= c.offsetHeight;
      }
      var h = inner.offsetHeight;
      if (h > avail && avail > 0) {
        var sc = Math.max(0.72, avail / h);
        inner.style.transform = 'scale(' + sc.toFixed(3) + ')';
        inner.style.marginBottom = (-(1 - sc) * h).toFixed(1) + 'px';
      }
    }
  }

  function onScroll() {
    var h = track.clientHeight || 1;
    setActive(Math.round(track.scrollTop / h));
  }

  function build() {
    el = document.createElement('div');
    el.id = 'slp';
    el.className = 'slp';
    var bars = '';
    for (var i = 0; i < SLIDES.length; i++) bars += '<i></i>';
    el.innerHTML =
      '<div class="slp-head"><div class="slp-prog" aria-hidden="true">' + bars + '</div>' +
        '<div class="slp-bar"><a class="slp-logo" href="#" aria-label="外注ドットコム"></a><span class="slp-count"></span></div></div>' +
      '<div class="slp-track" tabindex="-1">' + SLIDES.join('') + '</div>' +
      '<div class="slp-cta"><a class="slp-btn" href="/contact" data-slp-cta="fixed">無料で相談する' + ARR + '</a></div>';
    document.body.appendChild(el);

    /* ロゴは既存ヘッダーのSVGをそのまま使う */
    var srcLogo = document.querySelector('header a[href="#top"]') || document.querySelector('header a');
    var logo = el.querySelector('.slp-logo');
    if (srcLogo) logo.innerHTML = srcLogo.innerHTML; else logo.textContent = '外注ドットコム';

    track = el.querySelector('.slp-track');
    slides = [].slice.call(el.querySelectorAll('.slp-s'));
    segs = [].slice.call(el.querySelectorAll('.slp-prog i'));
    countEl = el.querySelector('.slp-count');
    cta = el.querySelector('.slp-cta');

    slides.forEach(function (s) {
      [].slice.call(s.querySelectorAll('.a')).forEach(function (a, j) { a.style.setProperty('--d', j); });
    });

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { ticking = false; onScroll(); });
    }, { passive: true });

    logo.addEventListener('click', function (e) { e.preventDefault(); track.scrollTo({ top: 0, behavior: 'smooth' }); });

    el.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-slp-cta]') : null;
      if (a) track_('slp_cta', { cta: a.getAttribute('data-slp-cta'), slide_index: cur + 1, slide_name: slides[cur] && slides[cur].getAttribute('data-name') });
    });

    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener('load', fit);

    built = true;
    fit();
    setActive(0);
  }

  function sync() {
    try {
      if (!mq || mq.matches) {
        root.classList.add('slp-on');
        if (!built) build();
        fit();
      } else {
        root.classList.remove('slp-on');
      }
    } catch (e) {
      root.classList.remove('slp-on'); /* 失敗したら従来LPに戻す */
    }
  }

  if (mq) { if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync); else sync();
})();
