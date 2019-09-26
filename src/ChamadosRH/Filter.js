import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/FormControl";

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm="6">
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group>
                            <Form.Label>Masp</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group>
                            <Form.Label>Assunto</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group>
                            <Form.Label>Nª Chamado</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}