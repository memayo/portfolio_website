// Gooey invert cursor. Mounts itself onto <body> — no markup needed anywhere.
// Paired with cursor-blob.css, which explains how the goo filter and the
// invert blend are made to coexist.
//
// ✏️ TUNE THE FEEL HERE — everything adjustable lives in CONFIG below.
(() => {
  'use strict';

  const CONFIG = {
    // Spring physics, integrated by hand (no framer-motion here).
    //   mass      inertia — lower is snappier, higher is more lethargic
    //   damping   how quickly it settles — higher means less overshoot
    //   stiffness pull toward the pointer — higher is faster
    // MAIN uses the reference's numbers as-is.
    MAIN: { mass: 0.1, damping: 10, stiffness: 131 },
    // TRAIL deliberately lags: that gap is what the goo filter stretches into
    // a viscous tail instead of a second detached circle.
    TRAIL: { mass: 0.42, damping: 12, stiffness: 62 },
    FADE: { mass: 0.2, damping: 14, stiffness: 90 },
    // How the blob soaks into a control it's hovering.
    ABSORB: { mass: 0.22, damping: 15, stiffness: 105 },
    ABSORB_SCALE: 0.42,   // shrinks to this fraction once fully absorbed
    ABSORB_OPACITY: 0.42, // and dims to this
    ABSORB_STRETCH: 0.3,  // a droplet soaking in barely stretches

    // Squash-and-stretch: the faster it travels, the more it elongates along
    // its direction of travel and pinches across it — the jelly part.
    STRETCH_MAX: 0.42,
    // Pointer speed (px/sec) at which the stretch reaches STRETCH_MAX. Real
    // mice run 500-2000px/s, so this has to be in that range or the blob sits
    // permanently at full stretch.
    STRETCH_REF_SPEED: 1800,
    // Below this speed the blob stops re-aiming, so it doesn't jitter at rest.
    ROTATE_MIN_SPEED: 40,

    // Match the site's own 10s AFK fade so the blob doesn't sit there glowing
    // over a page that has already dimmed itself.
    IDLE_MS: 10000,

    // Integrate on a fixed timestep rather than the raw frame delta. These
    // springs are stiff (damping/mass = 100), and semi-implicit Euler only
    // stays stable while dt * damping/mass < 2 — i.e. under ~20ms. A single
    // slow frame on the raw delta makes velocity amplify instead of decay and
    // the blob rockets off. Substepping also means 60Hz and 120Hz displays
    // feel identical.
    FIXED_DT: 1 / 120,
    // Ceiling on catch-up work after a background tab / long stall.
    MAX_FRAME_DT: 0.1,
  };

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const media = (q) => (window.matchMedia ? window.matchMedia(q) : null);
  const coarse = media('(hover: none), (pointer: coarse)');
  const reduced = media('(prefers-reduced-motion: reduce)');
  // CSS hides the blob in these cases too; bailing here also skips the rAF loop.
  if ((coarse && coarse.matches) || (reduced && reduced.matches)) return;

  const spring = (cfg) => ({ value: 0, target: 0, velocity: 0, ...cfg });

  const step = (s, dt) => {
    const accel = (-s.stiffness * (s.value - s.target) - s.damping * s.velocity) / s.mass;
    s.velocity += accel * dt;
    s.value += s.velocity * dt;
  };

  const mainX = spring(CONFIG.MAIN);
  const mainY = spring(CONFIG.MAIN);
  const trailX = spring(CONFIG.TRAIL);
  const trailY = spring(CONFIG.TRAIL);
  const fade = spring(CONFIG.FADE);
  const absorb = spring(CONFIG.ABSORB);

  // Anything the visitor can click. The class hooks cover the site's own
  // controls; the cursor:pointer fallback catches clickable divs that carry no
  // class (modal slides, carousel dots, and anything added later).
  // (Skill cards are deliberately absent: they sit inside .sk-scene, which is
  // pointer-events:none, so they are presentation rather than controls.)
  const INTERACTIVE = 'a,button,input,select,textarea,summary,label,[role="button"],' +
    '.lx-link,.lx-nav,.lx-card,.lx-icon-btn,.lx-dot,.ct-slot,.ct-nav-btn,' +
    '[data-cursor-absorb]';

  let lastTarget = null;
  let lastInteractive = false;

  function isInteractive(el) {
    if (!el || el === document || el === window) return false;
    // Re-test only when the element under the pointer actually changes, so the
    // computed-style fallback costs nothing on a normal move.
    if (el === lastTarget) return lastInteractive;
    lastTarget = el;
    let hit = false;
    if (el.closest && el.closest(INTERACTIVE)) {
      hit = true;
    } else {
      for (let node = el, depth = 0; node && node.nodeType === 1 && depth < 4; node = node.parentElement, depth++) {
        if (window.getComputedStyle(node).cursor === 'pointer') { hit = true; break; }
      }
    }
    lastInteractive = hit;
    return hit;
  }

  let root;
  let mainEl;
  let trailEl;
  let frame = 0;
  let lastTime = 0;
  let idleTimer = 0;
  let placed = false;

  function build() {
    // The goo filter: blur the white blobs, then slam the alpha ramp back to a
    // hard edge. Overlapping blurs cross the threshold together, which is what
    // fuses them into one shape instead of two circles.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
    svg.innerHTML =
      '<defs><filter id="cb-goo" color-interpolation-filters="sRGB">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="9" result="cb-blur"/>' +
      '<feColorMatrix in="cb-blur" type="matrix" ' +
      'values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -13"/>' +
      '</filter></defs>';

    root = document.createElement('div');
    root.className = 'cb-root';
    root.setAttribute('aria-hidden', 'true');

    mainEl = document.createElement('div');
    mainEl.className = 'cb-blob cb-blob--main';
    trailEl = document.createElement('div');
    trailEl.className = 'cb-blob cb-blob--trail';

    root.append(trailEl, mainEl);
    document.body.append(svg, root);
  }

  function setTarget(x, y) {
    mainX.target = x;
    mainY.target = y;
    trailX.target = x;
    trailY.target = y;
    if (!placed) {
      // First sighting of the pointer: teleport rather than spring in from 0,0.
      placed = true;
      [mainX, mainY, trailX, trailY].forEach((s, i) => {
        s.value = i % 2 === 0 ? x : y;
        s.velocity = 0;
      });
    }
    fade.target = 1;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { fade.target = 0; }, CONFIG.IDLE_MS);
  }

  function transformFor(el, sxSpring, sySpring, scale, absorbed) {
    const vx = sxSpring.velocity;
    const vy = sySpring.velocity;
    const speed = Math.hypot(vx, vy);
    // Stretch along travel, pinch across it, so it reads as something viscous
    // being dragged rather than something simply scaled up. Soaking into a
    // control damps that stretch — a droplet being absorbed goes still.
    const s = CONFIG.STRETCH_MAX * Math.min(speed / CONFIG.STRETCH_REF_SPEED, 1)
      * (1 - absorbed * (1 - CONFIG.ABSORB_STRETCH));
    if (speed > CONFIG.ROTATE_MIN_SPEED) {
      el._angle = (Math.atan2(vy, vx) * 180) / Math.PI;
    }
    const angle = el._angle || 0;
    const scaleX = (1 + s) * scale;
    const scaleY = (1 - s * 0.65) * scale;
    el.style.transform =
      `translate3d(${sxSpring.value.toFixed(2)}px, ${sySpring.value.toFixed(2)}px, 0) ` +
      `rotate(${angle.toFixed(2)}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
  }

  let accumulator = 0;

  function tick(now) {
    frame = requestAnimationFrame(tick);
    const frameDt = Math.min((now - lastTime) / 1000, CONFIG.MAX_FRAME_DT);
    lastTime = now;
    if (!(frameDt > 0)) return;

    accumulator += frameDt;
    while (accumulator >= CONFIG.FIXED_DT) {
      step(mainX, CONFIG.FIXED_DT);
      step(mainY, CONFIG.FIXED_DT);
      step(trailX, CONFIG.FIXED_DT);
      step(trailY, CONFIG.FIXED_DT);
      step(fade, CONFIG.FIXED_DT);
      step(absorb, CONFIG.FIXED_DT);
      accumulator -= CONFIG.FIXED_DT;
    }

    const shown = Math.max(0, Math.min(1, fade.value));
    const soaked = Math.max(0, Math.min(1, absorb.value));
    // Absorbed: smaller and dimmer, as if the surface had drunk most of it.
    const alpha = shown * (1 - soaked * (1 - CONFIG.ABSORB_OPACITY));
    const scale = shown * (1 - soaked * (1 - CONFIG.ABSORB_SCALE));

    root.style.opacity = alpha.toFixed(3);
    // Nothing to composite while invisible — skip the filter work entirely.
    root.style.visibility = alpha < 0.002 ? 'hidden' : 'visible';
    if (alpha < 0.002) return;

    transformFor(mainEl, mainX, mainY, scale, soaked);
    transformFor(trailEl, trailX, trailY, scale, soaked);
  }

  function start() {
    if (root) return;
    build();
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      setTarget(e.clientX, e.clientY);
      const over = isInteractive(e.target);
      absorb.target = over ? 1 : 0;
      // The inversion is dropped the moment a control is entered rather than
      // faded out, because a half-inverted blob looks worse than either state.
      root.classList.toggle('is-absorbed', over);
    }, { passive: true });
    // Leaving the window retracts it; re-entering springs it back open.
    document.addEventListener('pointerleave', () => { fade.target = 0; });
    window.addEventListener('blur', () => { fade.target = 0; });
    frame = requestAnimationFrame((t) => { lastTime = t; tick(t); });
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });

  window.CursorBlob = {
    config: CONFIG,
    destroy() {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      if (root) root.remove();
      root = null;
    },
  };
})();
