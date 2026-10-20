/* ═══════════════════════════════════════════════════════════
   KUMKUM RATHEE — PORTFOLIO JAVASCRIPT
   Features: typing animation, scroll reveal, theme toggle,
   active nav, mobile menu, contact form, smooth UX
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── TYPING ANIMATION ─────────────────────────────────── */
const ROLES = [
  'Full-Stack Developer',
  'B.Tech IT Student',
  'AI/ML Researcher',
  'Competitive Programmer',
  'Open Source Builder',
];

let roleIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  if (!typingEl) return;
  const current = ROLES[roleIdx];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, --charIdx);
  } else {
    typingEl.textContent = current.slice(0, ++charIdx);
  }
  let delay = isDeleting ? 50 : 95;
  if (!isDeleting && charIdx === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % ROLES.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();


/* ─── SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));


/* ─── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(sec => sectionObserver.observe(sec));


/* ─── NAVBAR SCROLL SHADOW ──────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'rgba(139,92,246,0.15)';
  } else {
    navbar.style.borderBottomColor = '';
  }
}, { passive: true });


/* ─── THEME TOGGLE ──────────────────────────────────────── */
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;
const iconMoon = themeBtn ? themeBtn.querySelector('.icon-moon') : null;
const iconSun  = themeBtn ? themeBtn.querySelector('.icon-sun')  : null;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('kr-theme', theme);
  if (iconMoon && iconSun) {
    iconMoon.style.display = theme === 'dark'  ? '' : 'none';
    iconSun.style.display  = theme === 'light' ? '' : 'none';
  }
}

// Load saved or system preference
const saved = localStorage.getItem('kr-theme');
const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(saved || preferred);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}


/* ─── MOBILE HAMBURGER MENU ─────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobile-drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
    }
  });
}


/* ─── SMOOTH SCROLL (anchors) ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ─── CONTACT FORM ──────────────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');
  const form    = document.getElementById('contact-form');

  if (!btn || !success || !form) return;

  // Loading state
  btn.disabled = true;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         style="width:16px;height:16px;animation:spin 1s linear infinite">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Sending…`;

  // Simulate send (2s)
  setTimeout(() => {
    form.reset();
    btn.style.display = 'none';
    success.style.display = 'flex';

    // Reset after 4s
    setTimeout(() => {
      btn.disabled = false;
      btn.style.display = '';
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             style="width:16px;height:16px">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message`;
      success.style.display = 'none';
    }, 4000);
  }, 2000);
}


/* ─── SKILL TAG HOVER RIPPLE ────────────────────────────── */
document.querySelectorAll('.stag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transition = 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1)';
  });
});


/* ─── PROJECT CARD TILT (subtle) ───────────────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    const maxTilt = 4;
    const rotX =  (-y / (rect.height / 2)) * maxTilt;
    const rotY =  ( x / (rect.width  / 2)) * maxTilt;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
  });
});


/* ─── CSS SPIN KEYFRAME (injected) ─────────────────────── */
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);


/* ─── FOOTER YEAR ───────────────────────────────────────── */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  const yr = new Date().getFullYear();
  yearEl.innerHTML = yearEl.innerHTML.replace(/\d{4}/, yr);
}


/* ─── CONSOLE EASTER EGG ────────────────────────────────── */
console.log(
  '%c kumkum.dev %c Built with ❤️ by Kumkum Rathee ',
  'background:#8b5cf6;color:#fff;padding:4px 10px;border-radius:4px 0 0 4px;font-weight:700',
  'background:#0d1117;color:#a78bfa;padding:4px 10px;border-radius:0 4px 4px 0;font-weight:600'
);
