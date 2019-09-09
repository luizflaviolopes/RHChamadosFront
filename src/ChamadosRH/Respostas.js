import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "../css/Respostas.css";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../APIs/DataApi";
import { Anexos } from "../ChamadosRH/Anexos";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { Button, Form, Row } from "react-bootstrap";

export class Respostas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resp: { formulario: props.numChamado },
      id: props.id,
      resposta: props.resposta,
      respostaAutomatica: [],
      finalResp: false,
      listFile: []
    };
    this.handleResponder = this.handleResponder.bind(this);
    /* this.changeIdRespostaAutomatica = this.changeIdRespostaAutomatica.bind(
      this
    ); */
    this.handleFile = this.handleFile.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
  }

  handleFile() {
    const formData = new FormData();
    var file = document.getElementById("anexo").files;
    formData.append("file", file[0]);

    this.setState({
      listFile: [...this.state.listFile, FormData]
    });
  }
  onDrop = acceptedFiles => {
    this.setState({
      listFile: [...this.state.listFile, ...acceptedFiles]
    });
  };

  handleRemoveFile(file) {
    var list = [...this.state.listFile];
    var index;

    for (var i = 0; i < list.length; i++) {
      if (list[i].name === file) {
        index = i;
      }
    }

    if (index !== -1) {
      list.splice(index, 1);
      this.setState({
        listFile: list
      });
    }
  }

  /* changeIdRespostaAutomatica(evt) {
    this.setState({
      resp: {
        formulario: this.props.numChamado,
        IdRespostasAutomaticas: evt.target.id
      }
    });
  }
 */
  /*  handleRespostaAutomatica() {
    api("api/resposta", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: JSON.stringify(this.state.resp)
    })
      .then(resp => {
        if (resp.status == 200) return resp.json();
        else throw resp.json();
      })
      .then(data => toast.success(data.message))
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
  } */

  handleResponder() {
    const formData = new FormData();
    const _this = this;

    if (this.state.resp.Resposta !== undefined) {
      /* Object.keys(this.state.resp.Resposta).forEach(function(a, i) {
        if (a !== undefined) formData.append(a, _this.state.finalResp[a]); */

      formData.append("Resposta", this.state.resp.Resposta);
    }
    /* if (this.state.resp.IdRespostasAutomaticas !== undefined) {
       Object.keys(this.state.resp.Resposta).forEach(function(a, i) {
        if (a !== undefined) formData.append(a, _this.state.finalResp[a]); 

      formData.append(
        "IdRespostasAutomaticas",
        this.state.resp.IdRespostasAutomaticas
      );
    } */

    this.state.listFile.forEach(function(j, r) {
      formData.append("file" + r, j);
    });

    this.state.resp.finalResp = this.state.finalResp;
    formData.append("finalResp", this.state.resp.finalResp);

    formData.append("formulario", this.props.numChamado);

    api("api/resposta", {
      method: "post",
      body: formData
    })
      .then(resp => {
        if (resp.status == 200) return resp.json();
        else throw resp.json();
      })
      .then(data => toast.success(data.message))
      .catch(a =>
        a.then(e =>
          toast.error(e.message, {
            position: toast.POSITION.TOP_CENTER
          })
        )
      );
  }

  componentDidMount() {
    api("api/resposta", {})
      .then(response => response.json())
      .then(data =>
        this.setState({ respostaAutomatica: data.respostaAutomatica })
      );
  }

  /*   componentWillUpdate() {
    {
      api("api/resposta", {})
        .then(response => response.json())
        .then(data =>
          this.setState({ respostaAutomatica: data.respostaAutomatica })
        );
    }
  } */

  render() {
    let _this = this;
    if (this.state.finalResp) {
      return (
        <Redirect
          to={{
            pathname: "/chamados",
            state: { finalResp: true }
          }}
        />
      );
    }

    return (
      <div className="respostas">
        <Container fluid={true}>
          <Form>
            <Form.Group>
              <Form.Label> Resposta:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={evt =>
                  this.setState({
                    resp: {
                      ...this.state.resp,
                      Resposta: evt.target.value,
                      IdRespostasAutomaticas: null
                    }
                  })
                }
              />
            </Form.Group>
            <hr />
            <div className="form-group">
              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Form.Label>Adicionar Documentos ao Chamado</Form.Label>
                  </div>
                )}
              </Dropzone>
              <div className="anexo">
                <Row>
                  {this.state.listFile.map(function(a, i) {
                    return (
                      <Anexos nome={a.name} eliminar={_this.handleRemoveFile} />
                    );
                  })}
                </Row>
              </div>
            </div>
            {/* <Form.Group>
              {this.state.respostaAutomatica.map(function(a, i) {
                return (
                  <div className="checkChamado">
                    <Form.Check
                      onClick={_this.changeIdRespostaAutomatica}
                      name="resposta"
                      label={a.resposta}
                      type="radio"
                      id={a.id}
                    />
                  </div>
                );
              })}
            </Form.Group> */}
            <Form.Group>
              <Button
                variant="success"
                type="submit"
                onClick={() => {
                  this.setState({ finalResp: true }, () =>
                    this.handleResponder()
                  );
                }}
              >
                <FontAwesomeIcon icon="check" />
                Enviar Resposta Final
              </Button>

              <Link to="/chamados">
                <Button
                  variant="warning"
                  type="submit"
                  onClick={this.handleResponder}
                >
                  <FontAwesomeIcon icon="envelope-open-text" />
                  Enviar Resposta Parcial
                </Button>
              </Link>
              <Button variant="danger" onClick={() => this.props.closeAnswer()}>
                Cancelar
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}
