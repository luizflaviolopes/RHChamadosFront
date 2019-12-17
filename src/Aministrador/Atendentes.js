import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";
import { ModalConfirmacao } from "../Confirmation/ModalConfirmacao";

export class Atendentes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.id,
      Masp: props.masp,
      Nome: props.nome,
      WinUser: props.winUser,
      Politicas: props.politicas,
      modalConfirmar: false
    };
    this.handleDesativarAtendente = this.handleDesativarAtendente.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(id) {
    this.setState({
      modalConfirmar: true,
      idSetorModal: id
    });
  }

  handleCloseModal() {
    this.setState({
      modalConfirmar: false
    });
  }

  handleDesativarAtendente(id) {
    api("api/Atendente/ExcluirAtendete?id=" + id, {
      method: "delete"
    })
      .then(resp => {
        if (resp.status == 200) return resp.json();
        else throw resp.json();
      })
      .then(data => {
        this.props.obj.att(data.setores);
        toast.success("Usuario Excluido");
        this.handleCloseModal();
      })
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
  }

  render() {
    const _this = this;
    let modalConfirmar;

    if (this.state.modalConfirmar) {
      modalConfirmar = (
        <ModalConfirmacao
          message="Deseja excluir o atendente?"
          show={true}
          close={_this.handleCloseModal}
          confirmar={() =>
            _this.handleDesativarAtendente(_this.state.idSetorModal)
          }
        />
      );
    }

    return (
      <div className="atendente" idSetor={this.props.id}>
        {modalConfirmar}
        <div className="headAtendente">
          <div className="ttl">{this.props.text}</div>
          <div
            className="addUser"
            onClick={() => this.props.obj.add(this.props.id)}
          >
            <FontAwesomeIcon icon="user-plus" />
          </div>
        </div>
        <div className="bodyAtendente">
          <Table>
            <tbody>
              {this.props.obj.atendentes.map(function(a, b) {
                return (
                  <tr>
                    <td className="nameUser">{a.nome}</td>

                    <td>
                      <Can politica={["Administrar Usuários"]}>
                        <Button
                          variant="warning"
                          onClick={() =>
                            _this.props.obj.edit(a, _this.props.id)
                          }
                          disabled={!a.ativo}
                        >
                          <FontAwesomeIcon icon="user-edit" color="white" />
                        </Button>
                      </Can>
                    </td>

                    <td>
                      <Can politica="Administrar Usuários">
                        {a.ativo === true ? (
                          <Button
                            variant="danger"
                            onClick={() => _this.handleOpenModal(a.id)}
                            //onClick={() => _this.handleDesativarAtendente(a.id)}
                          >
                            <FontAwesomeIcon icon="times" color="white" />
                          </Button>
                        ) : (
                          <Button variant="success">
                            <FontAwesomeIcon icon="check" color="white" />
                          </Button>
                        )}
                      </Can>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Atendentes;
