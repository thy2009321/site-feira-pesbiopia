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

  // --- RECURSO: LEITURA EM VOZ ALTA (Ajustada para Tom/Voz Serena) ---
  const btnRead = document.getElementById('btn-read');
  const btnStop = document.getElementById('btn-stop');
  let synth = window.speechSynthesis;

  if ('speechSynthesis' in window) {
    btnRead.addEventListener('click', () => {
      synth.cancel();

      const mainText = document.querySelector('main').innerText;
      const utterance = new SpeechSynthesisUtterance(mainText);
      
      utterance.lang = 'pt-BR';
      utterance.rate = 0.85;  // Velocidade levemente mais pausada para melhor clareza
      utterance.pitch = 0.9;  // Tom de voz um pouco mais suave/grave

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

  // --- ENVIO DO FORMULÁRIO DE CONTATO ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Sua dúvida foi enviada com sucesso! Agradecemos o contato.');
      contactForm.reset();
    });
  }
});