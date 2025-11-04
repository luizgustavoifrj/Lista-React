 import { useState } from 'react';


function CriadorAvatarTextual() {
  // 1. Estados para armazenar as escolhas do usuário
  const [cabelo, setCabelo] = useState('Castanho');
  const [olhos, setOlhos] = useState('Castanhos');
  const [acessorios, setAcessorios] = useState([]); // Usamos um array para múltiplos acessórios


  // 2. Funções de manipulação para cada tipo de input


  // Dropdown para cor do cabelo
  const handleCabeloChange = (e) => {
    setCabelo(e.target.value);
  };


  // Radio buttons para cor dos olhos
  const handleOlhosChange = (e) => {
    setOlhos(e.target.value);
  };


  // Checkboxes para acessórios
  const handleAcessoriosChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Adiciona o acessório se ele foi marcado
      setAcessorios([...acessorios, value]);
    } else {
      setAcessorios(acessorios.filter(item => item !== value));
    }
  };


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1>Criador de Avatar Textual</h1>


      <div style={{ marginBottom: '20px' }}>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="cabelo-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cor do Cabelo:</label>
          <select id="cabelo-select" value={cabelo} onChange={handleCabeloChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}>
            <option value="Castanho">Castanho</option>
            <option value="Loiro">Loiro</option>
            <option value="Preto">Preto</option>
            <option value="Ruivo">Ruivo</option>
            <option value="Colorido">Colorido (ex: Azul/Roxo)</option>
            <option value="Careca">Careca</option>
          </select>
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cor dos Olhos:</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label>
              <input type="radio" name="olhos" value="Castanhos" checked={olhos === 'Castanhos'} onChange={handleOlhosChange} />
              Castanhos
            </label>
            <label>
              <input type="radio" name="olhos" value="Azuis" checked={olhos === 'Azuis'} onChange={handleOlhosChange} />
              Azuis
            </label>
            <label>
              <input type="radio" name="olhos" value="Verdes" checked={olhos === 'Verdes'} onChange={handleOlhosChange} />
              Verdes
            </label>
            <label>
              <input type="radio" name="olhos" value="Mel" checked={olhos === 'Mel'} onChange={handleOlhosChange} />
              Mel
            </label>
          </div>
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Acessórios:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <label>
              <input type="checkbox" name="oculos" value="Óculos" checked={acessorios.includes('Óculos')} onChange={handleAcessoriosChange} />
              Óculos
            </label>
            <label>
              <input type="checkbox" name="chapeu" value="Chapéu" checked={acessorios.includes('Chapéu')} onChange={handleAcessoriosChange} />
              Chapéu
            </label>
            <label>
              <input type="checkbox" name="brinco" value="Brinco" checked={acessorios.includes('Brinco')} onChange={handleAcessoriosChange} />
              Brinco
            </label>
            <label>
              <input type="checkbox" name="colar" value="Colar" checked={acessorios.includes('Colar')} onChange={handleAcessoriosChange} />
              Colar
            </label>
            <label>
              <input type="checkbox" name="piercing" value="Piercing" checked={acessorios.includes('Piercing')} onChange={handleAcessoriosChange} />
              Piercing
            </label>
          </div>
        </div>
      </div>


      <hr style={{ margin: '30px 0', borderColor: '#eee' }} />


     
      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
        <h2 style={{ marginTop: '0', color: '#333' }}>Seu Avatar:</h2>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#555' }}>
          <span role="img" aria-label="avatar">👤</span>
          {' '}Cabelo: {cabelo} | Olhos: {olhos}
          {acessorios.length > 0 && ` | Acessórios: ${acessorios.join(', ')}`}
        </p>
      </div>


      <p style={{ fontSize: '0.9em', color: '#777', marginTop: '20px' }}>
        *Este é um avatar textual. As opções de estilo são apenas para demonstração.
      </p>


    </div>
  );
}


export default CriadorAvatarTextual;
