import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Politicas } from "./Politicas";
import api from "../APIs/DataApi";

export class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      listaPol: [],

      newAtendente: {}
    };
    this.handleNovoAtendente = this.handleNovoAtendente.bind(this);
  }

  componentDidUpdate(newProps) {
    if (this.props.show !== this.state.show)
      this.setState({ show: this.props.show });
  }
  componentDidMount() {
    api("http://localhost:5000/api/atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaPol: data.politicas

        })
      );
  }

  handleNovoAtendente() {

    this.setState({
      newAtendente: {
        ...this.state.newAtendente,
        idSetores: this.props.idSetor
      }
    })

    api("http://localhost:5000/api/Atendente", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.newAtendente)
    })
      .then(Response => Response.json())
      .then(data => {
        this.props.attAtendente(data);
        this.props.close();
      });
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
          <Modal.Title id="newUser">Novo Atendente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do Atendente"
                    onChange={evt =>
                      this.setState({
                        newAtendente: {
                          ...this.state.newAtendente,
                          Nome: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Masp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masp do Atendente"
                    onChange={evt =>
                      this.setState({
                        newAtendente: {
                          ...this.state.newAtendente,
                          Masp: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="E-Mail do Atendente"
                    onChange={evt =>
                      this.setState({
                        newAtendente: {
                          ...this.state.newAtendente,
                          Email: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  {this.state.listaPol.map(function (a, i) {
                    return (
                      <Politicas
                        namePol={a.nome}
                        onChange={evt => {
                          let politicas = _this.newAtendente.politicas;

                          if (politicas == null) {
                            politicas = [];
                          }
                          let exist = politicas.find(function (j, h) {
                            return j.id === a.id;
                          });
                          if (exist) {
                            exist.valor = evt.target.checked;
                          } else {
                            politicas.push({
                              nome: a.nome,
                              valor: evt.target.checked,
                              id: a.id
                            });
                          }

                          __this.setState({
                            newAtendente: {
                              ..._this.newAtendente,
                              politicas: politicas
                            }
                          });
                        }}
                      />
                    );
                  })}
                </Form.Group>
                <Link to="/User">
                  <Button variant="primary" onClick={this.handleNovoAtendente}>
                    Enviar
                  </Button>
                </Link>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
