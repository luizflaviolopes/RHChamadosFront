
import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import api from "../APIs/DataApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Vinculo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (

            <Badge variant="danger vinculos">{this.props.nome} <Badge variant="light" onClick={(evt) => { this.props.delete(this.props.id) }}><FontAwesomeIcon icon="times" /></Badge> </Badge>


        );
    }
}
