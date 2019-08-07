import React, { Component } from "react";
import Menu, { Cabecalho, Rodape } from "./Layout/Menu.js";
import Container from "react-bootstrap/Container";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/Botoes.css";

class AppRastreio extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    return (
      <div className="body">

        <Cabecalho />
        <Menu>

        </Menu>
        <Container fluid={true} className="position-relative">
          <div className="allScreen"></div>
        </Container>
        <Rodape />
      </div>
    );
  }
}

export default AppRastreio;
