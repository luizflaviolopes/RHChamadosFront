
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries, LineSeries, DiscreteColorLegend, DecorativeAxis, LabelSeries } from "react-vis";
import 'react-vis/dist/style.css';
import { Legenda } from "./Legenda.js";

export class DashDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            tipo: null,
            assuntos: []
        };
    }

    componentDidMount() {
        api("api/DashBoard/BuscarChamados", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    all: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });
        api("api/DashBoard/BuscarChamadosAbertos", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    abertosData: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });
        api("api/DashBoard/BuscarChamadosFechados", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    fechadosData: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });
        api("api/DashBoard/BuscarChamadosAtendimento", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    atendimentoData: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });

    }
    analiseDosDados() {

    }
    render() {
        const legendas = ['Total de Chamados', 'Chamados Fechados', 'Chamados Abertos', 'Chamados Em Atendimento'];
        const _this = this;

        //[{ x: _this.state.fechadosData.x, y: _this.state.fechadosData.y, label: _this.state.fechadosData.y, style: { fontSize: 10 } }]
        return (

            <div>
                <Legenda legendas={legendas} />
                <XYPlot margin={{ bottom: 100 }} xType="ordinal" width={1000} height={400}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis />

                    <VerticalBarSeries data={this.state.all} />
                    {/* <MarkSeries data={this.state.all} />
                    */}


                    <VerticalBarSeries
                        curve={'curveMonotoneX'}
                        data={this.state.fechadosData}
                    />
                    <VerticalBarSeries
                        curve={'curveMonotoneX'}
                        data={this.state.abertosData}
                    />
                    <VerticalBarSeries
                        curve={'curveMonotoneX'}
                        data={this.state.atendimentoData}
                    />


                </XYPlot>

            </div>


        );
    }
}