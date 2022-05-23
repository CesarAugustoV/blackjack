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
   console.log(carta);
   console.log(deck);
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


