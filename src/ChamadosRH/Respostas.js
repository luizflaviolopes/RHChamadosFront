import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "../css/Respostas.css";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import { toast } from "react-toastify";

export class Respostas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resp: { formulario: props.numChamado },
      id: props.id,
      resposta: props.resposta,
      respostaAutomatica: [],
      finalResp: false
    };
    this.handleResponder = this.handleResponder.bind(this);
    this.changeIdRespostaAutomatica = this.changeIdRespostaAutomatica.bind(
      this
    );
  }

  changeIdRespostaAutomatica(evt) {
    this.setState({
      resp: {
        formulario: this.props.numChamado,
        IdRespostasAutomaticas: evt.target.id
      }
    });
  }

  handleRespostaAutomatica() {
    api("api/resposta", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.resp)
    }).then(
      resp => {
        if (resp.status == 200)
          return resp.json()
        else
          throw resp.json();
      })
      .then(data =>
        toast.success(
          data.message
        )
      )
      .catch(
        a => a.then(e =>
          toast.error(
            e.message,
            {
              position: toast.POSITION.TOP_CENTER
            }
          )
        )
      );
  }

  handleResponder() {
    this.state.resp.finalResp = this.state.finalResp;
    api("api/resposta", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.resp)
    }).then(
      resp => {
        if (resp.status == 200)
          return resp.json()
        else
          throw resp.json();
      })
      .then(data =>
        toast.success(
          data.message
        )
      )
      .catch(
        a => a.then(e =>
          toast.error(
            e.message,
            {
              position: toast.POSITION.TOP_CENTER
            }
          )
        )
      );
  }

  componentDidMount() {
    api("api/resposta", {})
      .then(response => response.json())
      .then(data =>
        this.setState({ respostaAutomatica: data.respostaAutomatica })
      );
  }

  componentWillUpdate() {
    {
      api("api/resposta", {})
        .then(response => response.json())
        .then(data =>
          this.setState({ respostaAutomatica: data.respostaAutomatica })
        );
    }
  }

  render() {
    let _this = this;
    if (this.state.finalResp) {
      return (
        <Redirect
          to={{
            pathname: "/chamados",
            state: { finalResp: true }
          }}
        />
      );
    }

    return (
      <div className="respostas">
        <Container fluid={true}>
          <Form>
            <Form.Group>
              <Form.Label> Resposta:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={evt =>
                  this.setState({
                    resp: {
                      ...this.state.resp,
                      Resposta: evt.target.value,
                      IdRespostasAutomaticas: null
                    }
                  })
                }
              />
            </Form.Group>
            <hr />
            <Form.Group>
              {this.state.respostaAutomatica.map(function (a, i) {
                return (
                  <div className="checkChamado">
                    <Form.Check
                      onClick={_this.changeIdRespostaAutomatica}
                      name="resposta"
                      label={a.resposta}
                      type="radio"
                      id={a.id}
                    />
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group>
              <Button
                variant="success"
                type="submit"
                onClick={() => {
                  this.setState({ finalResp: true }, () =>
                    this.handleResponder()
                  );
                }}
              >
                <FontAwesomeIcon icon="check" />
                Enviar Resposta Final
              </Button>

              <Link to="/chamados">
                <Button
                  variant="warning"
                  type="submit"
                  onClick={this.handleResponder}
                >
                  <FontAwesomeIcon icon="envelope-open-text" />
                  Enviar Resposta Parcial
                </Button>
              </Link>
              <Button variant="danger" onClick={() => this.props.closeAnswer()}>
                Cancelar
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}
