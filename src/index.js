import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Login } from "./Login/Login.js";
import * as serviceWorker from "./serviceWorker";
import "./css/logon.css";
import api from "./APIs/DataApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const teste = "";

api("http://localhost:5000/api/auth/authenticate")
  .then(resp => {
    if (resp.status === 200) {
      return resp.json();
    } else {
      ReactDOM.render(
        <Login logado={teste} />,
        document.getElementById("root")
      );
    }
  })
  .then(data => {
    if (data) {
      localStorage.setItem("Politica", data);
      ReactDOM.render(<App logado={teste} />, document.getElementById("root"));
    }
  })
  .catch(err => console.log(err));

ReactDOM.render(
  <div className="background-logon">
    <div className="carregando">
      <FontAwesomeIcon icon="spinner" pulse />
    </div>
  </div>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
