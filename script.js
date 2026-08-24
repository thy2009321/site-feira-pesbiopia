document.addEventListener('DOMContentLoaded', () => {
  // --- RECURSO: AUMENTAR / DIMINUIR FONTE ---
  let currentZoom = 100;
  const btnIncrease = document.getElementById('btn-increase');
  const btnDecrease = document.getElementById('btn-decrease');

  btnIncrease.addEventListener('click', () => {
    if (currentZoom < 150) { // Limite máximo de 150%
      currentZoom += 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  btnDecrease.addEventListener('click', () => {
    if (currentZoom > 80) { // Limite mínimo de 80%
      currentZoom -= 10;
      document.body.style.fontSize = `${currentZoom}%`;
    }
  });

  // --- RECURSO: LEITURA EM VOZ ALTA (Web Speech API) ---
  const btnRead = document.getElementById('btn-read');
  const btnStop = document.getElementById('btn-stop');
  let synth = window.speechSynthesis;
  let utterance = null;

  if ('speechSynthesis' in window) {
    btnRead.addEventListener('click', () => {
      // Cancela leituras anteriores em andamento
      synth.cancel();

      // Pega todo o texto principal da página
      const mainText = document.querySelector('main').innerText;

      utterance = new SpeechSynthesisUtterance(mainText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0; // Velocidade da voz

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
    // Se o navegador não suportar síntese de voz
    btnRead.style.display = 'none';
  }
});