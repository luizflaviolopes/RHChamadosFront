import React from "react";
import ReactExport from "react-export-excel";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: this.props.dados
        };
    }
    render() {
        return (
            <ExcelFile element={<Button variant='success'>Download <FontAwesomeIcon icon="arrow-alt-circle-down" /></Button>}>
                <ExcelSheet data={this.state.dados} name="Chamados">
                    <ExcelColumn label="Protocolo" value="protocolo" />
                    <ExcelColumn label="Status" value="status" />
                    <ExcelColumn label="Nome" value="solicitante" />
                    <ExcelColumn label="Assunto" value="assunto" />
                    <ExcelColumn label="Telefone" value="cel" />
                    <ExcelColumn label="CPF" value="cpf" />
                    <ExcelColumn label="Data" value="data" />
                    <ExcelColumn label="Descrição" value="desc" />
                    <ExcelColumn label="Email" value="email" />
                    <ExcelColumn label="Justificativa" value="justificativa" />
                    <ExcelColumn label="Masp" value="masp" />
                    <ExcelColumn label="Prazo" value="prazo" />
                    <ExcelColumn label="Prioridade" value="prioridade" />
                    <ExcelColumn label="Setor" value="setor" />
                    <ExcelColumn label="Atendente Responsável" value="atendenteResponsavel" />
                    <ExcelColumn label="Chamado"
                        value={(col) => col.IsAutenticado ? "Autenticado" : ""} />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}