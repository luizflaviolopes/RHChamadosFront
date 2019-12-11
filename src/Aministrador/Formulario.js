import React, { Component } from "react";
import "../css/bootstrap.css";
import { Modal, Col, Button, Form, Row } from "react-bootstrap";
import "../css/Botoes.css";
import { Link } from "react-router-dom";
import { Anexos } from "../ChamadosRH/Anexos";
import Dropzone from "react-dropzone";
import api from "../APIs/DataApi";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import InputMask from "react-input-mask";

export class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      assuntos: [],
      modalName: props.modalName,
      listFile: [],
      desativado: false
    };
    this.openModal = this.openModal.bind(this);
    this.handleNovoChamado = this.handleNovoChamado.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);
  }
  componentDidMount() {
    this.setState({
      desativado: false
    });
  }
  handleNovoChamado() {
    if (!this.state.desativado) {
      this.setState({
        desativado: true
      });

      const formData = new FormData();
      const _this = this;

      if (this.state.newChamado !== undefined) {
        Object.keys(this.state.newChamado).forEach(function(a, i) {
          if (a !== undefined) formData.append(a, _this.state.newChamado[a]);
        });

        this.state.listFile.forEach(function(j, r) {
          formData.append("file" + r, j);
        });

        api("api/NovoChamado", {
          method: "post",
          body: formData
        })
          .then(resp => {
            if (resp.status == 200) return resp.json();
            else throw resp.json();
          })
          .then(
            data => toast.success(data.message),
            this.setState(
              {
                desativado: false
              },
              this.props.close(this.state.modalName)
            )
          )
          .catch(a =>
            a.then(e =>
              Object.keys(e).forEach(function(a, i) {
                toast.error(e[a][0], {
                  position: toast.POSITION.TOP_CENTER
                });
              })
            )
          );
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({ show: this.props.show });
    }
  }

  openModal() {
    api("api/Assunto", {})
      .then(response => response.json())
      .then(data => this.setState({ assuntos: data }));
  }

  handleFile() {
    const formData = new FormData();
    var file = document.getElementById("anexo").files;
    formData.append("file", file[0]);

    this.setState({
      listFile: [...this.state.listFile, FormData]
    });

    api("api/values", {
      method: "put",
      body: this.state.listFile
    }).then();
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
  beforeMaskedStateChange = ({ nextState }) => {
    let { value } = nextState;
    if (value.endsWith("/")) {
      value = value.slice(0, -1);
    }

    return {
      ...nextState,
      value
    };
  };
  // beforeMaskedValueChange = (newState, oldState, userInput) => {
  //   var { value } = newState;
  //   var selection = newState.selection;
  //   var cursorP = selection ? selection.start : null;
  // };

  render() {
    let _this = this;
    return (
      <Modal
        size="lg"
        show={this.state.show}
        onEnter={this.openModal}
        onHide={() => {
          this.props.close(this.state.modalName);
          this.setState({ desativado: false });
        }}
        aria-labelledby="Respostas-Chamados"
      >
        <Modal.Header closeButton>
          <Modal.Title id="Respostas-Chamados">Novo Chamado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o E-mail"
                onChange={evt =>
                  this.setState({
                    newChamado: {
                      ...this.state.newChamado,
                      Email: evt.target.value
                    }
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Assunto</Form.Label>

              <Typeahead
                onChange={evt => {
                  if (evt.length !== 0) {
                    this.setState({
                      newChamado: {
                        ...this.state.newChamado,
                        Assunto: evt[0].id
                      }
                    });
                  }
                }}
                options={this.state.assuntos}
                labelKey={option => `${option.assunto}`}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefone</Form.Label>

              <InputMask
                mask="(99) 99999-9999"
                onChange={evt =>
                  this.setState({
                    newChamado: {
                      ...this.state.newChamado,
                      Telefone: evt.target.value
                    }
                  })
                }
                beforeMaskedValueChange={this.beforeMaskedValueChange}
              >
                {inputprop => (
                  <Form.Control type="text" placeholder="(00) 00000-0000" />
                )}
              </InputMask>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Digite uma descrição"
                onChange={evt =>
                  this.setState({
                    newChamado: {
                      ...this.state.newChamado,
                      Descricao: evt.target.value
                    }
                  })
                }
              />
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
                        <Anexos
                          nome={a.name}
                          eliminar={_this.handleRemoveFile}
                        />
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Form.Group>

            <Button
              id="criarMenu"
              className="btn-menu"
              onClick={this.handleNovoChamado}
            >
              Criar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default Formulario;
