import React, { Component } from "react";
import "../css/PageChamado.css";
import { Link, Redirect } from "react-router-dom";
import { Button, Col, Row, Alert, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Respostas } from "./Respostas.js";
import { ReabrirChamado } from "./ReabrirChamado";
import { ModalTransferir } from "./ModalTransferir";
import ModalHistorico from "./ModalHistorico.js";
import { Anexo } from "./Anexos";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { TransferHistory } from "./TransferHistory";

export class PageChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChamado: props.location.state.numChamado,
      tag: props.location.state.tag,
      transferModal: false,
      answerModal: false,
      historyModal: false,
      answerOpen: false,
      reabrirOpen: false,
      answered: [],
      listFile: [],
      fileD: {},
      listaAssunto: [],
      selectedAssunto: {},
      listaResponsavel: [],
      selectedResponsavel: {},
      assuntoEnviado: {},
      openedDesHistory: false,
      historicos: [],
      redirect: false
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleAssumirChamado = this.handleAssumirChamado.bind(this);
    this.handleAtribuirChamado = this.handleAtribuirChamado.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleAlterAssunto = this.handleAlterAssunto.bind(this);
    this.handleReabrir = this.handleReabrir.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.chamadoReaberto = this.chamadoReaberto.bind(this);
  }

  componentDidMount() {
    // api("api/Resposta?formulario=" + this.state.numChamado, {})
    //   .then(resp => resp.json())
    //   .then(resp => this.setState({ ...resp }));
    /* 
    api("api/Responsavel", {})
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          listaResponsavel: data
        })
      ); */

    api("api/assunto", {})
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          listaAssunto: data
        })
      );

    this.handleAtualizarPage();
  }

  handleAtualizarPage = () => {
    api("api/EndPoint/getChamado?id=" + this.state.numChamado, {})
      .then(resp => {
        if (resp.status === 200) return resp.json();
        else throw resp.json();
      })
      .then(data =>
        this.setState({
          //answered: data.answere !== null ? data.answered : this.state.answered,
          ...data.retorno,
          listaResponsavel: data.listaResponsavel
        })
      )
      .catch(a =>
        a.then(
          e =>
            toast.error(e.message, {
              position: toast.POSITION.TOP_CENTER
            }),
          this.setState({
            redirect: true
          })
        )
      );
  };

  handleAnswer() {
    if (this.state.alterAssunto == true)
      this.setState({ answerOpen: !this.state.answerOpen });
    else {
      this.setState({ answerOpen: false });
      toast.error(
        "Não é possivel realizar operação, favor alterar assunto para continuar."
      );
    }
  }

  handleReabrir() {
    this.setState({ reabrirOpen: !this.state.reabrirOpen });
  }

  handleBack() {
    this.props.history.goBack();
  }
  handleAlterAssunto() {
    api("api/chamado", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.selectedAssunto)
    })
      .then(resp => {
        if (resp.status === 200) {
          toast.success("Assunto Alterado.");
          this.handleAtualizarPage();
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
  handleAtribuirChamado() {
    if (this.state.selectedResponsavel.id) {
      api("api/Responsavel/AtribuirChamado", {
        method: "post",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify(this.state.selectedResponsavel)
      })
        .then(resp => {
          if (resp.status == 200) return resp.json();
          else throw resp.json();
        })
        .then(a => {
          toast.success("Confirmado");
          this.handleAtualizarPage();
        })
        .catch(a =>
          a.then(e =>
            toast.error(e.message, {
              position: toast.POSITION.TOP_CENTER
            })
          )
        );
    } else {
      api("api/Responsavel/RemoveAtribuicao", {
        method: "put",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify(this.state.numChamado)
      })
        .then(resp => {
          if (resp.status == 200) return resp.json();
          else throw resp.json();
        })
        .then(a => {
          this.handleAtualizarPage();
          toast.success("Confirmado");
        })
        .catch(a =>
          a.then(e =>
            toast.error(e.message, {
              position: toast.POSITION.TOP_CENTER
            })
          )
        );
    }
  }

  handleAssumirChamado() {
    api("api/Responsavel/AssumirChamado", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.numChamado)
    })
      .then(resp => {
        if (resp.status == 200) return resp.json();
        else throw resp.json();
      })
      .then(a => {
        toast.success("Confirmado");
        this.handleAtualizarPage();
      })
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
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
      this.handleAtualizarPage();
      this.setState({ status: "Aberto" });
    });
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }

  render() {
    let _this = this;

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/Chamados/Abertos"
          }}
        />
      );
    }

    let buttons;

    if (this.state.status !== "Encerrado")
      buttons = (
        <Row className="row text-center">
          <Col sm={3} key={"b1"}>
            <Link to="/Chamados">
              <Button variant="outline-danger">
                <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
              </Button>
            </Link>
          </Col>

          <Col sm={3} key={"b2"}>
            <Can politica="Encaminhar Chamado">
              <Button
                variant="primary"
                onClick={() => {
                  if (this.state.alterAssunto == true) {
                    this.setState({
                      transferModal: true
                    });
                  } else {
                    this.setState({ transferModal: false });
                    toast.error(
                      "Não é possivel realizar operação, favor alterar assunto para continuar."
                    );
                  }
                }}
                {...(this.state.alterAssunto !== true ? "disabled" : null)}
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
              <Button
                variant="success"
                onClick={this.handleAnswer}
                {...(this.state.alterAssunto !== true ? "disabled" : null)}
              >
                <FontAwesomeIcon icon="file-alt" /> Responder
              </Button>
            </Can>
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
      );
    else
      buttons = (
        <Row className="row text-center">
          <Col sm={4} key={"b5"}>
            <Link to="/chamados">
              <Button variant="outline-danger">
                <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
              </Button>
            </Link>
          </Col>
          <Col sm={4} key={"b6"}>
            <Can politica="Reabrir Chamado">
              <Button variant="warning" onClick={this.handleReabrir}>
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
      );
    var Assuntos;
    if (this.state.listaAssunto.length > 0) {
      Assuntos = (
        <Can politica="Visualizar Chamado">
          <Col sm="1">
            <span>Assunto:</span>
          </Col>
          <Col sm="10">
            <Typeahead
              onChange={evt => {
                if (evt.length !== 0)
                  this.setState({
                    selectedAssunto: {
                      id: evt[0].id,
                      assunto: evt[0].assunto,
                      numChamado: this.state.numChamado
                    }
                  });
              }}
              onFocus={evt => {
                evt.target.select();
              }}
              options={this.state.listaAssunto}
              labelKey={option => `${option.assunto}`}
              defaultInputValue={this.state.assunto}
            />
          </Col>
          <Col sm="1">
            <Button onClick={this.handleAlterAssunto} variant="success">
              Alterar
            </Button>
          </Col>
        </Can>
      );
    }
    var atribuicaoReverse = (
      <Can politica="Responder Chamado">
        <Button variant="outline-success" onClick={this.handleAssumirChamado}>
          Assumir Chamado
        </Button>
      </Can>
    );

    var atribuicao;
    if (
      (this.state.listaResponsavel.length > 0 &&
        this.state.atendenteResponsavel !== undefined) ||
      (this.state.listaResponsavel.length > 0 &&
        this.state.atendenteResponsavel === "")
    ) {
      atribuicao = (
        <Can politica="Atribuir Chamado">
          <Form.Group>
            <Form.Label>Atribuir Chamado</Form.Label>
            <Row>
              <Col sm="9">
                <Typeahead
                  onChange={evt => {
                    if (evt.length !== 0) {
                      this.setState({
                        selectedResponsavel: {
                          id: evt[0].id,
                          name: evt[0].name,
                          numChamado: this.state.numChamado
                        }
                      });
                    } else {
                      this.setState({
                        selectedResponsavel: {}
                      });
                    }
                  }}
                  onFocus={evt => {
                    evt.target.select();
                  }}
                  options={this.state.listaResponsavel}
                  placeholder={"Não atribuído"}
                  labelKey={option => `${option.nome}`}
                  defaultInputValue={_this.state.atendenteResponsavel}
                />
              </Col>
              <Col sm="3">
                <Button onClick={this.handleAtribuirChamado} variant="success">
                  Atribuir à
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Can>
      );
    }
    return (
      <div className="PageChamados">
        <div className="form-group chamado">
          {/* 
          Div para mostra numero de chamado
          <div className="form-group text-center">
            <label>
              <span>Chamado: </span>
              {this.state.numChamado}
            </label>
          </div> */}
          <div className="form-group text-center">
            <label>
              <span>Protocolo: </span>
              {this.state.protocolo}
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
                <Form.Group>
                  <label>
                    <span>Data de Abertura: </span>
                  </label>
                  {this.state.data}
                </Form.Group>
              </Col>
              {this.state.isAutenticado ? (
                <Col sm={4}>
                  <Form.Group>
                    <label>
                      <span>Setor de Abertura: </span>
                    </label>
                    {this.state.setorAbertura}
                  </Form.Group>
                </Col>
              ) : null}
            </Row>
          </div>
          <Form.Group>
            {this.state.tag === null ? (
              <Row>
                {Assuntos}
                <Can
                  politica={(["Encaminhar Chamado"], ["Responder Chamado"])}
                  reverse
                >
                  <Col sm="1">
                    <Form.Label>Assunto</Form.Label>
                  </Col>
                  <Col sm="11">{this.state.assunto}</Col>
                </Can>
              </Row>
            ) : (
                <Row>
                  <Col sm="1">
                    <Form.Label>Assunto</Form.Label>
                  </Col>
                  <Col sm="11">{this.state.assunto}</Col>
                </Row>
              )}
          </Form.Group>
          <div className="form-group">
            <label>
              <span>Descrição: </span>
            </label>
            <p>{this.state.desc}</p>
          </div>
          {this.state.justificativa !== "N/A" ? (
            <div className="form-group">
              <label>
                <span>Motivo da reabertura do chamado: </span>
              </label>
              <p>{this.state.justificativa}</p>
            </div>
          ) : null}
          {this.state.tag === null ? (
            <div className="form-group">
              <Row>
                {this.state.status !== "Encerrado" ? (
                  <Col sm={6}>
                    {atribuicao}

                    {this.state.atendenteResponsavel === "" ? (
                      <Can politica="Atribuir Chamado" reverse>
                        <React.Fragment>{atribuicaoReverse}</React.Fragment>
                      </Can>
                    ) : (
                        <span>
                          Responsavel:
                        <span> {this.state.atendenteResponsavel}</span>
                        </span>
                      )}
                  </Col>
                ) : null}
                {this.state.isReturn === "true" ? (<Col sm="6">
                  <span> Chamado Retornado</span>
                </Col>) : null
                }

              </Row>
            </div>
          ) : null}
          <Form.Group>
            {this.state.historicos.map(function (a, i) {
              return (
                <TransferHistory
                  history={_this.state.historicos}
                  setor={a.id_Setores}
                  horario={a.horario}
                  desc={a.desc}
                  i={i}
                  openedDesHistory={_this.openedDesHistory}
                  rastreio={false}
                />
              );
            })}
          </Form.Group>
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
                <div className="position-relative">
                  <div>
                    <span>Resposta </span>
                  </div>

                  <div className="text-monospace position-absolute r0">
                    <span className=" text-muted">
                      Respondido por: {a.atendente} - {a.horaResposta}
                    </span>
                  </div>
                </div>
                <div>
                  <p>
                    {a.respostaAutomatica !== undefined
                      ? a.respostaAutomatica
                      : a.resposta}
                  </p>

                  {_this.state.answered[i].listFile.map(function (x, i) {
                    return (
                      <div className="anexo row">
                        <Anexo
                          nome={x.textAnexo}
                          eliminar={_this.handleRemoveFile}
                          num={x.id}
                          typefile={x.typefile}
                        />
                      </div>
                    );
                  })}
                </div>
              </Alert>
            </div>
          );
        })}

        <div className="form-group">
          {this.state.tag === null ? (
            buttons
          ) : (
              <Row className="row text-center">
                <Col sm={3} key={"b1"}>
                  <Link to="/Chamados">
                    <Button variant="outline-danger">
                      <FontAwesomeIcon icon="chevron-circle-left" /> Voltar
                  </Button>
                  </Link>
                </Col>
              </Row>
            )}

          {this.state.answerOpen ? (
            <Respostas
              closeAnswer={this.handleAnswer}
              numChamado={this.state.numChamado}
            />
          ) : null}
          {this.state.reabrirOpen ? (
            <ReabrirChamado
              closeReabrir={this.handleReabrir}
              numChamado={this.state.numChamado}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
