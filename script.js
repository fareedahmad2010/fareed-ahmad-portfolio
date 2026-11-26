const motionStylesheet = document.querySelector('link[rel="stylesheet"][href="style.css"]');
if (motionStylesheet) motionStylesheet.href = 'style.css?v=20261126';
document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent(`Project enquiry — ${d.get('service')}`);const body=encodeURIComponent(`Hello Fareed,\n\nMy name is ${d.get('name')} (${d.get('email')}).\n\nI'm interested in: ${d.get('service')}\n\n${d.get('message')}\n\nRegards,\n${d.get('name')}`);window.location.href=`mailto:fareedahmad2010ali@gmail.com?subject=${subject}&body=${body}`;});const nameTitle = document.querySelector('.name-flair');
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
  '.hero-copy, .hero-art, .inner-hero > .eyebrow, .inner-hero > h1, .inner-hero > .lead, .inner-hero > .button, .trust, .section-heading, .service-card, .manifesto-inner, .bottom-cta, .web-showcase, .about-visual, .about-copy > div, .video-feature, .offer-grid article, .sample-card, .contact-intro, .contact-form'
);

if (revealTargets.length) {
  revealTargets.forEach((element) => {
    element.classList.add('motion-reveal');
    const staggered = element.matches('.service-card, .offer-grid article, .sample-card, .about-copy > div');
    const siblingIndex = staggered ? Array.from(element.parentElement?.children ?? []).indexOf(element) : 0;
    element.style.setProperty('--reveal-delay', Math.max(0, siblingIndex) * 90 + 'ms');
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -32px 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }
}
