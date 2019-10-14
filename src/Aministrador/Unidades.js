import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/Setores.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";
import { ModalConfirmacao } from "../Confirmation/ModalConfirmacao";

export class Unidades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaSetores: [],
      modalConfirmar: false
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  /*componentDidMount() {
    api("api/Setores", {})
      .then(response => response.json())
      .then(data => this.setState({ listaSetores: data.setores }));
  }*/

  handleDesativarUnidade = () => {
    this.props.obj.delete(this.props.id);
  };

  handleOpenModal() {
    this.setState({
      modalConfirmar: true
    });
  }

  handleCloseModal() {
    this.setState({
      modalConfirmar: false
    });
  }

  render() {
    let modalConfirmar;

    if (this.state.modalConfirmar) {
      modalConfirmar = (
        <ModalConfirmacao
          message="Deseja excluir o setor?"
          show={true}
          close={this.handleCloseModal}
          confirmar={this.handleDesativarUnidade}
        />
      );
    }

    return (
      <div className="unidades" idSetor={this.props.id}>
        {modalConfirmar}
        <div className="headUni">
          <span className="ttl"> {this.props.text} </span>
          <Can politica="Gerir Setor">
            <span
              className="vinculo"
              onClick={() => this.props.obj.vinculo(this.props.id)}
              title="Vincular Unidade"
            >
              <FontAwesomeIcon icon="exchange-alt" />
            </span>
          </Can>
        </div>
        <div className="bodyUni">
          <div>
            <Button
              variant="success"
              size="sm"
              onClick={() => this.props.obj.add(this.props.obj)}
            >
              <FontAwesomeIcon icon="plus-circle" />
            </Button>
            <Button variant="danger" size="sm" onClick={this.handleOpenModal}>
              <FontAwesomeIcon icon="minus-circle" />
            </Button>
          </div>
          <div className="vinculos">
            {this.props.obj.SetoresVinculados.map(function (a) {
              return <div className="setVin"> {a.setorDestino} </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
