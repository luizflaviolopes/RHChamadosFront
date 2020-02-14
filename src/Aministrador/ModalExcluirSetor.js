import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import api from "../APIs/DataApi";

export default class ModalExcluirSetor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listSetores: [],
            show: props.show

        }
    }
    componentDidMount() {
        api("api/Setores", {})
            .then(response => response.json())
            .then(data =>
                this.setState({
                    listSetores: data.map(function (a, i) {
                        return {
                            id: a.id,
                            setor: a.setor
                        };
                    })
                })
            );
    }

    render() {
        return (
            <Modal
                size="lg"
                show={this.state.show}
                onHide={() => this.props.close(this.state.modalName)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Deseja excluir esse setor?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Para qual setor os chamados serão Tramitados? </Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.idSetor}
                            onChange={evt =>
                                this.setState({
                                    idSetor: evt.target.value
                                })
                            }
                        >
                            <option>Selecione um Setor</option>
                            {this.state.listSetores.map(function (a, i) {
                                return <option value={a.id}>{a.setor}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="danger">Cancelar</Button>
                        <Button
                            onClick={() =>
                                this.props.confirmar(+this.state.idSetor)}
                            variant="success">
                            Confirmar
            </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}
