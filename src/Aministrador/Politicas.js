import React, { Component } from "react";
import "../css/bootstrap.css";
import "../css/Botoes.css";
import "../css/User.css";

import { Form } from "react-bootstrap";

export class Politicas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePol: this.props.namePol
    };
  }
  render() {
    return (
      <div>
        <Form.Check
          type="checkbox"
          label={this.props.namePol}
          onChange={evt => this.props.onChange(evt)}
          checked={this.props.check}
        />
      </div>
    );
  }
}

export default Politicas;
