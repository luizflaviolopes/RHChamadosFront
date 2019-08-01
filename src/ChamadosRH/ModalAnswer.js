import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../APIs/DataApi";

export class ModalAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respAuto: { idAtendente: 1, RespostaAutomatica: "" },
      show: props.show,
      modalName: props.modalName
    };
    this.handleCriarResposta = this.handleCriarResposta.bind(this);
  }
  handleCriarResposta() {
    api("http://localhost:5000/api/RespAutomatica", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.respAuto)
    }).then(Response => Response.json());
  }
  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });
    }
  }
  componentWillMount() {
    api("http://localhost:5000/api/resposta", {})
      .then(response => response.json())
      .then(data => {
        this.setState({ respostaAutomatica: data, all: data });
      });
  }
  render() {
    if (!this.state.respostaAutomatica) return <div />;
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={() => this.props.close(this.state.modalName)}
        dialogClassName="sizeModalLG"
        aria-labelledby="Respostas-Chamados"
      >
        <Modal.Header closeButton>
          <Modal.Title id="Respostas-Chamados">
            Resposta ao Chamado {this.state.numChamado}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              {this.state.respostaAutomatica.respostaAutomatica.map(function(
                a,
                i
              ) {
                return (
                  <div className="checkChamado">
                    <div className="answer" id={a.id}>
                      {a.resposta}
                    </div>
                  </div>
                );
              })}
            </Form.Group>
            <hr />
            <Form.Group>
              <Form.Label>Adicionar Resposta Padrão:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={evt =>
                  this.setState({
                    respAuto: {
                      ...this.state.respAuto,
                      RespostaAutomatica: evt.target.value,
                      IdAtendente: 1
                    }
                  })
                }
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              onClick={this.handleCriarResposta}
            >
              Criar Resposta
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
