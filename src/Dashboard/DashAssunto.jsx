import React, { Component, PureComponent } from "react";
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

export class DashAssunto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assuntos: [],
      crosshairValues: []
    };
  }

  componentDidMount() {
    api("api/DashBoard/BuscarAssuntos", {})
      .then(response => response.json())
      .then(data =>
        this.setState({
          assuntos: data.map(function(a) {
            return {
              x: a.propriedade,
              quantidade: a.quantidade
            };
          })
        })
      );
  }

  render() {
    let data = this.state.assuntos;
    const COLORS = [
      "#450003",
      "#5C0002",
      "#94090D",
      "#D40D12",
      "#093A40",
      "#8C583A",
      "#8C0303",
      "#8C0303",
      "#730202",
      "#400101",
      "#14328C",
      "#0B2559",
      "#88A5BF",
      "#88A5BF",
      "#F2B705",
      "#D94B18"
    ];
    return (
      <div className="zebraB">
        <div className="text-center">
          <span className="ttl">Quantidade de Chamados por Assunto</span>
        </div>
        <div>
          <PieChart
            width={window.innerWidth - 50}
            height={550}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <Pie
              data={data}
              dataKey="quantidade"
              nameKey="x"
              innerRadius={150}
              fill="#8884d8"
              cy="50%"
              label
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <BarChart width={window.innerWidth - 90} height={650} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              angle={-65}
              interval={0}
              dx={25}
              height={290}
              tick={<CustomizedAxisTick />}
            />
            <YAxis />
            <Tooltip />

            <Legend verticalAlign="top" />
            <Bar dataKey="quantidade" fill="#011C40"></Bar>
          </BarChart>
        </div>
      </div>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={300}
          y={20}
          dy={0}
          dx={-300}
          textAnchor="end"
          fill="#666"
          transform="rotate(-55)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
