import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class RespostasAutomaticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resp: { formulario: props.numChamado },
      respostaAutomatica:[],
      id: props.id,
      resposta: props.resposta,
      
    };
    this.changeIdRespostaAutomatica = this.changeIdRespostaAutomatica.bind(this);
  }
  changeIdRespostaAutomatica(evt){
    this.setState({
      resp: {
      formulario: this.props.numChamado,
      IdRespostasAutomaticas: evt.target.id}
    })
  }
  render() {
    let _this = this;
    return (
      <div className="checkChamado">
        <Form.Check
          onClick={_this.changeIdRespostaAutomatica}
          name="resposta"
          label={this.state.resposta}
          type="radio"
          id={this.state.id}
        />
      </div>
    );
  }
}
export default RespostasAutomaticas;
