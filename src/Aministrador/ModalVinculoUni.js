import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import { Vinculo } from "./Vinculo";
import { toast } from "react-toastify";
import { error } from "util";

export class ModalVinculoUni extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setores: [],
      ListSetorVinculo: []
    };
    this.deletarVinculo = this.deletarVinculo.bind(this);
  }
  componentDidMount() {
    api("api/Setores/NoChildren?Id=" + this.props.setor, {})
      .then(response => response.json())
      .then(data => this.setState({ setores: data }));

    api("api/Setores", {})
      .then(Response => Response.json())
      .then(data => {
        let setorV = data.find(xs => {
          return xs.id == this.props.setor;
        });
        this.setState({
          ListSetorVinculo: setorV.relacaoSetorSetor
        });
      });
  }

  AddVinculo = setor => {
    let setorV = this.state.setores.find(xs => {
      return xs.id == setor;
    });

    let newSetorV = { id: setorV.id, setorDestino: setorV.setor };

    this.setState({
      ListSetorVinculo: this.state.ListSetorVinculo.concat(newSetorV)
    });
  };

  deletarVinculo = setor => {
    //indexOF não esta funcionando
    let t = this.state.ListSetorVinculo.find(xs => {
      return xs.id == setor;
    });
    let setorV = this.state.ListSetorVinculo.indexOf(t);

    let newlist = [...this.state.ListSetorVinculo];

    newlist.splice(setorV, 1);

    this.setState({
      ListSetorVinculo: newlist
    });
  };

  enviar = evt => {
    evt.preventDefault();
    let _this = this;
    let list;

    if (this.state.ListSetorVinculo.length !== 0) {
      list = this.state.ListSetorVinculo.map(a => {
        return { Destino: a.id, Origem: _this.props.setor };
      });
    } else {
      list = [{ Destino: 0, Origem: _this.props.setor }];
    }

    api("api/Setores/NovaRelacao", {
      method: "post",
      body: JSON.stringify(list),
      headers: { "Content-Type": "application/json;" }
    })
      .then(resp => {
        if (resp.status == 200) {
          return resp.json();
        } else {
          throw resp;
        }
      })
      .then(data => {
        this.props.AttListUndd(data);
        toast.success("As alterações foram salvas.");
        this.props.close();
      })
      .catch(a => {
        toast.error(
          "Não foi possivel realizar esta operação. Por Favor Tente novamente!"
        );
      });
  };

  render() {
    let _this = this;
    return (
      <Modal size="lg" show={this.props.show} onHide={() => this.props.close()}>
        <Modal.Header closeButton>
          <Modal.Title id="newUnidade">Vincular Setores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              this.enviar(event);
            }}
          >
            <Form.Group>
              <Form.Label>Setor </Form.Label>
              <Form.Control
                onChange={evt => {
                  this.AddVinculo(evt.target.value);
                }}
                as="select"
              >
                <option>Escolha um Setor</option>
                {this.state.setores.map(function(a) {
                  return (
                    <option value={a.id} name={a.setor}>
                      {a.setor}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {this.state.ListSetorVinculo.map(function(a) {
                return (
                  <Vinculo
                    id={a.id}
                    nome={a.setorDestino}
                    delete={_this.deletarVinculo}
                  />
                );
              })}
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
