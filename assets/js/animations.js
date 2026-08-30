document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. HERO ENTRY ANIMATION CHOREOGRAPHY (REDESIGNED) ---
  const heroTL = gsap.timeline();

  // Fade hero container
  heroTL.fromTo('.hero-sec-redesign', {
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

  // Title cinematic slide up
  heroTL.fromTo('.hero-title-redesign', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.3,
    ease: 'power3.out'
  }, '-=0.9');

  // Stagger left column contents
  heroTL.fromTo('.hero-desc-redesign, .hero-pill-btn-left', {
    y: 30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 1.1,
    ease: 'power3.out'
  }, '-=1.0');

  // Center column visual reveal
  heroTL.fromTo('.hero-orbital-rings', {
    scale: 0.85,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=1.1');

  heroTL.fromTo('.hero-counselor-img', {
    y: 40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1.3,
    ease: 'power3.out'
  }, '-=1.0');

  heroTL.fromTo('.hero-bottom-floating-actions', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8');

  // Right column card reveal
  heroTL.fromTo('.hero-ratings-card-redesign', {
    x: 40,
    opacity: 0
  }, {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=1.1');

  // --- 1.5. LOOPING FLOATS FOR DECORATIVE DOODLES ---
  // Gentle hover/pulse for sparkles
  gsap.to('.hero-doodle-sparkle-left svg, .hero-doodle-sparkle-right svg', {
    scale: 1.18,
    duration: 1.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.4
  });

  // Soft float for curved doodle arrow
  gsap.to('.hero-doodle-arrow', {
    y: 4,
    x: -3,
    duration: 3.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
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

