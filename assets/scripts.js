/*! NSBLPA — scripts.js (optimized)
   - Mobile header menu (scoped, no globals)
   - Contact form validation
   - Leaderboard: smooth vertical auto-scroll (battery-friendly)
   - Teams ticker: one line, right→left, responsive re-measure
   - Respects prefers-reduced-motion & visibilitychange
*/

/* =========================
   Mobile header menu (scoped)
   ========================= */
(function () {
  const toggle   = document.querySelector('.menu-toggle');
  const nav      = document.getElementById('site-nav');
  const backdrop = document.getElementById('nav-backdrop');
  const root     = document.documentElement;
  const header   = document.querySelector('.site-header');
  const topstrip = document.querySelector('.topstrip');

  if (!toggle || !nav) return;

  const firstLink = nav.querySelector('a');

  function navTop(){
    let t = 0;
    if (topstrip) t += topstrip.offsetHeight;
    if (header)   t += header.offsetHeight;
    return t;
  }

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.classList.toggle('show', open);
    }
    root.classList.toggle('no-scroll', open);

    if (open) {
      if (firstLink) firstLink.focus();
      if (window.innerWidth < 720) {
        // Ensure panel opens below top strip + header
        nav.style.position = 'fixed';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.top = navTop() + 'px';
      }
    }
  }

  // Toggle on tap/click
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

  // Close when clicking backdrop or pressing Escape
  if (backdrop) backdrop.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Close when switching to desktop; keep top in sync on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 720) setMenu(false);
    else if (nav.classList.contains('open')) nav.style.top = navTop() + 'px';
  });

  // Close after tapping a nav link on mobile
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && window.innerWidth < 720) setMenu(false);
  });
})();

/* =========================
   Contact form validation
   ========================= */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'subject', 'message'];
    let ok = true;

    fields.forEach(id => {
      const el  = document.getElementById(id);
      const err = document.getElementById(id + 'Error');
      if (!el || !err) return;

      if (!el.value.trim()) {
        ok = false;
        err.textContent = 'Required';
      } else if (id === 'email' && !/^\S+@\S+\.\S+$/.test(el.value)) {
        ok = false;
        err.textContent = 'Enter a valid email';
      } else {
        err.textContent = '';
      }
    });

    if (ok) {
      console.log('Contact form payload:', Object.fromEntries(new FormData(form).entries()));
      alert('Thanks! Your message has been recorded for this demo.');
      form.reset();
    }
  });
})();

/* ==========================================
   Leaderboard: smooth vertical auto-scroll
   ========================================== */
(function () {
  const track = document.getElementById('lbTrack');
  const list  = document.getElementById('lbList');
  if (!track || !list) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Duplicate once for seamless wrap-around
  const clone = list.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);

  const viewport = track.parentElement; // .lb-viewport
  let y = 0;              // current offset (px)
  let speed = prefersReduced ? 0 : 0.45;  // px/frame (~27px/s @60fps)
  let raf;

  function step() {
    const contentH = list.offsetHeight;   // height of one list (half the track)
    const vpH = viewport.offsetHeight;

    if (speed <= 0 || contentH <= vpH) return; // no need to animate

    y += speed;
    if (y >= contentH) y = 0;            // wrap seamlessly
    track.style.transform = `translateY(${-y}px)`;
    raf = requestAnimationFrame(step);
  }

  function start(){ if (!raf) raf = requestAnimationFrame(step); }
  function stop(){ if (raf) cancelAnimationFrame(raf); raf = null; }

  start();

  // Pause on hover
  viewport.addEventListener('mouseenter', stop);
  viewport.addEventListener('mouseleave', start);

  // Optional: mouse wheel gently speeds up / slows down
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (prefersReduced) return;
    const delta = e.deltaY > 0 ? 0.08 : -0.08;
    speed = Math.max(0.2, Math.min(2.0, speed + delta));
  }, { passive: false });

  // Save battery when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
})();

/* ==========================================
   Teams ticker: one line, right → left
   ========================================== */
(function(){
  const track = document.getElementById('teamsTrack');
  if(!track) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Duplicate content once for seamless loop
  track.insertAdjacentHTML('beforeend', track.innerHTML);

  let x = 0;                          // translateX
  let speed = prefersReduced ? 0 : 0.40; // px/frame (~24px/s @60fps)
  let rowW = 0;
  let raf;

  function measure(){
    // total width of original row = half of scrollWidth (we doubled it)
    rowW = track.scrollWidth / 2;
    x = 0;
    track.style.transform = 'translateX(0)';
  }

  function step(){
    if (speed <= 0 || rowW <= 0) return;
    x -= speed;                         // move left
    if (x <= -rowW) x = 0;             // wrap
    track.style.transform = `translateX(${x}px)`;
    raf = requestAnimationFrame(step);
  }

  function start(){ if (!raf) raf = requestAnimationFrame(step); }
  function stop(){ if (raf) cancelAnimationFrame(raf); raf = null; }

  // Init
  measure();
  start();

  // Pause / resume on hover
  const wrap = track.parentElement;
  wrap.addEventListener('mouseenter', stop);
  wrap.addEventListener('mouseleave', start);

  // Re-measure on resize
  let rid;
  window.addEventListener('resize', () => {
    stop();
    clearTimeout(rid);
    rid = setTimeout(() => { measure(); start(); }, 120);
  });

  // Save battery when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
})();
