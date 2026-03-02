// ============================================================
// home.js — Script principal do site Estética Carolina Queiroz
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeroPhrases();
  initSchedulingForm();
  initServiceCards();
  initHistoriaModal();
  initThemeToggle();
  initLazyLoading();
  initHamburgerMenu();
});

// ============================================================
// 1. HERO — alternância automática de frases
// ============================================================
function initHeroPhrases() {
  const phrases = document.querySelectorAll('.hero-phrases .phrase');
  if (phrases.length === 0) return;

  let current = 0;
  setInterval(() => {
    phrases[current].classList.remove('active');
    current = (current + 1) % phrases.length;
    phrases[current].classList.add('active');
  }, 4000);
}

// ============================================================
// 2. FORMULÁRIO DE AGENDAMENTO VIA WHATSAPP
// ============================================================
function initSchedulingForm() {
  const WHATSAPP_NUMBER = '5531997459813';
  const form = document.getElementById('form-agendamento');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const procedimento = document.getElementById('procedimento').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !procedimento) {
      alert('Por favor, preencha seu nome e selecione o procedimento.');
      return;
    }

    const texto = `Olá, meu nome é ${nome} e gostaria de agendar o procedimento: ${procedimento}.\n\n${mensagem}`;
    // assemble URL char-by-char to avoid any // sequence in source
    const url = 'https:' + String.fromCharCode(47,47) + 'wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);

    if (feedback) feedback.style.display = 'block';
    window.open(url, '_blank');
    form.reset();
    if (feedback) setTimeout(() => feedback.style.display = 'none', 4000);
  });
}

// ============================================================
// 3. SERVIÇOS — interação com cards
// ============================================================
function initServiceCards() {
  const cards = document.querySelectorAll('.servico');
  if (cards.length === 0) return;

  const toggleResumo = (cardToToggle) => {
    const isActive = cardToToggle.classList.contains('active');
    cards.forEach(card => card.classList.remove('active'));
    if (!isActive) cardToToggle.classList.add('active');
  };

  cards.forEach(card => {
    card.addEventListener('click', () => toggleResumo(card));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleResumo(card);
      }
    });
  });
}

// ============================================================
// 4. MODAL “MINHA HISTÓRIA”
// ============================================================
function initHistoriaModal() {
  const modalOverlay = document.getElementById('modal-historia');
  const openButton = document.getElementById('btn-historia');
  const closeButton = document.querySelector('.modal-close');

  if (!modalOverlay || !openButton || !closeButton) return;

  const openModal = () => modalOverlay.classList.add('active');
  const closeModal = () => modalOverlay.classList.remove('active');

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ============================================================
// 5. DARK MODE — alternância persistente
// ============================================================
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  body.setAttribute('data-theme', initialTheme);
  // use emoji icons instead of external icon font
  themeToggle.innerHTML = initialTheme === 'dark' ? '☀️' : '🌙';

  const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  };

  themeToggle.addEventListener('click', toggleTheme);
}

// ============================================================
// 6. LAZY LOADING — carregamento sob demanda de imagens
// ============================================================
function initLazyLoading() {
  // query for both images and <source> elements that carry data attributes
  const lazyElements = document.querySelectorAll('img[data-src],img[data-srcset],source[data-srcset]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
          }
          if (el.dataset.srcset) {
            el.srcset = el.dataset.srcset;
            el.removeAttribute('data-srcset');
          }
          obs.unobserve(el);
        }
      });
    }, { rootMargin: '100px' });

    lazyElements.forEach(el => observer.observe(el));
  } else {
    // fallback: load everything immediately
    lazyElements.forEach(el => {
      if (el.dataset.src) el.src = el.dataset.src;
      if (el.dataset.srcset) el.srcset = el.dataset.srcset;
    });
  }
}
// ============================================================
// 7. MENU HAMBÚRGUER
// ============================================================
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  if (!hamburger || !menu) return; // Verifica se os elementos existem

  // 1. Alterna as classes ao clicar no botão
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('show');
  });

  // 2. (Bônus) Fecha o menu se o usuário clicar em um link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('show');
    });
  });
}
