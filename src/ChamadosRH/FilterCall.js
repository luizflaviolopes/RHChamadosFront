import React, { Component } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Chamado from "./Chamado";

export class FilterCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            listFilter: props.listFilter
        };

    }
    componentDidUpdate(newProps) {
        if (this.props.listFilter !== this.state.listFilter)
            this.setState({ listFilter: this.props.listFilter });
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <th>
                            <FontAwesomeIcon icon="list-ol" />Nº
                        </th>
                        <th>
                            <FontAwesomeIcon icon="user" />Solicitante
                        </th>
                        <th>
                            <FontAwesomeIcon icon="hashtag" />MASP/CPF
                        </th>
                        <th>
                            <FontAwesomeIcon icon="comment-dots" />Assunto
                        </th>
                        <th>
                            <FontAwesomeIcon icon="calendar-day" />Abertura
                        </th>
                        <th>
                            <FontAwesomeIcon icon="" />Prioridade
                        </th>
                        <th>
                            <FontAwesomeIcon icon="building" />Setor
                        </th>
                        <th>
                            <FontAwesomeIcon icon="Calendar-day" />Prazo
                        </th>

                    </thead>
                    <tbody>
                        {this.state.listFilter.map((a, i) => {
                            return (
                                <Chamado
                                    numChamado={a.numChamado}
                                    solicitante={a.solicitante}
                                    assunto={a.assunto}
                                    data={a.data}
                                    status={a.status}
                                    prioridade={a.prioridade}
                                    masp={a.masp}
                                    cpf={a.cpf}
                                    desc={a.desc}
                                    email={a.email}
                                    cel={a.cel}
                                    setor={a.setor}
                                    prazo={a.prazo}
                                    //anexoFile={_this.handleFile}
                                    justificativa={a.justificativa}
                                    IsAutenticado={a.IsAutenticado}
                                    atendenteResponsavel={a.atendenteResponsavel}
                                />
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}