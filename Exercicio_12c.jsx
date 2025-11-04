import { useState } from 'react';
import './App.css';

function BotaoCurtir() {
  const [likes, setLikes] = useState(0);
  const [curtido, setCurtido] = useState(false);

  const toggleLike = () => {
    if (curtido) {
      setLikes(likes - 1);
      setCurtido(false);
    } else {
      setLikes(likes + 1);
      setCurtido(true);
    }
  };

  return (
    <div>
      <button onClick={toggleLike} style={{
        backgroundColor: curtido ? '#1877f2' : "white",
        color: curtido ? 'white' : 'black',
        border: '1px solid #ccc',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      >
        🤙 {curtido ? 'Curtido' : 'Curtir'} ({likes})
      </button>
    </div>
  );
}

function BotaoFavoritar() {
  const [favoritos, setFavoritos] = useState(0);
  const [favoritado, setFavoritado] = useState(false);

  const toggleFavorito = () => {
    if (favoritado) {
      setFavoritos(favoritos - 1);
      setFavoritado(false);
    } else {
      setFavoritos(favoritos + 1);
      setFavoritado(true);
    }
  };

  return (
    <div>
      <button
        onClick={toggleFavorito}
        style={{
          backgroundColor: favoritado ? '#FFD700' : 'white',
          color: 'black',
          border: '1px solid #ccc',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {favoritado ? '🌕' : '🌑'} ({favoritos})
      </button>
    </div>
  );
}

function MedidorFelicidade() {
  const [nivel, setNivel] = useState(0);

  const emojis = ['😐', '🙂', '😊', '😁', '🤩'];

  const estaNoMaximo = nivel === 4;

  const aumentarFelicidade = () => {
    if (nivel < 4) {
      setNivel(nivel + 1);
    }
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      width: '200px'
    }}>
      
      <div style={{ fontSize: '4rem', margin: '10px', height: '60px' }}>
        {emojis[nivel]}
      </div>
      
      <p>Nível de Felicidade: {nivel}</p>
      
      <button
        onClick={aumentarFelicidade}
        disabled={estaNoMaximo}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: estaNoMaximo ? 'not-allowed' : 'pointer',
          opacity: estaNoMaximo ? 0.6 : 1,
          backgroundColor: estaNoMaximo ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {estaNoMaximo ? 'Máximo!' : 'Sorrir'}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h2>Meu Medidor de Felicidade</h2>
        <p>Clique em "Sorrir" para ver o emoji mudar.</p>

        <MedidorFelicidade />

        <hr style={{margin: '30px 0', width: '50%'}} />

        <h2>Posts Antigos</h2>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <BotaoCurtir />
          <BotaoFavoritar />
        </div>

      </header>
    </div>
  );
}

export default App;

