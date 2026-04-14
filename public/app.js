// Portfolio site enhancements
// - Dark mode persistence and system preference sync
// - Mobile menu UX improvements
// - Footer year auto-update
// - Print CV helper

(function () {
  // Helper: safely query
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));


  // Dark mode toggle persistence
  // Note: The toggle is rendered by React, so it may not exist when this script runs.
  function setupTheme() {
    let darkToggle = $('#darkModeToggle');

    function setThemeClass(isDark) {
      // Apply on html and body to maximize CSS variable scope
      const root = document.documentElement;
      root.classList.toggle('theme-dark', !!isDark);
      if (document.body) document.body.classList.toggle('theme-dark', !!isDark);

      // Keep the checkbox-driven CSS in sync when the toggle exists
      if (darkToggle) darkToggle.checked = !!isDark;
    }

    function getStoredTheme() {
      return localStorage.getItem('theme'); // 'dark' | 'light' | null
    }

    function storeTheme(val) {
      if (!val) return localStorage.removeItem('theme');
      localStorage.setItem('theme', val);
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function applyThemeFromPreference() {
      const stored = getStoredTheme();
      const shouldDark = stored === 'dark' || (stored == null && media.matches);
      setThemeClass(shouldDark);
    }

    function bindToggle() {
      if (!darkToggle) return;
      if (darkToggle.dataset.themeBound === '1') return;
      darkToggle.dataset.themeBound = '1';

      darkToggle.addEventListener('change', () => {
        const mode = darkToggle.checked ? 'dark' : 'light';
        storeTheme(mode);
        setThemeClass(mode === 'dark');
      });
    }

    // Always apply theme (works even if the checkbox isn't present yet)
    applyThemeFromPreference();

    // Bind if present now
    bindToggle();

    // If the checkbox isn't present yet, wait for React to render it
    if (!darkToggle) {
      const obs = new MutationObserver(() => {
        darkToggle = $('#darkModeToggle');
        if (darkToggle) {
          // Sync checkbox with current theme class
          const isDark = document.documentElement.classList.contains('theme-dark');
          darkToggle.checked = isDark;
          bindToggle();
          obs.disconnect();
        }
      });

      obs.observe(document.documentElement, { childList: true, subtree: true });
    }

    media.addEventListener('change', () => {
      if (!getStoredTheme()) applyThemeFromPreference();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTheme);
  } else {
    setupTheme();
  }

  // Mobile menu + in-page navigation:
  // - React renders the nav, so elements may not exist when this script runs
  // - Close menu after selecting an item
  // - Smooth-scroll to sections for hash links
  function setupNav() {
    let menuToggle = $('#menu-toggle');
    if (!menuToggle) return;
    if (menuToggle.dataset.navBound === '1') return;
    menuToggle.dataset.navBound = '1';

    // Ensure menu is closed by default (covers refresh + bfcache restore)
    menuToggle.checked = false;

    // Event delegation handles links added later (React)
    document.addEventListener('click', (e) => {
      const link = e.target && e.target.closest ? e.target.closest('.nav-links a') : null;
      if (!link) return;

      const href = link.getAttribute('href') || '';
      const isHashLink = href.startsWith('#') && href.length > 1;

      if (menuToggle.checked) menuToggle.checked = false;

      if (isHashLink) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Keep URL hash in sync without a jump
          if (history && history.pushState) history.pushState(null, '', href);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });

    // Some browsers restore checkbox state on back/forward cache
    window.addEventListener('pageshow', () => {
      menuToggle.checked = false;
    });
  }

  // Bind now or wait for React to render header/nav
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNav);
  } else {
    setupNav();
  }

  if (!$('#menu-toggle')) {
    const navObs = new MutationObserver(() => {
      if ($('#menu-toggle')) {
        setupNav();
        navObs.disconnect();
      }
    });
    navObs.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Sticky header surface on scroll (CSS hooks on .page.is-scrolled)
  function setupHeaderScrollState() {
    const page = $('.page');
    if (!page) return;

    let rafId = null;

    function apply() {
      rafId = null;
      const scrolled = (window.scrollY || document.documentElement.scrollTop || 0) > 8;
      page.classList.toggle('is-scrolled', scrolled);
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    }

    // Initial state + listeners
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('pagehide', () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeaderScrollState);
  } else {
    setupHeaderScrollState();
  }

  // Footer year auto-update if pattern like "© 2025 ..." exists
  const footerText = $('#footer-text');
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace(/©\s*\d{4}/, `© ${year}`);
  }

  // Print CV button(s):
  // - On cv.html: trigger window.print()
  // - Elsewhere: open cv.html?print=1 in a popup; if blocked, fall back to same-tab
  $$('[data-print-cv]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOnCv = /\/cv\.html$/i.test(location.pathname);
      if (isOnCv) {
        window.print();
        return;
      }
      const url = new URL('cv.html', window.location.href);
      url.searchParams.set('print', '1');
      window.location.href = url.toString();
    });
  });

// Scroll reveal animations
  function setupReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    // Fallback without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after revealing to reduce work
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    items.forEach((el) => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReveal);
  } else {
    setupReveal();
  }

  // Hero parallax effect for blobs
  function setupParallax() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const blobs = $$('[data-speed]');
    if (!blobs.length) return;

    let rafId = null;
    let state = { mx: 0, my: 0, sy: 0, width: window.innerWidth, height: window.innerHeight };

    function onMouseMove(e) {
      state.mx = (e.clientX / state.width - 0.5) * 2; // -1 .. 1
      state.my = (e.clientY / state.height - 0.5) * 2;
      requestTick();
    }

    function onScroll() {
      const doc = document.documentElement;
      const scrolled = (doc.scrollTop || document.body.scrollTop) / (doc.scrollHeight - doc.clientHeight);
      state.sy = scrolled * 2 - 1; // -1 .. 1
      requestTick();
    }

    function onResize() {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
    }

    function requestTick() {
      if (rafId) return;
      rafId = requestAnimationFrame(applyParallax);
    }

    function applyParallax() {
      rafId = null;
      blobs.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.03;
        const tx = state.mx * 20 * speed;
        const ty = (state.my * 20 + state.sy * 30) * speed;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Cleanup on page hide
    window.addEventListener('pagehide', () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupParallax);
  } else {
    setupParallax();
  }


})();
