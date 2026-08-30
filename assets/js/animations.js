document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- 0. BACKGROUND MESH GRADIENT DRIFT ---
  gsap.to('.glow-1', {
    x: '30vw',
    y: '15vh',
    duration: 22,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.glow-2', {
    x: '-25vw',
    y: '-10vh',
    duration: 26,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.glow-3', {
    x: '-20vw',
    y: '20vh',
    duration: 24,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // --- 0.5. TEXT SPLITTING UTILITY ENGINE ---
  const splitTextElements = document.querySelectorAll('.js-split-text');
  splitTextElements.forEach(el => {
    const text = el.innerHTML.trim();
    // Split by <br> tags to preserve paragraphs/breaks
    const lines = text.split(/<br\s*\/?>/i);
    el.innerHTML = '';
    
    lines.forEach((lineText, lineIdx) => {
      const lineContainer = document.createElement('span');
      lineContainer.className = 'split-line';
      
      const words = lineText.split(/\s+/);
      words.forEach((wordText, wordIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.textContent = wordText;
        lineContainer.appendChild(wordSpan);
        
        // Append spaces between words
        if (wordIdx < words.length - 1) {
          lineContainer.appendChild(document.createTextNode(' '));
        }
      });
      
      el.appendChild(lineContainer);
    });
  });

  // --- 1. HERO ENTRY ANIMATION CHOREOGRAPHY ---
  const heroTL = gsap.timeline();

  // Reveal main hero block
  heroTL.fromTo('.hero-sec-redesign', {
    opacity: 0
  }, {
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  });

  // Animate header navigation items slide-down
  heroTL.fromTo('header', {
    y: -30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Title cinematic slide up (Split word stagger)
  heroTL.fromTo('.hero-title-redesign .split-word', {
    y: '110%',
    opacity: 0
  }, {
    y: '0%',
    opacity: 1,
    stagger: 0.05,
    duration: 1.1,
    ease: 'power4.out'
  }, '-=0.7');

  // Stagger left column contents
  heroTL.fromTo('.hero-desc-redesign, .hero-pill-btn-left', {
    y: 25,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.8');

  // Center column visual reveal (Orbital rings and portrait cutout)
  heroTL.fromTo('.hero-orbital-rings', {
    scale: 0.82,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.9');

  heroTL.fromTo('.hero-counselor-img', {
    scale: 0.92,
    y: 50,
    opacity: 0
  }, {
    scale: 1,
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power4.out'
  }, '-=0.8');

  heroTL.fromTo('.hero-bottom-floating-actions', {
    y: 15,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Right column card reveal
  heroTL.fromTo('.hero-ratings-card-redesign', {
    x: 30,
    opacity: 0
  }, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.9');

  // --- 1.5. LOOPING FLOATS FOR DECORATIVE DOODLES ---
  gsap.to('.hero-doodle-sparkle-left svg, .hero-doodle-sparkle-right svg', {
    scale: 1.15,
    duration: 1.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.4
  });

  gsap.to('.hero-doodle-arrow', {
    y: 3,
    x: -2,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  // --- 2. SECTION 2 STATEMENT PROGRESSIVE REVEAL ---
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
        opacity: 0.15,
        y: 20,
        scale: 0.97
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6
      }, index * 0.3);
    });
  }

  // --- 3. 360° JOURNEY BENTO GRID REVEAL ---
  const bentoGrid = document.querySelector('.journey-bento-grid');
  if (bentoGrid) {
    gsap.fromTo('.journey-bento-header-left, .journey-bento-header-right', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-bento-sec',
        start: 'top 80%'
      }
    });

    // Stagger reveal split words in Bento Title
    gsap.fromTo('.journey-bento-title .split-word', {
      y: '100%',
      opacity: 0
    }, {
      y: '0%',
      opacity: 1,
      stagger: 0.04,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.journey-bento-title',
        start: 'top 80%'
      }
    });

    // Glass bento cards roll-in
    gsap.fromTo('.journey-bcard', {
      opacity: 0,
      y: 40,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-bento-grid',
        start: 'top 80%'
      }
    });
  }

  // --- 4. SERVICES INTERACTIVE LIST REVEAL ---
  const servicesSec = document.querySelector('.services-interactive-sec');
  if (servicesSec) {
    gsap.fromTo('.services-divider-line-top', {
      scaleX: 0
    }, {
      scaleX: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: servicesSec,
        start: 'top 95%',
        end: 'top 75%',
        scrub: true
      }
    });

    gsap.fromTo('.services-divider-line-bottom', {
      scaleX: 0
    }, {
      scaleX: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: servicesSec,
        start: 'bottom 95%',
        end: 'bottom 75%',
        scrub: true
      }
    });

    // Stagger reveal split words in Services Title
    gsap.fromTo('.services-main-title .split-word', {
      y: '100%',
      opacity: 0
    }, {
      y: '0%',
      opacity: 1,
      stagger: 0.04,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.services-main-title',
        start: 'top 80%'
      }
    });

    // Stagger reveal service accordion rows
    gsap.fromTo('.service-row-item', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-list-container',
        start: 'top 80%'
      }
    });
  }

  // --- 5. GENERAL SCROLL REVEALS ---
  const scrollReveals = document.querySelectorAll('.scroll-reveal');
  scrollReveals.forEach(el => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 25
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Stagger reveal Specialist Cards
  const professionalsGrid = document.querySelector('.professionals-grid');
  if (professionalsGrid) {
    gsap.fromTo(professionalsGrid.children, {
      opacity: 0,
      y: 35
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
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
      y: 35
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: blogGrid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // --- 6. FINAL CTA BACKDROP PARALLAX ---
  gsap.fromTo('.cta-backdrop-ring', {
    scale: 0.82,
    opacity: 0,
    rotation: -25
  }, {
    scale: 1,
    opacity: 0.06,
    rotation: 50,
    scrollTrigger: {
      trigger: '.final-cta-editorial',
      start: 'top 85%',
      end: 'bottom 45%',
      scrub: true
    }
  });
});
