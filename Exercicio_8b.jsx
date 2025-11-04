import { useState } from 'react'


function AdicionarLista(){
  const [item, setItem] = useState('');
  const[lista, setLista] = useState([]);


  const adicionarItem = () => {
    if (item.trim()){
      setLista([...lista, item]);
      setItem('');
    }
  };
  return(
    <div>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder='Adicionar nova tarefa: '/>
      <button onClick={adicionarItem}>Adicionar tarefa</button>
      <ul>
        {lista.map((itemLista, index)=> (
          <li key={index}>{itemLista}</li>
        ))}
      </ul>
    </div>
  );
}


export default AdicionarLista