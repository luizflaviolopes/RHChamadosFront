import React, { Component } from "react";
import "../css/bootstrap.css";
import Chamado from "./Chamado.js";
import "../css/Chamados.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import "../css/Cabecalho.css";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";
import api from "../APIs/DataApi";

class TabelaIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dems: null, //data
      tipo: this.props.match.params.tipo,
      filters: {},
      all: null,
      filtered: null,
      current: 0,
      private: true,
      anexoFile: File
    };
    this.handleFiltering = this.handleFiltering.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleFiltering(a) {
    let newFilter = this.state.filters;
    newFilter[a.propertie] = a.value;
    window.teste = newFilter;
    var checkFilter = function (element) {
      let retorno = true;
      Object.keys(newFilter).forEach(function (p, i) {
        if (!isNaN(element[p])) {
          if (
            newFilter[p] !== "" &&
            !element[p].toString().includes(newFilter[p].toString())
          ) {
            retorno = false;
            return false;
          }
        } else if (
          newFilter[p] !== "" &&
          !element[p].toLowerCase().includes(newFilter[p])
        ) {
          retorno = false;
          return false;
        }
      });
      return retorno;
    };
    let newDems = this.state.all.filter(function (a, i) {
      return checkFilter(a);
    });

    this.setState({
      filters: newFilter,
      filtered: newDems,
      current: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.tipo !== this.props.match.params.tipo) {
      api("api/values?tipo=" + nextProps.match.params.tipo, {})
        .then(response => response.json())
        .then(data =>
          this.setState({
            dems: data.lista,
            all: data.lista,
            filtered: data.lista
          })
        );
    }
  }

  BuscarNovo() {
    api("api/values", {})
      .then(response => response.json())
      .then(data => this.setState({ dems: [...this.state.dems, data.lista] }));
  }

  handlePageClick(a) {
    this.setState({ current: a.selected });
  }

  componentDidMount() {
    api("api/values?tipo=" + this.state.tipo, {})
      .then(response => response.json())
      .then(data => {
        this.setState({
          all: data.lista,
          filtered: data.lista
        });
      });
  }

  render() {
    let filterObj = this.state.filters;
    let _this = this;
    var checkFilter = function (element) {
      for (var p in Object.keys(filterObj)) {
        if (filterObj[p] !== "" && element[p] !== filterObj[p]) return false;
      }

      return true;
    };

    function calcNumPages() {
      let { filtered } = _this.state;

      return Math.floor(
        filtered.length % 10 > 0
          ? filtered.length / 10 + 1
          : filtered.length / 10
      );
    }

    function getPageDems() {
      let { current, filtered } = _this.state;

      return filtered.slice(current * 10, current * 10 + 10);
    }

    if (this.state.filtered == null)
      return (
        <div className="carregando">
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      );
    else
      return (
        <div className="container-app">
          <Table striped bordered hover className="cabecalho">
            <thead>
              <tr>
                <th>
                  <Cabecalho
                    label="Nª"
                    icone="list-ol"
                    FilterParam="numChamado"
                    sizeInput="w-25"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Protocolo"
                    icone="list-ol"
                    FilterParam="protocolo"
                    sizeInput="w-25"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Solicitante"
                    icone="user"
                    FilterParam="solicitante"
                    sizeInput="w-75"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="CPF"
                    icone="hashtag"
                    FilterParam="mc"
                    sizeInput="w-75"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Assunto"
                    icone="comment-dots"
                    FilterParam="assunto"
                    sizeInput="w-75"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Abertura"
                    icone="calendar-day"
                    FilterParam="data"
                    sizeInput="w-50"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Prioridade"
                    icone=""
                    FilterParam="prioridade"
                    sizeInput="w-50"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Setor"
                    icone="building"
                    FilterParam="setor"
                    sizeInput="w-75"
                    onFilter={this.handleFiltering}
                  />
                </th>
                <th>
                  <Cabecalho
                    label="Prazo"
                    icone="calendar-day"
                    FilterParam="prazo"
                    sizeInput="w-75"
                    onFilter={this.handleFiltering}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {getPageDems().map(function (a, i) {
                return (
                  <Chamado
                    numChamado={a.numChamado}
                    solicitante={a.solicitante}
                    assunto={a.assunto}
                    data={a.data}
                    status={a.status}
                    prioridade={a.prioridade}
                    masp={a.masp}
                    cpf={a.cpf.replace(/[^a-z0-9]/gi, "").replace(
                      /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
                      "$1.$2.$3-$4"
                    )}
                    desc={a.desc}
                    email={a.email}
                    cel={a.cel}
                    setor={a.setor}
                    prazo={a.prazo}
                    anexoFile={_this.handleFile}
                    justificativa={a.justificativa}
                    IsAutenticado={a.isAutenticado}
                    atendenteResponsavel={a.atendenteResponsavel}
                    protocolo={a.protocolo}
                    alterAssunto={a.alterAssunto}
                  />
                );
              })}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={calcNumPages()}
            forcePage={0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      );
  }
}

export default TabelaIndex;
