import { useState } from 'react';
import './App.css'
function InputTempoReal() {
  const [texto, setTexto] = useState('');
 
  const textoM = texto.length;


  return (
    <div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Digite Algo...'
      />
      <h2>Você digitou: {texto}</h2>


     
      {textoM > 0 && textoM < 3 && (
        <h1>Digite pelo menos 3 caracteres ✖</h1>




      )}
      {textoM > 3 &&(
        <h3>Você digitou 3 ou mais ✔</h3>
      )}
    </div>
  );
}


export default InputTempoReal;
