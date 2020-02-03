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
      atendenteResponsavel: props.atendenteResponsavel,
      protocolo: props.protocolo,
      alterAssunto: props.alterAssunto,
      IsAutenticado: props.IsAutenticado,
      setorAbertura: props.setorAbertura,
      tag: props.tag,
      isReturn: props.isReturn
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
      atendenteResponsavel: nextProps.atendenteResponsavel,
      protocolo: nextProps.protocolo,
      alterAssunto: nextProps.alterAssunto,
      IsAutenticado: nextProps.IsAutenticado,
      setorAbertura: nextProps.setorAbertura,
      tag: nextProps.tag,
      isReturn: nextProps.isReturn
    });
  }
  OnclickHande() {
    this.setState({ redirect: true });
  }

  render() {
    let numtag = {
      numChamado: this.state.numChamado,
      tag: this.state.tag
    };

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/DetalhamentoChamado",
            state: numtag
          }}
        />
      );
    }

    const handleColor = () => {
      let classColor = null;

      if (this.state.IsAutenticado === "true")
        classColor = "autenticado"

      else if (this.state.isReturn === "true")
        classColor = "isReturn"

      return classColor;

    }

    return (
      <tr
        onClick={this.OnclickHande}
        className={handleColor()}
        style={{ cursor: "pointer" }}
      >
        {/* Coluna de numero de chamado gerado pelo RHChamados
        
        <td title={this.state.numChamado}>{this.state.numChamado}</td> */}

        <td title={this.state.protocolo}>{this.state.protocolo}</td>
        <td title={this.state.solicitante}>{this.state.solicitante}</td>
        <td title={this.state.cpf}>
          {this.state.cpf !== null ? this.state.cpf : this.state.masp}
        </td>
        <td title={this.state.assunto}>{this.state.assunto}</td>
        <td title={this.state.data}>{this.state.data}</td>
        <td
          title={
            this.state.setorAbertura === null ? "N/A" : this.state.setorAbertura
          }
        >
          {this.state.setorAbertura === null ? "N/A" : this.state.setorAbertura}
        </td>
        {this.props.SetorOrSolicitante ? (
          <td title={this.state.setor}>{this.state.setor}</td>
        ) : (
            <td
              title={
                this.state.atendenteResponsavel == "Não Atribuído"
                  ? ""
                  : this.state.atendenteResponsavel
              }
            >
              {this.state.atendenteResponsavel == "Não Atribuído"
                ? ""
                : this.state.atendenteResponsavel}
            </td>
          )}
      </tr>
    );
  }
}

export default Chamado;
