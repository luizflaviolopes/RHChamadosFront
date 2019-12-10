import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "../css/logon.css";
import logo from "../img/logo_rhresponde_form-branco.svg";
import { Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import { toast, ToastContainer } from "react-toastify";

export class ConfirmarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: {}
    };
    this.handlePassword = this.handlePassword.bind(this);
  }

  handlePassword = () => {
    let search = window.location.search;
    var splits = /=(.*)&.*=(.*)/g.exec(search);
    let token = splits[1];
    let username = splits[2];

    this.setState(
      {
        Password: {
          ...this.state.Password,
          Token: token,
          UserName: username
        }
      },
      () => {
        api("api/auth/novaSenha", {
          method: "post",
          headers: { "Content-Type": "application/json;" },
          body: JSON.stringify(this.state.Password)
        })
          .then(resp => {
            if (resp.status === 200) {
              toast.success("Confirmado.");
              window.location.replace("/");
            } else throw resp.json();
          })
          .catch(a =>
            a.then(e => {
              console.log(e);
              toast.error(e.message, {
                position: toast.POSITION.TOP_CENTER
              });
            })
          );
      }
    );
  };

  render() {
    return (
      <Container fluid className="padding-zero">
        <ToastContainer position="top-center" closeOnClick />
        <div className="background-logon">
          <div className="formLogin">
            <div className="apresentacao">
              <div className="form-group lg">
                <img src={logo} className="logoForm" />
              </div>
            </div>
            <div className="login container">
              <div className="logonForm">
                <Form
                  onSubmit={event => {
                    event.preventDefault();
                    this.handlePassword();
                  }}
                >
                  <Form.Group className="ttl">
                    <Form.Label>Padrão da Senha</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>A senha deve conter no mínimo:</Form.Label>
                  </Form.Group>
                  <Form.Group>• Seis dígitos</Form.Group>
                  <Form.Group>• Uma letra maiúscula</Form.Group>
                  <Form.Group>• Um número</Form.Group>
                  <Form.Group>
                    • Um caractere especial (ex: !,@,#, etc...)
                  </Form.Group>
                  <Form.Group className="ttl">
                    <Form.Label>Criar Senha</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Senha"
                      name="Password"
                      onChange={evt =>
                        this.setState({
                          Password: {
                            ...this.state.Password,
                            Password: evt.target.value
                          }
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirmar Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirmar Senha"
                      name="ConfirmPassword"
                      onChange={evt =>
                        this.setState({
                          Password: {
                            ...this.state.Password,
                            ConfirmPassword: evt.target.value
                          }
                        })
                      }
                    />
                  </Form.Group>
                  <Button className="btn-menu" type="submit">
                    Entrar
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
