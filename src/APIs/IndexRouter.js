import React from "react";
import AppRastreio from "../AppRastreio";
import { ConfirmarSenha } from "../Auth/ConfirmarSenha";
import { EsqueciSenha } from "../Auth/EsqueciSenha";
import PreApp from "../PreApp";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


const routerFunction = function (location) {

return (
    <BrowserRouter>
            <Switch>
                <Route path="/RastreioChamado/:tag" component={AppRastreio} />
                <Route path="/NovaSenha" component={ConfirmarSenha} />
                <Route path="/EsqueciSenha" component={EsqueciSenha} />
                <Route component={PreApp} />
            </Switch>
</BrowserRouter>
              )



    // switch (location.pathname) {
    //     case "/RastreioChamado":
    //         return <AppRastreio />;
    //     case "/NovaSenha":
    //         return <ConfirmarSenha />;
    //     case "/EsqueciSenha":
    //         return <EsqueciSenha />;
    //     default:
    //         return <PreApp />;
    // }
}

export default routerFunction;