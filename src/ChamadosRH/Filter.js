import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import api from "../APIs/DataApi";
import InputMask from "react-input-mask";
import { FilterCall } from "./FilterCall";
import { toast } from "react-toastify";
import { Download } from "./ExportExcel";

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      listaAssunto: [],
      listFilter: [],
      listaSetor: []
    };
  }
  componentDidMount() {
    api("api/assuntocompleto", {})
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          listaAssunto: data
        })
      );
    api("api/setores", {})
      .then(data => data.json())
      .then(data =>
        this.setState({
          listaSetor: data
        })
      );
  }

  handleFiltroChamado = () => {
    api("api/filter", {
      method: "post",
      headers: { "Content-Type": "application/json;" },
      body: JSON.stringify(this.state.filter)
    })
      .then(resp => {
        if (resp.status == 200) return resp.json();
        else throw resp.json();
      })
      .then(data => {

        data.filter(a => { return !a.protocolo }).forEach(b => { b.protocolo = 'A' + b.numChamado })
        this.setState({
          listFilter: data
        });
      })
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
  };
  render() {
    let Excel;
    if (this.state.listFilter.length !== 0)
      Excel = (<Download dados={this.state.listFilter} />);

    return (
      <div className="">
        <div className="zebraB filter">
          <Form
            onSubmit={evt => {
              evt.preventDefault();
              this.handleFiltroChamado();
            }}
          >
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          Nome: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>CPF</Form.Label>
                  <InputMask
                    mask="999.999.999-99"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          CPF: evt.target.value
                        }
                      })
                    }
                  >
                    {inputprop => <Form.Control type="text" />}
                  </InputMask>
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group>
                  <Form.Label>Masp</Form.Label>
                  <InputMask
                    mask="9999999-9"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          Masp: evt.target.value
                        }
                      })
                    }
                  >
                    {inputprop => <Form.Control type="text" />}
                  </InputMask>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          Email: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          Setor: evt.target.value
                        }
                      })
                    }
                  >
                    <option>Selecione um Setor</option>
                    {this.state.listaSetor.map(function (a, i) {
                      return <option value={a.id}>{a.setor}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Nª Chamado</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          NumChamado: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <Form.Group>
                  <Form.Label>Protocolo</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          Protocolo: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm="8">
                <Form.Group>
                  <Form.Label>Assunto</Form.Label>
                  <Typeahead
                    onChange={evt => {
                      if (evt.length !== 0) {
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            AssuntoId: evt[0].id
                          }
                        });
                      }
                    }}
                    options={this.state.listaAssunto}
                    labelKey={option => `${option.assunto}`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Form.Group>
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="month"
                    onChange={evt =>
                      this.setState({
                        filter: {
                          ...this.state.filter,
                          data: evt.target.value
                        }
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Button variant="primary" type="submit">
                Filtrar
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className="zebraA filter">
          {Excel}
          <FilterCall listFilter={this.state.listFilter} />
        </div>
      </div>
    );
  }
}
