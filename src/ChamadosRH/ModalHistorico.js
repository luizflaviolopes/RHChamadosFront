import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../css/PageChamado.css";
import "../css/bootstrap.css";
import { History } from "./callHistory";
import api from "../APIs/DataApi";

class ModalHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      idForm: props.numChamado,
      historico: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });

      if (this.props.show) {
        api(
          "api/Historico?formulario=" + this.state.idForm,
          {}
        )
          .then(resp => resp.json())
          .then(resp => this.setState({ historico: resp }));
      }
    }
  }

  render() {
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close(this.state.modalName)}
        aria-labelledby="Historico Chamado"
      >
        <Modal.Header closeButton>
          <Modal.Title id="HistoryModal">Histórico do Chamado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.historico.map(function(a, i) {
            return <History {...a} />;
          })}
        </Modal.Body>
      </Modal>
    );
  }
}
export default ModalHistorico;
