// home.js

const WHATSAPP_NUMBER = '5599999999999'; // Atualize aqui o número do WhatsApp

document.addEventListener('DOMContentLoaded', () => {
  // Loop frases hero
  const phrases = document.querySelectorAll('.hero-phrases .phrase');
  let current = 0;
  setInterval(() => {
    phrases[current].classList.remove('active');
    current = (current + 1) % phrases.length;
    phrases[current].classList.add('active');
  }, 4000);

  // Form agendamento
  const form = document.getElementById('form-agendamento');
  const feedback = document.getElementById('form-feedback');

  if (form) {
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
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

      // Mostrar feedback
      feedback.style.display = 'block';

      // Abrir WhatsApp em nova aba
      window.open(url, '_blank');

      // Resetar form após abrir
      form.reset();

      // Ocultar feedback após 4 segundos
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 4000);
    });
  }

  // Cards serviços - toggle resumo
  const cards = document.querySelectorAll('.servico');
  cards.forEach(card => {
    card.addEventListener('click', () => toggleResumo(card));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleResumo(card);
      }
    });
  });

  function toggleResumo(card) {
    // Fechar todos os outros cards
    cards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      }
    });

    // Alternar o atual
    const isActive = card.classList.toggle('active');
    card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }
});
