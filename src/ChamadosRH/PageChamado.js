import React, { Component } from "react";
import "../css/PageChamado.css";

import { Link } from "react-router-dom";
import { Button, Col, Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Respostas } from "./Respostas.js";
import { ModalTransferir } from "./ModalTransferir";
import ModalHistorico from "./ModalHistorico.js";
import { Anexo } from "./Anexos";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";
export class PageChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.location.state,
      transferModal: false,
      answerModal: false,
      historyModal: false,
      answerOpen: false,
      answered: [],
      listFile: [],
      fileD: {}
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.chamadoReaberto = this.chamadoReaberto.bind(this);
    //  this.handleClicked = this.handleClicked.bind(this);
  }

  handleAnswer() {
    this.setState({ answerOpen: !this.state.answerOpen });
  }

  /* handleClicked(num) {
     api("http://localhost:5000/api/Download?id=" + num, {
       method: "get",
     }).then(response => response.blob())
       .then(blob => {
         var url = window.URL.createObjectURL(blob);
         var a = document.createElement('a');
         a.href = url;
         a.download = "filename.xlsx";
         document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
         a.click();
         a.remove();  //afterwards we remove the element again         
       });
 
 
 
   }*/

  /*
  handleFile() {
    const formData = new FormData();
    var file = document.getElementById("anexo").files;
    var chamado = this.state.numChamado;

    formData.append('file', file[0]);
    formData.append('chamado', chamado);

    api(
      "http://localhost:5000/api/values", {
        method: "put",
        body: formData
      })
      .then();
  }
*/
  handleBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    api(
      "http://localhost:5000/api/Resposta?formulario=" + this.state.numChamado,
      {}
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ ...resp }));
  }

  chamadoReaberto(a) {
    let reabrirChamado = {
      ...this.state
    };
    reabrirChamado.numChamado = a;

    api("http://localhost:5000/api/ReabrirChamado", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(reabrirChamado)
    }).then(() => {
      this.setState({ status: "Aberto" });
    });
    //.then(Response => Response.json());
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }

  render() {
    let _this = this;
    return (
      <div className="PageChamados">
        <div className="form-group chamado">
          <div className="form-group text-center">
            <label>
              <span>Chamado: </span>
              {this.state.numChamado}
            </label>
          </div>
          <div className="form-group">
            <Row>
              <Col sm={6}>
                <label>
                  <span>Nome: </span>
                </label>
                {this.state.solicitante}
              </Col>
              <Col sm={3}>
                <label>
                  <span>CPF: </span>
                </label>
                {this.state.cpf}
              </Col>
              <Col sm={3}>
                <label>
                  <span>Masp: </span>
                </label>
                {this.state.masp}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col sm={4}>
                <label>
                  <span>Celular: </span>
                </label>
                {this.state.cel}
              </Col>
              <Col sm={4}>
                <label>
                  <span>E-Mail: </span>
                </label>
                {this.state.email}
              </Col>
              <Col sm={4}>
                <label>
                  <span>Status: </span>
                </label>
                {this.state.status}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <Row>
              <Col sm={4}>
                <label>
                  <span>Setor: </span>
                </label>
                {this.state.setor}
              </Col>
              <Col sm={4}>
                <label>
                  <span>Assunto: </span>
                </label>
                {this.state.assunto}
              </Col>
              <Col sm={4}>
                <label>
                  <span>Data de Abertura: </span>
                </label>
                {this.state.data}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <label>
              <span>Descrição: </span>
            </label>
            <p>{this.state.desc}</p>
          </div>
        </div>

        <div className="anexo row">
          {this.state.listFile.map(function(a, i) {
            return (
              <Anexo
                nome={a.textAnexo}
                eliminar={_this.handleRemoveFile}
                num={a.id}
                typefile={
                  a.typefile
                } /* handleleClicked={_this.handleClicked} */
              />
            );
          })}
        </div>

        {this.state.answered.map(function(a, i) {
          return (
            <div className="form-group">
              <Alert variant="dark">
                <label>
                  <span>Resposta</span>
                </label>
                <p>
                  {a.respostaAutomatica !== null
                    ? a.respostaAutomatica
                    : a.resposta}
                  <p>{a.horaResposta}</p>
                </p>
              </Alert>
            </div>
          );
        })}

        <div className="form-group">
          {this.state.status !== "Encerrado" ? (
            <Row className="row text-center">
              <Col sm={3}>
                <Link to="/">
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
                  </Button>
                </Link>
              </Col>

              <Col sm={3}>
                <Can politica="Encaminhar Chamado">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.setState({
                        transferModal: true
                      })
                    }
                  >
                    <FontAwesomeIcon icon="exchange-alt" /> Redirecionar
                  </Button>
                </Can>

                <ModalTransferir
                  show={this.state.transferModal}
                  modalName="transferModal"
                  close={this.handleCloseModal}
                  numChamado={this.state.numChamado}
                />
              </Col>
              <Col sm={3}>
                <Can politica="Responder Chamado">
                  <Button variant="success" onClick={this.handleAnswer}>
                    <FontAwesomeIcon icon="file-alt" /> Responder
                  </Button>
                </Can>
              </Col>
              <Col sm={3}>
                <Can politica="Visualizar Relatorios">
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ historyModal: true })}
                  >
                    <FontAwesomeIcon icon="history" /> Histórico
                  </Button>
                </Can>

                <ModalHistorico
                  show={this.state.historyModal}
                  modalName="historyModal"
                  close={this.handleCloseModal}
                  numChamado={this.state.numChamado}
                />
              </Col>
            </Row>
          ) : this.state.status !== "Aberto" &&
            this.state.status !== "Atendimento" ? (
            <Row className="row text-center">
              <Col sm={4}>
                <Link to="/">
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
                  </Button>
                </Link>
              </Col>
              <Col sm={4}>
                <Can politica="Reabrir Chamado">
                  <Button
                    variant="warning"
                    onClick={() => this.chamadoReaberto(this.state.numChamado)}
                  >
                    <FontAwesomeIcon icon="envelope-open-text" /> Reabrir
                  </Button>
                </Can>
              </Col>
              <Col sm={4}>
                <Can politica="Visualizar Relatorios">
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ historyModal: true })}
                  >
                    <FontAwesomeIcon icon="history" /> Histórico
                  </Button>
                </Can>

                <ModalHistorico
                  show={this.state.historyModal}
                  modalName="historyModal"
                  close={this.handleCloseModal}
                  numChamado={this.state.numChamado}
                />
              </Col>
            </Row>
          ) : null}
          {this.state.answerOpen ? (
            <Respostas
              closeAnswer={this.handleAnswer}
              numChamado={this.state.numChamado}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
