//import {saludar} from './js/componentes.js';
import './styles.css';
import _, { map } from 'underscore';//importaciond de shufle para barajear el maso, instalacion desde node.
/*
 2C = Two of clubs dos de trebol
 2D = two of Diamonds
 2H = two of hearts
 2S = two of Spades
*/ 

const miModulo = (()=>{
   'use strict'

let      deck    = [];

const    tipos = ['C', 'D', 'H', 'S'],
         especiales = ['A','J','Q','K'];


let puntosJugadores = [];

//Referencias HTML
const    btnPedir = document.querySelector('#btnPedir'),
         btnNuevo = document.querySelector('#btnNuevo'),
         btnDetener = document.querySelector('#btnDetener'),
         puntosHTML = document.querySelectorAll('small'),
         divCartasJugadores = document.querySelectorAll('.divCartas');

//esta funcion inicia el juego
const inicializarJuego = (numJugadores = 2)=>{

   crearDeck();
   puntosJugadores=[];
   for(let i = 0;i<numJugadores; i++){
      puntosJugadores.push(0);
   };
   puntosHTML.forEach(elem => elem.innerText=0);
   divCartasJugadores.forEach(elem=> elem.innerHTML='');
   btnPedir.disabled=false;
   btnDetener.disabled=false;
   
};

//esta funcion crea la baraja
const crearDeck = () => {

   deck=[];
   
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

   
   return deck = _.shuffle(deck);
   
}

//esta funcion permite tomar carta
const pedirCarta = ()=>{
   if(deck.length ===0 ){
      throw 'No hay cartas en el deck';
   }

   return deck.pop();
   
};

//Esta funcion retorna el valor de la carta.
const valorCarta = (carta)=>{

   const valor = carta.substring(0, carta.length - 1);

   return (isNaN ( valor ))  ? //si valor es un numero retorna false.
                     ( valor === 'A' ) ? 11 : 10 //si puntos es exactamente igual a A retorna 11 y sino puntos es igual a 10;
                  : 
                     valor * 1; //convertimos el string en numero
};

//acumular puntos, turno 0 = 1er jugador, ultimo es la computadora
const acumularPuntos=(carta, turno)=>{

   puntosJugadores[turno] += valorCarta(carta);
   puntosHTML[turno].innerText=puntosJugadores[turno];
   return puntosJugadores[turno];
};

//crear carta
const crearCarta = (carta, turno)=>{
   const imgCarta = document.createElement('img');
   imgCarta.src=`assets/img/cartas/${carta}.png`;
   imgCarta.classList.add('carta');
   divCartasJugadores[turno].append(imgCarta);
   
};

//determinar ganador
const determinarGanador =()=>{
   const [puntosMinimos, puntosComputadora] = puntosJugadores;
   setTimeout(() => {
      if (puntosComputadora===puntosMinimos){
         alert('Nadie gana, intenta de nuevo.');
      }else if (puntosComputadora>21){
         alert('Felicidades Ganaste!');
      }else if (puntosMinimos<21 && puntosComputadora>puntosJugadores[0]){
         alert('Computadora gana');
      }else if (puntosMinimos>21){
         alert('Computadora gana');
      }
   }, 60);

};

//turno Jugadores

const turnoJugador1 = ()=>{

   const carta = pedirCarta();
   puntosJugadores[0] = acumularPuntos(carta, 0);
   crearCarta(carta, 0);

   if(puntosJugadores[0] > 21){
      console.warn("Jugador 1 pierde!");
      btnPedir.disabled=true;
      btnDetener.disabled=true;
      turnoComputadora(puntosJugadores[0]);
      console.log('Perdiste');

   } else if (puntosJugadores[0]===21){
      console.warn('21, genial');
      btnPedir.disabled=true;
      btnDetener.disabled=true;
      turnoComputadora(puntosJugadores[0]);
   }

};

//turno computadora
const turnoComputadora = (puntosMinimos)=>{
      let puntosComputadora=0;

   do{
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
      crearCarta(carta, puntosJugadores.length - 1);

   }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

   determinarGanador();
  
};
// Eventos

//boton pedir
btnPedir.addEventListener('click', ()=>{
   
   turnoJugador1();

});

//boton detener

btnDetener.addEventListener('click', ()=>{
   btnDetener.disabled=true;
   btnPedir.disabled=true;

   turnoComputadora(puntosJugadores[0]);

});


//boton nuevo

btnNuevo.addEventListener('click', ()=>{
   
   inicializarJuego();
   

});



})();
