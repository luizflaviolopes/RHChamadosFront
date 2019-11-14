
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

    render() {

        return (

            <div className="dashboard">

                <div className="">
                    <DashDate />
                </div>

                <div className="">
                    <DashSituacao />
                </div>
                <div className="">
                    <DashAssunto />
                </div>





            </div>


        );
    }
}
