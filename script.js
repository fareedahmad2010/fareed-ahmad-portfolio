document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
document.querySelector('.menu-toggle')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent(`Project enquiry — ${d.get('service')}`);const body=encodeURIComponent(`Hello Fareed,\n\nMy name is ${d.get('name')} (${d.get('email')}).\n\nI'm interested in: ${d.get('service')}\n\n${d.get('message')}\n\nRegards,\n${d.get('name')}`);window.location.href=`mailto:fareedahmad2010ali@email.com?subject=${subject}&body=${body}`;});

const nameTitle = document.querySelector('.name-flair');
if (nameTitle) {
  const fullName = nameTitle.textContent.trim();
  nameTitle.setAttribute('aria-label', fullName);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nameTitle.textContent = fullName;
  } else {
    let characterCount = 0;
    let isDeleting = false;

    const typeNextCharacter = () => {
      if (!isDeleting) {
        characterCount += 1;
        nameTitle.textContent = fullName.slice(0, characterCount);

        if (characterCount === fullName.length) {
          isDeleting = true;
          window.setTimeout(typeNextCharacter, 1200);
          return;
        }

        window.setTimeout(typeNextCharacter, 160);
        return;
      }

      characterCount -= 1;
      nameTitle.textContent = fullName.slice(0, characterCount);

      if (characterCount === 0) {
        isDeleting = false;
        window.setTimeout(typeNextCharacter, 450);
        return;
      }

      window.setTimeout(typeNextCharacter, 90);
    };

    nameTitle.textContent = '';
    window.setTimeout(typeNextCharacter, 450);
  }
}
