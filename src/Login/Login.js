import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "../css/logon.css";
import logo from "../img/logo_rhresponde_form-branco.svg";
import { Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logado: this.props.logado,
      polsArray: []
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    api("api/auth/entrar", {
      method: "post",
      body: JSON.stringify(this.state.loginUser),
      headers: { "Content-Type": "application/json;" },
      credentials: "include"
    })
      .then(resp => {
        if (resp.status == 200) {
          return resp.json();
        }
        else {
          throw resp;
        }
      }
      )
      .then(data => {

        //this.props.AttListUndd(data);
        localStorage.setItem("Politica", data);

      }
      )
      .catch(a => {
        toast.error("Usuário ou senha inválidos");
      }

      )
  }

  render() {
    return (
      <Container fluid className="padding-zero">
        <ToastContainer
          position="top-center"
          closeOnClick />
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
                    this.handleLogin();
                  }}
                >
                  <Form.Group className="ttl">
                    <Form.Label>Entrar</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>CPF</Form.Label>
                    <InputMask
                      mask="999.999.999-99"
                      onChange={evt =>
                        this.setState({
                          loginUser: {
                            ...this.state.loginUser,
                            Login: evt.target.value
                          }
                        })
                      }
                    >
                      {inputprop => (
                        <Form.Control
                          type="text"
                          placeholder="Digite seu CPF do Atendente "
                        />
                      )}
                    </InputMask>

                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Senha de Acesso"
                      name="Password"
                      onChange={evt =>
                        this.setState({
                          loginUser: {
                            ...this.state.loginUser,
                            Password: evt.target.value
                          }
                        })
                      }
                    />
                    <Form.Text className="text-primary link">
                      <a href="/EsqueciSenha">
                        Esqueci Minha Senha
                      </a>
                    </Form.Text>
                  </Form.Group>

                  <Button type="submit" className="btn-menu">
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
