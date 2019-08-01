import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Politicas } from "./Politicas";
import api from "../APIs/DataApi";

export class ModalEditarAntende extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      listaPol: [],
      listSetores: [],
      Politicas: [],
      updateAtendente: {}
    };
    this.handleEditarAtendente = this.handleEditarAtendente.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(newProps) {
    if (this.props.show !== this.state.show) {
      this.setState({ show: this.props.show, ...this.props.params });
    }
  }
  componentDidMount() {
    api("http://localhost:5000/api/atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({ listaPol: data.politicas, listSetores: data.Setores })
      );
  }

  handleEditarAtendente() {
    let updateAtendente = {
      ...this.state
    };

    api("http://localhost:5000/api/Atendente", {
      method: "put",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(updateAtendente)
    })
      .then(Response => Response.json())
      .then(data => {
        this.props.params.Nome = updateAtendente.Nome;
        this.props.params.WinUser = updateAtendente.WinUser;
        this.props.params.Masp = updateAtendente.Masp;
        this.props.params.Politicas = updateAtendente.Politicas;
        this.props.params.Ativo = updateAtendente.Ativo;
      });

    this.props.close(this.state.modalName);
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }

  render() {
    let __this = this;
    let _this = this.state;
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close(this.state.modalName)}
        aria-labelledby="editUser"
      >
        <Modal.Header closeButton>
          <Modal.Title id="editUser">Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" value={this.state.Id} readOnly hidden />
            <Form.Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.Nome}
                    placeholder="Nome do Usuário"
                    onChange={evt => this.setState({ Nome: evt.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Masp</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.Masp}
                    placeholder="Masp do Usuário"
                    onChange={evt => this.setState({ Masp: evt.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.WinUser}
                    placeholder="Login do Usuário"
                    onChange={evt =>
                      this.setState({ WinUser: evt.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    value={this.state.setor}
                    placeholder="Login do Usuário"
                    onChange={evt => this.setState({ setor: evt.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group>
                  <Form.Label>Permissões</Form.Label>
                  {this.state.listaPol.map(function(a, i) {
                    return (
                      <Politicas
                        namePol={a.nome}
                        onChange={evt => {
                          let politicas = _this.Politicas;

                          if (politicas == null) {
                            politicas = [];
                          }
                          let exist = politicas.find(function(j, h) {
                            return j.id === a.id;
                          });
                          if (exist) {
                            politicas.splice(politicas.indexOf(exist), 1);
                          } else {
                            politicas.push({
                              nome: a.nome,
                              valor: evt.target.checked,
                              id: a.id
                            });
                          }

                          __this.setState({
                            Politicas: politicas,
                            updateAtendente: {
                              ..._this.updateAtendente,
                              politicas: politicas
                            }
                          });
                        }}
                        check={
                          _this.Politicas.some(t => {
                            return t.id === a.id;
                          })
                            ? "checked"
                            : null
                        }
                      />
                    );
                  })}
                </Form.Group>
                <Link to="/User">
                  <Button
                    variant="primary"
                    onClick={this.handleEditarAtendente}
                  >
                    Salvar
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
