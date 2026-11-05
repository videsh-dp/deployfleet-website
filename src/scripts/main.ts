// Analytics: PostHog loads after the page is interactive, only when a project key is configured.
type Props = Record<string, unknown>;
let posthog: { capture: (event: string, props?: Props) => void } | null = null;
const queued: [string, Props?][] = [];
export const track = (event: string, props?: Props) => {
  if (posthog) posthog.capture(event, props);
  else queued.push([event, props]);
};
const phConfig = document.querySelector<HTMLMetaElement>('meta[name="ph-config"]');
if (phConfig?.dataset.key) {
  import('posthog-js').then(({ default: ph }) => {
    ph.init(phConfig.dataset.key!, {
      api_host: phConfig.dataset.host,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true, // clicks on CTAs, nav, video play buttons, form submits
      session_recording: { maskAllInputs: true },
      loaded: (p) => p.register({ site: 'marketing' }),
    });
    posthog = ph;
    queued.splice(0).forEach(([e, p]) => ph.capture(e, p));
  }).catch(() => { /* analytics must never break the site */ });
}

// Header shadow on scroll
const header = document.querySelector<HTMLElement>('[data-header]');
const mobileCta = document.querySelector<HTMLElement>('[data-mobile-cta]');
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
  // Show the sticky mobile CTA once the visitor has scrolled past the first screen.
  mobileCta?.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
};
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

// Contact form: posts JSON to the DeployFleet API (which emails the team via Resend).
// With no endpoint configured it hands off to the visitor's email app instead.
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const d = new FormData(form);
  form.classList.remove('is-sent', 'has-error');
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) btn.disabled = true;
    const errorText = form.querySelector<HTMLElement>('[data-error-text]');
    if (errorText) errorText.textContent = 'Sorry, something went wrong.';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(d)),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (!res.ok) {
        // 400 (validation) and 429 (rate limit) carry a message meant for the visitor.
        const data = await res.json().catch(() => null);
        if (errorText && (res.status === 400 || res.status === 429) && data?.message) {
          errorText.textContent = res.status === 400 ? `Please check the form: ${String(data.message).replace(/"/g, '')}.` : String(data.message);
        }
        throw new Error(String(res.status));
      }
      form.reset();
      form.classList.add('is-sent');
      track('contact_form_submitted', { role: d.get('role'), topic: d.get('topic') });
    } catch {
      form.classList.add('has-error');
    } finally {
      if (btn) btn.disabled = false;
    }
    return;
  }
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
