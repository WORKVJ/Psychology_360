document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. HERO ENTRY ANIMATION CHOREOGRAPHY ---
  const heroTL = gsap.timeline();

  // Fade hero container
  heroTL.fromTo('.hero-sec', {
    opacity: 0
  }, {
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  });

  // Fade header
  heroTL.fromTo('header', {
    y: -40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8');

  // Backdrop card scales up
  heroTL.fromTo('.hero-backdrop-card', {
    scale: 0.9,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.8');

  // Portrait reveals
  heroTL.fromTo('.hero-subject-portrait img', {
    y: 45,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'power3.out'
  }, '-=1.0');

  // Headline reveals
  heroTL.fromTo('.hero-large-title', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=1.1');

  // Supporting text reveals
  heroTL.fromTo('.hero-supporting-text', {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'power3.out'
  }, '-=1.0');

  // CTAs reveal
  heroTL.fromTo('.hero-actions', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.9');

  // Floating widgets stagger reveal
  heroTL.fromTo('.hero-widget', {
    y: 35,
    scale: 0.92,
    opacity: 0
  }, {
    y: 0,
    scale: 1,
    opacity: 1,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.7');

  // --- 1.5. FULL-TIME LOOPING FLOAT ANIMATIONS ---
  // Independent floating loops running on the child .widget-inner wrappers
  gsap.to('.widget-reviews .widget-inner', {
    y: 5,
    duration: 3.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.5
  });

  gsap.to('.widget-stats .widget-inner', {
    y: -6,
    duration: 4.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.7
  });

  gsap.to('.widget-chart .widget-inner', {
    y: 4,
    rotation: 1.5,
    duration: 3.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1.9
  });

  gsap.to('.widget-confidential .widget-inner', {
    y: -5,
    duration: 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 2.1
  });

  // Infinite subtle shadow pulse loop for the widget cards
  gsap.to('.hero-widget', {
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
    duration: 2.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
    delay: 1.5
  });

  // --- 2. HERO PARALLAX EXIT ---
  gsap.to('.hero-left-col', {
    scrollTrigger: {
      trigger: '.hero-sec',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 60,
    opacity: 0.3,
    ease: 'none'
  });

  gsap.to('.hero-subject-portrait img', {
    scrollTrigger: {
      trigger: '.hero-sec',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    scale: 1.05,
    ease: 'none'
  });

  gsap.to('.hero-backdrop-card', {
    scrollTrigger: {
      trigger: '.hero-sec',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 30,
    ease: 'none'
  });

  gsap.to('.hero-widget', {
    scrollTrigger: {
      trigger: '.hero-sec',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -30,
    ease: 'none'
  });

  // --- 3. SECTION 2 STATEMENT PROGRESSIVE REVEAL ---
  const statementWords = document.querySelectorAll('.statement-reveal-word');
  if (statementWords.length > 0) {
    const statementTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro-sec',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 1
      }
    });

    statementWords.forEach((word, index) => {
      statementTL.fromTo(word, {
        opacity: 0.1,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8
      }, index * 0.4);
    });
  }

  // --- 4. 360° JOURNEY BENTO GRID REVEAL ---
  const bentoGrid = document.querySelector('.journey-bento-grid');
  if (bentoGrid) {
    gsap.fromTo('.journey-bento-header-left, .journey-bento-header-right', {
      opacity: 0,
      y: 35
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-bento-sec',
        start: 'top 80%'
      }
    });

    gsap.fromTo('.journey-bcard', {
      opacity: 0,
      y: 50,
      scale: 0.97
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-bento-grid',
        start: 'top 80%'
      }
    });
  }

  gsap.fromTo('.services-divider-line-top', {
    scaleX: 0
  }, {
    scaleX: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.services-interactive-sec',
      start: 'top 95%',
      end: 'top 75%',
      scrub: true
    }
  });

  // Services bottom border line reveal
  gsap.fromTo('.services-divider-line-bottom', {
    scaleX: 0
  }, {
    scaleX: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.services-interactive-sec',
      start: 'bottom 95%',
      end: 'bottom 75%',
      scrub: true
    }
  });

  // --- 6. GENERAL SUBTLE SCROLL REVEALS ---
  const scrollReveals = document.querySelectorAll('.scroll-reveal');
  scrollReveals.forEach(el => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Stagger reveal Specialist Cards
  const professionalsGrid = document.querySelector('.professionals-grid');
  if (professionalsGrid) {
    gsap.fromTo(professionalsGrid.children, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: professionalsGrid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Stagger reveal Blog Cards
  const blogGrid = document.querySelector('.blog-grid-editorial');
  if (blogGrid) {
    gsap.fromTo(blogGrid.children, {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: blogGrid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // --- 7. FINAL CTA CONTINUITY ---
  // The circular ring visual returns in the background of final CTA
  gsap.fromTo('.cta-backdrop-ring', {
    scale: 0.8,
    opacity: 0,
    rotation: -30
  }, {
    scale: 1,
    opacity: 0.08,
    rotation: 60,
    scrollTrigger: {
      trigger: '.final-cta-editorial',
      start: 'top 85%',
      end: 'bottom 45%',
      scrub: true
    }
  });

});

