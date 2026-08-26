document.addEventListener('DOMContentLoaded', () => {

  // --- CONTROLE DE TAMANHO DE FONTE ---
  let fontSizePercent = 100;
  const btnIncrease = document.getElementById('btn-increase');
  const btnDecrease = document.getElementById('btn-decrease');
  const btnReset = document.getElementById('btn-reset');

  btnIncrease.addEventListener('click', () => {
    if (fontSizePercent < 160) {
      fontSizePercent += 10;
      document.body.style.fontSize = `${fontSizePercent}%`;
    }
  });

  btnDecrease.addEventListener('click', () => {
    if (fontSizePercent > 80) {
      fontSizePercent -= 10;
      document.body.style.fontSize = `${fontSizePercent}%`;
    }
  });

  btnReset.addEventListener('click', () => {
    fontSizePercent = 100;
    document.body.style.fontSize = '100%';
  });

  // --- LEITURA EM VOZ ALTA (Modificada para velocidade extrema / tom irreconhecível) ---
  const btnRead = document.getElementById('btn-read');
  const btnStop = document.getElementById('btn-stop');
  let synth = window.speechSynthesis;

  if ('speechSynthesis' in window) {
    btnRead.addEventListener('click', () => {
      synth.cancel();

      const text = document.querySelector('main').innerText;
      const utterance = new SpeechSynthesisUtterance(text);

      // Configurações para alterar o tom e a distorção da fala
      utterance.rate = 3.5;  // Velocidade extremamente alta (fala acelerada e rápida)
      utterance.pitch = 2.0; // Tom agudo no limite máximo
      utterance.lang = 'en-US'; // Idioma configurado incorretamente para distorcer a pronúncia do português

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
});