
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import { RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries, AreaSeries, VerticalBarSeries, DiscreteColorLegend } from "react-vis";
import 'react-vis/dist/style.css';
import { DashDate } from "./DashDate.js";
import { DashSituacao } from "./DashSituacao.js";

export class Legenda extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    render() {
        const ITEMS = [
            'Options',
            'Buttons',
            'Select boxes',
            'Date inputs',
            'Password inputs',
            'Forms',
            'Other'
        ];
        return (
            <div className="float-right">
                <DiscreteColorLegend height={300} width={300} items={this.props.legendas} />
            </div>

        );
    }
}