
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries, LineSeries } from "react-vis";
import 'react-vis/dist/style.css';
import { Legenda } from "./Legenda.js";

export class DashSituacao extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                    abertos: {
                        x: data.propriedade,
                        y: data.quantidade
                    }
                });
            });



        api("api/DashBoard/BuscarFechados", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    fechados: {
                        x: data.propriedade,
                        y: data.quantidade
                    }
                });
            });

        api("api/DashBoard/BuscarAtendimento", {
        })
            .then(
                response =>
                    response.json())
            .then(data => {
                this.setState({
                    atendimento: {
                        x: data.propriedade,
                        y: data.quantidade
                    }
                });
            });
    }

    render() {
        let RadilGraphic;


        if (this.state.fechados && this.state.abertos && this.state.atendimento) {
            const myData = [{ angle: this.state.fechados.y }, { angle: this.state.abertos.y }, { angle: this.state.atendimento.y }];
            RadilGraphic = (
                <RadialChart
                    //data={}
                    data={myData}
                    width={300}
                    height={300} />
            )
        }
        return (
            <div>
                {RadilGraphic}

            </div>


        );
    }
}