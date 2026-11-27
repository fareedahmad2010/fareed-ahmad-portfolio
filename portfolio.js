(() => {
  const KEY = 'fareedPortfolioSamplesV1';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const render = () => {
    const host = document.querySelector('[data-sample-list]');
    if (!host) return;
    const kind = host.dataset.sampleList;
    const items = read().filter(item => item.kind === kind);
    host.innerHTML = items.length ? items.map(item => `<article class="sample-card"><a class="sample-image" href="${esc(item.media || item.cover)}" target="_blank" rel="noopener" style="${item.cover ? `background-image:url('${esc(item.cover)}')` : ''}">${item.kind === 'video' ? '<span class="sample-play">▶</span>' : '<span class="sample-open">VIEW ↗</span>'}</a><div class="sample-info"><small>${item.kind === 'video' ? 'AI VIDEO SAMPLE' : 'WEB PROJECT'}</small><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></div></article>`).join('') : '';
  };
  const admin = document.querySelector('#sample-form');
  if (admin) {
    const list = document.querySelector('#admin-samples');
    const notice = document.querySelector('#admin-notice');
    const draw = () => { list.innerHTML = read().map((item, index) => `<div class="admin-item"><div><b>${esc(item.title)}</b><small>${item.kind === 'video' ? 'AI VIDEO' : 'WEB PROJECT'}</small></div><button type="button" data-delete="${index}" aria-label="Delete ${esc(item.title)}">Delete</button></div>`).join('') || '<p class="samples-empty">No samples added yet.</p>'; };
    admin.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(admin);
      const item = { id: crypto.randomUUID(), kind: data.get('kind'), title: data.get('title').trim(), description: data.get('description').trim(), cover: data.get('cover').trim(), media: data.get('media').trim() };
      localStorage.setItem(KEY, JSON.stringify([...read(), item])); admin.reset(); draw();
      notice.textContent = 'Sample saved in this browser. It will appear on the matching portfolio page.';
    });
    list.addEventListener('click', event => {
      const button = event.target.closest('[data-delete]'); if (!button) return;
      const items = read(); items.splice(Number(button.dataset.delete), 1); localStorage.setItem(KEY, JSON.stringify(items)); draw();
    });
    draw();
  }
  render();
  if (!window.matchMedia('(pointer: coarse)').matches) {
    const cursor = document.createElement('span'); cursor.className = 'cursor-dot'; document.body.append(cursor);
    window.addEventListener('pointermove', event => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; });
    document.addEventListener('pointerover', event => { if (event.target.closest('a,button,input,textarea,select')) cursor.classList.add('cursor-active'); else cursor.classList.remove('cursor-active'); });
  }
  const unlockForm = document.querySelector('#unlock-form');
  if (unlockForm) {
    const panel = document.querySelector('#admin-content');
    const gate = document.querySelector('#admin-lock');
    const unlock = () => { gate.hidden = true; panel.hidden = false; };
    if (sessionStorage.getItem('fareedAdminUnlocked') === 'yes') unlock();
    unlockForm.addEventListener('submit', event => {
      event.preventDefault();
      if (document.querySelector('#admin-code').value === '2010') {
        sessionStorage.setItem('fareedAdminUnlocked', 'yes'); unlock();
      } else document.querySelector('#lock-error').textContent = 'Code ghalat hai. Dobara try karein.';
    });
  }
})();
