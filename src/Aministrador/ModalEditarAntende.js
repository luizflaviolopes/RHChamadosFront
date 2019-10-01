import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Politicas } from "./Politicas";
import api from "../APIs/DataApi";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

export class ModalEditarAntende extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      listaPol: props.listaPol,
      listSetores: [],
      polit: props.params.politicas,
      updateAtendente: props.params
    };
    this.handleEditarAtendente = this.handleEditarAtendente.bind(this);
  }

  componentDidMount() {
    api("api/Atendente", {})
      .then(response => response.json())
      .then(data => this.setState({ listSetores: data.listaSetores }));
  }

  handleEditarAtendente() {
    let cpfFormatado = this.state.updateAtendente.cpf.replace(
      /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
      "$1.$2.$3-$4"
    );

    this.setState(
      {
        updateAtendente: {
          ...this.state.updateAtendente,
          cpf: cpfFormatado
        }
      },
      function () {
        console.log(this.state.updateAtendente);
        api("api/Atendente/AtualizarAtendente", {
          method: "put",
          headers: { "Content-Type": "application/json;" },
          body: JSON.stringify(this.state.updateAtendente)
        })
          .then(resp => {
            if (resp.status == 200) return resp.json();
            else throw resp.json();
          })
          .then(data => {
            this.props.attAtendente(data.setores);
            toast.success("Usuario Editado");
            this.props.close();
          })
          .catch(a => a.then(e => toast.error(e.message)));
      }
    );
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
          <Form
            onSubmit={event => {
              event.preventDefault();
              this.handleEditarAtendente();
            }}
          >
            <Form.Control
              type="text"
              value={this.props.params.Id}
              readOnly
              hidden
            />
            <Form.Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.updateAtendente.nome}
                    placeholder="Nome do Usuário"
                    onChange={evt =>
                      this.setState({
                        updateAtendente: {
                          ...this.state.updateAtendente,
                          nome: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>CPF</Form.Label>
                  <InputMask
                    mask="999.999.999-99"
                    value={this.state.updateAtendente.cpf}
                    readOnly
                    onChange={evt =>
                      this.setState({
                        updateAtendente: {
                          ...this.state.updateAtendente,
                          cpf: evt.target.value
                        }
                      })
                    }
                  >
                    {inputprop => <Form.Control type="text" />}
                  </InputMask>
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    // value={this.state.updateAtendente.email}
                    placeholder="E-mail"
                    value={this.state.updateAtendente.email}
                    title="Email para login"
                    onChange={evt =>
                      this.setState({
                        updateAtendente: {
                          ...this.state.updateAtendente,
                          email: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.updateAtendente.idSetores}
                    onChange={evt =>
                      this.setState({
                        updateAtendente: {
                          ...this.state.updateAtendente,
                          idSetores: evt.target.value
                        }
                      })
                    }
                  >
                    <option>Selecione um Setor</option>
                    {this.state.listSetores.map(function (a, i) {
                      return <option value={a.id}>{a.setor}</option>;
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
                <Button variant="primary" type="submit">
                  Salvar
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
