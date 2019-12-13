import React, { Component } from "react";
import Menu, { Cabecalho, Rodape } from "./Layout/Menu.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import TabelaIndex from "./ChamadosRH/TabelaIndex.js";
import { Setores } from "./Aministrador/Setores";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { PageChamado } from "./ChamadosRH/PageChamado.js";
import { RastreioChamado } from "./ChamadosRH/RastreioChamado.js";
import SideMenuIndex from "./SideMenuIndex.js";
import Button from "react-bootstrap/Button";
import Formulario from "./Aministrador/Formulario.js";
import User from "./Aministrador/User";
import Container from "react-bootstrap/Container";
import { ModalAnswer } from "./ChamadosRH/ModalAnswer";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./css/App.css";
import "./css/bootstrap.css";
import "./css/Botoes.css";
import api from "./APIs/DataApi.js";
import { Can } from "./APIs/Can.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Filter } from "./ChamadosRH/Filter.js";
import { GraphicStart } from "./Dashboard/GraphicStart.js";
import { hostname } from "os";
import { Inicio } from "./Inicio.js"

library.add(fas);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      answerModal: false,
      newCallModal: false
    };
    this.OnclickHande = this.OnclickHande.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  OnclickHande() {
    this.setState({ redirect: true });
  }

  handleLogout() {
    api("api/auth/Logout", {
      method: "post",
      headers: { "Content-Type": "application/json;" }
    })
      .then(a => a)
      .then(a => {
        localStorage.clear();
        window.location.reload();
      });
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }

  render() {
    let lgClose = () =>
      this.setState({
        answerModal: false,
        newCallModal: false
      });

    let modalans;
    if (this.state.answerModal)
      modalans = (
        <ModalAnswer
          show={this.state.answerModal}
          modalName="answerModal"
          close={this.handleCloseModal}
        />
      );

    return (
      <div className="body">
        <ToastContainer position="top-center" closeOnClick />
        <BrowserRouter>
          <Cabecalho />
          <Menu>
            <Can politica="Visualizar Chamado">
              <Link to="/dashboard">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Dashboard
                </Button>
              </Link>
            </Can>
            <Can politica="Visualizar Chamado">
              <Link to="/Chamados">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Chamados
                </Button>
              </Link>
            </Can>
            <Can politica="Visualizar Chamado">
              <Link to="/CallFilter">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Filtrar Chamados
                </Button>
              </Link>
            </Can>
            <Can politica="Gerir Usuario">
              <Link to="/User">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Atendentes
                </Button>
              </Link>
            </Can>
            <Can politica={["Gerir Setor"], ["Gestor Setor"]}>
              <Link to="/ConfiguracaoDeSetores">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Setores
                </Button>
              </Link>
            </Can>
            <Can politica="Abrir Chamado">
              <Button
                className="btn-menu"
                onClick={() => this.setState({ newCallModal: true })}
              >
                Novo Chamado
              </Button>
            </Can>

            <Formulario
              show={this.state.newCallModal}
              modalName="newCallModal"
              close={this.handleCloseModal}
            />

            {/* <Can politica="Gerir Resposta">
              <Button
                className="btn-menu"
                onClick={() => this.setState({ answerModal: true })}
              >
                Respostas Padrão
              </Button>
            </Can>
            {modalans} */}
            <Can politica="Administrador">
              <Button
                className="btn-menu"
                onClick={() => {
                  window.location = "http://10.33.132.120:8080/"
                }}
              >
                Administrativo
              </Button>
            </Can>

            <Button className="btn-menu logout" onClick={this.handleLogout}>
              Sair.
            </Button>
          </Menu>
          <Container fluid={true} className="position-relative">
            <div className="allScreen">
              <div className="menu-l">
                <Switch>
                  <Route
                    path="/Chamados"
                    exact={true}
                    component={SideMenuIndex}
                  />
                  <Route path="/Chamados" component={SideMenuIndex} />
                </Switch>
              </div>
              <Switch>
                <Route
                  path="/dashboard"
                  exact={true}
                  component={GraphicStart}
                />
                <Route path="/" exact={true} component={Inicio} />
                <Route path="/Chamados" component={TabelaIndex} />
                <Route path="/CallFilter" component={Filter} />
                <Route path="/Chamados/:tipo" component={TabelaIndex} />
                <Route path="/DetalhamentoChamado" component={PageChamado} />
                <Route path="/User" component={User} />
                <Route path="/ConfiguracaoDeSetores" component={Setores} />
                <Route path="/RastreioChamado/:tag" component={RastreioChamado} />
              </Switch>
            </div>
          </Container>
        </BrowserRouter>
        <Rodape />
      </div>
    );
  }
}



export default App;
