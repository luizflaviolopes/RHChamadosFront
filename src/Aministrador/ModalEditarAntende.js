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
      listaPol: props.listaPol,
      listSetores: [],
      polit: props.params.politicas,
      updateAtendente: {}
    };
    this.handleEditarAtendente = this.handleEditarAtendente.bind(this);

  }


  componentDidMount() {
    api("http://localhost:5000/api/atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({ listSetores: data.listaSetores })
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
        this.props.attAtendente(data)
      });

    this.props.close();
  }

  render() {
    let __this = this;
    let _this = this.state;
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close()}
        aria-labelledby="editUser"
      >
        <Modal.Header closeButton>
          <Modal.Title id="editUser">Editar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type="text" value={this.props.params.Id} readOnly hidden />
            <Form.Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.props.params.nome}
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
                    value={this.props.params.masp}
                    placeholder="Masp do Usuário"
                    onChange={evt => this.setState({ Masp: evt.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    value=''
                    placeholder="E-mail"
                    title="Email para login"
                    onChange={evt =>
                      this.setState({ Email: evt.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.props.params.idSetor}
                    onChange={evt =>
                      this.setState({ Email: evt.target.value })
                    }
                  >
                    <option>Selecione um Setor</option>
                    {this.state.listSetores.map(function (a, i) {
                      return (
                        <option value={a.id}>{a.setor}</option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm="12">
                <Form.Group>
                  <Form.Label>Permissões</Form.Label>
                  {this.state.listaPol.map(function (a, i) {
                    return (
                      <Politicas
                        namePol={a.nome}
                        onChange={evt => {
                          let politicas = _this.polit;

                          if (politicas == null) {
                            politicas = [];
                          }
                          let exist = politicas.find(function (j, h) {
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
                            polit: politicas,
                            updateAtendente: {
                              ..._this.updateAtendente,
                              politicas: politicas
                            }
                          });
                        }}
                        check={
                          __this.props.params.politicas.some(t => {
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
