import React from "react";
import "../css/PageChamado.css";
import { Link } from "react-router-dom";
import { Button, Col, Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";

export class RastreioChamado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: this.props.match.params.tag
    };
  }

  componentDidMount() {
    api(
      "http://localhost:5000/api/rastreio/pesquisa-chamado?tag=" +
        this.state.tag
    )
      .then(rastreio => rastreio.json())
      .then(rastreio => this.setState({ ...rastreio }));
  }

  render() {
    return (
      <div className="PageChamados">
        <div className="form-group chamado">
          <div className="form-group">
            <Row>
              <Col sm={6}>
                <label>
                  <span>Nome: </span>
                </label>
                {this.state.nome}
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
                  <span>Assunto: </span>
                </label>
                {this.state.assunto}
              </Col>
              <Col sm={4}>
                <label>
                  <span>Data de Abertura: </span>
                </label>
                {this.state.horaEnviada}
              </Col>
            </Row>
          </div>
          <div className="form-group">
            <label>
              <span>Descrição: </span>
            </label>
            <p>{this.state.descricao}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default RastreioChamado;
