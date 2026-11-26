document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent(`Project enquiry — ${d.get('service')}`);const body=encodeURIComponent(`Hello Fareed,\n\nMy name is ${d.get('name')} (${d.get('email')}).\n\nI'm interested in: ${d.get('service')}\n\n${d.get('message')}\n\nRegards,\n${d.get('name')}`);window.location.href=`mailto:fareedahmad2010ali@gmail.com?subject=${subject}&body=${body}`;});

const nameTitle = document.querySelector('.name-flair');
const titleDescriptor = nameTitle?.closest('h1')?.querySelector('em');
const heroDescription = nameTitle?.closest('.hero-copy')?.querySelector('.lead');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (nameTitle && titleDescriptor && heroDescription) {
  const fullName = nameTitle.textContent.trim();
  const fullDescriptor = titleDescriptor.textContent.trim();
  const fullDescription = heroDescription.textContent.trim();
  nameTitle.setAttribute('aria-label', fullName);
  titleDescriptor.setAttribute('aria-label', fullDescriptor);
  heroDescription.setAttribute('aria-label', fullDescription);

  if (!prefersReducedMotion) {
    nameTitle.classList.add('typewriter-active');
    let characterCount = 0;
    let isDeleting = false;

    const renderTitle = () => {
      nameTitle.textContent = fullName.slice(0, Math.min(characterCount, fullName.length));
      const descriptorCount = Math.max(0, characterCount - fullName.length);
      titleDescriptor.textContent = fullDescriptor.slice(0, descriptorCount);
      const descriptionCount = Math.max(0, characterCount - fullName.length - fullDescriptor.length);
      heroDescription.textContent = fullDescription.slice(0, descriptionCount);

      if (characterCount < fullName.length) {
        nameTitle.classList.add('typewriter-active');
        titleDescriptor.classList.remove('typewriter-active');
        heroDescription.classList.remove('typewriter-active');
      } else if (characterCount < fullName.length + fullDescriptor.length) {
        nameTitle.classList.remove('typewriter-active');
        titleDescriptor.classList.add('typewriter-active');
        heroDescription.classList.remove('typewriter-active');
      } else {
        nameTitle.classList.remove('typewriter-active');
        titleDescriptor.classList.remove('typewriter-active');
        heroDescription.classList.add('typewriter-active');
      }
    };

    const typeNextCharacter = () => {
      if (!isDeleting) {
        if (characterCount < fullName.length + fullDescriptor.length + fullDescription.length) {
          characterCount += 1;
          renderTitle();
          const typingDelay = characterCount <= fullName.length ? 145 : characterCount <= fullName.length + fullDescriptor.length ? 105 : 58;
          window.setTimeout(typeNextCharacter, typingDelay);
          return;
        }

        heroDescription.classList.remove('typewriter-active');
        window.setTimeout(() => {
          isDeleting = true;
          typeNextCharacter();
        }, 5200);
        return;
      }

      if (characterCount > 0) {
        characterCount -= 1;
        renderTitle();
        window.setTimeout(typeNextCharacter, 38);
        return;
      }

      nameTitle.classList.add('typewriter-active');
      isDeleting = false;
      window.setTimeout(typeNextCharacter, 850);
    };

    nameTitle.textContent = '';
    titleDescriptor.textContent = '';
    heroDescription.textContent = '';
    window.setTimeout(typeNextCharacter, 450);
  }
}

const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-art, .inner-hero > .eyebrow, .inner-hero > h1, .inner-hero > .lead, .inner-hero > .button, .trust, .section-heading, .service-card, .manifesto-inner, .bottom-cta, .web-showcase, .about-visual, .about-copy > div, .video-feature, .offer-grid article, .sample-card, .contact-intro, .contact-form, .featured-work-heading, .featured-project-card'
);

if (revealTargets.length) {
  revealTargets.forEach((element) => {
    element.classList.add('motion-reveal');
    const staggered = element.matches('.service-card, .offer-grid article, .sample-card, .about-copy > div');
    const siblingIndex = staggered ? Array.from(element.parentElement?.children ?? []).indexOf(element) : 0;
    element.style.setProperty('--reveal-delay', `${Math.max(0, siblingIndex) * 90}ms`);
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -32px 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }
}

const scrollVideoFrames = [...document.querySelectorAll('[data-scroll-video]')];

if (scrollVideoFrames.length && 'IntersectionObserver' in window) {
  const scrollVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector('video');
      if (!video) return;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !prefersReducedMotion && !document.hidden) {
        const playback = video.play();
        playback?.catch?.(() => {});
      } else {
        video.pause();
        if (video.readyState > 0) video.currentTime = 0;
      }
    });
  }, { threshold: [0, 0.3] });

  scrollVideoFrames.forEach((frame) => scrollVideoObserver.observe(frame));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      scrollVideoFrames.forEach((frame) => {
        const video = frame.querySelector('video');
        video?.pause();
        if (video?.readyState > 0) video.currentTime = 0;
      });
    } else {
      scrollVideoFrames.forEach((frame) => {
        scrollVideoObserver.unobserve(frame);
        scrollVideoObserver.observe(frame);
      });
    }
  });
}

if (!document.querySelector('.admin-page, .admin-lock, .whatsapp-float')) {
  const whatsappLink = document.createElement('a');
  whatsappLink.className = 'whatsapp-float';
  whatsappLink.href = 'https://wa.me/923225586295';
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noopener noreferrer';
  whatsappLink.setAttribute('aria-label', 'Chat with Fareed on WhatsApp');
  whatsappLink.title = 'Chat on WhatsApp';
  whatsappLink.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12 12 0 0 0-10.2 18.3L4 27.5l6.3-1.7A12 12 0 1 0 16 3Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12.1 9.3c-.3-.6-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.9c.2.3 2.7 4.2 6.5 5.7 3.2 1.3 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.9-.6-.5-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.9.1-.5-.2-1.9-.7-3.5-2.1-1.3-1.1-2.1-2.5-2.4-2.9-.2-.4 0-.6.2-.8.2-.2.5-.5.7-.8.2-.3.3-.5.4-.8.1-.3 0-.6-.1-.8l-1.1-2.7Z" fill="currentColor"/></svg><span>WhatsApp</span>';
  document.body.append(whatsappLink);
}
