
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries, LineSeries } from "react-vis";
import 'react-vis/dist/style.css';
import { Legenda } from "./Legenda.js";

export class DashSituacao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            tipo: null,
            assuntos: []
        };
    }

    componentDidMount() {
        api("api/DashBoard/BuscarAbertos", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    abertos: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });



        api("api/DashBoard/BuscarFechados", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    fechados: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });

        api("api/DashBoard/BuscarAtendimento", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    atendimento: data.map(function (a) {
                        return {
                            x: a.propriedade,
                            y: a.quantidade
                        };
                    })
                });
            });




    }

    render() {
        const legendas = [
            'Options',
            'Buttons',
            'Select boxes',
            'Date inputs',
            'Password inputs',
            'Forms',
            'Other'
        ];
        return (

            <div>
                <Legenda legendas={legendas} />
                <XYPlot margin={{ bottom: 100 }} xType="ordinal" width={1000} height={400}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickLabelAngle={-45} />
                    <YAxis />


                    <VerticalBarSeries
                        data={this.state.fechados}
                    />

                    <VerticalBarSeries
                        data={this.state.abertos}
                    />

                    <VerticalBarSeries
                        data={this.state.atendimento}
                    />
                </XYPlot>

            </div>


        );
    }
}