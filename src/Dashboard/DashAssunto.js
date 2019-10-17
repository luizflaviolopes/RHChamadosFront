
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import 'react-vis/dist/style.css';
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries, LineSeries, DiscreteColorLegend, DecorativeAxis, LabelSeries } from "react-vis";
import verticalGridLines from "react-vis/dist/plot/vertical-grid-lines";


export class DashAssunto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assuntos: []
        };
    }

    componentDidMount() {

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

    render() {

        return (
            <div>
                <div className="text-center">
                    <span className='ttl'>Quantidade de Chamados por Assunto</span>
                </div>
                <div>
                    <XYPlot margin={{ bottom: 300 }} xType="ordinal" width={900} height={700}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis tickLabelAngle={-45} />
                        <YAxis />

                        <VerticalBarSeries
                            curve={'curveMonotoneX'}
                            data={this.state.assuntos}
                        />
                    </XYPlot>

                </div>
            </div>

        );
    }
}
