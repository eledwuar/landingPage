// BG Binova Group — interacciones de la maqueta (sin dependencias).
(function () {
  // Navegación: fondo al hacer scroll y menú móvil
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Catálogo: filtros
  const items = Array.from(document.querySelectorAll('#gallery .item'));
  document.querySelectorAll('.filter').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.toggle('is-active', b === btn));
      const f = btn.dataset.filter;
      items.forEach(it => it.classList.toggle('is-hidden', f !== 'todos' && it.dataset.cat !== f));
    })
  );

  // Catálogo: visor
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let current = 0;
  const visible = () => items.filter(it => !it.classList.contains('is-hidden'));

  function show(i) {
    const list = visible();
    current = (i + list.length) % list.length;
    const it = list[current];
    const img = it.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.innerHTML = it.querySelector('figcaption').innerHTML;
  }
  function open(it) {
    show(visible().indexOf(it));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  items.forEach(it => it.addEventListener('click', () => open(it)));
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', () => show(current - 1));
  lb.querySelector('.lightbox__next').addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Formulario: en la maqueta arma un correo con la solicitud
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) {
      note.textContent = 'Completa nombre, correo y descripción.';
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const body = [
      `Nombre: ${d.nombre}`,
      `Empresa: ${d.empresa || '-'}`,
      `Correo: ${d.correo}`,
      `Teléfono: ${d.telefono || '-'}`,
      `Tipo de proyecto: ${d.tipo}`,
      '',
      d.mensaje
    ].join('\n');
    window.location.href = 'mailto:raul.bastidas@bgbinova.com'
      + '?subject=' + encodeURIComponent('Solicitud de cotización — ' + d.tipo)
      + '&body=' + encodeURIComponent(body);
    note.textContent = 'Abriendo tu cliente de correo…';
  });

  // Aparición suave de secciones
  const targets = document.querySelectorAll('.section__head, .split > *, .mv__card, .service, .capacity > *, .item, .logos, .quote, .contact > *');
  if ('IntersectionObserver' in window) {
    targets.forEach(t => t.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(t => io.observe(t));
  }
})();
