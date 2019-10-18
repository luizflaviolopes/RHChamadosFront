
import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import 'react-vis/dist/style.css';
import { DashDate } from "./DashDate.js";
import { DashSituacao } from "./DashSituacao.js";
import { DashAssunto } from "./DashAssunto.js";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
    }

    render() {

        return (

            <div>

                <div className>
                    <DashDate />
                </div>
                <div>
                    <DashSituacao />
                </div>
                <div>
                    <DashAssunto />
                </div>





            </div>


        );
    }
}
