document.addEventListener('DOMContentLoaded', () => {
  let tamanhoFonte = 100; // Porcentagem inicial

  const btnAumentar = document.getElementById('btn-aumentar');
  const btnDiminuir = document.getElementById('btn-diminuir');
  const btnReset = document.getElementById('btn-reset');

  // Função para Aumentar as Letras
  btnAumentar.addEventListener('click', () => {
    if (tamanhoFonte < 160) { // Limite máximo de 160%
      tamanhoFonte += 10;
      document.body.style.fontSize = tamanhoFonte + '%';
    }
  });

  // Função para Diminuir as Letras
  btnDiminuir.addEventListener('click', () => {
    if (tamanhoFonte > 80) { // Limite mínimo de 80%
      tamanhoFonte -= 10;
      document.body.style.fontSize = tamanhoFonte + '%';
    }
  });

  // Resetar para o tamanho normal
  btnReset.addEventListener('click', () => {
    tamanhoFonte = 100;
    document.body.style.fontSize = '100%';
  });
});