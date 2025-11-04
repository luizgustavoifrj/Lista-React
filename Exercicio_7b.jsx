import { useState } from 'react';


function InputTempoReal(){
  const[texto, setTexto] = useState('');
  const textoM = texto.toUpperCase();
  return(
    <div>
      <input type="text"
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      placeholder='Digite Algo...'/>
      <h2>Você digitou: {textoM} </h2>
    </div>
  )
}


export default InputTempoReal