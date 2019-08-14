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

    return (
      <div className="body">
        <BrowserRouter>
          <Cabecalho />
          <Menu>
            <Link to="/chamados">
              <Button className="btn-menu" onClick={this.OnclickHande}>
                Chamados
              </Button>
            </Link>
            <Can politica="Gerir Usuario">
              <Link to="/User">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Atendentes
                </Button>
              </Link>
            </Can>
            <Can politica="Gerir Setor">
              <Link to="/ConfiguracaoDeSetores">
                <Button className="btn-menu" onClick={this.OnclickHande}>
                  Setores
                </Button>
              </Link>
            </Can>
            <Can politica="Gerir Setor">
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

            <Can politica="Gerir Resposta">
              <Button
                className="btn-menu"
                onClick={() => this.setState({ answerModal: true })}
              >
                Respostas Padrão
              </Button>
            </Can>
            <ModalAnswer
              show={this.state.answerModal}
              modalName="answerModal"
              close={this.handleCloseModal}
            />

            <Button className="btn-menu logout" onClick={this.handleLogout}>
              Sair.
            </Button>
          </Menu>
          <Container fluid={true} className="position-relative">
            <div className="allScreen">
              <div className="menu-l">
                <Switch>
                  <Route
                    path="/chamados"
                    exact={true}
                    component={SideMenuIndex}
                  />
                  <Route path="/Chamados" component={SideMenuIndex} />
                </Switch>
              </div>
              <Switch>
                <Route path="/chamados" exact={true} component={TabelaIndex} />
                <Route path="/Chamados/:tipo" component={TabelaIndex} />
                <Route path="/DetalhamentoChamado" component={PageChamado} />
                <Route path="/User" component={User} />
                <Route path="/ConfiguracaoDeSetores" component={Setores} />
                <Route
                  path="/RastreioChamado/:tag"
                  component={RastreioChamado}
                />
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
