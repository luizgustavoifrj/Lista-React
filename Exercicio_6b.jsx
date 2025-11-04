import React, {useState} from 'react';
import './App.css'
function MostrarEsconder(){
  const [mostrar, setMostrar] = useState(true);
  return(
    <div> <button onClick={() => setMostrar(!mostrar)}>  {mostrar ? 'Esconder foto' : 'Mostrar foto'}   </button>  
      {mostrar && <img src="src/assets/bolsomito.webp" alt="opa" />}  </div>
  )
}


export default MostrarEsconder;