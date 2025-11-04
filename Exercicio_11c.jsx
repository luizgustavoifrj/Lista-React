  import { useState } from 'react'


function FormularioTempoReal() {
  const [dados, setDados] = useState({
    cidade: '',
    estado: '',
    cep: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      [name]: value
    });
  };
  return (
    <div>
      <h2>Formulario</h2>
      <form>
        <div>
          <label>Cidade:</label>
          <input type="name" name='cidade' value={dados.cidade} onChange={handleChange} />
        </div>


        <div>
          <label>Estado:</label>
          <input type="name" name='estado' value={dados.estado} onChange={handleChange} />
        </div>
        <div>
          <label>Cep:</label>
          <input type="number" name='cep' value={dados.cep} onChange={handleChange} />
        </div>
      </form>
      <div>
        <h3>Dados Preenchidos:</h3>
        <p><strong>Cidade:</strong>{dados.cidade}</p>
        <p><strong>Estado:</strong>{dados.estado}</p>
        <p><strong>Cep:</strong>{dados.cep}</p>


      </div>
    </div>


  );
}
export default FormularioTempoReal;
