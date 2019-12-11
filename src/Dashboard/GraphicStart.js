
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { DashDate } from "./DashDate.js";
import { DashSituacao } from "./DashSituacao.js";
import { DashAssunto } from "./DashAssunto.jsx";
import "../css/DashBoard.css";

export class GraphicStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            tipo: null,
            assuntos: []
        };
    }
    componentDidMount() {
        api("api/DashBoard/GetDashData", {})
            .then(response => response.json())
            .then(data =>
                this.setState({
                    data: data,
                    DashAssunto: {
                        assuntos: data.assuntos,
                        assuntosMacros: data.assuntosMacros
                    },
                    DashSituacao: {
                        abertos: data.abertos,
                        fechados: data.fechados,
                        emAtendimento: data.emAtendimento
                    },
                    DashDate: {
                        abertosData: data.chamadosDataAbertos,
                        fechadosData: data.chamadosDataAbertos,
                        atendimentosData: data.chamadosDataAbertos,
                        all: data.chamadosPorData
                    }
                })

            );
    }

    render() {

        return (

            <div className="dashboard">

                <div className="">
                    <DashDate DashDate={this.state.DashDate} />
                </div>

                <div className="">
                    <DashSituacao DashSituacao={this.state.DashSituacao} />
                </div>
                <div className="">
                    <DashAssunto DashAssunto={this.state.DashAssunto} />
                </div>





            </div>


        );
    }
}
