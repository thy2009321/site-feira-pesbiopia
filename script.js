document.addEventListener('DOMContentLoaded', () => {
  // --- RECURSO: AUMENTAR / DIMINUIR FONTE ---
  let currentZoom = 100;
  const btnIncrease = document.getElementById('btn-increase');
  const btnDecrease = document.getElementById('btn-decrease');

  btnIncrease.addEventListener('click', () => {
    if (currentZoom < 150) {
      currentZoom += 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  btnDecrease.addEventListener('click', () => {
    if (currentZoom > 80) {
      currentZoom -= 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  // --- RECURSO: ALTO CONTRASTE ---
  const btnContrast = document.getElementById('btn-contrast');
  btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  // --- RECURSO: SIMULADOR DE VISÃO (DESFOQUE) ---
  const blurRange = document.getElementById('blur-range');
  const simulatedText = document.getElementById('simulated-text');

  if (blurRange && simulatedText) {
    blurRange.addEventListener('input', (e) => {
      const blurValue = e.target.value;
      simulatedText.style.filter = `blur(${blurValue}px)`;
    });
  }

  // --- RECURSO: LEITURA EM VOZ ALTA (Web Speech API) ---
  const btnRead = document.getElementById('btn-read');
  const btnStop = document.getElementById('btn-stop');
  let synth = window.speechSynthesis;

  if ('speechSynthesis' in window) {
    btnRead.addEventListener('click', () => {
      synth.cancel();

      const mainText = document.querySelector('main').innerText;
      const utterance = new SpeechSynthesisUtterance(mainText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;

      utterance.onend = () => {
        btnRead.style.display = 'inline-block';
        btnStop.style.display = 'none';
      };

      synth.speak(utterance);
      btnRead.style.display = 'none';
      btnStop.style.display = 'inline-block';
    });

    btnStop.addEventListener('click', () => {
      synth.cancel();
      btnRead.style.display = 'inline-block';
      btnStop.style.display = 'none';
    });
  } else {
    btnRead.style.display = 'none';
  }

  // --- SIMULAÇÃO DE ENVIO DO FORMULÁRIO ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Obrigado! Sua mensagem foi recebida.');
      contactForm.reset();
    });
  }
});