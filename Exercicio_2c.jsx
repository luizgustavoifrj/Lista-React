import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function StatusJogo({nível, pontos}) {
  const maxpontos = nível * 1000;
  const progresso = Math.min((pontos / maxpontos) * 100, 100);
  const corBarra = progresso < 30 ? 'red' : progresso < 70 ? 'orange' : 'green';

  return (
    <div>
      <h2> nível {nível}</h2>
      <p>Pontos: {pontos} / {maxpontos} </p>
      <div style={{
        width: '200px',
        height: '20px',
        backgroundColor: '#ddd',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progresso}%`,
          height: '100%',
          backgroundColor: corBarra,
          transition: 'all 0.3s ease',
        }}></div>
      </div>
      <p>{progresso.toFixed(1)}% completo</p>
    </div>
  );
}

export default function App(){
  return <StatusJogo nível={5} pontos={2000} />;
}
