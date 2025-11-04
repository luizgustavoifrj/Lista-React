import { useState } from 'react';
import './App.css';


function PlacarJogos() {


  const [nomeTime, setNomeTime] = useState('');
  const [pontuacao, setPontuacao] = useState('');
  const [times, setTimes] = useState([]);


  const adicionarTime = (event) => {
    event.preventDefault();
    if (nomeTime.trim() && pontuacao.trim()) {


      const novoTime = {
        nome: nomeTime.trim(),
        pontos: parseInt(pontuacao, 10),
      };


      const listaAtualizada = [...times, novoTime];
      listaAtualizada.sort((a, b) => b.pontos - a.pontos);
      setTimes(listaAtualizada);
      setNomeTime('');
      setPontuacao('');
    }
  };


  return (
    <div>
      <h2>Placar de Jogos</h2>
      <form onSubmit={adicionarTime}>
        <input
          type="text"
          value={nomeTime}
          onChange={(e) => setNomeTime(e.target.value)}
          placeholder="Nome do Time"
        />
        <input
          type="number"
          value={pontuacao}
          onChange={(e) => setPontuacao(e.target.value)}
          placeholder="Pontuação"
        />
        <button type="submit">Adicionar Time</button>
      </form>
      <ol>
        {times.map((time, index) => (
          <li key={index}>
            {time.nome} - <strong>{time.pontos} pontos</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}


export default PlacarJogos;