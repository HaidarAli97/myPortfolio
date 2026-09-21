'use strict';

/* ==========================================================================
   Haidar Ali — Portfolio interactions
   The contact form uses Web3Forms. Get a free access key at https://web3forms.com
   (enter your email, copy the key) and paste it below. It is safe to expose.
   ========================================================================== */
const WEB3FORMS_ACCESS_KEY = '6d117bc6-e27c-4dac-ab4d-a7d65f6dbbe9';
const CONTACT_EMAIL = 'alliyabdullahi@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------------------------------------- mobile nav */
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  const closeMenu = () => {
    if (!header || !toggle) return;
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) closeMenu();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ------------------------------------------------- scroll progress bar */
  const scrollBar = document.getElementById('scrollBar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (scrollBar) scrollBar.style.width = pct + '%';

    const scrolled = doc.scrollTop > 30;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('show', doc.scrollTop > 600);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }
  }, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /* -------------------------------------------------- typed role effect */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const roles = [
      'modern web experiences',
      'cross-platform mobile apps',
      'responsive UIs',
      'clean interfaces'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      typedEl.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex === 0) {
        typedEl.classList.remove('swap');
        void typedEl.offsetWidth;
        typedEl.classList.add('swap');
      }

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 90);
      } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 45);
      } else if (!deleting) {
        deleting = true;
        setTimeout(type, 1600);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
      }
    };

    setTimeout(type, 600);
  }

  /* ------------------------------------------------------- scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------- skill bar animation */
  const bars = document.querySelectorAll('.bar > i');
  if ('IntersectionObserver' in window && bars.length) {
    const barObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        obs.unobserve(bar);
      });
    }, { threshold: 0.4 });
    bars.forEach((bar) => barObserver.observe(bar));
  } else {
    bars.forEach((bar) => { bar.style.width = bar.dataset.width; });
  }

  /* ---------------------------------------------------- stat counters */
  const counters = document.querySelectorAll('.stat-num');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObserver.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* --------------------------------------------------- active nav link */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => activeObserver.observe(s));
  }

  /* ------------------------------------------------------ cursor glow */
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced) {
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let cx = gx;
    let cy = gy;
    window.addEventListener('mousemove', (e) => {
      gx = e.clientX;
      gy = e.clientY;
    });
    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* -------------------------------------------------------- card tilt */
  if (!prefersReduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* -------------------------------------------------- contact form */
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  const showToast = (msg, type) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show ' + (type || '');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.className = 'toast'; }, 4000);
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').trim();
      const email = (data.get('email') || '').trim();
      const subject = (data.get('subject') || '').trim() || 'Portfolio enquiry';
      const message = (data.get('message') || '').trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email and message.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      }

      const openMailApp = () => {
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
      };

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            email: email,
            subject: subject,
            message: message,
            from_name: 'Portfolio Website'
          })
        });
        const result = await res.json();

        if (result.success) {
          showToast('Thanks ' + name + '! Your message has been sent.', 'success');
          form.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        openMailApp();
        showToast('Could not send automatically — opening your email app instead.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
      }
    });
  }
});
