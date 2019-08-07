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
import { NewUser } from "./ModalNewUser";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: false,
      addUser: false,
      editUserParams: {},
      listaSetoresAtendentes: [],
      listaPoliticas: [],
      IdSetor: null,
      editId: null
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModalAdd = this.handleOpenModalAdd.bind(this);
    this.handleOpenModalEdit = this.handleOpenModalEdit.bind(this);
    this.handlAttAtendentes = this.handlAttAtendentes.bind(this);
  }

  componentDidMount() {
    let _this = this;
    api("http://localhost:5000/api/Atendente", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaSetoresAtendentes: data.setores.map(function (a) {
            return {
              sigla: a.setor,
              id: a.id,
              pai: a.hierarquia,
              atendentes: a.atendente,
              add: _this.handleOpenModalAdd,
              edit: _this.handleOpenModalEdit
            };
          }),

          listaPoliticas: data.politicas
        })
      );
  }

  handleOpenModalAdd(a) {
    this.setState({ addUser: true, IdSetor: a });
  }

  handleOpenModalEdit(at) {
    this.setState({
      editUser: true,
      editUserParams: at,
    });

  }

  handlAttAtendentes(attAtendente) {
    let _this = this;
    this.setState({
      listaSetoresAtendentes: attAtendente.setores.map(function (a) {
        return {
          sigla: a.setor,
          id: a.id,
          pai: a.hierarquia,
          atendentes: a.atendente,
          add: _this.handleOpenModalAdd,
          edit: _this.handleOpenModalEdit
        };
      })
    });
  }

  handleCloseModal() {
    this.setState({ editUser: false, addUser: false });
  }
  render() {
    let _this = this;
    let modalAdd;
    let modalEdit;

    if (this.state.addUser) {
      modalAdd = (
        <NewUser
          show={true}
          modalName="newUser"
          close={this.handleCloseModal}
          attAtendente={this.handlAttAtendentes}
          IdSetor={this.state.IdSetor}
        />)
    }

    if (this.state.editUser) {
      modalEdit = (
        <ModalEditarAntende
          listaPol={this.state.listaPoliticas}
          show={true}
          modalName="editUser"
          close={this.handleCloseModal}
          params={this.state.editUserParams}
          attAtendente={this.handlAttAtendentes}
        />)
    }

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
          {modalAdd}
          {modalEdit}

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
