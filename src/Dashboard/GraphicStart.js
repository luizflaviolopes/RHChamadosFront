
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries, AreaSeries, VerticalBarSeries } from "react-vis";
import 'react-vis/dist/style.css';
import { DashDate } from "./DashDate.js";
import { DashSituacao } from "./DashSituacao.js";

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
        api("api/DashBoard/BuscarAssuntos", {
        })
            .then(
                response =>
                    response.json())
            .then(
                data =>
                    this.setState({
                        assuntos: data.map(function (a) {
                            return {
                                x: a.propriedade,
                                y: a.quantidade
                            };
                        })
                    })


            );
    }
    analiseDosDados() {

    }
    render() {

        return (

            <div>
                <DashDate />
                <DashSituacao />



            </div>


        );
    }
}
