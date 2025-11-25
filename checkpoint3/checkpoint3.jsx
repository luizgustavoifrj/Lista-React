import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// --- DADOS INICIAIS ---
// URLs de MP3 de exemplo (livres de direitos)
const DADOS_MUSICAS = [
  { id: 1, titulo: "SoundHelix Song 1", artista: "T. Schürger", album: "SoundHelix", favorita: false, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, titulo: "SoundHelix Song 2", artista: "T. Schürger", album: "SoundHelix", favorita: true, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, titulo: "SoundHelix Song 8", artista: "T. Schürger", album: "SoundHelix", favorita: false, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: 4, titulo: "SoundHelix Song 9", artista: "T. Schürger", album: "SoundHelix", favorita: false, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
];

const DADOS_PLAYLISTS = [
  { id: 101, nome: "As Melhores do Rock" },
  { id: 102, nome: "Pop Anos 2000" },
  { id: 103, nome: "Relaxando" },
];

// --- COMPONENTES FILHOS ---

// 1. Header (com Busca - Baseado no 7a)
function Header({ termoBusca, onBuscaChange }) {
  return (
    <header className="spotify-header">
      <div className="busca-container">
        {/* Este é o seu InputTempoReal (7a) adaptado */}
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar músicas..."
          className="busca-input"
        />
      </div>
    </header>
  );
}

// 2. Playlists (com Criar Playlist - Baseado no 8a)
function Playlists({ playlists, onCriarPlaylist }) {
  // Estado e lógica do 'AdicionarLista' (8a)
  const [novoNome, setNovoNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (novoNome.trim()) {
      onCriarPlaylist(novoNome); // Chama a função do componente-pai
      setNovoNome(''); // Limpa o input
    }
  };

  return (
    <aside className="spotify-sidebar">
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.nome}</li>
        ))}
      </ul>
      {/* Este é o seu formulário 'AdicionarLista' (8a) adaptado */}
      <form onSubmit={handleSubmit} className="playlist-form">
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Nova playlist..."
        />
        <button type="submit">+</button>
      </form>
    </aside>
  );
}

// 3. ListaMusicas (Baseado no 3c)
function ListaMusicas({ musicas, onPlayMusica, onToggleFavorita }) {
  return (
    <main className="spotify-main">
      <h2>Músicas</h2>
      <div className="lista-musicas">
        {musicas.map((musica) => (
          <MusicaItem
            key={musica.id}
            musica={musica}
            onPlayMusica={onPlayMusica} // Passando a função para o filho
            onToggleFavorita={onToggleFavorita} // Passando a função para o filho
          />
        ))}
      </div>
    </main>
  );
}

// 4. MusicaItem (Baseado no 4b e 12b)
function MusicaItem({ musica, onPlayMusica, onToggleFavorita }) {
  // Lógica do 'BotaoFavoritar' (12b) está aqui
  const estiloBotaoFavorito = {
    color: musica.favorita ? '#1db954' : '#b3b3b3', // Cor verde se for favorita
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
  };

  return (
    <div className="musica-item">
      <button className="botao-play-item" onClick={() => onPlayMusica(musica)}>
        ▶
      </button>
      <div className="musica-info">
        <h3>{musica.titulo}</h3>
        <p>{musica.artista}</p>
      </div>
      {/* Este é o seu 'BotaoFavoritar' (12b) adaptado */}
      <button
        style={estiloBotaoFavorito}
        onClick={() => onToggleFavorita(musica.id)}
      >
        {musica.favorita ? '♥' : '♡'}
      </button>
    </div>
  );
}

// 5. Player (Baseado no 6a, 7a)
function Player({ musicaAtual, isPlaying, onPlayPause, progresso, volume, onVolumeChange }) {
  return (
    <footer className="spotify-player">
      {/* --- Informação da Música --- */}
      <div className="player-info">
        {musicaAtual ? (
          <>
            <h3>{musicaAtual.titulo}</h3>
            <p>{musicaAtual.artista}</p>
          </>
        ) : (
          <p>Selecione uma música</p>
        )}
      </div>
      
      {/* --- Controles (Play/Pause e Progresso) --- */}
      <div className="player-controles">
        <button onClick={onPlayPause} className="botao-play-principal">
          {isPlaying ? '⏸' : '▶'}
        </button>
        {/* A Barra de Progresso */}
        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${progresso}%` }} 
          ></div>
        </div>
      </div>
      
      {/* --- Controle de Volume (Visual) --- */}
      <div className="player-volume">
        <span>🔊</span>
        <input
          type="range" // Slider
          min="0"
          max="100"
          value={volume} // Controlado pelo estado
          onChange={onVolumeChange} // Atualiza o estado
          className="volume-slider"
        />
      </div>
    </footer>
  );
}

// --- COMPONENTE PRINCIPAL (O Cérebro) ---

function SpotifyClone() {
  // --- GERENCIAMENTO DE ESTADO CENTRAL ---
  const [musicas, setMusicas] = useState(DADOS_MUSICAS);
  const [playlists, setPlaylists] = useState(DADOS_PLAYLISTS);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const [progresso, setProgresso] = useState(0);
  const [volume, setVolume] = useState(50); // Volume inicial em 50%

  // Referência para o elemento <audio>
  const audioRef = useRef(null);

  // --- EFEITOS (Hooks useEffect) ---

  // Este hook "assiste" 'isPlaying' e 'musicaAtual'.
  // Se 'isPlaying' mudar, ele toca ou pausa o áudio.
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, musicaAtual]); // Dependências

  // Este hook "liga" os event listeners no áudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Função que atualiza o progresso
    const handleTimeUpdate = () => {
      if (audio.duration) { // Evita divisão por zero se o áudio não carregou
        const progressoPercentual = (audio.currentTime / audio.duration) * 100;
        setProgresso(progressoPercentual);
      }
    };

    // Função que é chamada quando a música termina
    const handleSongEnd = () => {
      setIsPlaying(false);
      setProgresso(0);
    };

    // "Ligar" os ouvintes
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnd);

    // "Desligar" os ouvintes (limpeza)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [audioRef.current]); // Dependência

  // --- FUNÇÕES DE MANIPULAÇÃO (passadas como props) ---

  // 1. Lógica do Player
  const handlePlayMusica = (musica) => {
    if (musica.id === musicaAtual?.id) {
      handleTogglePlayPause();
    } else {
      setMusicaAtual(musica);
      if (audioRef.current) {
        audioRef.current.src = musica.src;
        setIsPlaying(true); 
      }
    }
  };

  const handleTogglePlayPause = () => {
    if (!musicaAtual) return; 
    setIsPlaying(!isPlaying);
  };

  // 2. Lógica da Busca (do 7a)
  const handleBuscaChange = (texto) => {
    setTermoBusca(texto);
  };
  
  // 3. Lógica do Volume (do 7a)
  const handleVolumeChange = (e) => {
    const novoVolume = e.target.value;
    setVolume(novoVolume);
    // Lógica real (opcional):
    // if (audioRef.current) {
    //   audioRef.current.volume = novoVolume / 100; // volume vai de 0.0 a 1.0
    // }
  };

  // 4. Lógica de Criar Playlist (do 8a)
  const handleCriarPlaylist = (nomePlaylist) => {
    const novaPlaylist = {
      id: Date.now(),
      nome: nomePlaylist
    };
    setPlaylists([...playlists, novaPlaylist]);
  };

  // 5. Lógica de Favoritar (do 12b)
  const handleToggleFavorita = (musicaId) => {
    const novasMusicas = musicas.map(musica => {
      if (musica.id === musicaId) {
        return { ...musica, favorita: !musica.favorita };
      }
      return musica;
    });
    setMusicas(novasMusicas);
  };

  // 6. Lógica de Filtragem (Combinação do 7a e 3c)
  const musicasFiltradas = musicas.filter(musica =>
    musica.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
    musica.artista.toLowerCase().includes(termoBusca.toLowerCase())
  );

  // --- RENDERIZAÇÃO ---
  return (
    <div className="spotify-layout">
      {/* A tag <audio> fica escondida, controlada pelo React */}
      <audio ref={audioRef} />

      <Playlists
        playlists={playlists}
        onCriarPlaylist={handleCriarPlaylist}
      />
      
      <div className="spotify-main-content">
        <Header
          termoBusca={termoBusca}
          onBuscaChange={handleBuscaChange}
        />
        <ListaMusicas
          musicas={musicasFiltradas} // Passa a lista JÁ FILTRADA
          onPlayMusica={handlePlayMusica}
          onToggleFavorita={handleToggleFavorita}
        />
      </div>
      
      <Player
        musicaAtual={musicaAtual}
        isPlaying={isPlaying}
        onPlayPause={handleTogglePlayPause}
        progresso={progresso}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}

export default SpotifyClone;