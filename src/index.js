//import {saludar} from './js/componentes.js';
import './styles.css';
import _, { map } from 'underscore';//importaciond de shufle para barajear el maso, instalacion desde node.
/*
 2C = Two of clubs dos de trebol
 2D = two of Diamonds
 2H = two of hearts
 2S = two of Spades
*/ 


let deck    = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0,
    puntosComputadora = 0;



//Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');


//esta funcion crea la baraja
const crearDeck = () => {
    for (let i = 2; i<=10; i++){
         for(let tipo of tipos){
            deck.push(i+tipo);
         }
         
    }
    for (let tipo of tipos){
        for(let esp of especiales){
           deck.push(esp+tipo);
        }
   }

   deck= _.shuffle(deck);

   return deck;
}

crearDeck();

//esta funcion permite tomar carta
const pedirCarta = ()=>{
   if(deck.length ===0 ){
      throw 'No hay cartas en el deck';
   }

   const carta = deck.pop();
   return carta;
   
};

//Esta funcion retorna el valor de la carta.

const valorCarta = (carta)=>{

   const valor = carta.substring(0, carta.length - 1);

   return (isNaN ( valor ))  ? //si valor es un numero retorna false.
                     ( valor === 'A' ) ? 11 : 10 //si puntos es exactamente igual a A retorna 11 y sino puntos es igual a 10;
                  : 
                     valor * 1; //convertimos el string en numero
};

// Eventos

btnPedir.addEventListener('click', ()=>{
   const carta = pedirCarta();

   puntosJugador += valorCarta(carta);
   puntosHTML[0].innerText=puntosJugador;
   
   const imgCarta = document.createElement('img');
   imgCarta.src=`assets/img/cartas/${carta}.png`;
   imgCarta.classList.add('carta');
   divCartasJugador.append(imgCarta);

   if(puntosJugador > 21){
      console.warn("Perdiste!");
      btnPedir.disabled=true;
   } else if (puntosJugador===21){
      console.warn('21, genial');
      btnPedir.disabled=true;
   }
  

   
});

