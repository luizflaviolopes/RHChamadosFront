import React, { Component } from "react";
import { DiscreteColorLegend } from "react-vis";
import 'react-vis/dist/style.css';

export class Legenda extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (
            <div className="float-right">
                <DiscreteColorLegend height={300} width={300} items={this.props.legendas} />
            </div>

        );
    }
}