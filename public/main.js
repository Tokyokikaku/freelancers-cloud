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
