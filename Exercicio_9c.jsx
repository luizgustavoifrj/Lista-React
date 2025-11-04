import React, { useState, useEffect } from 'react';
const humores = {
  feliz: {
    cor: 'lightgreen',
    emoji: '😄',
    fala: 'Haha!',
  },
  triste: {
    cor: 'lightblue',
    emoji: '😢',
    fala: 'Sniff...',
  },
  raivoso: {
    cor: 'lightcoral',
    emoji: '😠',
    fala: 'Grrrr!',
  },
  calmo: {
    cor: '#f2f2f2',
    emoji: '😌',
    fala: 'Ahhhh...',
  },
};


function SimuladorDeHumor() {


  const [humorAtual, setHumorAtual] = useState('calmo');


  const mudarHumor = (nomeDoHumor) => {


    const humorSelecionado = humores[nomeDoHumor];


    setHumorAtual(nomeDoHumor);


    document.body.style.backgroundColor = humorSelecionado.cor;


    alert(humorSelecionado.fala);
  };


  useEffect(() => {
    document.body.style.backgroundColor = humores[humorAtual].cor;


    return () => {
      document.body.style.backgroundColor = 'white';
    };
  }, []);


  const emojiParaExibir = humores[humorAtual].emoji;


  return (


    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h2>Qual é o seu sentimento?</h2>


      <div style={{ fontSize: '100px', margin: '20px' }}>
        {emojiParaExibir}
      </div>




      <div>
        <button onClick={() => mudarHumor('feliz')}>Feliz</button>
        <button onClick={() => mudarHumor('triste')}>Triste</button>
        <button onClick={() => mudarHumor('raivoso')}>Raivoso</button>
        <button onClick={() => mudarHumor('calmo')}>Calmo</button>
      </div>
    </div>
  );
}


export default SimuladorDeHumor;