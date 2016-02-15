var React = require('react');
var ReactDOM = require('react-dom');

import { Button } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';


const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');

const ButtonReset = require('./ButtonReset.jsx');

const JUGADORX = "jugador 1 - las X";
const JUGADOR0 = "jugador 2 - los 0";
var App = React.createClass({
  getInitialState: function(){
      let filas = 3;
      var x = new Array(filas);
      for (var i = 0; i < filas; i++) {
        x[i] = new Array(filas);
      }
      for (var i = 0; i < filas; i++) {
        for (var j = 0; j < filas; j++) {
          x[i][j] = '-';
        }
      }
      return {
        filas : 3,
        turno: JUGADORX,
        valores: x
      };
    },


checkWinner: function(vals, newVal){


      var nFila, nCol;
      nFila = 0;
      nCol = 0;
      var num = 0;
      while(nFila<this.state.filas){
        while(nCol<this.state.filas){
          if(vals[nFila][nCol] === newVal){
            num++;
          }else{
            num = 0;
          }
          nCol++;
        }
        if(num === this.state.filas) return true;
        nFila++;
        num = 0;
        nCol = 0;
      }

      nFila = 0;
      nCol = 0;
      var num = 0;
      while(nCol<this.state.filas){
        while(nFila<this.state.filas){
          if(vals[nFila][nCol] === newVal){
            num++;
          }else{
            num = 0;
          }
          nFila++;
        }
        if(num === this.state.filas) return true;
        nCol++;
        num = 0;
        nFila = 0;
      }
      nFila = 0;
      num = 0;

      while(nFila<this.state.filas){
        if(vals[nFila][nFila] === newVal){
          num++;
        }else{
          num = 0;
        }
        nFila++;
      }
      if(num === this.state.filas) return true;

      nCol = this.state.filas-1;
      nFila = 0;
      num = 0;
      while(nCol>= 0 && nFila<this.state.filas){
        if(vals[nFila][nCol] === newVal){
          num++;
        }else{
          num = 0;
        }
        nFila++;
        nCol--;
      }
      if(num === this.state.filas) return true;

			return false;
	  },
    checkTie: function(vals){
      var empate = 0;
      var nFila, nCol;
      for (nFila = 0; nFila < 3; nFila++) {
          for (nCol = 0; nCol < 3; nCol++) {
            if (vals[nFila][nCol] !== '-') {
                empate++;
            }
        }
      }
      let cuadros = this.state.filas*this.state.filas;
      if(empate === cuadros) return true;
    },

resetClick: function(){
      var reinicio = confirm("¿Quieres reiniciar?");
      if (reinicio == true) {
        this.setState(this.getInitialState());
      }
    },


 appClick: function(numeroFila, numberoColumna){
 let valores = this.state.valores;
 let nuevoValor = this.state.turno === JUGADORX ? 'X':'0';
 valores[numeroFila][numberoColumna] = nuevoValor;
 this.setState({
 turno: this.state.turno === JUGADORX ? JUGADOR0:JUGADORX,
 valores: this.state.valores
 });
if(this.checkWinner(valores, nuevoValor)){
	    	alert("Ganador: " + this.state.turno);
	    }else{
        if(this.checkTie(valores)){
  	    	alert("Empate. Vuelve a empezar!");
  	    }
      }


 },
render: function(){
 var texto;
 texto = "Turno de " + this.state.turno;
 return (
<div>
 <Cabecera texto={texto}/>
 <Tablero valores={this.state.valores}
manejadorTableroClick={this.appClick}/>
<ButtonReset manejadorButtonClick={this.resetClick}/>
</div>
 )
 }
});
module.exports = App;
