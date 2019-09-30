import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import api from "../APIs/DataApi";
import InputMask from "react-input-mask";
import { FilterCall } from "./FilterCall";

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
        api("api/assunto", {})
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    listaAssunto: data
                })
            );
        api("api/setores", {})
            .then(data => data.json())
            .then(data => this.setState({
                listaSetor: data
            }))
    }

    handleFiltroChamado = () => {
        api("api/filter",
            {
                method: "post",
                headers: { "Content-Type": "application/json;" },
                body: JSON.stringify(this.state.filter)
            }).then(a => a.json())
            .then(data => this.setState({
                listFilter: data
            }));
    }
    render() {
        return (
            <div>
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
                                } />
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
                                {inputprop => (
                                    <Form.Control
                                        type="text"
                                    />
                                )}
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
                                {inputprop => (
                                    <Form.Control
                                        type="text"
                                    />
                                )}
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
                                as='select'
                            >
                                <option>Selecione um Setor</option>
                                {this.state.listaSetor.map(function (a, i) {
                                    return <option value={a.id}>{a.setor}</option>
                                }
                                )}
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
                                } />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <Form.Group>
                            <Form.Label>Assunto</Form.Label>
                            <Typeahead
                                onChange={(evt) => {
                                    if (evt.length !== 0) {
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                Assunto: evt[0].id
                                            }
                                        })
                                    }
                                }
                                }
                                options={this.state.listaAssunto}
                                labelKey={option => `${option.assunto}`}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Button variant="primary" onClick={this.handleFiltroChamado}>
                        Filtrar
                    </Button>
                </Form.Group>

                <div>
                    <FilterCall listFilter={this.state.listFilter} />
                </div>
            </div>
        )
    }
}