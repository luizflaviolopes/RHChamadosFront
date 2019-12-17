import React, { Component } from "react";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/Botoes.css";
import SideNav, { NavItem, NavIcon, NavText, Nav } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MenuIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { eventKey: null };
  }

  render() {
    return (
      <SideNav
        onSelect={selected => {
          this.props.history.push("/Chamados/" + selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="Todos">
          <NavItem eventKey="Todos">
            <NavIcon>
              <FontAwesomeIcon icon="folder" />
            </NavIcon>
            <NavText>Todos</NavText>
          </NavItem>
          <NavItem eventKey="Atribuidos">
            <NavIcon>
              <FontAwesomeIcon icon="user-tag" />
            </NavIcon>
            <NavText>Meus Chamados</NavText>
          </NavItem>
          <NavItem eventKey="Abertos">
            <NavIcon>
              <FontAwesomeIcon icon="folder-open" />
            </NavIcon>
            <NavText>Abertos</NavText>
          </NavItem>
          <NavItem eventKey="Atendimento">
            <NavIcon>
              <FontAwesomeIcon icon="user" />
            </NavIcon>
            <NavText>Em Atendimento</NavText>
          </NavItem>
          <NavItem eventKey="Fechados">
            <NavIcon>
              <FontAwesomeIcon icon="archive" />
            </NavIcon>
            <NavText>Fechados</NavText>
          </NavItem>
          <NavItem eventKey="Setor">
            <NavIcon>
              <FontAwesomeIcon icon="building" />
            </NavIcon>
            <NavText>
              Geral
            </NavText>
            <NavItem eventKey="TodosFechados">

              <NavText>Fechados</NavText>
            </NavItem>
            <NavItem eventKey="TodosAtendimento">

              <NavText>Em Atendimento</NavText>
            </NavItem>
          </NavItem>



        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default MenuIndex;
