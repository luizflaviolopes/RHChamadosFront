import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Politicas } from "./Politicas";
import api from "../APIs/DataApi";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

export class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      modalName: props.modalName,
      listaPol: [],
      newAtendente: {},
      IdSetores: this.props.IdSetor
    };
    this.handleNovoAtendente = this.handleNovoAtendente.bind(this);
  }

  componentDidUpdate(newProps) {
    if (this.props.show !== this.state.show)
      this.setState({ show: this.props.show });
  }
  componentDidMount() {
    api("api/Atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaPol: data.politicas
        })
      );
  }

  handleNovoAtendente() {
    // let t = this.state.newAtendente.CPF;
    // let er = /[^a-z0-9]/gi;
    // let SemCaracterEsqpecial = t.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    // console.log(SemCaracterEsqpecial);

    this.setState(
      {
        newAtendente: {
          Usuario: this.state.newAtendente.Usuario,
          Email: this.state.newAtendente.Email,
          CPF: this.state.newAtendente.CPF,
          Politicas: this.state.newAtendente.politicas,
          IdSetor: this.props.IdSetor
        }
      },
      () => {
        api("api/Auth/nova-conta", {
          method: "post",
          headers: { "Content-Type": "application/json;" },
          body: JSON.stringify(this.state.newAtendente)
        })
          .then(resp => {
            if (resp.status == 200) return resp.json();
            else throw resp.json();
          })
          .then(data => {
            this.props.attAtendente(data.setores);
            this.props.close();
            toast.success("Usuario Criado");
          })
          .catch(a =>
            a.then(e =>
              Object.keys(e).forEach(function(a, i) {
                toast.error(Array.isArray(e[a]) ? e[a][0] : e[a], {
                  position: toast.POSITION.TOP_CENTER
                });
              })
            )
          );
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
        onHide={() => this.props.close(this.state.modalName)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="newUser">Novo Atendente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                        Usuario: evt.target.value
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
                  onChange={evt =>
                    this.setState({
                      newAtendente: {
                        ...this.state.newAtendente,
                        CPF: evt.target.value
                      }
                    })
                  }
                >
                  {inputprop => (
                    <Form.Control
                      type="text"
                      placeholder="Digite o CPF do Atendente "
                    />
                  )}
                </InputMask>
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
                {this.state.listaPol.map(function(a, i) {
                  return (
                    <Politicas
                      namePol={a.nome}
                      onChange={evt => {
                        let politicas = _this.newAtendente.politicas;

                        if (politicas == null) {
                          politicas = [];
                        }
                        let exist = politicas.find(function(j, h) {
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

              <Button variant="primary" onClick={this.handleNovoAtendente}>
                Enviar
              </Button>
            </Col>
          </Form.Row>
        </Modal.Body>
      </Modal>
    );
  }
}
