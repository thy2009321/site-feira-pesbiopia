document.addEventListener('DOMContentLoaded', () => {

  // --- CONTROLE DE TAMANHO DE FONTE (Aumentar / Diminuir) ---
  let tamanhoFonte = 100;
  const btnAumentar = document.getElementById('btn-aumentar');
  const btnDiminuir = document.getElementById('btn-diminuir');
  const btnReset = document.getElementById('btn-reset');

  btnAumentar.addEventListener('click', () => {
    if (tamanhoFonte < 170) {
      tamanhoFonte += 10;
      document.body.style.fontSize = `${tamanhoFonte}%`;
    }
  });

  btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 80) {
      tamanhoFonte -= 10;
      document.body.style.fontSize = `${tamanhoFonte}%`;
    }
  });

  btnReset.addEventListener('click', () => {
    tamanhoFonte = 100;
    document.body.style.fontSize = '100%';
  });


  // --- LEITORA DE VOZ CLARA E EM PORTUGUÊS ---
  const btnLer = document.getElementById('btn-ler');
  const btnParar = document.getElementById('btn-parar');

  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;

    btnLer.addEventListener('click', () => {
      synth.cancel();

      const textoParaLer = document.querySelector('main').innerText;
      const utterance = new SpeechSynthesisUtterance(textoParaLer);

      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        btnLer.style.display = 'none';
        btnParar.style.display = 'inline-block';
      };

      utterance.onend = () => {
        btnLer.style.display = 'inline-block';
        btnParar.style.display = 'none';
      };

      utterance.onerror = () => {
        btnLer.style.display = 'inline-block';
        btnParar.style.display = 'none';
      };

      synth.speak(utterance);
    });

    btnParar.addEventListener('click', () => {
      synth.cancel();
      btnLer.style.display = 'inline-block';
      btnParar.style.display = 'none';
    });

  } else {
    btnLer.style.display = 'none';
  }
});