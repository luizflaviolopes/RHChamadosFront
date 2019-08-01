import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/App.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/menu.css";
import { NewUser } from "./ModalNewUser";

class MenuUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      AttListAtdnt: props.AttListAtdnt
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleCloseModal(modal) {
    this.setState({ [modal]: false, teste: "asder" });
  }

  render() {
    return (
      <SideNav>
        <NewUser
          show={this.state.newUser}
          modalName="newUser"
          close={this.handleCloseModal}
          AttListAtdnt={this.props.AttListAtdnt}
        />
        <SideNav.Toggle />
        <SideNav.Nav>
          <NavItem
            eventKey="newUser"
            onClick={() => this.setState({ newUser: true })}
          >
            <NavIcon>
              <FontAwesomeIcon icon="user-plus" />
            </NavIcon>
            <NavText>Adicionar Atendente</NavText>
          </NavItem>
          <NavItem eventKey="usuarios">
            <NavIcon>
              <FontAwesomeIcon icon="user" />
            </NavIcon>
            <NavText>Atendentes</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default MenuUser;
