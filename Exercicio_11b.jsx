import { useState } from 'react'


function FormularioTempoReal() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    idade: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      [name]: value
    });
  };




  const isEmailValid = dados.email.includes('@');
  const isAgeValid = Number(dados.idade) > 18;


  return (
    <div>
      <h2>Formulario</h2>
      <form>
        <div>
          <label>Nome:</label>


          <input type="text" name='nome' value={dados.nome} onChange={handleChange} />
        </div>


        <div>
          <label>Email:</label>
          <input type="email" name='email' value={dados.email} onChange={handleChange} />
        </div>
        <div>
          <label>Idade:</label>
          <input type="number" name='idade' value={dados.idade} onChange={handleChange} />
        </div>
      </form>
      <div>
        <h3>Dados Preenchidos:</h3>
        <p><strong>Nome:</strong>{dados.nome}</p>
        <p><strong>Email:</strong>{dados.email}</p>
        <p><strong>Idade:</strong>{dados.idade}</p>


        {dados.email && dados.idade ? (


          (isEmailValid && isAgeValid) ? (
            <p style={{ color: 'green' }}>Está tudo certo</p>
          ) : (
            <p style={{ color: 'red' }}>há um erro no seus dados</p>
          )


        ) : (
          <p>Por favor, preencha todos os dados.</p>
        )}
      </div>
    </div>
  );
}
export default FormularioTempoReal;
