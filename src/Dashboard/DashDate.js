
import React, { Component, PureComponent } from "react";
import api from "../APIs/DataApi.js";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Legend, CartesianGrid } from "recharts";
import { Legenda } from "./Legenda.js";


export class DashDate extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            all: [],
            tipo: null,
            assuntos: [],
            crosValue: [],
            executar: true,
            DashDate: {}
        };
        this.analiseDosDados = this.analiseDosDados.bind(this);
        this.attdata = this.attdata.bind(this);
    }
    componentWillUpdate(netxdata) {
        console.log(netxdata)
        if (this.state.DashDate !== this.props.DashDate) {
            this.setState({
                DashDate: this.props.DashDate
            })
        }
    }
    componentDidMount() {



        // api("api/DashBoard/BuscarChamados", {
        // })
        //     .then(
        //         response =>
        //             response.json())
        //     .then(data => {
        //         this.setState({
        //             all: data.map(function (a) {
        //                 return {
        //                     x: a.propriedade,
        //                     y: a.quantidade
        //                 };
        //             })
        //         });
        //     });
        // api("api/DashBoard/BuscarChamadosAbertos", {
        // })
        //     .then(
        //         response =>
        //             response.json())
        //     .then(data => {
        //         this.setState({
        //             abertosData: data.map(function (a) {
        //                 return {
        //                     x: a.propriedade,
        //                     y: a.quantidade
        //                 };
        //             })
        //         });
        //     });
        // api("api/DashBoard/BuscarChamadosFechados", {
        // })
        //     .then(
        //         response =>
        //             response.json())
        //     .then(data => {
        //         this.setState({
        //             fechadosData: data.map(function (a) {
        //                 return {
        //                     x: a.propriedade,
        //                     y: a.quantidade
        //                 };
        //             })
        //         });
        //     });

        // api("api/DashBoard/BuscarChamadosAtendimento", {
        // })
        //     .then(
        //         response =>
        //             response.json())
        //     .then(data => {
        //         this.setState({
        //             atendimentoData: data.map(function (a) {
        //                 return {
        //                     x: a.propriedade,
        //                     y: a.quantidade
        //                 };
        //             })
        //         });
        //     });
    }
    attdata() {

        // this.setState({
        //     all: this.state.DashDate.all.map(function (a) {
        //         return {
        //             x: a.propriedade,
        //             y: a.quantidade
        //         };
        //     }),
        // })

    }
    analiseDosDados() {
        if (this.state.DashDate) {
            console.log(this.state.DashDate);
            this.setState({
                all: this.state.DashDate.all
                // .map(function (a) {
                //     return {
                //         x: a.propriedade,
                //         y: a.quantidade
                //     };
                // })
                ,
                atendimentoData: this.state.DashDate.atendimentoData
                // .map(function (a) {
                //     return {
                //         x: a.propriedade,
                //         y: a.quantidade
                //     };
                // })
                ,
                fechadosData: this.state.DashDate.fechadosData
                // .map(function (a) {
                //     return {
                //         x: a.propriedade,
                //         y: a.quantidade
                //     };
                // })
                ,
                abertosData: this.state.DashDate.abertosData
                // .map(function (a) {
                //     return {
                //         x: a.propriedade,
                //         y: a.quantidade
                //     };
                // }),

            })
        }



        let _this = this;
        let fechado;
        let abertos;
        let atendimento;
        let date;
        if (this.state.fechadosData && this.state.abertosData && this.state.atendimentoData) {
            var tempData = []
            this.state.all.forEach(function (a, i) {

                abertos = 0;
                fechado = 0;
                atendimento = 0;
                date = String(a.x);


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
                var temp = { "name": date, "fechado": fechado, "abertos": abertos, "atendimento": atendimento }
                tempData.push(temp)
            })
            _this.setState({ crosValue: tempData, executar: false });



        }

    }


    render() {

        const data = this.state.crosValue;


        if (this.state.executar) {
            this.analiseDosDados();
        }
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
                        <Bar dataKey="fechado" fill="#011C40"></Bar>
                        <Bar dataKey="abertos" fill="#A60303"></Bar>
                        <Bar dataKey="atendimento" fill="#F27B13"></Bar>

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