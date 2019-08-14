import React, { Component } from "react";
import Menu, { Cabecalho, Rodape } from "./Layout/Menu.js";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/Botoes.css";
import "./css/Chamados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./APIs/DataApi.js";

class AppRastreio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      ready: false
    };

  }
  componentDidMount() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let tag = params.get('tag');

    if (tag)
      api(
        "api/auth/pesquisa-chamado?tag=" + tag
      )
        .then(rastreio => rastreio.json())
        .then(rastreio =>
          this.setState({ ...rastreio, ready: true })
        ).catch(err => this.setState({ error: true }))
    else
      this.setState({ error: true })

  }

  render() {
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
