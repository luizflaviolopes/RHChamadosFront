import React, { Component } from "react";
import Menu, { Cabecalho, Rodape } from "./Layout/Menu.js";
import { Col, Row, Alert, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/Botoes.css";
import "./css/Chamados.css";
import "./css/History.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./APIs/DataApi.js";
import { TransferHistory } from "./ChamadosRH/TransferHistory.js";
import { Anexo } from "./ChamadosRH/Anexos"

class AppRastreio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      ready: false,
      respostas:[]
    };

  }
  componentDidMount() {

    let tag = this.props.match.params.tag

    if (tag)
      api(
        "api/rastreio/pesquisa-chamado?tag=" + tag
      )
        .then(rastreio => rastreio.json())
        .then(rastreio =>
          this.setState({ ...rastreio.data, ready: true })
        ).catch(err => this.setState({ error: true }))
    else
      this.setState({ error: true })

  }

  render() {

    let _this = this;
    if (this.state.error)
      return (<div className="body">

        <Cabecalho />
        <Menu>

        </Menu>
        <Container fluid={true} className="position-relative">
          <div className="allScreen">
            <div className="notFind">
              <h1>
                Pagina não Encontrada - (page was not found 404)
              </h1>
            </div>

          </div>
        </Container>
        <Rodape />
      </div>);

    if (this.state.ready)
      return (
        <div className="body">

          <Cabecalho />
          <Menu>

          </Menu>
          <Container fluid={true} className="position-relative">
            <div className="allScreen">
              <div className="PageChamados">
                <div className="form-group chamado">
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
                    </Row>
                  </div>
                  <Form.Group>
                    <Row><Col sm="1">
                      <Form.Label>Assunto</Form.Label>
                    </Col>
                      <Col sm="11">{this.state.assunto}</Col>
                    </Row>
                  </Form.Group>
                  <div className="form-group">
                    <label>
                      <span>Descrição: </span>
                    </label>
                    <p>{this.state.desc}</p>
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
                          {a.respostaAutomatica !== undefined
                            ? a.respostaAutomatica
                            : a.resposta}
                          <p>{a.horaResposta}</p>
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
                        </p>
                      </Alert>
                    </div>
                  );
                })}
              </div>

            </div>
          </Container>
          <Rodape />
        </div>
      );

    return (<div className="background-logon">
      <div className="carregando">
        <FontAwesomeIcon icon="spinner" pulse />
      </div>
    </div>)
  }
}

export default AppRastreio;
