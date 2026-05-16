/* ============================================
   PRINCES BET — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
        ring.style.opacity   = '0.4';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.opacity   = '0.6';
      });
    });
  }

  // ── SCROLL REVEAL ──
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // ── GALLERY LIGHTBOX (simple) ──
  const galleryItems = document.querySelectorAll('.gallery-item img');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.92);
        z-index:10000;display:flex;align-items:center;
        justify-content:center;cursor:pointer;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.style.cssText = `
        max-width:90vw;max-height:90vh;
        object-fit:contain;
        border:1px solid rgba(201,168,76,0.3);
      `;
      overlay.appendChild(bigImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // ── CONTACT FORM (prevent default, show confirmation) ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-gold');
      btn.textContent = 'Mensaje Enviado ✓';
      btn.style.background    = 'var(--gold)';
      btn.style.color         = '#050505';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.textContent = 'Enviar Propuesta';
        btn.style.background    = '';
        btn.style.color         = '';
        btn.style.pointerEvents = '';
        form.reset();
      }, 3500);
    });
  }

});
