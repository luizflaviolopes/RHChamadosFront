import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Container } from "react-bootstrap";
import { Unidades } from "./Unidades";
import { ModalAddUnidade } from "./ModalAddUnidade";
import { HierarchyDraw } from "../Hierarchy/HierarchyDraw";
import api from "../APIs/DataApi";

export class Setores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaSetores: [],
      modalAddUnidade: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlAttUnidades = this.handlAttUnidades.bind(this);
  } //

  componentDidMount() {
    let _this = this;
    api("api/Setores", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaSetores: data.map(function (a) {
            return {
              id: a.id,
              sigla: a.setor,
              pai: a.hierarquia,
              delete: _this.handleDesativarUnidade,
              add: _this.handleOpenModal
            };
          })
        })
      );
  }
  handleDesativarUnidade = id => {
    let _this = this;
    api("api/Setores?Id=" + id, {
      method: "delete"
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          listaSetores: data.map(function (a) {
            return {
              id: a.id,
              sigla: a.setor,
              pai: a.hierarquia,
              delete: _this.handleDesativarUnidade,
              add: _this.handleOpenModal
            };
          })
        })
      );
  };
  handleOpenModal(obj) {
    this.setState({ modalAddUnidade: obj });
  }

  handleCloseModal() {
    this.setState({ modalAddUnidade: null });
  }

  removeUnidade = id => {
    let setores = [...this.state.listaSetores];
  };
  handlAttUnidades(newUnidade) {
    let _this = this;
    this.setState({
      listaSetores: newUnidade.map(function (a) {
        return {
          id: a.id,
          sigla: a.setor,
          pai: a.hierarquia,
          delete: _this.handleDesativarUnidade,
          add: _this.handleOpenModal
        };
      })
    });
  }

  render() {
    let _this = this;

    let modalAdd;

    if (this.state.modalAddUnidade) {
      modalAdd = (
        <ModalAddUnidade
          modalName="addUnidade"
          show={true}
          close={this.handleCloseModal}
          params={this.state.modalAddUnidade}
          AttListUndd={this.handlAttUnidades}
          listaSetores={this.state.listaSetores}
        />
      );
    }

    return (
      <Container fluid className="setores">
        <HierarchyDraw
          data={this.state.listaSetores}
          el={Unidades}
          lineColor={"black"}
        />

        {modalAdd}
      </Container>
    );
  }
}
