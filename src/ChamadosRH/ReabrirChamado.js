import React, { Component } from "react";
import { Button, Col, Row, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import Container from "react-bootstrap/Container";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export class ReabrirChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reabrirChamado: {}
    };
    this.handleJustificar = this.handleJustificar.bind(this);
  }

  handleJustificar() {
    this.setState(
      {
        reabrirChamado: {
          ...this.state.reabrirChamado,
          numChamado: this.props.numChamado
        }
      },
      () => {
        api("api/ReabrirChamado", {
          method: "post",
          headers: { "Content-Type": "application/json;" },
          body: JSON.stringify(this.state.reabrirChamado)
        })
          .then(resp => {
            if (resp.status == 200) return resp.json();
            else throw resp.json();
          })
          .then(data => toast.success(data.message))
          .catch(a =>
            a.then(e =>
              toast.error(e.message, {
                position: toast.POSITION.TOP_CENTER
              })
            )
          );
      }
    );
  }

  render() {
    return (
      <div className="respostas">
        <div />
        <Container fluid={true}>
          <Form>
            <Form.Group>
              <Form.Label> Justificativa:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={evt =>
                  this.setState({
                    reabrirChamado: {
                      ...this.state.reabrirChamado,
                      motivo: evt.target.value
                    }
                  })
                }
              />

              <hr />
            </Form.Group>
          </Form>
          <Row className="row text-center">
            <Col sm={4} key={"b5"}>
              <Button
                variant="outline-danger"
                onClick={this.props.closeReabrir}
              >
                <FontAwesomeIcon icon="chevron-circle-left" /> Cancelar
              </Button>
            </Col>
            <Col sm={4} key={"b5"}>
              <Button variant="warning" onClick={this.handleJustificar}>
                <FontAwesomeIcon icon="envelope-open-text" />
                Enviar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
