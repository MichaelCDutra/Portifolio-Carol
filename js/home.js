document.addEventListener('DOMContentLoaded', () => {

  // Dark Mode
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const menuWrapper = document.querySelector('.menu-wrapper');
  const menuLinks = document.querySelectorAll('.menu a');

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('menu-active');
  });
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-active');
    });
  });

  // Formulario & Custom Select
  const customSelect = document.getElementById('customDrop');
  if (customSelect) {
    const trigger = customSelect.querySelector('.custom-select');
    const triggerTxt = customSelect.querySelector('.custom-select-trigger');
    const options = customSelect.querySelectorAll('.custom-option');
    const hiddenInput = document.getElementById('servico');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelect.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerTxt.textContent = opt.textContent;
        triggerTxt.style.color = 'var(--cor-text-dark)';
        hiddenInput.value = opt.getAttribute('data-value');
        customSelect.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
      }
    });
  }

  // Integracao WhatsApp
  const form = document.getElementById('formAgendamento');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const servico = document.getElementById('servico').value;
      const msg = document.getElementById('msg').value;

      if (!servico) { alert("Por favor, selecione um serviço!"); return; }

      const txt = `Olá! Meu nome é *${nome}* e vi o site.\nGostaria de agendar uma avaliação para: *${servico}*.\n${msg ? 'Mensagem: ' + msg : ''}`;
      const url = `https://wa.me/5531997459813?text=${encodeURIComponent(txt)}`;
      window.open(url, '_blank');
      form.reset();
      document.querySelector('.custom-select-trigger').textContent = 'Selecione uma opção...';
      document.querySelector('.custom-select-trigger').style.color = 'var(--cor-text-light)';
      document.getElementById('servico').value = '';
    });
  }

  // FAQ Acordeão
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Filtro Galeria
  const btnFiltros = document.querySelectorAll('.btn-filtro');
  const itensGaleria = document.querySelectorAll('.item-resultado');

  btnFiltros.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      btnFiltros.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      itensGaleria.forEach(item => {
        // Aplica o esmaecimento inicial
        item.classList.add('fade-out');

        setTimeout(() => {
          if (filter === 'todos' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            // Pequeno delay para a renderizacao css reflow antes de remover a classe
            setTimeout(() => item.classList.remove('fade-out'), 50);
          } else {
            item.style.display = 'none';
          }
        }, 300); // 300ms garante a transicao super suave sem parecer lento
      });
    });
  });
  // Modal LGPD
  const modalLgpd = document.getElementById('modal-lgpd');
  const btnPrivacidade = document.getElementById('btn-privacidade');
  const closeLgpd = document.getElementById('close-lgpd');

    if (btnPrivacidade && modalLgpd && closeLgpd) {
      btnPrivacidade.addEventListener('click', (e) => {
        e.preventDefault();
        modalLgpd.classList.add('open');
      });
      closeLgpd.addEventListener('click', () => {
        modalLgpd.classList.remove('open');
      });
      modalLgpd.addEventListener('click', (e) => {
        if (e.target === modalLgpd) modalLgpd.classList.remove('open');
      });
    }

    // Modais Certificados
    const certBtns = document.querySelectorAll('.cert-badge');
    const certCloses = document.querySelectorAll('.cert-close');

    certBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const m = document.getElementById(targetId);
        if(m) m.classList.add('open');
      });
    });

    certCloses.forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal-overlay').classList.remove('open');
      });
    });

    // Close on click outside for all modals with .modal-overlay
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });

  // Voltar ao Topo
  const btnTop = document.getElementById('btn-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btnTop.classList.add('show');
    else btnTop.classList.remove('show');
  });
  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});