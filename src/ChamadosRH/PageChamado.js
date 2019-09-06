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
import { Typeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css';



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
      fileD: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.chamadoReaberto = this.chamadoReaberto.bind(this);
  }

  handleAnswer() {
    this.setState({ answerOpen: !this.state.answerOpen });
  }

  handleBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    api(
      "api/Resposta?formulario=" + this.state.numChamado,
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

    api("api/ReabrirChamado", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(reabrirChamado)
    }).then(() => {
      this.setState({ status: "Aberto" });
    });
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }


  render() {
    let _this = this;

    let buttons;

    let itens = [
      { Name: 'Art', lastName: 'Blakey' },
      { Name: 'Jimmy', lastName: 'Cobb' },
      { Name: 'Elvin', lastName: 'Jones' },
      { Name: 'Max', lastName: 'Roach' },
      { Name: 'Tony', lastName: 'Williams' },
    ]

    if (this.state.status !== "Encerrado")
      buttons = (
        <Row className="row text-center">
          <Col sm={3} key={"b1"}>
            <Link to="/Chamados">
              <Button variant="outline-danger" >
                <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
            </Button>
            </Link>
          </Col>

          <Col sm={3} key={"b2"}>
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
          <Col sm={3} key={"b3"}>
            <Can politica="Responder Chamado">
              <Button variant="success" onClick={this.handleAnswer} >
                <FontAwesomeIcon icon="file-alt" /> Responder
            </Button>
            </Can >
          </Col>
          <Col sm={3} key={"b4"}>
            <Button
              variant="secondary"
              onClick={() => this.setState({ historyModal: true })}
            >
              <FontAwesomeIcon icon="history" /> Histórico
            </Button>

            <ModalHistorico
              show={this.state.historyModal}
              modalName="historyModal"
              close={this.handleCloseModal}
              numChamado={this.state.numChamado}
            />
          </Col>
        </Row>
      )
    else
      buttons = (
        <Row className="row text-center">
          <Col sm={4} key={"b5"}>
            <Link to="/chamados">
              <Button variant="outline-danger" >
                <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
            </Button>
            </Link>
          </Col>
          <Col sm={4} key={"b6"}>
            <Can politica="Reabrir Chamado">
              <Button
                variant="warning"
                onClick={() => this.chamadoReaberto(this.state.numChamado)}
              >
                <FontAwesomeIcon icon="envelope-open-text" /> Reabrir
            </Button>
            </Can>
          </Col>
          <Col sm={4} key={"b7"}>
            <Button
              variant="secondary"
              onClick={() => this.setState({ historyModal: true })}
            >
              <FontAwesomeIcon icon="history" /> Histórico
            </Button>

            <ModalHistorico
              show={this.state.historyModal}
              modalName="historyModal"
              close={this.handleCloseModal}
              numChamado={this.state.numChamado}
            />
          </Col>
        </Row>
      )


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
          <div className="form-group">
            <Row>
              <Col sm={6}>
                <Can politica="Gerir Setor">
                  <label>Atribuido à</label>
                  <Typeahead
                    labelKey={(option) => `${option.Name}`}
                    //Colocar Atendentes /*Esta com uma variavel para teste */
                    options={itens}
                  //onChange={}
                  />
                </Can>

                <Button
                  variant="outline-success"
                //onClick={}
                >
                  Assumir Chamado
                </Button>
              </Col>
            </Row>

          </div>
        </div>

        <div className="anexo row">
          {this.state.listFile.map(function (a, i) {
            return (
              <Anexo
                nome={a.textAnexo}
                eliminar={_this.handleRemoveFile}
                num={a.id}
                typefile={a.typefile}
              />
            );
          })}
        </div>

        {this.state.answered.map(function (a, i) {
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
          {buttons}
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
