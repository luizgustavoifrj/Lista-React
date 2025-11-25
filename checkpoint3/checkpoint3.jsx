import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// --- DADOS REAIS ---
const DADOS_MUSICAS = [
  { 
    id: 1, 
    titulo: "Blinding Lights", 
    artista: "The Weeknd", 
    album: "After Hours", 
    favorita: true, 
    genero: "Pop",
    imagem: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  },
  { 
    id: 2, 
    titulo: "Shape of You", 
    artista: "Ed Sheeran", 
    album: "Divide", 
    favorita: false, 
    genero: "Pop",
    imagem: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
  },
  { 
    id: 3, 
    titulo: "Do I Wanna Know?", 
    artista: "Arctic Monkeys", 
    album: "AM", 
    favorita: true, 
    genero: "Rock",
    imagem: "https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
  },
  { 
    id: 4, 
    titulo: "Flowers", 
    artista: "Miley Cyrus", 
    album: "Endless Summer Vacation", 
    favorita: false, 
    genero: "Pop",
    imagem: "https://upload.wikimedia.org/wikipedia/en/6/66/Miley_Cyrus_-_Flowers.png",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" 
  },
  { 
    id: 5, 
    titulo: "Bohemian Rhapsody", 
    artista: "Queen", 
    album: "A Night at the Opera", 
    favorita: false, 
    genero: "Rock",
    imagem: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  },
  { 
    id: 6, 
    titulo: "Piano Moment", 
    artista: "Classical Artist", 
    album: "Relax", 
    favorita: false, 
    genero: "Relax",
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Piano_Keys.jpg/640px-Piano_Keys.jpg",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
  },
];

// O "filtro" deve bater com o "genero" das músicas acima
const DADOS_PLAYLISTS = [
  { id: 101, nome: "Pop Hits", filtro: "Pop" },
  { id: 102, nome: "Rock Clássico", filtro: "Rock" },
  { id: 103, nome: "Momento Relax", filtro: "Relax" },
];

// --- FUNÇÃO AUXILIAR: Formatar Tempo ---
const formatTime = (seconds) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// --- COMPONENTES ---

function Header({ termoBusca, onBuscaChange }) {
  return (
    <header className="spotify-header">
      <div className="header-navigation">
        <button className="nav-arrow">{'<'}</button>
        <button className="nav-arrow">{'>'}</button>
      </div>
      <div className="busca-container">
        <span className="busca-icon">🔍</span>
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="O que você quer ouvir?"
          className="busca-input"
        />
      </div>
      <div className="user-profile">
        <div className="user-avatar">G</div>
      </div>
    </header>
  );
}

function Playlists({ playlists, onCriarPlaylist, onSelectPlaylist, playlistSelecionada }) {
  const [novoNome, setNovoNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (novoNome.trim()) {
      onCriarPlaylist(novoNome);
      setNovoNome('');
    }
  };

  return (
    <aside className="spotify-sidebar">
      <div className="logo-container">
        <span className="spotify-logo-icon">📶</span> 
        <span className="spotify-logo-text">Spotify Clone</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* Botão para limpar filtros */}
          <li onClick={() => onSelectPlaylist(null)} className={!playlistSelecionada ? 'active' : ''}>
            <span className="icon">🏠</span> Início
          </li>
          <li><span className="icon">🔍</span> Buscar</li>
          <li><span className="icon">📚</span> Sua Biblioteca</li>
        </ul>
      </nav>

      <div className="playlists-section">
        <div className="playlist-header">
          <h3>SUAS PLAYLISTS</h3>
          <button className="add-playlist-btn" title="Criar Playlist">+</button>
        </div>
        
        <ul className="playlist-list">
          {playlists.map((playlist) => (
            <li 
              key={playlist.id} 
              onClick={() => onSelectPlaylist(playlist.filtro)}
              className={playlistSelecionada === playlist.filtro ? 'active-playlist' : ''}
            >
              {playlist.nome}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="playlist-form">
        <input
          type="text"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          placeholder="Criar playlist..."
        />
      </form>
    </aside>
  );
}

function ListaMusicas({ musicas, onPlayMusica, onToggleFavorita, musicaAtual, isPlaying, playlistNome }) {
  return (
    <main className="spotify-main">
      <div className="hero-gradient"></div>
      
      {/* Título dinâmico baseada na playlist selecionada */}
      <h2>{playlistNome ? playlistNome : "Bom dia"}</h2>
      
      <div className="musicas-grid">
        {musicas.length > 0 ? (
          musicas.map((musica) => (
            <MusicaItem
              key={musica.id}
              musica={musica}
              onPlayMusica={onPlayMusica}
              onToggleFavorita={onToggleFavorita}
              isCurrent={musicaAtual?.id === musica.id}
              isPlaying={isPlaying}
            />
          ))
        ) : (
          <p className="empty-message">Nenhuma música encontrada nesta playlist.</p>
        )}
      </div>
    </main>
  );
}

function MusicaItem({ musica, onPlayMusica, onToggleFavorita, isCurrent, isPlaying }) {
  return (
    <div className={`musica-row ${isCurrent ? 'active' : ''}`} onClick={() => onPlayMusica(musica)}>
      <div className="col-index">
        {isCurrent && isPlaying ? (
          <span className="playing-gif">ılılı</span> 
        ) : (
          <span className="play-icon-hover">▶</span>
        )}
        <span className="index-number">{musica.id}</span>
      </div>
      
      <div className="col-titulo">
        <img src={musica.imagem} alt={musica.titulo} className="capa-album" />
        <div className="info-text">
          <span className={`nome-musica ${isCurrent ? 'verde' : ''}`}>{musica.titulo}</span>
          <span className="nome-artista">{musica.artista}</span>
        </div>
      </div>

      <div className="col-album">
        {musica.album}
      </div>

      <div className="col-actions">
        <button
          className={`botao-favorito ${musica.favorita ? 'favoritado' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); 
            onToggleFavorita(musica.id);
          }}
        >
          {musica.favorita ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}

function Player({ musicaAtual, isPlaying, onPlayPause, currentTime, duration, volume, onVolumeChange, onSeek }) {
  // Calculo de porcentagem para barra de progresso
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  
  // Estilo dinâmico para o slider de volume ficar verde
  const volumeBackgroundStyle = {
    backgroundSize: `${volume}% 100%`
  };

  return (
    <footer className="spotify-player">
      <div className="player-left">
        {musicaAtual && (
          <>
            <img src={musicaAtual.imagem} alt="Capa" className="player-capa" />
            <div className="player-info">
              <h4>{musicaAtual.titulo}</h4>
              <p>{musicaAtual.artista}</p>
            </div>
          </>
        )}
      </div>
      
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn small">🔀</button>
          <button className="control-btn small">⏮</button>
          <button onClick={onPlayPause} className="play-btn-circle">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn small">⏭</button>
          <button className="control-btn small">🔁</button>
        </div>
        
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          
          {/* Slider de Progresso Interativo */}
          <input 
            type="range" 
            className="progress-slider"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={onSeek}
            style={{ backgroundSize: `${progressPercent}% 100%` }}
          />
          
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="player-right">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={onVolumeChange}
          className="volume-slider"
          style={volumeBackgroundStyle} // ISSO FAZ O VOLUME FICAR VERDE
        />
      </div>
    </footer>
  );
}

function SpotifyClone() {
  const [musicas, setMusicas] = useState(DADOS_MUSICAS);
  const [playlists, setPlaylists] = useState(DADOS_PLAYLISTS);
  
  // Filtros
  const [playlistSelecionada, setPlaylistSelecionada] = useState(null); // null = mostrar tudo
  const [termoBusca, setTermoBusca] = useState('');

  // Player States
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

  const audioRef = useRef(null);

  // --- LÓGICA DO AUDIO ---
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Erro ao tocar:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, musicaAtual]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleSongEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('loadedmetadata', handleTimeUpdate); // Pega duração ao carregar

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnd);
      audio.removeEventListener('loadedmetadata', handleTimeUpdate);
    };
  }, []);

  // Controlar volume real do HTML Audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // --- HANDLERS ---

  const handlePlayMusica = (musica) => {
    if (musica.id === musicaAtual?.id) {
      handleTogglePlayPause();
    } else {
      setMusicaAtual(musica);
      if (audioRef.current) {
        audioRef.current.src = musica.src;
        // Reseta o tempo ao trocar de musica
        setCurrentTime(0);
        setIsPlaying(true); 
      }
    }
  };

  const handleTogglePlayPause = () => {
    if (!musicaAtual) return; 
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleToggleFavorita = (musicaId) => {
    const novasMusicas = musicas.map(musica => {
      if (musica.id === musicaId) return { ...musica, favorita: !musica.favorita };
      return musica;
    });
    setMusicas(novasMusicas);
  };

  // --- LÓGICA DE FILTRAGEM (Playlist + Busca) ---
  const musicasFiltradas = musicas.filter(musica => {
    const matchPlaylist = playlistSelecionada ? musica.genero === playlistSelecionada : true;
    const matchBusca = musica.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
                       musica.artista.toLowerCase().includes(termoBusca.toLowerCase());
    return matchPlaylist && matchBusca;
  });

  const handleSelectPlaylist = (filtro) => {
    setPlaylistSelecionada(filtro);
  };

  const handleCriarPlaylist = (nome) => {
    // Para simplificar, novas playlists não têm filtro funcional neste exemplo estático,
    // mas são adicionadas à lista visual.
    setPlaylists([...playlists, { id: Date.now(), nome, filtro: null }]);
  };

  return (
    <div className="spotify-layout">
      <audio ref={audioRef} />
      
      <Playlists 
        playlists={playlists} 
        onCriarPlaylist={handleCriarPlaylist} 
        onSelectPlaylist={handleSelectPlaylist}
        playlistSelecionada={playlistSelecionada}
      />
      
      <div className="spotify-main-content">
        <Header termoBusca={termoBusca} onBuscaChange={setTermoBusca} />
        
        <ListaMusicas
          musicas={musicasFiltradas}
          playlistNome={playlistSelecionada ? `Playlist: ${playlistSelecionada}` : "Bom dia"}
          onPlayMusica={handlePlayMusica}
          onToggleFavorita={handleToggleFavorita}
          musicaAtual={musicaAtual}
          isPlaying={isPlaying}
        />
      </div>
      
      <Player
        musicaAtual={musicaAtual}
        isPlaying={isPlaying}
        onPlayPause={handleTogglePlayPause}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onVolumeChange={(e) => setVolume(e.target.value)}
        onSeek={handleSeek}
      />
    </div>
  );
}

export default SpotifyClone;