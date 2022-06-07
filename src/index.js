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

   
let   puntosJugadores = [],
      turnos,
      numJugadores = prompt("Ingresa el numero de usuarios, con numeros.","ej: 1 o 10.");
      
      

//Referencias HTML
const    btnPedir = document.querySelector('#btnPedir'),
         btnNuevo = document.querySelector('#btnNuevo'),
         btnDetener = document.querySelector('#btnDetener'),
         principal = document.querySelector('.principal');


 
//esta funcion inicia el juego
const inicializarJuego = (numJugadores = 2)=>{
   let divCartasJugadores = document.querySelectorAll('.divCartas'),
   puntosHTML = document.querySelectorAll('small');
   crearDeck();
   puntosJugadores=[];
   turnos=0;
   puntosHTML.forEach(elem => elem.innerText=0);
   divCartasJugadores.forEach(elem=> elem.innerHTML='');
   principal.innerHTML='';
   btnPedir.disabled=false;
   btnDetener.disabled=false;
   crearDiv(numJugadores);
   
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

//esta funcion modifica el dom añadiendo los div

const crearDiv = (numJugadores)=>{
   
   //creamos las etiquetas html de los jugadores
   for(let i = 0; i < numJugadores;i++){

      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const div3 = document.createElement('div');
      const nombreUsuario = document.createElement('h1');
      const puntos = document.createElement('small');

      //añadimos el texto
      nombreUsuario.textContent = "Jugador";
      puntos.textContent = "0";
      
      
      //añadimos las clases
      div1.classList.add('row','container');
      div2.classList.add('col','avbar-brand', 'mb-0', 'h1');
      div3.classList.add('divCartas', 'jugador-cartas');
      
      //agregamos al div principal los seucndarios y las caracteristicas creadas
      div1.appendChild(div2);
      div2.appendChild(nombreUsuario);
      div2.appendChild(puntos);
      div2.appendChild(div3);
      
      //añadimos al dom
      principal.appendChild(div1);

      //creamos el numero de jugadores
      puntosJugadores.push(0);
   };
   
   //crear div computadora y sus elementos
   const divPc1 = document.createElement('div');
   const divPc2 = document.createElement('div');
   const divPc3 = document.createElement('div');
   const nombrePc = document.createElement('h1');
   const puntos = document.createElement('small');
   
   //añadimos texto a
   nombrePc.textContent = "Computadora";
   puntos.textContent = "0";
      
   //añadimos clases
   divPc1.classList.add('row','container');
   divPc2.classList.add('col','avbar-brand', 'mb-0', 'h1');
   divPc3.classList.add('divCartas', 'jugador-cartas');

   //insertamos lo creado organizado
   divPc1.appendChild(divPc2);
   divPc2.appendChild(nombrePc);
   divPc2.appendChild(puntos);
   divPc2.appendChild(divPc3);

   //añadimos al dom
   principal.appendChild(divPc1);

   //añadimos pc al array
   puntosJugadores.push(0);

  
};

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
   let puntosHTML = document.querySelectorAll('small');
   puntosJugadores[turno] += valorCarta(carta);
   puntosHTML[turno].innerText=puntosJugadores[turno];
   return puntosJugadores[turno];

};

//crear carta
const crearCarta = (carta, turno)=>{
   let divCartasJugadores = document.querySelectorAll('.divCartas');
   const imgCarta = document.createElement('img');
   imgCarta.src=`assets/img/cartas/${carta}.png`;
   imgCarta.classList.add('carta');
   
   divCartasJugadores[turno].append(imgCarta);
   
   
};

//determinar ganador
const determinarGanador =(puntosMinimos, puntosComputadora)=>{
   btnPedir.disabled=true;
   btnDetener.disabled=true;
   console.log(puntosMinimos, puntosComputadora);
   setTimeout(() => {
      if (puntosComputadora===puntosMinimos){
         alert('Nadie gana, intenta de nuevo.');
      }else if (puntosComputadora>21){
         alert('Felicidades Ganaste!');
      }else if (puntosComputadora===21){
         alert('Computadora gana');
      }else if (puntosMinimos>21){
         alert('Computadora gana');
      }else if(puntosComputadora<21 && puntosComputadora>puntosMinimos ){
         alert('computadora gana');
      }
   }, 60);

};

//aumentar turno
const determinarTurno = (elturno)=>{
   let numeroJugadores = puntosJugadores.length;
   let diferencia = numeroJugadores-elturno;
   if(diferencia===1){
      turnoComputadora();
   }
};


//turno Jugador

const turnoJugador = ( turno, puntosJugadores )=>{
   
   const carta = pedirCarta();
   acumularPuntos(carta, turno);
   crearCarta(carta, turno);
   
   if(puntosJugadores[turno]>21){
      alert('Perdiste, ahora presiona detener para que el siguiente jugador pueda intentarlo.');
      turnos ++;
      determinarTurno(turnos);
      
      
   }else if (puntosJugadores[turno]===21){
      btnPedir.disabled=true;
      btnDetener.disabled=true;
      alert('Excelente 21, Jugador ' +  turno + 1 + ' GANA  ');
   }
   

};


//turno computadora
const turnoComputadora = ()=>{
   
   //buscamos el puntaje mas cerca de 21
   const puntosMinimos = puntosJugadores.find(element => element < 21);
   
   let puntosComputadora=0;

    do{
       const carta = pedirCarta();
       puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
       crearCarta(carta, puntosJugadores.length - 1);
       

    }while((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21));

    determinarGanador(puntosMinimos, puntosComputadora);
    
  
};


// Eventos

//boton pedir
btnPedir.addEventListener('click', ()=>{
   
   turnoJugador(turnos, puntosJugadores);
   
});

//boton detener

btnDetener.addEventListener('click', ()=>{
   btnPedir.disabled=false;
   
   if(puntosJugadores[turnos]===0){
      alert('Debes pedir carta antes de detenerte.');
   }else{
      alert('Siguiente turno.');
      turnos++;
      determinarTurno(turnos);
      
   }
 
});

//boton nuevo

btnNuevo.addEventListener('click', ()=>{
   
   inicializarJuego(numJugadores);
   
});


})();
