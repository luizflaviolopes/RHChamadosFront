import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../css/bootstrap.css";

export class ModalConfirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
