import React, { Component } from "react";
import "../css/menu.css";
import logo from "../img/logo_rhresponde_form_old.png";

export class Cabecalho extends Component {
  render() {
    return (
      <div className="slide r10">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </div>
    );
  }
}
export class Rodape extends Component {
  render() {
    return (
      <footer className="rodape">
        <nav>
          {" "}
          © 2019 - Todos os direitos reservados - Seplag Governo de Minas{" "}
        </nav>
      </footer>
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <nav>{this.props.children}</nav>
      </div>
    );
  }
}

export default Menu;
