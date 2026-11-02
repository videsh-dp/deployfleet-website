// Header shadow on scroll
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('[data-nav]');
const setMenu = (open: boolean) => {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('nav-open', open);
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && setMenu(false));

// Dropdowns (click/tap; hover handled in CSS on desktop)
document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((dd) => {
  const btn = dd.querySelector('button');
  btn?.addEventListener('click', () => {
    const open = !dd.classList.contains('is-open');
    document.querySelectorAll('[data-dropdown].is-open').forEach((o) => {
      o.classList.remove('is-open');
      o.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    dd.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-dropdown]')) {
    document.querySelectorAll('[data-dropdown].is-open').forEach((o) => {
      o.classList.remove('is-open');
      o.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    setMenu(false);
    document.querySelectorAll('[data-dropdown].is-open').forEach((o) => o.classList.remove('is-open'));
  }
});

// Tabs
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const select = (tab: HTMLButtonElement) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(next);
      next.focus();
    });
  });
});

// Click-to-load YouTube
document.querySelectorAll<HTMLElement>('[data-video]').forEach((fig) => {
  const id = fig.dataset.video;
  const btn = fig.querySelector<HTMLButtonElement>('button.video-play');
  if (!id || !btn) return;
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
    iframe.title = fig.dataset.title ?? 'Video';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    fig.replaceChildren(iframe);
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

// Contact form (no backend yet): validate and hand off to the visitor's email client.
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  const to = form.dataset.to ?? '';
  const subject = `[Website] ${d.get('role')} inquiry from ${d.get('name')}`;
  const body = [
    `Name: ${d.get('name')}`,
    `Email: ${d.get('email')}`,
    `Phone: ${d.get('phone') || '-'}`,
    `Company: ${d.get('company') || '-'}`,
    `I am a: ${d.get('role')}`,
    `Topic: ${d.get('topic')}`,
    '',
    String(d.get('message') ?? ''),
  ].join('\n');
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.classList.add('is-sent');
});
