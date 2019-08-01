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
    var checkFilter = function(element) {
      let retorno = true;
      Object.keys(newFilter).forEach(function(p, i) {
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
    let newDems = this.state.all.filter(function(a, i) {
      return checkFilter(a);
    });

    this.setState({ filters: newFilter, dems: newDems });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.tipo !== this.props.match.params.tipo) {
      api(
        "http://localhost:5000/api/values?tipo=" + nextProps.match.params.tipo,
        {}
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            dems: data.lista,
            current: Math.floor(
              data.registros % 10 > 0
                ? data.registros / 10 + 1
                : data.registros / 10
            )
          })
        );
    }
  }

  BuscarNovo() {
    api("http://localhost:5000/api/values", {})
      .then(response => response.json())
      .then(data => this.setState({ dems: [...this.state.dems, data.lista] }));
  }

  handlePageClick(a) {
    api(
      "http://localhost:5000/api/values/pagina?" +
        "&tipo=" +
        this.props.match.params.tipo +
        "&pag=" +
        a.selected
    )
      .then(Response => Response.json())
      .then(data => {
        this.setState({
          dems: data.lista,
          current: Math.floor(
            data.registros % 10 > 0
              ? data.registros / 10 + 1
              : data.registros / 10
          )
        });
      });
  }

  componentDidMount() {
    setTimeout(
      function() {
        api("http://localhost:5000/api/values?tipo=" + this.state.tipo, {})
          .then(response => response.json())
          .then(data =>
            this.setState({
              dems: data.lista,
              all: data.lista,
              current: Math.floor(
                data.registros % 10 > 0
                  ? data.registros / 10 + 1
                  : data.registros / 10
              )
            })
          );
      }.bind(this)
    );
  }

  render() {
    let filterObj = this.state.filters;
    let _this = this;
    var checkFilter = function(element) {
      for (var p in Object.keys(filterObj)) {
        if (filterObj[p] !== "" && element[p] !== filterObj[p]) return false;
      }

      return true;
    };

    if (this.state.dems == null)
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
                    label="Nº"
                    icone="list-ol"
                    FilterParam="numChamado"
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
                    label="MASP/CPF"
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
              {this.state.dems.map(function(a, i) {
                return (
                  <Chamado
                    numChamado={a.numChamado}
                    solicitante={a.solicitante}
                    assunto={a.assunto}
                    data={a.data}
                    status={a.status}
                    prioridade={a.prioridade}
                    masp={a.masp}
                    cpf={a.cpf}
                    desc={a.desc}
                    email={a.email}
                    cel={a.cel}
                    setor={a.setor}
                    prazo={a.prazo}
                    anexoFile={_this.handleFile}
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
            pageCount={this.state.current}
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
