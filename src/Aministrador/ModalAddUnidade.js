import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../APIs/DataApi";

export class ModalAddUnidade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      newSet: {},
      idSetor: this.props.params.id || null,
      attList: {}
    };
    this.handleNovaUnidade = this.handleNovaUnidade.bind(this);
  }

  handleNovaUnidade() {
    api("http://localhost:5000/api/Setores", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.newSet)
    })
      .then(Response => Response.json())
      .then(data => {
        this.props.AttListUndd(data);
        this.props.close(this.state.modalName);
      });
  }
  componentDidUpdate(newProps) {
    if (this.props.show !== this.state.show)
      this.setState({
        show: this.props.show,
        idSetor: this.props.params.idSetor || null
      });
  }

  /*  handleNovaUnidade() {
    api("http://localhost:5000/api/Setores", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.newSet)
    })
      .then(Response => Response.json())
      .then(data => {
        this.props.AttListUndd(data);
        console.log(data);
        this.props.close();
      });
  } */
  render() {
    return (
      <Modal size="lg" show={this.state.show} onHide={() => this.props.close()}>
        <Modal.Header closeButton>
          <Modal.Title id="newUnidade">Novo Atendente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome da Unidade</Form.Label>
              <Form.Control
                placeholder="Nome da Unidade"
                onChange={evt =>
                  this.setState({
                    newSet: {
                      ...this.state.newSet,
                      Hierarquia: this.state.idSetor,
                      Setor: evt.target.value
                    }
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" onClick={this.handleNovaUnidade}>
                Enviar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
