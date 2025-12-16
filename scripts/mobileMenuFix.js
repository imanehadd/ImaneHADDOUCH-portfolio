(() => {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(() => {
    const pick = (selectors) => {
      for (const s of selectors) {
        const el = document.querySelector(s);
        if (el) return el;
      }
      return null;
    };

    // Essayez d’abord d’ajouter ces data-attributes dans votre HTML pour une détection précise:
    // - data-menu sur le conteneur du menu mobile
    // - data-menu-toggle sur le bouton hamburger
    const menu = pick(['[data-menu]', '.mobile-menu', '#mobile-menu', 'nav[aria-label="mobile"]', 'nav[data-role="mobile-menu"]']);
    const toggle = pick(['[data-menu-toggle]', '.menu-toggle', '#menu-toggle', 'button[aria-controls]', 'button.hamburger']);

    if (!menu || !toggle) return;

    const body = document.body;
    let isOpen = false;
    let closing = false;
    let scrollY = 0;

    function lockScroll() {
      if (body.classList.contains('menu-scroll-locked')) return;
      scrollY = window.scrollY || window.pageYOffset || 0;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.classList.add('menu-scroll-locked');
    }

    function unlockScroll() {
      if (!body.classList.contains('menu-scroll-locked')) return;
      const y = Math.abs(parseInt(body.style.top || '0', 10)) || 0;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.classList.remove('menu-scroll-locked');
      // Restaure la position du scroll (évite l’écran "figé" au retour)
      window.scrollTo(0, y);
    }

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      toggle.setAttribute('aria-expanded', 'true');
      menu.setAttribute('data-open', 'true');
      body.classList.add('menu-open');
      lockScroll();
    }

    function closeMenu() {
      if ((!isOpen && !body.classList.contains('menu-open')) || closing) {
        unlockScroll();
        isOpen = false;
        return;
      }
      closing = true;
      toggle.setAttribute('aria-expanded', 'false');
      menu.removeAttribute('data-open');
      body.classList.remove('menu-open');
      // Laisse une petite marge pour les transitions CSS, puis déverrouille
      requestAnimationFrame(() => {
        setTimeout(() => {
          unlockScroll();
          isOpen = false;
          closing = false;
        }, 300);
      });
    }

    function toggleMenu() {
      if (isOpen) closeMenu();
      else openMenu();
    }

    // Patch des changements d’historique (SPA): ferme le menu sur chaque changement d’URL
    (function patchHistory() {
      const wrap = (type) => {
        const orig = history[type];
        if (!orig) return;
        history[type] = function() {
          const ret = orig.apply(this, arguments);
          window.dispatchEvent(new Event('app:locationchange'));
          return ret;
        };
      };
      wrap('pushState');
      wrap('replaceState');
      window.addEventListener('popstate', () => window.dispatchEvent(new Event('app:locationchange')));
      window.addEventListener('app:locationchange', closeMenu);
    })();

    // Toggle via le bouton hamburger
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    // Ferme le menu sur clic d’un lien interne du menu
    menu.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      // Pour les ancres locales (#section), on ferme immédiatement.
      if (href.startsWith('#')) {
        closeMenu();
        return;
      }
      // Pour une navigation vers une autre page, on déverrouille tout de suite
      // afin d’éviter le "freeze" pendant le changement de page.
      unlockScroll();
    }, { capture: true });

    // Assainissement: ferme sur retour du cache (bfcache) et changement de visibilité
    window.addEventListener('pageshow', closeMenu);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') unlockScroll();
    });

    // Si on repasse en desktop, fermer le menu
    const mq = window.matchMedia('(min-width: 768px)');
    const onMQ = (e) => { if (e.matches) closeMenu(); };
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else mq.addListener(onMQ);

    // API facultative (pour débogage)
    window.__mobileMenuFix = { open: openMenu, close: closeMenu, toggle: toggleMenu };
  });
})();
