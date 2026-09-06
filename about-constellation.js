/* ABOUT CONTENT — edit these six descriptions and positions here.
   x/y are percentages of the constellation; depth controls pointer response.
   No libraries, global animation hooks, or changes to the video system. */
(() => {
  const aboutNodes = [
    { id: 'game-dev', label: 'GAME DEVELOPMENT', number: '01', description: 'ผมสนุกกับการจำลองไอเดียตัวเองขึ้นมา', x: 19, y: 30, depth: 2.5, scale: 1.04, drift: 4, duration: 8.7 },
    { id: 'programming', label: 'PROGRAMMING', number: '02', description: 'การเขียนโปรแกรมเป็นเครื่องมือที่ทำให้ไอเดีย เป็นระบบที่ทำงานได้จริง', x: 76, y: 79, depth: 2, scale: 0.96, drift: -3, duration: 10.3 },
    { id: 'mathematics', label: 'MATHEMATICS', number: '03', description: 'การเข้าใจหลักการว่าสูตรต่าง ๆ ทำงานอย่างไร แล้วนำไปประยุกต์ใช้เป็นเรื่องที่น่าสนใจ', x: 48, y: 10, depth: 1, scale: 0.9, drift: 3, duration: 12.1 },
    { id: 'algorithms', label: 'ALGORITHMS', number: '04', description: 'การแก้ปัญหายากๆ เป็นเรื่องที่ท้าทายและสนุก', x: 83, y: 37, depth: 1.6, scale: 0.94, drift: -5, duration: 9.4 },
    { id: '3d-vfx', label: '3D / VFX', number: '05', description: 'ผมชอบจำลองสร้างงานสามมิติ แอนิเมชัน และVfxเป็นสิ่งที่ทำให้มันดูดีมากขึ้น', x: 15, y: 76, depth: 3, scale: 1.1, drift: 5, duration: 11.6 },
    { id: 'creating', label: 'CREATING', number: '06', description: 'ชอบการเรียนรู้ใหม่ๆและการลองผิดลองถูก มีสิ่งที่อยากสร้างอยู่ตลอดเวลา', x: 47, y: 96, depth: 1.8, scale: 0.92, drift: -3, duration: 13.7 },
  ];
  const connections = [[0, 1], [1, 3], [3, 2], [0, 4], [4, 5], [5, 1]];
  const make = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text) el.textContent = text;
    return el;
  };

  class AboutConstellation extends HTMLElement {
    connectedCallback() {
      if (this.abort) return;
      this.state = { hoveredNodeId: null, activeNodeId: null };
      this.abort = new AbortController();
      this.motion = matchMedia('(prefers-reduced-motion: reduce)');
      this.mobile = matchMedia('(max-width: 680px)');
      this.pointer = null;
      this.frame = 0;
      this.visible = false;
      this.build();
      const on = (el, type, fn, options = {}) => el.addEventListener(type, fn, { ...options, signal: this.abort.signal });
      on(this.scene, 'pointermove', e => {
        if (e.pointerType === 'touch' || this.motion.matches || this.mobile.matches) return;
        this.pointer = { x: e.clientX - this.bounds.left, y: e.clientY - this.bounds.top };
        this.schedule();
      }, { passive: true });
      on(this.scene, 'pointerleave', () => { this.pointer = null; this.schedule(); });
      on(this.scene, 'click', () => this.dispatch('reset'));
      on(this.details, 'click', e => {
        if (e.target.closest('.am-copy, .am-reset')) e.stopPropagation();
      });
      on(this.closeDetail, 'click', () => {
        this.items.find(n => n.data.id === this.state.activeNodeId)?.button.focus({ preventScroll: true });
        this.dispatch('reset');
      });
      on(document, 'keydown', e => {
        if (e.key === 'Escape' && this.visible && this.state.activeNodeId) {
          e.preventDefault();
          const node = this.items.find(n => n.data.id === this.state.activeNodeId);
          node?.button.focus({ preventScroll: true });
          this.dispatch('reset');
        }
      });
      on(this.launcher, 'click', () => { this.dialog.showModal(); this.setVisible(true); this.measure(); });
      on(this.closeMobile, 'click', () => this.dialog.close());
      on(this.dialog, 'cancel', e => {
        if (this.state.activeNodeId) { e.preventDefault(); this.dispatch('reset'); }
      });
      on(this.dialog, 'close', () => this.setVisible(false));
      on(this.mobile, 'change', () => this.placeScene());
      on(this.motion, 'change', () => { this.pointer = null; this.schedule(); });
      on(window, 'resize', () => this.measure(), { passive: true });
      on(window, 'scroll', () => { if (this.visible) this.bounds = this.map.getBoundingClientRect(); }, { passive: true });
      this.resize = new ResizeObserver(() => this.measure());
      this.resize.observe(this.map);
      this.intersection = new IntersectionObserver(entries => {
        if (!this.mobile.matches) this.setVisible(entries[0].isIntersecting);
        else if (!entries[0].isIntersecting && this.dialog.open) this.dialog.close();
      });
      this.intersection.observe(this);
      this.placeScene();
    }

    disconnectedCallback() {
      this.abort?.abort();
      this.resize?.disconnect();
      this.intersection?.disconnect();
      cancelAnimationFrame(this.frame);
      if (this.dialog?.open) this.dialog.close();
      this.abort = null;
      this.replaceChildren();
    }

    build() {
      this.launcher = make('button', 'am-launcher', 'Explore About');
      this.launcher.type = 'button';
      this.dialog = make('dialog', 'am-mobile');
      this.dialog.setAttribute('aria-label', 'About Phattarakul');
      this.closeMobile = make('button', 'am-mobile-close', 'Back to site');
      this.closeMobile.type = 'button';
      this.dialog.append(this.closeMobile);
      this.scene = make('section', 'am-scene');
      this.scene.setAttribute('aria-label', 'About me — explore my interests');
      const heading = make('header', 'am-heading');
      heading.append(make('span', 'am-eyebrow', 'THE REVEAL'), make('h2', '', 'About me'));
      const hint = make('p', 'am-instruction', 'Follow a thought.');
      heading.append(hint);
      this.map = make('div', 'am-map');
      this.lines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.lines.classList.add('am-lines');
      this.lines.setAttribute('aria-hidden', 'true');
      this.lineEls = connections.map(([a, b]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.lines.append(line);
        return { line, a, b };
      });
      const identity = make('div', 'am-identity');
      identity.append(make('span', 'am-eyebrow', 'A PERSONAL CONSTELLATION'), make('h3', '', 'PHATTARAKUL'), make('p', '', 'Student · Programmer · Game Developer'));
      this.map.append(this.lines, identity);
      this.items = aboutNodes.map((data, i) => {
        const anchor = make('div', 'am-anchor');
        anchor.style.cssText = `--x:${data.x}%;--y:${data.y}%;--scale:${data.scale};--drift:${data.drift}px;--duration:${data.duration}s;--delay:${i * 85}ms;--phase:-${i * 1.7}s`;
        const mover = make('div', 'am-mover');
        const floating = make('div', 'am-floating');
        const button = make('button', 'am-node');
        button.type = 'button';
        button.id = `about-node-${data.id}`;
        button.setAttribute('aria-controls', `about-copy-${data.id}`);
        button.setAttribute('aria-expanded', 'false');
        button.append(make('span', 'am-number', data.number), make('span', 'am-label', data.label), make('span', 'am-star'));
        const opts = { signal: this.abort.signal };
        button.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') this.dispatch('hover', data.id); }, opts);
        button.addEventListener('pointerleave', () => this.dispatch('leave', data.id), opts);
        button.addEventListener('focus', () => this.dispatch('hover', data.id), opts);
        button.addEventListener('blur', () => this.dispatch('leave', data.id), opts);
        button.addEventListener('click', e => { e.stopPropagation(); this.dispatch('activate', data.id); }, opts);
        floating.append(button); mover.append(floating); anchor.append(mover); this.map.append(anchor);
        return { data, anchor, mover, button, x: 0, y: 0, baseX: 0, baseY: 0 };
      });
      this.details = make('div', 'am-details');
      this.details.setAttribute('aria-live', 'polite');
      this.details.setAttribute('aria-atomic', 'true');
      this.prompt = make('p', 'am-prompt', 'Six interests. One curious mind.\nChoose a word to explore.');
      this.details.append(this.prompt);
      this.copies = aboutNodes.map(data => {
        const copy = make('div', 'am-copy');
        copy.id = `about-copy-${data.id}`;
        copy.setAttribute('aria-hidden', 'true');
        const description = make('p', '', data.description);
        description.lang = 'th';
        copy.append(make('span', 'am-copy-label', `${data.number} / ${data.label}`), description);
        this.details.append(copy);
        return copy;
      });
      this.closeDetail = make('button', 'am-reset', 'Close thought ×');
      this.closeDetail.type = 'button';
      this.closeDetail.hidden = true;
      this.details.append(this.closeDetail);
      this.scene.append(heading, this.map, this.details);
      this.append(this.launcher, this.scene, this.dialog);
    }

    placeScene() {
      if (this.dialog.open) this.dialog.close();
      this.launcher.hidden = !this.mobile.matches;
      (this.mobile.matches ? this.dialog : this).append(this.scene);
      this.setVisible(!this.mobile.matches && this.getBoundingClientRect().height > 0);
      this.measure();
    }

    setVisible(visible) {
      this.visible = visible;
      this.scene.dataset.running = String(visible);
      if (!visible) {
        this.dispatch('reset'); this.pointer = null;
        cancelAnimationFrame(this.frame); this.frame = 0;
      } else this.measure();
    }

    // One source of truth: ACTIVE > HOVER > IDLE. Native buttons supply keyboard/touch clicks.
    dispatch(event, id) {
      if (event === 'reset') this.state = { hoveredNodeId: null, activeNodeId: null };
      if (event === 'activate') this.state = { hoveredNodeId: null, activeNodeId: id };
      if (event === 'hover' && !this.state.activeNodeId) this.state.hoveredNodeId = id;
      if (event === 'leave' && !this.state.activeNodeId && this.state.hoveredNodeId === id) this.state.hoveredNodeId = null;
      const selected = this.state.activeNodeId || this.state.hoveredNodeId;
      this.scene.dataset.active = String(!!this.state.activeNodeId);
      this.items.forEach((item, i) => {
        const active = this.state.activeNodeId === item.data.id;
        const hovered = !this.state.activeNodeId && this.state.hoveredNodeId === item.data.id;
        item.anchor.dataset.state = active ? 'active' : hovered ? 'hover' : 'idle';
        item.button.setAttribute('aria-expanded', String(active));
        this.copies[i].dataset.open = String(active);
        this.copies[i].setAttribute('aria-hidden', String(!active));
      });
      this.prompt.hidden = !!this.state.activeNodeId;
      this.closeDetail.hidden = !this.state.activeNodeId;
      this.lineEls.forEach(({ line, a, b }) => line.classList.toggle('am-related', [aboutNodes[a].id, aboutNodes[b].id].includes(selected)));
      this.schedule();
    }

    // Geometry is cached on resize/entry. Pointer frames never read element layout.
    measure() {
      if (!this.map || !this.visible) return;
      this.bounds = this.map.getBoundingClientRect();
      this.compact = this.bounds.width < 650;
      this.items.forEach(item => {
        item.baseX = this.bounds.width * item.data.x / 100;
        item.baseY = this.bounds.height * item.data.y / 100;
      });
      this.lines.setAttribute('viewBox', `0 0 ${this.bounds.width || 1} ${this.bounds.height || 1}`);
      this.schedule();
    }

    schedule() {
      if (!this.visible || this.frame) return;
      this.frame = requestAnimationFrame(t => this.paint(t));
    }

    paint(now) {
      this.frame = 0;
      if (!this.visible || !this.bounds) return;
      const dt = Math.min(50, now - (this.lastTime || now - 16));
      this.lastTime = now;
      const ease = 1 - Math.exp(-dt / 145);
      const selected = this.items.find(n => n.data.id === (this.state.activeNodeId || this.state.hoveredNodeId));
      let unsettled = false;
      this.items.forEach(item => {
        let x = 0, y = 0;
        if (!this.motion.matches && !this.compact) {
          if (this.pointer) {
            const dx = item.baseX - this.pointer.x, dy = item.baseY - this.pointer.y;
            const distance = Math.hypot(dx, dy);
            const force = Math.pow(Math.max(0, 1 - distance / 260), 2) * item.data.depth * 4;
            x = dx / Math.max(1, distance) * force;
            y = dy / Math.max(1, distance) * force;
            x += (this.pointer.x / this.bounds.width - 0.5) * item.data.depth * 2;
            y += (this.pointer.y / this.bounds.height - 0.5) * item.data.depth * 2;
          }
          if (selected && selected !== item) {
            const dx = item.baseX - selected.baseX, dy = item.baseY - selected.baseY;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const push = Math.max(0, 1 - distance / 650) * (this.state.activeNodeId ? 14 : 6);
            x += dx / distance * push; y += dy / distance * push;
          }
        }
        item.x += (x - item.x) * ease; item.y += (y - item.y) * ease;
        if (Math.abs(x - item.x) + Math.abs(y - item.y) > 0.04) unsettled = true;
        item.mover.style.transform = `translate3d(${item.x.toFixed(2)}px,${item.y.toFixed(2)}px,0)`;
      });
      this.lineEls.forEach(({ line, a, b }) => {
        line.setAttribute('x1', this.items[a].baseX + this.items[a].x);
        line.setAttribute('y1', this.items[a].baseY + this.items[a].y);
        line.setAttribute('x2', this.items[b].baseX + this.items[b].x);
        line.setAttribute('y2', this.items[b].baseY + this.items[b].y);
      });
      if (unsettled) this.schedule();
    }
  }
  if (!customElements.get('about-constellation')) customElements.define('about-constellation', AboutConstellation);
})();
