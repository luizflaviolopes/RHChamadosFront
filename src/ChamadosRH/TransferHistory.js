import React, { Component } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/History.css";

export class TransferHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: props.desc,
      history: props.history,
      horario: props.horario,
      id_Setores: props.setor,
      openedDesHistory: props.openedDesHistory,
      i: props.i,
      setorOrigem: props.setorOrigem
    };
    this.handleClickHistoryDesc = this.handleClickHistoryDesc.bind(this);
  }

  handleClickHistoryDesc() {
    if (!this.props.rastreio)
      this.setState({ openedDesHistory: !this.state.openedDesHistory });
  }

  render() {
    let l=0;
    return (
      <Alert
        variant="light"
        className="HistoyrTransfer"
        onClick={this.handleClickHistoryDesc}
      >
        <Form.Group className="text-center">
          <Row>
            <Col sm="5">
              <Form.Label column={true}>

               {/* {this.state.setorOrigem === null || this.state.setorOrigem[l].setor === undefined ?"Não existe no banco":this.state.setorOrigem[l].setor}
                 {
                  this.state.history === [] || this.state.history[this.state.i].setorOrigem === null || this.state.history[this.state.i].setorOrigem.setor === undefined 
                  ?
                  "não tem no banco"
                  :
                  this.state.history[this.state.i].setorOrigem.setor
                }*/}
                {this.state.i > 0
                  ? this.state.history[this.state.i - 1].id_Setores
                  : "RHResponde"} 
              </Form.Label>
            </Col>
            <Col sm="2">
              <div>
                <FontAwesomeIcon icon="exchange-alt" />
              </div>
              <span className="text-muted">{this.state.horario} </span>
            </Col>
            <Col sm="5">
              <Form.Label column={true}>{this.state.id_Setores}</Form.Label>
            </Col>
            {this.state.openedDesHistory ? (
              <Col sm="12">
                <Form.Label column={true}>
                  <span>Descricão:</span>
                  <p>{this.state.desc}</p>
                </Form.Label>
              </Col>
            ) : null}
          </Row>
        </Form.Group>
      </Alert>
    );
  }
}
