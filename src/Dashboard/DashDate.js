import React, { Component, PureComponent } from "react";
import api from "../APIs/DataApi.js";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend, CartesianGrid, LabelList } from "recharts";
import { Legenda } from "./Legenda.js";

export class DashDate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tipo: null,
            assuntos: [],
            crosValue: [],
            executar: true,
        };
    }
    componentWillUpdate(nextdata) {
        if (nextdata !== this.props) {
            this.TratamentoDados(nextdata.DashDate)
        }
    }
    TratamentoDados = (incomingData) => {
        this.setState({
            all: incomingData.all
                .map(function (a) {
                    return {
                        x: a.propriedade,
                        y: a.quantidade
                    };
                })
            ,
            atendimentoData: incomingData.atendimentosData
                .map(function (a) {
                    return {
                        x: a.propriedade,
                        y: a.quantidade
                    };
                })
            ,
            fechadosData: incomingData.fechadosData
                .map(function (a) {
                    return {
                        x: a.propriedade,
                        y: a.quantidade
                    };
                })
            ,
            abertosData: incomingData.abertosData
                .map(function (a) {
                    return {
                        x: a.propriedade,
                        y: a.quantidade
                    };
                }),
        })
    }

    RetornarDados = () => {
        let _this = this;
        let fechado;
        let abertos;
        let atendimento;
        let date;
        if (this.state.fechadosData && this.state.abertosData && this.state.atendimentoData) {
            var tempData = []
            this.state.all.forEach(function (a, i) {
                console.log(a)
                abertos = 0;
                fechado = 0;
                atendimento = 0;
                date = new Date(a.x);

                _this.state.fechadosData.find(function (e, j) {
                    if (e.x === a.x) {
                        fechado = e.y
                    }
                })

                _this.state.abertosData.find(function (e, j) {
                    if (e.x === a.x) {
                        abertos = e.y
                    }
                })

                _this.state.atendimentoData.find(function (e, j) {
                    if (e.x === a.x) {
                        atendimento = e.y
                    }
                })
                var temp = { "name": (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()), "fechado": fechado, "abertos": abertos, "atendimento": atendimento, data: date }
                tempData.push(temp)
            })
            tempData.sort((e1, e2) => {
                return e1.data > e2.data ? 1 : -1
            })
            return tempData;
        }
    }

    render() {

        if (!this.state.all) {
            return <div></div>;
        }

        const data = this.RetornarDados()

        //[{ x: _this.state.fechadosData.x, y: _this.state.fechadosData.y, label: _this.state.fechadosData.y, style: { fontSize: 10 } }]
        return (

            <div className="zebraB">
                <div className="text-center">
                    <span className='ttl'>Quantidade de Chamados por Data</span>
                </div>
                <div>
                    <BarChart width={window.innerWidth - 60} height={550} data={data} margin={{
                        top: 20, right: 30, left: 10, bottom: 10,
                    }}>

                        <XAxis dataKey="name" height={50} angle={-90} interval={0} dx={20} tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />

                        <Legend verticalAlign="top" />
                        <Bar dataKey="fechado" fill="#011C40"> <LabelList dataKey="fechado" position="top" /></Bar>
                        <Bar dataKey="abertos" fill="#A60303"><LabelList dataKey="abertos" position="top" /></Bar>
                        <Bar dataKey="atendimento" fill="#F27B13"><LabelList dataKey="atendimento" position="top" /></Bar>

                    </BarChart>
                </div>
            </div >


        );
    }
}

class CustomizedAxisTick extends PureComponent {
    render() {
        const {
            x, y, stroke, payload,
        } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={12} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
            </g>
        );
    }
}