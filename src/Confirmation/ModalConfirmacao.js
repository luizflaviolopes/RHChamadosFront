import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../css/bootstrap.css";

export class ModalConfirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      show: true
    };
  }

  render() {
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close(this.state.modalName)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.message}</div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button variant="danger" onClick={()=>this.props.close(this.state.modalName)}>Cancelar</Button>
            <Button onClick={() => this.props.confirmar()} variant="success">
              Confirmar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
