import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Container } from "react-bootstrap";
import { Unidades } from "./Unidades";
import { ModalAddUnidade } from "./ModalAddUnidade";
import { HierarchyDraw } from "../Hierarchy/HierarchyDraw";
import api from "../APIs/DataApi";
import { ModalVinculoUni } from "./ModalVinculoUni";
import { toast } from "react-toastify";

export class Setores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaSetores: [],
      modalAddUnidade: null,
      modalVinculoUni: false,
      setor: null
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlAttUnidades = this.handlAttUnidades.bind(this);
    this.handleOpenModalVinculo = this.handleOpenModalVinculo.bind(this);
  }

  componentDidMount() {
    let _this = this;
    api("api/Setores", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          listaSetores: data.map(function (a, i) {
            if (i == 0) {
              return {
                id: a.id,
                sigla: a.setor,
                pai: null,
                delete: _this.handleDesativarUnidade,
                add: _this.handleOpenModal,
                vinculo: _this.handleOpenModalVinculo,
                SetoresVinculados: a.relacaoSetorSetor
              };
            }
            else {
              return {

                id: a.id,
                sigla: a.setor,
                pai: a.hierarquia,
                delete: _this.handleDesativarUnidade,
                add: _this.handleOpenModal,
                vinculo: _this.handleOpenModalVinculo,
                SetoresVinculados: a.relacaoSetorSetor

              };
            }

          })
        })
      );
  }

  handleDesativarUnidade = id => {
    let _this = this;
    api("api/Setores?Id=" + id, {
      method: "delete"
    })
      .then(resp => {
        if (resp.status == 200)
          return resp.json()
        else
          throw resp.json();
      })
      .then(
        data =>
          this.setState({
            listaSetores: data.map(function (a) {
              return {
                id: a.id,
                sigla: a.setor,
                pai: a.hierarquia,
                delete: _this.handleDesativarUnidade,
                add: _this.handleOpenModal,
                vinculo: _this.handleOpenModalVinculo,
                SetoresVinculados: a.relacaoSetorSetor
              };
            })
          }),
        toast.success(
          "Setor Excluido"
        ),
        this.handleCloseModal()
      )
      .catch(
        a => a.then(e =>
          toast.error(
            e.message,
            {
              position: toast.POSITION.TOP_CENTER
            }
          )
        )
      );
  };

  handleOpenModal(obj) {
    this.setState({ modalAddUnidade: obj });
  }

  handleOpenModalVinculo(idSetor) {

    this.setState({
      setor: idSetor,
      modalVinculoUni: true
    });
  }

  handleCloseModal() {
    this.setState({
      modalAddUnidade: null,
      modalVinculoUni: false
    });
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
          add: _this.handleOpenModal,
          vinculo: _this.handleOpenModalVinculo,
          SetoresVinculados: a.relacaoSetorSetor
        };
      })
    });
  }

  render() {
    let modalAdd;
    let modalVinculo;

    if (this.state.modalVinculoUni) {
      modalVinculo = (
        <ModalVinculoUni
          modalName="VinculoUnidade"
          show={true}
          close={this.handleCloseModal}
          AttListUndd={this.handlAttUnidades}
          listaSetores={this.state.listaSetores}
          setor={this.state.setor}
        />
      );
    }

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
        {modalVinculo}
        {modalAdd}
      </Container>
    );
  }
}
