import React, { Component } from "react";
import { Redirect } from "react-router";
import "../css/bootstrap.css";

class Chamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      numChamado: props.numChamado,
      solicitante: props.solicitante,
      assunto: props.assunto,
      data: props.data,
      status: props.status,
      masp: props.masp,
      cpf: props.cpf,
      desc: props.desc,
      email: props.email,
      cel: props.cel,
      setor: props.setor,
      prioridade: props.prioridade,
      mc: props.mc,
      prazo: props.prazo,
      justificativa: props.justificativa,
      atendenteResponsavel: props.atendenteResponsavel
    };
    this.OnclickHande = this.OnclickHande.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      numChamado: nextProps.numChamado,
      solicitante: nextProps.solicitante,
      assunto: nextProps.assunto,
      data: nextProps.data,
      status: nextProps.status,
      masp: nextProps.masp,
      cpf: nextProps.cpf,
      desc: nextProps.desc,
      email: nextProps.email,
      cel: nextProps.cel,
      setor: nextProps.setor,
      prioridade: nextProps.prioridade,
      mc: nextProps.mc,
      prazo: nextProps.prazo,
      justificativa: nextProps.justificativa,
      atendenteResponsavel: nextProps.atendenteResponsavel
    });
  }
  OnclickHande() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{ pathname: "/DetalhamentoChamado", state: { ...this.state } }}
        />
      );
    }

    return (
      <tr onClick={this.OnclickHande} {...this.props.IsAutenticado == true ? ('className = "autenticado"') : null}>
        <td title={this.state.numChamado}>{this.state.numChamado}</td>
        <td title={this.state.solicitante}>{this.state.solicitante}</td>
        <td title={this.state.masp}>
          {this.state.masp !== null ? this.state.masp : this.state.cpf}
        </td>
        <td title={this.state.assunto}>{this.state.assunto}</td>
        <td title={this.state.data}>{this.state.data}</td>
        <td
          title={this.state.prioridade === null ? "N/A" : this.state.prioridade}
        >
          {this.state.prioridade === null ? "N/A" : this.state.prioridade}
        </td>
        <td
          title={
            this.state.setor === "SEPLAG"
              ? "RH: " + this.state.setor
              : this.state.setor
          }
        >
          {this.state.setor === "SEPLAG"
            ? "RH: " + this.state.setor
            : this.state.setor}
        </td>
        <td title={this.state.prazo !== null ? this.state.prazo : "1"}>
          {this.state.prazo !== null ? this.state.prazo : "1"}
        </td>
      </tr>
    );
  }
}

export default Chamado;
