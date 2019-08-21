
import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../APIs/DataApi";
import { Vinculo } from "./Vinculo";

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
        api("api/Setores", {})
            .then(Response => Response.json())
            .then(data =>
                this.setState({
                    setores: data
                })
            )
    }
    AddVinculo = setor => {
        let setorV = this.state.setores.find((xs) => { return xs.id == setor });


        this.setState({
            ListSetorVinculo: this.state.ListSetorVinculo.concat(setorV)
        })
        console.log(this.state.ListSetorVinculo)
    }

    deletarVinculo = setor => {

        //indexOF não esta funcionando
        let t = this.state.setores.find((xs) => { return xs.id == setor })
        let setorV = this.state.ListSetorVinculo.indexOf(t);

        let newlist = [...this.state.ListSetorVinculo];

        newlist.splice(setorV, 1);


        this.setState({
            ListSetorVinculo: newlist
        })
    }

    render() {
        let _this = this
        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.close()}>
                <Modal.Header closeButton>
                    <Modal.Title id="newUnidade"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={event => {
                            event.preventDefault();

                        }}
                    >
                        <Form.Group>
                            <Form.Label>Setor </Form.Label>
                            <Form.Control
                                onChange={evt => {

                                    this.AddVinculo(evt.target.value)
                                }
                                }
                                as="select">
                                <option>Escolha um Setor</option>
                                {this.state.setores.map(function (a) {
                                    return (
                                        <option value={a.id} name={a.setor}>{a.setor}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            {this.state.ListSetorVinculo.map(function (a) {
                                return (
                                    <Vinculo id={a.id} nome={a.setor} delete={_this.deletarVinculo} />
                                )
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
