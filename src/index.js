import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import AppRastreio from "./AppRastreio";
import { Login } from "./Login/Login.js";
import { EsqueciSenha } from "./Auth/EsqueciSenha"
import { ConfirmarSenha } from "./Auth/ConfirmarSenha"
import * as serviceWorker from "./serviceWorker";
import "./css/logon.css";
import api from "./APIs/DataApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreApp from "./PreApp";
import routerFunction from "./APIs/IndexRouter";


ReactDOM.render
  (
    routerFunction(window.location),
    document.getElementById("root")
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
