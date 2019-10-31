import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "../css/logon.css";
import logo from "../img/logo_rhresponde_form-branco.svg";
import { Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

export class EsqueciSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: null
    };
    this.handleEsqueciSenha = this.handleEsqueciSenha.bind(this);
  }

  handleEsqueciSenha = () => {
    api("api/auth/resetsenha", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
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
        toast.success("Solicitalção Encaminhada para o e-mail.");

      }
      )
      .catch(a => {
        toast.success("Solicitalção Encaminhada para o e-mail");

      })
  };

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
                    this.handleEsqueciSenha();
                  }}
                >
                  <Form.Group className="ttl">
                    <Form.Label>Esqueci a Senha</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="E-mail de Acesso"
                      name="Email"
                      onChange={evt =>
                        this.setState({
                          Email: evt.target.value
                        })
                      }
                    />
                  </Form.Group>
                  <Link to="/">
                    <Button className="btn-menu">
                      Voltar
                  </Button>
                  </Link>
                  <Button className="btn-menu" type="submit">
                    Solicitar Senha
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
