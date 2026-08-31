/* ============================================================
   PSYCHOLOGY 360 — EXTREME ANIMATIONS ENGINE
   Targets existing markup classes. Uses GSAP + ScrollTrigger + Lenis.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ──────────────────────────────────────────────────────────────
     0. LENIS SMOOTH SCROLL — buttery 120fps scroll
     ────────────────────────────────────────────────────────────── */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis; // expose for mobile nav pause/resume
  }

  /* ──────────────────────────────────────────────────────────────
     0.5 TEXT SPLITTING — word-by-word reveal engine
     ────────────────────────────────────────────────────────────── */
  const splitTextElements = document.querySelectorAll('.js-split-text');
  splitTextElements.forEach(el => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const text = el.innerHTML.trim();
    const lines = text.split(/<br\s*\/?>/i);
    el.innerHTML = '';
    lines.forEach((lineText) => {
      const lineContainer = document.createElement('span');
      lineContainer.className = 'split-line';
      const words = lineText.split(/\s+/);
      words.forEach((wordText, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.textContent = wordText;
        lineContainer.appendChild(wordSpan);
        if (wordIdx < words.length - 1) {
          lineContainer.appendChild(document.createTextNode(' '));
        }
      });
      el.appendChild(lineContainer);
    });
  });

  /* ──────────────────────────────────────────────────────────────
     1. SCROLL PROGRESS BAR — top-of-page scroll indicator
     ────────────────────────────────────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     2. HERO ENTRY — cinematic reveal with stagger, blur & scale
     ────────────────────────────────────────────────────────────── */
  if (document.querySelector('.hero-sec-redesign')) {
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Full hero section — scale-up + blur reveal
    heroTL.fromTo('.hero-sec-redesign', {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(8px)'
    }, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.6,
      ease: 'power2.out'
    });

    // Header slide-down
    heroTL.fromTo('header', {
      y: -40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.9
    }, '-=1.0');

    // Title words — cinematic word-by-word stagger with rotation
    if (document.querySelector('.hero-title-redesign .split-word')) {
      heroTL.fromTo('.hero-title-redesign .split-word', {
        y: '120%',
        opacity: 0,
        rotateZ: 5
      }, {
        y: '0%',
        opacity: 1,
        rotateZ: 0,
        stagger: 0.06,
        duration: 1.3,
        ease: 'power4.out'
      }, '-=0.8');
    }

    // Ratings card — slide in from right with rotation
    if (document.querySelector('.hero-ratings-card-redesign')) {
      heroTL.fromTo('.hero-ratings-card-redesign', {
        x: 80,
        opacity: 0,
        rotateZ: 4,
        scale: 0.92
      }, {
        x: 0,
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        duration: 1.1
      }, '-=0.9');
    }

    // Bottom row — staggered children
    if (document.querySelector('.hero-bottom-row')) {
      heroTL.fromTo('.hero-bottom-row > *', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.14,
        duration: 0.9
      }, '-=0.8');
    }

    // Circular play badge — spin entrance
    const playBadge = document.querySelector('.circular-play-badge');
    if (playBadge) {
      heroTL.fromTo(playBadge, {
        scale: 0,
        rotation: -180,
        opacity: 0
      }, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, '-=1.0');
    }


  }

  /* ──────────────────────────────────────────────────────────────
     3. STATEMENT INTRO — scrub-driven word reveal with blur
     ────────────────────────────────────────────────────────────── */
  const statementWords = document.querySelectorAll('.statement-reveal-word');
  if (statementWords.length > 0) {
    const statementTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro-sec',
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 1.2
      }
    });

    statementWords.forEach((word, index) => {
      statementTL.fromTo(word, {
        opacity: 0.08,
        y: 30,
        scale: 0.94,
        filter: 'blur(6px)'
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7
      }, index * 0.35);
    });
  }

  /* ──────────────────────────────────────────────────────────────
     4. 360° JOURNEY BENTO GRID — staggered 3D reveal + tilt
     ────────────────────────────────────────────────────────────── */
  const bentoGrid = document.querySelector('.journey-bento-grid');
  if (bentoGrid) {
    // Header reveal timeline
    const journeyTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.journey-bento-sec',
        start: 'top 75%'
      }
    });

    journeyTL.fromTo('.journey-bento-header-left, .journey-bento-header-right', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Title split-word stagger
    if (document.querySelector('.journey-bento-title .split-word')) {
      journeyTL.fromTo('.journey-bento-title .split-word', {
        y: '110%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        stagger: 0.05,
        duration: 0.9,
        ease: 'power4.out'
      }, '-=0.7');
    }

    // Cards — 3D entrance with perspective
    gsap.fromTo('.journey-bcard', {
      opacity: 0,
      y: 80,
      scale: 0.92,
      rotateX: 8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-bento-grid',
        start: 'top 82%'
      }
    });

    // Background numeral parallax drift on each card
    document.querySelectorAll('.journey-bcard').forEach(card => {
      const num = card.querySelector('.journey-bcard-num');
      if (num) {
        gsap.fromTo(num, { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        });

        // Subtle parallax on the numeral as you scroll past
        gsap.to(num, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // 3D Magnetic tilt on hover (desktop only)
    if (window.matchMedia('(any-hover: hover)').matches) {
      document.querySelectorAll('.journey-bcard').forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: px * 10,
            rotateX: -py * 10,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
          });
        });
      });
    }
  }

  /* ──────────────────────────────────────────────────────────────
     5. COURSES/SERVICES INTERACTIVE LIST — pinned image + reveals
     ────────────────────────────────────────────────────────────── */
  const servicesSec = document.querySelector('.services-interactive-sec');
  if (servicesSec) {
    // Top/bottom divider line animation
    gsap.fromTo('.services-divider-line-top', { scaleX: 0 }, {
      scaleX: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: servicesSec,
        start: 'top 95%',
        end: 'top 70%',
        scrub: true
      }
    });
    gsap.fromTo('.services-divider-line-bottom', { scaleX: 0 }, {
      scaleX: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: servicesSec,
        start: 'bottom 95%',
        end: 'bottom 70%',
        scrub: true
      }
    });

    // Title split-word reveal
    if (document.querySelector('.services-main-title .split-word')) {
      gsap.fromTo('.services-main-title .split-word', {
        y: '120%',
        opacity: 0
      }, {
        y: '0%',
        opacity: 1,
        stagger: 0.05,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: servicesSec,
          start: 'top 78%'
        }
      });
    }

    // Eyebrow + description
    gsap.fromTo('.services-eyebrow, .services-main-desc', {
      opacity: 0,
      y: 25
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: servicesSec,
        start: 'top 80%'
      }
    });

    // Service accordion rows — staggered slide-in
    gsap.fromTo('.service-row-item', {
      opacity: 0,
      y: 50,
      x: 30
    }, {
      opacity: 1,
      y: 0,
      x: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-list-container',
        start: 'top 80%'
      }
    });


  }

  /* ──────────────────────────────────────────────────────────────
     6. FEATURE CARDS — staggered 3D flip-in + hover glow
     ────────────────────────────────────────────────────────────── */
  const featureGrid = document.querySelector('.feature-card-grid');
  if (featureGrid) {
    gsap.fromTo('.feature-card', {
      opacity: 0,
      y: 60,
      rotateY: 15,
      scale: 0.9
    }, {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.feature-card-grid',
        start: 'top 82%'
      }
    });

    // Feature icons — bounce in
    gsap.fromTo('.feature-icon', {
      scale: 0,
      rotation: -30
    }, {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.feature-card-grid',
        start: 'top 80%'
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     7. PROFESSIONALS GRID — cascade reveal with clip-path
     ────────────────────────────────────────────────────────────── */
  const professionalsGrid = document.querySelector('.professionals-grid');
  if (professionalsGrid) {
    // Section header
    const profHeader = professionalsGrid.closest('section')?.querySelector('div[style]');
    if (profHeader) {
      gsap.fromTo(profHeader.children, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: professionalsGrid.closest('section'),
          start: 'top 82%'
        }
      });
    }

    // Professional cards
    gsap.fromTo(professionalsGrid.children, {
      opacity: 0,
      y: 60,
      scale: 0.93
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: professionalsGrid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });


  }

  /* ──────────────────────────────────────────────────────────────
     8. BLOG / INSIGHTS CARDS — stagger + image parallax
     ────────────────────────────────────────────────────────────── */
  const blogGrid = document.querySelector('.blog-grid-editorial');
  if (blogGrid) {
    // Section header
    const insightsHeader = document.querySelector('.insights-header-block');
    if (insightsHeader) {
      gsap.fromTo(insightsHeader.children, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: insightsHeader,
          start: 'top 85%'
        }
      });
    }

    // Blog cards — staggered slide-up
    gsap.fromTo(blogGrid.children, {
      opacity: 0,
      y: 60,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.14,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: blogGrid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });


  }

  /* ──────────────────────────────────────────────────────────────
     9. FAQ ACCORDION — staggered reveal + expand animation
     ────────────────────────────────────────────────────────────── */
  const faqSec = document.querySelector('.faq-sec-editorial');
  if (faqSec) {
    const faqItems = faqSec.querySelectorAll('.faq-item-editorial');

    gsap.fromTo(faqItems, {
      opacity: 0,
      x: -40,
      y: 20
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: faqSec,
        start: 'top 80%'
      }
    });

    // FAQ grid header
    const faqGrid = faqSec.querySelector('.faq-editorial-grid');
    if (faqGrid && faqGrid.children[0]) {
      gsap.fromTo(faqGrid.children[0].children, {
        opacity: 0,
        y: 25
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: faqSec,
          start: 'top 82%'
        }
      });
    }
  }

  /* ──────────────────────────────────────────────────────────────
     10. FINAL CTA — dramatic entry + floating ring parallax
     ────────────────────────────────────────────────────────────── */
  const ctaSec = document.querySelector('.final-cta-editorial');
  if (ctaSec) {
    const ctaTL = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSec,
        start: 'top 80%'
      }
    });

    ctaTL.fromTo(ctaSec.querySelectorAll('h2, p, span, .btn'), {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Backdrop ring — scale + rotate parallax
    gsap.fromTo('.cta-backdrop-ring', {
      scale: 0.7,
      opacity: 0,
      rotation: -35
    }, {
      scale: 1,
      opacity: 0.08,
      rotation: 55,
      scrollTrigger: {
        trigger: ctaSec,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: true
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     11. FOOTER — wave reveal from bottom
     ────────────────────────────────────────────────────────────── */
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(footer, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%'
      }
    });

    // Stagger footer columns
    const footerCols = footer.querySelectorAll('.footer-col, .footer-brand');
    if (footerCols.length) {
      gsap.fromTo(footerCols, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 92%'
        }
      });
    }
  }

  /* ──────────────────────────────────────────────────────────────
     12. GENERAL SCROLL REVEALS — .scroll-reveal elements
     ────────────────────────────────────────────────────────────── */
  const scrollReveals = document.querySelectorAll('.scroll-reveal');
  scrollReveals.forEach(el => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 40,
      scale: 0.985
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ──────────────────────────────────────────────────────────────
     13. BACKGROUND MESH GLOW DRIFT — ambient movement
     ────────────────────────────────────────────────────────────── */
  if (document.querySelector('.glow-1')) gsap.to('.glow-1', { x: '20vw', y: '12vh', duration: 24, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  if (document.querySelector('.glow-2')) gsap.to('.glow-2', { x: '-18vw', y: '-10vh', duration: 28, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  if (document.querySelector('.glow-3')) gsap.to('.glow-3', { x: '-14vw', y: '14vh', duration: 26, repeat: -1, yoyo: true, ease: 'sine.inOut' });



  /* ──────────────────────────────────────────────────────────────
     15. HEADER HIDE/SHOW ON SCROLL DIRECTION
     ────────────────────────────────────────────────────────────── */
  const header = document.querySelector('header');
  if (header) {
    let lastScroll = 0;
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY > 100) {
          if (scrollY > lastScroll && self.direction === 1) {
            // Scrolling down — hide header
            gsap.to(header, { y: -100, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
          } else {
            // Scrolling up — show header
            gsap.to(header, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
          }
        } else {
          gsap.to(header, { y: 0, duration: 0.3, overwrite: 'auto' });
        }
        lastScroll = scrollY;
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     16. MAGNETIC HOVER — buttons & links glow effect
     ────────────────────────────────────────────────────────────── */
  if (window.matchMedia('(any-hover: hover)').matches) {
    document.querySelectorAll('.btn, .journey-bento-cta, .service-row-link, .blog-card-link').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      });
    });
  }

  /* ──────────────────────────────────────────────────────────────
     17. SECTION HORIZONTAL LINE REVEALS — eyebrow underlines
     ────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.journey-eyebrow, .services-eyebrow, .insights-eyebrow').forEach(eyebrow => {
    const spans = eyebrow.querySelectorAll('span');
    if (spans.length) {
      gsap.fromTo(spans, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: eyebrow,
          start: 'top 88%'
        }
      });
    }
  });

  /* ──────────────────────────────────────────────────────────────
     18. CIRCULAR PLAY BADGE — continuous rotation
     ────────────────────────────────────────────────────────────── */
  const circularSvg = document.querySelector('.circular-text-svg');
  if (circularSvg) {
    gsap.to(circularSvg, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: 'none'
    });
  }

  /* ──────────────────────────────────────────────────────────────
     19. SUBPAGE HEROES — stagger + fade up with ease-out
     ────────────────────────────────────────────────────────────── */
  const subpageHeroes = ['.about-hero', '.services-hero', '.blog-hero', '.faq-hero', '.contact-hero'];
  subpageHeroes.forEach(selector => {
    const hero = document.querySelector(selector);
    if (hero) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(hero, {
        opacity: 0,
        y: 40,
        scale: 0.98,
        filter: 'blur(5px)'
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2
      });
      
      const elements = hero.querySelectorAll('.prof-card-specialization, h1, .lead');
      if (elements.length) {
        tl.fromTo(elements, {
          y: 30,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8
        }, '-=0.9');
      }
    }
  });

  /* ──────────────────────────────────────────────────────────────
     20. SUBPAGE COMPONENTS & GRID ITEMS
     ────────────────────────────────────────────────────────────── */
  // Vision / Mission Columns
  const vmSec = document.querySelector('.vision-mission-sec');
  if (vmSec) {
    const columns = vmSec.querySelectorAll('.container > div');
    gsap.fromTo(columns, {
      opacity: 0,
      y: 40,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: vmSec,
        start: 'top 80%'
      }
    });
  }

  // Why Choose Us
  const whyUs = document.querySelector('.why-choose-us');
  if (whyUs) {
    gsap.fromTo(whyUs.querySelectorAll('.container > div'), {
      opacity: 0,
      y: 45
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: whyUs,
        start: 'top 82%'
      }
    });
  }

  // Hover Glow Cards (Courses page catalog)
  const hoverGlowCards = document.querySelectorAll('.hover-glow-card');
  if (hoverGlowCards.length) {
    gsap.fromTo(hoverGlowCards, {
      opacity: 0,
      y: 50,
      rotateY: 10
    }, {
      opacity: 1,
      y: 0,
      rotateY: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: hoverGlowCards[0].closest('section'),
        start: 'top 80%'
      }
    });

    // 3D Tilt on Hover for Course Cards
    if (window.matchMedia('(any-hover: hover)').matches) {
      hoverGlowCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotateY: px * 12,
            rotateX: -py * 12,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
          });
        });
      });
    }
  }

  // Scope & Advantages Lists
  const scopeSec = document.querySelector('.scope-advantages');
  if (scopeSec) {
    const listItems = scopeSec.querySelectorAll('ul > li');
    gsap.fromTo(listItems, {
      opacity: 0,
      x: -25
    }, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scopeSec,
        start: 'top 80%'
      }
    });
  }

  // Contact Page Layout
  const contactLayout = document.querySelector('.contact-layout-editorial');
  if (contactLayout) {
    gsap.fromTo(contactLayout.children, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactLayout,
        start: 'top 80%'
      }
    });
  }

  /* ──────────────────────────────────────────────────────────────
     DONE — Refresh ScrollTrigger after images/fonts load
     ────────────────────────────────────────────────────────────── */
  window.addEventListener('load', () => ScrollTrigger.refresh());
});
