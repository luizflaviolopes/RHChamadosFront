import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../css/logon.css";
import "./css/bootstrap.css";
import logo from "./img/logo_rhresponde_form_old.png";
import Form from "react-bootstrap";

class FormLogon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="login">
        <div className="form-group">
          <img src={logo} className="logoForm" />
        </div>
        <Form.Group>teste</Form.Group>
      </div>
    );
  }
}
export default FormLogon;
