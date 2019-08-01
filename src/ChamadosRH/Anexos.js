import React, { Component } from "react";
import "../css/PageChamado.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Anexos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFile: this.props.nome
    };

  }
  componentDidMount() {
    let ex = this.state.nameFile.split('.').pop();
    this.setState({
      extencao: ex
    })
  }
  render() {
    return (
      <div className="col-md-4">
        <div className="file">
          <div className="close" onClick={() => this.props.eliminar(this.state.nameFile)}>
            <FontAwesomeIcon icon="times" />
          </div>
          <div>
            {(() => {
              switch (this.state.extencao) {
                case 'pdf':
                  return <FontAwesomeIcon icon="file-pdf" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'PDF':
                  return <FontAwesomeIcon icon="file-pdf" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'png':
                  return <FontAwesomeIcon icon="file-image" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'PNG':
                  return <FontAwesomeIcon icon="file-image" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'jpg':
                  return <FontAwesomeIcon icon="file-image" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'JPG':
                  return <FontAwesomeIcon icon="file-image" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'jpge':
                  return <FontAwesomeIcon icon="file-image" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'xls':
                  return <FontAwesomeIcon icon="file-excel" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'xlsx':
                  return <FontAwesomeIcon icon="file-excel" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'docx':
                  return <FontAwesomeIcon icon="file-word" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
                case 'doc':
                  return <FontAwesomeIcon icon="file-word" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;


                default:
                  return <FontAwesomeIcon icon="file" size="3x" onClick={() => this.props.eliminar(this.state.nameFile)} />;
              }
            })()}

          </div>
          <div>
            <div className="txtanexo" onClick={() => this.props.eliminar(this.state.nameFile)}>{this.state.nameFile}</div>
          </div>
        </div>
      </div>

    );
  }
}

export class Anexo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFile: this.props.nome
    };
  }
  componentDidMount() {
    let ex = this.state.nameFile.split('.').pop();
    this.setState({
      extencao: ex
    })
  }


  render() {
    return (
      <div className="col-md-3">
        <a href={"http://localhost:5000/api/Download?id=" + this.props.num}>
          <div className="file" /*onClick={() => this.props.handleleClicked(this.props.num)}*/>
            <div>
              {(() => {
                switch (this.state.extencao) {
                  case 'pdf':
                    return <FontAwesomeIcon icon="file-pdf" size="3x" />;
                  case 'PDF':
                    return <FontAwesomeIcon icon="file-pdf" size="3x" />;
                  case 'png':
                    return <FontAwesomeIcon icon="file-image" size="3x" />;
                  case 'PNG':
                    return <FontAwesomeIcon icon="file-image" size="3x" />;
                  case 'jpg':
                    return <FontAwesomeIcon icon="file-image" size="3x" />;
                  case 'JPG':
                    return <FontAwesomeIcon icon="file-image" size="3x" />;
                  case 'jpge':
                    return <FontAwesomeIcon icon="file-image" size="3x" />;
                  case 'xls':
                    return <FontAwesomeIcon icon="file-excel" size="3x" />;
                  case 'xlsx':
                    return <FontAwesomeIcon icon="file-excel" size="3x" />;
                  case 'docx':
                    return <FontAwesomeIcon icon="file-word" size="3x" />;
                  case 'doc':
                    return <FontAwesomeIcon icon="file-word" size="3x" />;


                  default:
                    return <FontAwesomeIcon icon="file" size="3x" />;
                }
              })()}
            </div>
            <div className="txtanexo">

              {this.state.nameFile}

            </div>
          </div>
        </a>
      </div>

    );
  }
}

