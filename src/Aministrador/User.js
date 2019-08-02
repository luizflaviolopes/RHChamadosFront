import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import MenuUser from "./SideMenuUser.js";
import { Table } from "react-bootstrap";
import Atendentes from "./Atendentes.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HierarchyDraw } from "../Hierarchy/HierarchyDraw";
import { ModalEditarAntende } from "./ModalEditarAntende.js";
import api from "../APIs/DataApi";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: false,
      editUserParams: null,
      listaSetoresAtendentes: [],
      listaPoliticas: []
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handlAttAtendentes = this.handlAttAtendentes.bind(this);
  }

  componentDidMount() {
    api("http://localhost:5000/api/Atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaSetoresAtendentes: data.setores.map(function(a) {
            return {
              sigla: a.setor,
              id: a.id,
              pai: a.hierarquia,
              atendentes: a.atendente
            };
          }),

          listaPoliticas: data.politicas
        })
      );
  }

  handleOpenModal(modal, params = null) {
    this.setState({ [modal]: true, [modal + "Params"]: params });
  }

  handlAttAtendentes(newAtendente) {
    const newList = [...this.state.listaSetoresAtendentes, newAtendente];
    this.setState({
      listaSetoresAtendentes: newList
    });
  }

  handleCloseModal(modal) {
    this.setState({ [modal]: false });
  }
  render() {
    let _this = this;

    if (this.state.listaSetoresAtendentes === [])
      return (
        <div className="carregando">
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      );
    else
      return (
        <div className="user">
          <HierarchyDraw
            data={this.state.listaSetoresAtendentes}
            el={Atendentes}
            lineColor={"black"}
          />
          {/* <MenuUser AttListAtdnt={this.handlAttAtendentes} />

          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Masp</th>
                <th>Login</th>
                <th>Ativo</th>
                <th>Unidade</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.listaAtendentes.map(function(a, i) {
                return (
                  <Atendentes {...a} openShowModal={_this.handleOpenModal} />
                );
              })}
            </tbody>
          </Table>
          <ModalEditarAntende
            show={this.state.editUser}
            modalName="editUser"
            close={this.handleCloseModal}
            params={this.state.editUserParams}
          /> */}
        </div>
      );
  }
}
export default User;
