// Accordion
  function toggleFile(btn){
    const file = btn.parentElement;
    const body = file.querySelector('.file-body');
    const isOpen = file.getAttribute('data-open') === 'true';
    document.querySelectorAll('.file').forEach(f=>{
      f.setAttribute('data-open','false');
      f.querySelector('.file-body').style.maxHeight = null;
    });
    if(!isOpen){
      file.setAttribute('data-open','true');
      body.style.maxHeight = body.scrollHeight + 'px';
      setTimeout(()=>{ file.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'}); }, 80);
    }
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero photo fade-in
  const heroImg = document.getElementById('hero-img');
  if(heroImg){
    if(heroImg.complete){ heroImg.classList.add('loaded'); }
    else { heroImg.addEventListener('load', ()=> heroImg.classList.add('loaded')); }
  }

  // Scroll-spy nav
  const sections = ['about','work','contact'].map(id=>document.getElementById(id));
  const links = document.querySelectorAll('.index a');
  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(l=>l.classList.toggle('active', l.getAttribute('href') === '#'+entry.target.id));
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s=> s && spy.observe(s));

  // Count-up metrics
  const counters = document.querySelectorAll('.metric .num');
  const countObserver = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if(reduceMotion){ el.textContent = target.toLocaleString('en-US'); obs.unobserve(el); return; }
        const duration = 1100;
        const start = performance.now();
        function step(now){
          const p = Math.min((now-start)/duration, 1);
          const eased = 1 - Math.pow(1-p, 3);
          el.textContent = Math.round(target*eased).toLocaleString('en-US');
          if(p<1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, {threshold:0.6});
  counters.forEach(c=>countObserver.observe(c));

  // Magnetic contact button
  const magnet = document.getElementById('magnet');
  if(magnet && !reduceMotion){
    magnet.addEventListener('mousemove', (e)=>{
      const r = magnet.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.25;
      const y = (e.clientY - r.top - r.height/2) * 0.4;
      magnet.style.transform = `translate(${x}px, ${y}px)`;
    });
    magnet.addEventListener('mouseleave', ()=>{ magnet.style.transform = 'translate(0,0)'; });
  }

  // Password gate
  (function(){
    const PASSWORD = "mg6L4zqHwWpTqOrA";
    const body = document.body;
    if (sessionStorage.getItem('mc_unlocked') === '1') {
      body.classList.remove('locked');
    }
    const form = document.getElementById('gate-form');
    const input = document.getElementById('gate-password');
    const error = document.getElementById('gate-error');
    if (form) {
      form.addEventListener('submit', function(e){
        e.preventDefault();
        if (input.value === PASSWORD) {
          sessionStorage.setItem('mc_unlocked', '1');
          body.classList.remove('locked');
        } else {
          error.textContent = 'Senha incorreta. Tente novamente.';
          input.value = '';
          input.focus();
        }
      });
    }
  })();
