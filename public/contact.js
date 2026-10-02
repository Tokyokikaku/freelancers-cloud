// お問い合わせフォームの送信（/api/contact へ JSON で POST）
(() => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const done = document.getElementById('form-done');
  if (!form || !status || !done) return;

  const button = form.querySelector('.form-submit');
  const label = button.querySelector('.submit-label');
  const MAIL = 'info@tyokikaku.co.jp';

  const showError = (message) => {
    status.textContent = message;
    status.className = 'form-status is-error';
    status.hidden = false;
  };
  const setBusy = (busy) => {
    button.disabled = busy;
    label.textContent = busy ? '送信中…' : '送信する';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.hidden = true;

    // novalidate にしているので、ここで入力チェック（未入力・形式違いの項目へ移動して表示）
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    setBusy(true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));

      form.hidden = true;
      done.hidden = false;
      done.focus();
      done.scrollIntoView({ block: 'center' });
    } catch (error) {
      showError(`送信できませんでした。時間をおいて再度お試しいただくか、${MAIL} まで直接ご連絡ください。`);
      setBusy(false);
    }
  });
})();
