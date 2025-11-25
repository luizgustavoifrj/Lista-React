import './App.css';



function Previsaotempo({ temperatura, clima, cidade, umidade, }) {
  const getIcone = (clima) => {
    const climas = {
      'ensolarado': '☀️', 'nublado': '☁️', 'chuvoso': '🌧️',
      'tempestuoso': '⛈️', 'nevando': '❄️',
    };
    return climas[clima.toLowerCase()] || '🌤️';
  };

  const getCorTemperatura = (temp) => {
    if (temp < 15) return '#4190e2';
    if (temp < 25) return '#f5a623';
    return '#d0021b';
  };

  return (
    <div style={{
      border: '1px solid #bde0fe', borderRadius: '15px', padding: '25px',
      textAlign: 'center', 
      background: '#e7f5ff', 
      color: '#000', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2em' }}>{cidade}</h3>
      <div style={{ fontSize: '50px', margin: '10px 0' }}>{getIcone(clima)}</div>
      <div style={{
        fontSize: '40px', fontWeight: 'bold', 
        color: getCorTemperatura(temperatura), 
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>{temperatura}°C</div>
      <p style={{ fontSize: '1.1em', margin: '10px 0' }}>{clima}</p>
      <p style={{ fontSize: '0.9em', opacity: 0.9 }}>Umidade: {umidade}%</p>
    </div>
  );
}

function CartaoPessoa({ titulo, ano, descricao }) {
  const cardStyle = {
    border: '1px solid #ccc', borderRadius: '15px', padding: '25px',
    background: '#e9ecef',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: '#000', 
  };
  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0 }}>{titulo}</h3>
      <p><strong>Ano:</strong> {ano}</p>
      <p><strong>Descrição:</strong> {descricao}</p>
    </div>
  );
}

function Cartaopessoa({ nome, data }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '15px',
    padding: '25px',
    background: '#e9ecef',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    color: '#000', 
  };

  return (
    <div style={cardStyle}>
      <h3 style={{marginTop: 0, fontWeight: 'normal'}}>Olá Capitão,</h3>
      <p style={{fontSize: '1.5em', fontWeight: 'bold', margin: '10px 0'}}>{nome}</p>
      <p style={{fontSize: '0.9em', opacity: 0.8}}>Data atual: {data}</p>
    </div>
  );
}


function StatusMissao({ destino, distanciaTotal, distanciaPercorrida }) {
  const progressoPercentual = Math.min((distanciaPercorrida / distanciaTotal) * 100, 100);

  const cardStyle = {
    border: '1px solid #1dd1a1',
    borderRadius: '15px',
    padding: '25px',
    background: '#f0fff5',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    color: '#000', 
  };

  const progressBarContainerStyle = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    marginTop: '15px',
    overflow: 'hidden'
  };

  const progressBarFillStyle = {
    width: `${progressoPercentual}%`,
    height: '24px',
    backgroundColor: '#10ac84',
    borderRadius: '10px',
    transition: 'width 0.5s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', 
    fontSize: '0.8em'
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0 }}>Status da Missão</h3>
      <p><strong>Destino:</strong> {destino}</p>
      <p>{(distanciaPercorrida / 1000000).toFixed(2)}M / {(distanciaTotal / 1000000).toFixed(2)}M km</p>
      
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle}>
          {progressoPercentual.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

function RelatorioBordo({ eventos }) {
  const cardStyle = {
    border: '1px solid #fdcb6e',
    borderRadius: '15px',
    padding: '25px',
    background: '#fffaf0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    gridColumn: 'span 2',
    color: '#000', 
  };

  const listStyle = {
    paddingLeft: '20px',
    textAlign: 'left',
    margin: 0,
    maxHeight: '200px',
    overflowY: 'auto'
  };
  
  return (
    <div style={cardStyle}>
      <h3 style={{ marginTop: 0 }}>Relatório de Bordo 🚀</h3>
      <ol style={listStyle}>
        {eventos.map((evento, index) => (
          <li key={index} style={{
            padding: '8px',
            borderRadius: '5px',
            marginBottom: '5px',
            background: index % 2 === 0 ? '#fffaf0' : '#fef5e7'
          }}>
            <strong>{evento.data}:</strong> {evento.descricao}
          </li>
        ))}
      </ol>
    </div>
  );
}


function App() {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    padding: '25px',
    fontFamily: 'sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#000' 
  };

  const eventosMissao = [
    { data: '25/09/2025', descricao: 'Lançamento da nave espacial "Odyssey".' },
    { data: '26/09/2025', descricao: 'Correção de caminho realizada com sucesso.' },
    { data: '27/09/2025', descricao: 'Painéis solares atingem eficiência máxima.' },
    { data: '28/09/2025', descricao: 'Primeira coleta de amostras de poeira cósmica.' },
    { data: '29/09/2025', descricao: 'Anomalia detectada no sensor de navegação.' }
  ];

  return (
    <>
      <div style={headerStyle}>
        <h1 style={{marginBottom: 0}}>Painel de Controle da Missão</h1>
      </div>
      <div style={containerStyle}>
        <Cartaopessoa 
          nome="Luiz Gustavo" 
          data = "29/09/2025"
        />
        <StatusMissao
          destino="Marte"
          distanciaTotal={54600000}
          distanciaPercorrida={12500000}
        />
        <RelatorioBordo eventos={eventosMissao} />
        <Previsaotempo
          temperatura={-25}
          clima="Ensolarado"
          cidade="Base Marciana"
          umidade={5}
        />
        <CartaoPessoa
          titulo={"Planeta Marte"}
          ano={"1610"}
          descricao={"Observado pela primeira vez por Galileu Galilei."}
        />
      </div>
    </>
  );
}

export default App;