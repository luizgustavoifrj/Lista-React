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


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <h2>Meu Post</h2>
        <p>Este é um post sobre React. Você pode curtir ou favoritar!</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <BotaoCurtir />
          <BotaoFavoritar />
        </div>


        <hr style={{margin: '30px 0', width: '50%'}} />


        <h2>Outro Post Independente</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <BotaoCurtir />
          <BotaoFavoritar />
        </div>


      </header>
    </div>
  );
}




export default App;

