document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = !window.matchMedia('(any-hover: hover)').matches;
  const isDesktop = window.innerWidth >= 768;

  // --- 1. LENIS SMOOTH SCROLL ---
  // --- 1. LENIS SMOOTH SCROLL (DISABLED PER USER REQUEST) ---
  let lenisInstance = null;

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
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkHeaderScroll);
  checkHeaderScroll();

  // --- 4. CUSTOM CURSOR & SPOTLIGHTS ---
  // Use screen width check — always enabled on desktop, skipped on mobile
  if (isDesktop) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    
    // Create logo container and text container inside the follower
    const followerInner = document.createElement('div');
    followerInner.className = 'custom-cursor-follower-inner';
    
    const followerText = document.createElement('span');
    followerText.className = 'custom-cursor-text';
    
    follower.appendChild(followerInner);
    follower.appendChild(followerText);
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    // Initialize offsets via GSAP to maintain perfect cursor centering
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo setters for physics-based fluid spring cursor (follower only)
    const followerX = gsap.quickTo(follower, "x", { duration: 0.12, ease: "power2.out" });
    const followerY = gsap.quickTo(follower, "y", { duration: 0.12, ease: "power2.out" });

    let cursorVisible = false;
    window.addEventListener('mousemove', (e) => {
      if (!cursorVisible) {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.2, ease: "power2.out" });
        cursorVisible = true;
      }
      // Inner dot follows mouse instantly for perfect responsiveness
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      
      // Outer spinning logo catches up quickly but smoothly
      followerX(e.clientX);
      followerY(e.clientY);
    });

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
        followerText.textContent = 'VIEW';
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('view-mode');
        followerText.textContent = '';
      });
    });
  }

  // --- 4.2. HERO RATINGS CARD ROTATOR ---
  const ratingsCard = document.querySelector('.hero-ratings-card-redesign');
  if (ratingsCard) {
    const contents = ratingsCard.querySelectorAll('.rating-card-content');
    let currentIndex = 0;

    // Set initial theme
    ratingsCard.classList.add('theme-' + contents[0].getAttribute('data-theme'));

    const swapContent = () => {
      const currentContent = contents[currentIndex];
      currentIndex = (currentIndex + 1) % contents.length;
      const nextContent = contents[currentIndex];

      // Fade out current
      gsap.to(currentContent, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        onComplete: () => {
          currentContent.style.visibility = 'hidden';
          currentContent.classList.remove('active');

          // Fade in next
          nextContent.style.visibility = 'visible';
          nextContent.classList.add('active');
          gsap.fromTo(nextContent, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });

          // Swap card theme class
          const theme = nextContent.getAttribute('data-theme');
          ratingsCard.classList.remove('theme-red', 'theme-white');
          ratingsCard.classList.add('theme-' + theme);
        }
      });
    };

    // Swap every 2 seconds
    setInterval(swapContent, 2000);
  }

  // --- 4.5. CARD HOVER SPOTLIGHT TRACKER ---
  const spotlightCards = document.querySelectorAll('.journey-bcard, .prof-card, .blog-card-editorial, .hero-ratings-card-redesign');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

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

  // --- 6. MOUSE REACTIVE HERO PARALLAX (SUBTLE BG & FLOATING CARD PARALLAX) ---
  const heroSec = document.querySelector('.hero-sec-redesign');
  if (heroSec && !prefersReducedMotion && !isTouchDevice) {
    heroSec.addEventListener('mousemove', (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouseX = e.clientX - w / 2;
      const mouseY = e.clientY - h / 2;

      // Parallax depths for layers
      gsap.to('.hero-ratings-card-redesign', { x: mouseX * 0.025, y: mouseY * 0.025, duration: 0.5, ease: 'power2.out' });
      gsap.to(heroSec, { backgroundPosition: `calc(50% + ${mouseX * 0.015}px) calc(50% + ${mouseY * 0.015}px)`, duration: 0.8, ease: 'power2.out' });
    });
    
    // Reset tilt on mouse leave
    heroSec.addEventListener('mouseleave', () => {
      gsap.to('.hero-ratings-card-redesign', { x: 0, y: 0, duration: 1.2, ease: 'power3.out' });
      gsap.to(heroSec, { backgroundPosition: '50% 50%', duration: 1.2, ease: 'power3.out' });
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
