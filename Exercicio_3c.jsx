import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function MenuRestaurante () {
  const pratos = [
    {nome: "Ovo mexido do ", preco: 7.90, descricao: "Ovo mexido simples mas com um toque secreto" },
    {nome:  "Taco Secreto", preco: 24.59, descricao: "O taco especial" },
    {nome: "Lasanha" , preco: 31.50, descricao: "Ovo mexido simples mas com um toque secreto"},
    {nome: "Suco de Manga", preco: 11.39, descricao: "Ovo mexido simples mas com um toque secreto "}
  ]
 
return (
 <div>
  <h2> Minhas comidas favoritas </h2>
    <div className = "menu-grid">
      {pratos.map((prato, index) => (<div
        key ={index} className="prato-card">
        <h3 >{prato.nome}</h3>
        <p className ="preco">R$ {prato.preco.toFixed(2)}</p>
        <p className="descricao">{prato.descricao}</p>
        </div>    
))}
 </div>
 </div>
 );
}
export default MenuRestaurante