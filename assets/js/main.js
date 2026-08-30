document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. LENIS SMOOTH SCROLL ---
  let lenisInstance = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    if (typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // --- 2. SCROLL PROGRESS BAR ---
  const progressBar = document.querySelector('.scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0 && progressBar) {
      const scrollPercent = (window.pageYOffset / totalScroll) * 100;
      progressBar.style.width = scrollPercent + '%';
    }
  });

  // --- 3. HEADER STATE ---
  const header = document.querySelector('header');
  const checkHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkHeaderScroll);
  checkHeaderScroll();

  // --- 4. CUSTOM CURSOR ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!prefersReducedMotion && !isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followX = 0;
    let followY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const updateFollower = () => {
      followX += (mouseX - followX) * 0.12;
      followY += (mouseY - followY) * 0.12;
      follower.style.left = followX + 'px';
      follower.style.top = followY + 'px';
      requestAnimationFrame(updateFollower);
    };
    updateFollower();

    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });

    const images = document.querySelectorAll('.hero-human-portrait-container, .about-organic-mask-container, .blog-card-img-wrap, .prof-avatar-wrap');
    images.forEach(el => {
      el.addEventListener('mouseenter', () => { follower.classList.add('lens-mode'); });
      el.addEventListener('mouseleave', () => { follower.classList.remove('lens-mode'); });
    });

    const serviceRowsCursor = document.querySelectorAll('.service-row-item');
    serviceRowsCursor.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('view-mode');
        follower.textContent = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('view-mode');
        follower.textContent = '';
      });
    });
  }

  // --- 5. MAGNETIC BUTTONS ---
  if (!prefersReducedMotion && !isTouchDevice) {
    const magnetics = document.querySelectorAll('.btn-primary, .btn-secondary, .logo, .menu-toggle, .hero-play-badge');
    magnetics.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const bound = btn.getBoundingClientRect();
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  // --- 6. MOUSE REACTIVE HERO PARALLAX ---
  const heroSec = document.querySelector('.hero-sec');
  if (heroSec && !prefersReducedMotion && !isTouchDevice) {
    heroSec.addEventListener('mousemove', (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouseX = e.clientX - w / 2;
      const mouseY = e.clientY - h / 2;

      gsap.to('.hero-bg-blur', { x: mouseX * 0.005, y: mouseY * 0.005, duration: 0.8, ease: 'power2.out' });
      gsap.to('.hero-orbital-background', { x: mouseX * 0.012, y: mouseY * 0.012, duration: 0.6, ease: 'power2.out' });
      gsap.to('.hero-visual-gradient', { x: mouseX * 0.02, y: mouseY * 0.02, duration: 0.5, ease: 'power2.out' });
      gsap.to('.hero-portrait-mask', { x: mouseX * 0.03, y: mouseY * 0.03, duration: 0.4, ease: 'power2.out' });
      gsap.to('.hero-foreground-element', { x: mouseX * 0.05, y: mouseY * 0.05, duration: 0.3, ease: 'power2.out' });
    });
  }

  // --- 7. MOBILE NAVIGATION ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      if (mobileNav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
        if (lenisInstance) lenisInstance.stop();
      } else {
        document.body.style.overflow = '';
        if (lenisInstance) lenisInstance.start();
      }
    });

    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        if (lenisInstance) lenisInstance.start();
      });
    });
  }

  // --- 8. SERVICES INTERACTIVE LIST ---
  const serviceRows = document.querySelectorAll('.service-row-item');
  const serviceImages = document.querySelectorAll('.services-dynamic-img');
  const centerProgressNumber = document.querySelector('.services-360-center-text');

  if (serviceRows.length > 0) {
    serviceRows.forEach((row, index) => {
      const handleTrigger = () => {
        serviceRows.forEach(r => r.classList.remove('active'));
        serviceImages.forEach(img => img.classList.remove('active'));
        row.classList.add('active');
        if (serviceImages[index]) serviceImages[index].classList.add('active');
        if (centerProgressNumber) centerProgressNumber.textContent = `0${index + 1}`;
      };
      row.addEventListener('mouseenter', handleTrigger);
      row.addEventListener('click', handleTrigger);
    });
  }

  // --- 9. BILINGUAL PATH ROUTER ---
  const langSwitcherLinks = document.querySelectorAll('.lang-switcher a');
  langSwitcherLinks.forEach(switchLink => {
    switchLink.addEventListener('click', function(e) {
      e.preventDefault();
      const targetLang = this.getAttribute('data-lang');
      const currentPath = window.location.pathname;
      let targetPath = '/';

      if (targetLang === 'ml') {
        if (currentPath.includes('/ml/')) {
          targetPath = currentPath;
        } else {
          if (currentPath === '/' || (currentPath.endsWith('index.html') && !currentPath.includes('/', 2))) {
            targetPath = '/ml/';
          } else {
            targetPath = '/ml' + currentPath;
          }
        }
      } else {
        targetPath = currentPath.includes('/ml/') ? currentPath.replace('/ml/', '/') : currentPath;
      }

      window.location.href = targetPath;
    });
  });

  // --- 10. FORM VALIDATION ---
  const contactForm = document.querySelector('#contact-form');
  const formStatus = document.querySelector('.form-status');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#form-name').value.trim();
      const email = document.querySelector('#form-email').value.trim();
      const phone = document.querySelector('#form-phone').value.trim();
      const message = document.querySelector('#form-message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.className = 'form-status';
        formStatus.style.cssText = 'display:block;background:#FAF0F0;color:#EF4444;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1.5rem;';
        return;
      }

      formStatus.textContent = 'Redirecting to mail client...';
      formStatus.className = 'form-status success';
      formStatus.style.cssText = 'display:block;background:#EBFDF5;color:#10B981;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1.5rem;';

      setTimeout(() => {
        const mailtoUrl = `mailto:[Email Address]?subject=Psychology 360 Enquiry from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;
        window.location.href = mailtoUrl;
      }, 800);
    });
  }

  // --- 11. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item-editorial');
  faqItems.forEach(item => {
    const faqHeader = item.querySelector('.faq-header-editorial');
    const faqContent = item.querySelector('.faq-content-editorial');

    faqHeader.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherContent = otherItem.querySelector('.faq-content-editorial');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        faqContent.style.maxHeight = null;
      } else {
        item.classList.add('open');
        faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
      }
    });
  });
});
