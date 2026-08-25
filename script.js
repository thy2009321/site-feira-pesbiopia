document.addEventListener('DOMContentLoaded', () => {

  // --- RECURSO 1: AUMENTAR E DIMINUIR FONTE ---
  let currentZoom = 100;
  const btnIncrease = document.getElementById('btn-increase');
  const btnDecrease = document.getElementById('btn-decrease');

  if (btnIncrease && btnDecrease) {
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
  }

  // --- RECURSO 2: ALTO CONTRASTE ---
  const btnContrast = document.getElementById('btn-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }

  // --- RECURSO 3: SIMULADOR VISUAL (DESFOQUE DA VISÃO) ---
  const blurRange = document.getElementById('blur-range');
  const simulatedText = document.getElementById('simulated-text');

  if (blurRange && simulatedText) {
    blurRange.addEventListener('input', (e) => {
      const blurValue = e.target.value;
      simulatedText.style.filter = `blur(${blurValue}px)`;
    });
  }

  // --- RECURSO 4: SÍNTESE DE VOZ (LEITURA EM VOZ ALTA) ---
  const btnRead = document.getElementById('btn-read');
  const btnStop = document.getElementById('btn-stop');
  let synth = window.speechSynthesis;

  if ('speechSynthesis' in window && btnRead && btnStop) {
    btnRead.addEventListener('click', () => {
      synth.cancel();

      // Pega o texto principal da página
      const mainText = document.querySelector('main').innerText;
      const utterance = new SpeechSynthesisUtterance(mainText);

      utterance.lang = 'pt-BR';
      utterance.rate = 0.85; // Leitura levemente desacelerada e pausada
      utterance.pitch = 0.95; // Tom suave

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
  } else if (btnRead) {
    btnRead.style.display = 'none';
  }

  // --- RECURSO 5: ENVIO DE FORMULÁRIO ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Sua dúvida foi recebida pela nossa equipe da feira. Agradecemos o contato!');
      contactForm.reset();
    });
  }
});