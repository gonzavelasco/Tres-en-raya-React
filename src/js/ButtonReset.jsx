import { Button } from 'react-bootstrap';
var React = require('react');
var ReactDOM = require('react-dom');

let ButtonReset = React.createClass({
    buttonClick: function(){
            this.props.manejadorButtonClick();
   },
    render: function(){
        return (
          <Button onClick={this.buttonClick}>
Reiniciar partida </Button>
) }
});
module.exports = ButtonReset;
