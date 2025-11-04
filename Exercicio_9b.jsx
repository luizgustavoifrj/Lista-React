import React, { useState } from 'react';


function AlterarFonte() {
  const [tamanhoFonte, setTamanhoFonte] = useState('16px');


  const mudarTamanho = (novoTamanho) => {
    setTamanhoFonte(novoTamanho);
  };


  return (
    <div>
      <h2>
        Alterar Tamanho da Fonte
      </h2>


      <p style={{ fontSize: tamanhoFonte }}>
        Este é um texto de exemplo. O tamanho dele vai mudar.
      </p>


      <button onClick={() => mudarTamanho('12px')}>Pequeno</button>
      <button onClick={() => mudarTamanho('16px')}>Médio</button>
      <button onClick={() => mudarTamanho('24px')}>Grande</button>
    </div>
  );
}


export default AlterarFonte;