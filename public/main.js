// スマホ・タブレット用ハンバーガーメニューの開閉
(() => {
  const header = document.querySelector('.site-header');
  const toggle = header && header.querySelector('.nav-toggle');
  const nav = document.getElementById('global-nav');
  if (!header || !toggle || !nav) return;

  const isOpen = () => header.classList.contains('is-nav-open');
  const setOpen = (open) => {
    header.classList.toggle('is-nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // メニュー内のリンクを押したら閉じる
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // メニュー外のタップ・Escキーで閉じる
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // PC幅に戻ったら閉じた状態にリセット
  const desktop = window.matchMedia('(min-width: 981px)');
  const onChange = (event) => {
    if (event.matches) setOpen(false);
  };
  if (desktop.addEventListener) desktop.addEventListener('change', onChange);
  else desktop.addListener(onChange);
})();

// お問い合わせフォームの送信（/api/contact）
(() => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;
  const button = form.querySelector('button[type="submit"]');

  const show = (text, isError) => {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    button.disabled = true;
    show('送信中…');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) throw new Error(result.error || '送信に失敗しました。');
      form.reset();
      show('送信しました。担当者より折り返しご連絡します。');
    } catch (e) {
      show(e.message || '送信に失敗しました。', true);
    } finally {
      button.disabled = false;
    }
  });
})();
