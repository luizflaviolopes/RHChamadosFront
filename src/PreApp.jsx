import React, { Component } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./APIs/DataApi";
import { Login } from "./Login/Login";
import App from "./App";

class PreApp extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
    this.component = {};
  }

  componentDidMount() {
    api("http://localhost:5000/api/auth/authenticate")
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          ReactDOM.render(<Login />, document.getElementById("root"));
        }
      })
      .then(data => {
        if (data) {
          localStorage.setItem("Politica", data);
          ReactDOM.render(<App />, document.getElementById("root"));
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="background-logon">
        <div className="carregando">
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      </div>
    );
  }
}

export default PreApp;
