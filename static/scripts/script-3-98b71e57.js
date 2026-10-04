
    function syncSectionNav() {
      const groups = Array.from(document.querySelectorAll('.section-group[data-category]'));
      const links = document.querySelectorAll('.section-nav a[data-category]');
      if (groups.length === 0) {
        links.forEach((a) => a.classList.remove('active'));
        return;
      }
      const keys = groups.map((g) => g.dataset.category);
      let hash = location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch (e) {}
      const active = keys.includes(hash) ? hash : keys[0];
      groups.forEach((g) => { g.hidden = g.dataset.category !== active; });
      links.forEach((a) => {
        const on = a.dataset.category === active;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
    if (!window.__sectionNavBound) {
      window.__sectionNavBound = true;
      document.addEventListener('nav', syncSectionNav);
      document.addEventListener('render', syncSectionNav);
      window.addEventListener('hashchange', syncSectionNav);
      // SPA 라우터는 같은 페이지의 # 링크를 pushState로 처리해서 hashchange가 나지
      // 않는다. 그래서 분류 링크 클릭과 뒤로/앞으로 가기에서도 직접 다시 맞춘다.
      window.addEventListener('popstate', () => setTimeout(syncSectionNav, 0));
      document.addEventListener('click', (e) => {
        const link = e.target instanceof Element && e.target.closest('.section-nav a[data-category]');
        if (link) setTimeout(syncSectionNav, 0);
      });
    }
    syncSectionNav();
  