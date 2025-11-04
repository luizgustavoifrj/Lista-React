import { useState } from 'react';
import './App.css'


function InputTempoReal() {
 
  const [texto, setTexto] = useState('');
 
  const textoM = texto.length;
  const reverso = texto.split('').reverse().join('')
  const numero = textoM*2


  return (
    <div>
      <h1> 🔐Geredor de Senha Especialmente Forte</h1>


      <h4>Digite uma palavra para ser a sua senha:</h4>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Digite Algo...'
        maxLength={50}
      />
      <h3>Sua senha gerada:</h3>
      <h4>{reverso}{numero}{textoM}&%$</h4>      


    </div>
  );
}


export default InputTempoReal;