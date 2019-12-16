import React, { Component } from "react";
import api from "../APIs/DataApi.js";
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Legend,
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from "recharts";

export class DashSituacao extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillUpdate(nextdata) {
        if (nextdata !== this.props) {
            this.TratamentoDados(nextdata.DashSituacao);
        }
    }
    TratamentoDados = (data) => {
        this.setState({
            fechados: data.fechados,
            abertos: data.abertos,
            atendimento: data.emAtendimento
        })
    }

    render() {
        let RadilGraphic;
        const COLORS = [
            "#011C40",
            "#A60303",
            "#F27B13",

        ];
        let myData;
        let all;
        let grafic;

        if (this.state.fechados && this.state.abertos && this.state.atendimento) {
            myData = [{ quantidade: this.state.fechados.quantidade, name: this.state.fechados.propriedade, }, { quantidade: this.state.abertos.quantidade, name: this.state.abertos.propriedade }, { quantidade: this.state.atendimento.quantidade, name: this.state.atendimento.propriedade }];
            all = [{ quantidade: this.state.fechados.quantidade + this.state.abertos.quantidade + this.state.atendimento.quantidade, name: "Total" }];
            grafic = (
                <PieChart
                    width={window.innerWidth - 90}
                    height={550}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <Pie
                        data={myData}
                        dataKey="quantidade"
                        nameKey="name"
                        innerRadius={190}
                        fill="#841E19"
                        cy="50%"
                        label
                        startAngle={180}
                        endAngle={0}
                        outerRadius={230}
                        paddingAngle={1}
                    >
                        {myData.map((entry, index) => (
                            <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Pie data={all}
                        dataKey="quantidade"
                        nameKey="name"
                        fill="#841E19"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        outerRadius={180}
                    />
                    />
                    <Tooltip />
                </PieChart>
            )
        }

        return (
            <div className="zebraA">
                <div className="text-center">
                    <span className='ttl'>Quantidade de Chamados Por Situação</span>
                </div>
                <div>
                    {grafic}
                </div>
            </div>


        );
    }
}