import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/Setores.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import { Can } from "../APIs/Can";
import { ModalVinculoUni } from "./ModalVinculoUni";

export class Unidades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaSetores: []
    };
  }

  componentDidMount() {
    api("api/Setores", {})
      .then(response => response.json())
      .then(data => this.setState({ listaSetores: data.setores }));
  }

  handleDesativarUnidade = () => {
    this.props.obj.delete(this.props.id);
  };

  render() {
    return (
      <div className="unidades" idSetor={this.props.id}>
        <div className="headUni">
          <span className="ttl">{this.props.text}</span>
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
          <Can politica="Gerir Setor">
            <div>
              <Button
                variant="success"
                size="sm"
                onClick={() => this.props.obj.add(this.props.obj)}
              >
                <FontAwesomeIcon icon="plus-circle" />
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={this.handleDesativarUnidade}
              >
                <FontAwesomeIcon icon="minus-circle" />
              </Button>
            </div>
          </Can>
          <Can politica="Visualizar Hierarquia">
            <div className="vinculos">
              {this.props.obj.SetoresVinculados.map(function (a) {
                return <div className="setVin">{a.setorDestino}</div>;
              })}
            </div>
          </Can>
        </div>
      </div>
    );
  }
}
