import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../css/bootstrap.css";

export class ModalConfirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message
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
          <div>
            <Button variant="danger">Cancelar</Button>
            <Button onClick={() => this.props.confirmar()} variant="success">
              Confirmar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
