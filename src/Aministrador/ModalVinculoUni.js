
import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../APIs/DataApi";

export class ModalVinculoUni extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }



    render() {
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
