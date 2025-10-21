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
  const darkToggle = $('#darkModeToggle');

  function setThemeClass(isDark) {
    // Apply on html and body to maximize CSS variable scope
    const root = document.documentElement;
    root.classList.toggle('theme-dark', !!isDark);
    if (document.body) document.body.classList.toggle('theme-dark', !!isDark);
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
    if (darkToggle) darkToggle.checked = !!shouldDark;
    setThemeClass(shouldDark);
  }

  if (darkToggle) {
    // Initialize
    applyThemeFromPreference();

    // Save on change
    darkToggle.addEventListener('change', () => {
      const mode = darkToggle.checked ? 'dark' : 'light';
      storeTheme(mode);
      setThemeClass(mode === 'dark');
    });

    media.addEventListener('change', () => {
      if (!getStoredTheme()) applyThemeFromPreference();
    });

  } else {
    // No toggle present (e.g., cv.html). Still apply stored/system theme
    applyThemeFromPreference();
  }

  // Mobile menu: close when navigating or pressing Escape
  const menuToggle = $('#menu-toggle');
  if (menuToggle) {
    $$('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => {
        if (menuToggle.checked) menuToggle.checked = false;
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
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
      const win = window.open(url.toString(), '_blank', 'noopener,noreferrer,width=960,height=1200');
      if (!win) {
        window.location.href = url.toString();
      }
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
