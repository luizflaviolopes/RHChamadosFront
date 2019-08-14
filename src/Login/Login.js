import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "../css/logon.css";
import logo from "../img/logo_rhresponde_form-branco.svg";
import { Form } from "react-bootstrap";
import api from "../APIs/DataApi";

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
    }).then(resp => {
      localStorage.setItem("Politica", resp);
      window.location.reload();
    });
  }

  render() {
    return (
      <Container fluid className="padding-zero">
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
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Login de Acesso"
                      name="Login"
                      onChange={evt =>
                        this.setState({
                          loginUser: {
                            ...this.state.loginUser,
                            Login: evt.target.value
                          }
                        })
                      }
                    />
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
                      <a href="http://localhost:3000/EsqueciSenha">
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
