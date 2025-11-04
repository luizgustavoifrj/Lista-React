import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function CartaoPessoa({ titulo, autor, ano, genero }) {
  return (
    <div className="cartao-livro">
      <h2>{titulo}</h2>
      <p>
        <strong>titulo:</strong> {titulo} escreveu este livro
      </p>
      <p>
        <strong>Autor:</strong> {autor}
      </p>
      <p>
        <strong>Ano:</strong> {ano}
      </p>
      <p>
        <strong>genero:</strong> {genero}
      </p>
    </div>
  );
}


function App() {
  return (
    <div>
      <CartaoPessoa
        titulo={"misto quente"}
        ano={" 12 de Outubro de 1960"}
        autor={"Dostoiévski"}
        genero={"romance"}
      />
    </div>
  );
}


export default App;