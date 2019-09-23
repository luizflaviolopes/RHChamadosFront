
import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import { toast } from 'react-toastify';

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
    api("api/Setores", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.newSet)
    })
      .then(resp => {
        if (resp.status == 200)
          return resp.json()
        else
          throw resp.json();
      })
      .then(data => {
        this.props.AttListUndd(data);
        this.props.close(this.state.modalName);
        toast.success(
          "Unidade Criada"
        )
      })
      .catch(
        a => a.then(e =>
          toast.error(
            e.message,
            {
              position: toast.POSITION.TOP_CENTER
            }
          )
        )
      );
  }
  componentDidUpdate(newProps) {
    if (this.props.show !== this.state.show)
      this.setState({
        show: this.props.show,
        idSetor: this.props.params.idSetor || null
      });
  }

  selectUnidades = () => {

  }

  render() {
    return (
      <Modal size="lg" show={this.state.show} onHide={() => this.props.close()}>
        <Modal.Header closeButton>
          <Modal.Title id="newUnidade">Novo Setor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault();
              this.handleNovaUnidade();
            }}
          >
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
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
