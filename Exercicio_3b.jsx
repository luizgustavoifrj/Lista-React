import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function ListaComida () {
    const comidas = ['Macarrão do Spoleto', 'Taco do tacobell', 'Qualquer coisa com camarão', 'Pipoca'];


    return (
        <div>
            <h2> Minhas comidas favoritas </h2>
            <ul>
                {comidas.map((hobby,index) => ( <li key={index}> {comidas}</li>
                ))}
            </ul>


        </div>
    );
}


export default ListaComida