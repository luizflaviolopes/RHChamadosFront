import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import "../css/bootstrap.css";
import api from "../APIs/DataApi";
import { toast } from "react-toastify";

export class DistribuirChamados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      listAtendente: [],
      atendentes: []
    };
  }

  componentDidMount() {
    api("api/Responsavel/atendentes", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listAtendente: data
        })
      );
  }

  handleDistribuirChamados = () => {
    api("api/Responsavel/distribuir", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.atendentes)
    })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw resp.json();
        }
      })
      .then(data => {
        toast.success("Chamdos distribuidos.");
        this.props.close(this.state.modalName);
      })
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
  };

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });
    }
  }
  render() {
    let __this = this;
    let _this = this.state;

    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close(this.state.modalName)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Distribuir Chamados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Atendentes Para Distribuir Chamados:</Form.Label>
          </Form.Group>

          <Form.Group>
            {this.state.listAtendente.map(function(a, i) {
              return (
                <Form.Check
                  type="checkbox"
                  value={a.id}
                  label={a.nome}
                  onChange={evt => {
                    let atendentes = _this.atendentes;

                    if (atendentes === null) {
                      atendentes = [];
                    }
                    let exist = atendentes.find(function(j, h) {
                      return j.id === a.id;
                    });
                    if (exist) {
                      exist.valor = evt.target.checked;
                    } else {
                      atendentes.push({
                        nome: a.nome,
                        valor: evt.target.checked,
                        id: a.id
                      });
                    }

                    __this.setState({
                      atendentes: [..._this.atendentes]
                    });
                  }}
                />
              );
            })}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => this.handleDistribuirChamados()}
          >
            Confirmar
          </Button>
          <Button
            variant="danger"
            onClick={() => this.props.close(this.state.modalName)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
