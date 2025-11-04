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
        maxLength={50}
      />
      <h2>Você digitou: {texto} Total de Caracteres: {textoM}/50</h2>
     


    </div>
  );
}


export default InputTempoReal;