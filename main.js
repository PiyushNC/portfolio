// Minimal JS: menu toggle, smooth scroll, project modal, simple form validation
document.addEventListener('DOMContentLoaded',()=>{
  // year
  const y = new Date().getFullYear(); document.getElementById('year').textContent = y;

  // mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  navToggle.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if(!expanded) nav.style.display = 'flex'; else nav.style.display = '';
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // project modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  function openModal(title,desc){
    modalTitle.textContent = title; modalDesc.textContent = desc;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.project .view-details').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const card = btn.closest('.project');
      openModal(card.dataset.title, card.dataset.desc);
    });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') closeModal(); });

  // form validation (client-side only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name')?.toString().trim();
    const email = fd.get('email')?.toString().trim();
    const message = fd.get('message')?.toString().trim();
    if(!name || !email || !message){ status.textContent = 'Please complete all fields.'; return; }
    status.textContent = 'Thanks — your message is ready (client-only demo).';
    form.reset();
  });

  // Typewriter animation (accessible, respects prefers-reduced-motion)
  (function(){
    const el = document.getElementById('type-text');
    if(!el) return;
    const phrases = [
      'functional, beautiful, and clear digital experiences.',
      'interfaces that perform and delight.',
      'products backed by accessible design.'
    ];
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ el.textContent = phrases[0]; return; }

    let i = 0, char = 0, deleting = false;
    const typeSpeed = 40; // ms per char (typing)
    const deleteSpeed = 25; // ms per char (deleting)
    const pauseAfter = 1600; // pause after full phrase

    function tick(){
      const current = phrases[i];
      if(!deleting){
        el.textContent = current.slice(0, char+1);
        char++;
        if(char === current.length){
          deleting = true;
          setTimeout(tick, pauseAfter);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = current.slice(0, char-1);
        char--;
        if(char === 0){
          deleting = false;
          i = (i+1) % phrases.length;
          setTimeout(tick, 200);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    // start after a short delay so layout settles
    setTimeout(tick, 400);
  })();
});