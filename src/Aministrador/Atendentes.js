import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";

export class Atendentes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: props.id,
      Masp: props.masp,
      Nome: props.nome,
      WinUser: props.winUser,
      Politicas: props.politicas
    };
    this.handleDesativarAtendente = this.handleDesativarAtendente.bind(this);
  }

  componentDidUpdate(a, b) {
    console.log(a);
  }

  handleDesativarAtendente(id) {
    api("http://localhost:5000/api/Atendente/ExcluirAtendente?id=" + id, {
      method: "delete"
    }).then();
  }

  render() {
    const _this = this;
    return (
      <div className="atendente" idSetor={this.props.id}>
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
                      <Can politica="Gerir Usuario">
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
                      <Can politica="Gerir Usuario">
                        {a.ativo === true ? (
                          <Button
                            variant="danger"
                            onClick={() => _this.handleDesativarAtendente(a.id)}
                          >
                            <FontAwesomeIcon icon="times" color="white" />
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => _this.handleDesativarAtendente(a.id)}
                          >
                            <FontAwesomeIcon icon="check" color="white" />
                          </Button>
                        )}
                      </Can>
                    </td>
                  </tr>

                  // <Row>
                  //   <Col sm="6" className="nameUser"> {a.nome}</Col>
                  //   <Col sm="3">
                  //     <Button
                  //       variant="warning"
                  //       //onClick={() => this.props.openShowModal("editUser", this.state)}
                  //       disabled={!a.ativo}
                  //     >
                  //       <FontAwesomeIcon icon="user-edit" color="white" />
                  //     </Button>
                  //   </Col>
                  //   <Col sm="3">
                  //     {a.ativo === true ? (
                  //       <Button
                  //         variant="danger"
                  //         onClick={() => this.handleDesativarAtendente(a.id)}
                  //       >
                  //         <FontAwesomeIcon icon="times" color="white" />
                  //       </Button>
                  //     ) : (
                  //         <Button
                  //           variant="success"
                  //           onClick={() => this.handleDesativarAtendente(a.id)}
                  //         >
                  //           <FontAwesomeIcon icon="check" color="white" />
                  //         </Button>)}
                  //   </Col>
                  // </Row>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      // <tr>
      //   <td>{this.state.Nome}</td>
      //   <td>{this.state.Masp}</td>
      //   <td>{this.state.WinUser}</td>
      //   <td>{this.state.Ativo === true ? ("Ativo") : ("Inativo")}</td>
      //   <td>{this.state.WinUser}</td>
      //   <td>
      //     <Button
      //       variant="outline-secondary"
      //       onClick={() => this.props.openShowModal("editUser", this.state)}
      //       disabled={!this.state.Ativo}
      //     >
      //       Editar
      //     </Button>
      //     <Link to="/User">
      //       {this.state.Ativo === true ? (<Button
      //         variant="outline-danger"
      //         onClick={() => this.handleDesativarAtendente(this.state.Id)}
      //       >
      //         Desativar
      //     </Button>) : (<Button
      //           variant="outline-success"
      //           onClick={() => this.handleDesativarAtendente(this.state.Id)}
      //         >
      //           Ativar
      //     </Button>)}

      //     </Link>
      //   </td>
      // </tr>
    );
  }
}

export default Atendentes;
