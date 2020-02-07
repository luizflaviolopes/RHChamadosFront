import React, { Component } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../css/History.css";
import "../css/bootstrap.css";
import { TransferHistory } from "./TransferHistory.js";
import api from "../APIs/DataApi";

export class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      openedDesHistory: false,
      history: props.historico || [],
      numHistory: this.props.numChamado,
      answered: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickHistory = this.handleClickHistory.bind(this);
  }
  handleClickHistory() {
    api(
      "api/Historico/HistoricoDetalhado?formulario=" +
      this.state.numHistory,
      {}
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ history: resp }));
    this.setState({ opened: !this.state.opened });
  }
  handleClick() {
    this.setState({ opened: !this.state.opened });
  }

  handleClickHistoryDesc() {
    this.setState({ openedDesHistory: !this.state.openedDesHistory });
  }

  render() {
    let propriedades = this.state;

    if (this.state.opened) {
      return (
        <Alert variant="dark" className="historicoChamado">
          <button type="button" class="close" onClick={this.handleClick}>
            <span>&times;</span>
          </button>
          <Form.Group>
            <Row>
              <Col sm="12">
                <span>Protocolo</span>
                {this.props.numChamado}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm="6">
                <span>Nome: </span>
                {this.props.solicitante}
              </Col>
              <Col sm="3">
                <span>Assunto: </span>
                {this.props.assunto}
              </Col>
              <Col sm="3">
                <span>Setor: </span>
                {this.props.setor}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm="4">
                <span>MASP: </span>
                {this.props.masp}
              </Col>
              <Col sm="4">
                <span>CPF: </span>
                {this.props.cpf}
              </Col>
              <Col sm="4">
                <span>Telefone: </span>
                {this.props.cel}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm="4">
                <span>E-mail: </span>
                {this.props.email}
              </Col>
              <Col sm="4">
                <span>Data da Abertura: </span>
                {this.props.data}
              </Col>
              <Col sm="4">
                <span>Status: </span>
                {this.props.status}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <label>
              <span>Descrição:</span>
            </label>
            <p>{this.props.desc}</p>
          </Form.Group>
          {this.state.answered ? (
            <div className="form-group">
              <Alert variant="dark" className="answerArea">
                <label>
                  <span>Resposta</span>
                </label>
                <p /> {}
              </Alert>
            </div>
          ) : null}
          {this.state.history.map(function (a, i) {
            return (
              <TransferHistory
                setorOrigem ={a.setorOrigem}
                history={propriedades.history}
                setor={a.id_Setores}
                horario={a.horario}
                desc={a.descricao}
                openedDesHistory={propriedades.openedDesHistory}
                i={i}
              />
            );
          })}
        </Alert>
      );
    } else {
      return (
        <Alert variant="dark" onClick={this.handleClickHistory}>
          <Row>
            <Col sm="6">
              <span>Nome: </span>
              {this.props.solicitante}
            </Col>
            <Col sm="3">
              <span>Assunto: </span>
              {this.props.assunto}
            </Col>
            <Col sm="3">
              <span>Setor: </span>
              {this.props.setor}
            </Col>
          </Row>
        </Alert>
      );
    }
  }
}
