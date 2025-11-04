import React, {useState} from 'react';
function MostrarEsconder(){
  const [mostrar, setMostrar] = useState(true);
  return(
    <div> <button onClick={() => setMostrar(!mostrar)}>  {mostrar ? 'Esconder' : 'Mostrar'}   </button>  
      {mostrar && <p> Este texto pode ser mostrado ou não</p>}  </div>
  )
}


export default MostrarEsconder;