import React from "react";
import AppRastreio from "../AppRastreio";
import { ConfirmarSenha } from "../Auth/ConfirmarSenha";
import { EsqueciSenha } from "../Auth/EsqueciSenha";
import PreApp from "../PreApp";


const routerFunction = function (location) {
    switch (location.pathname) {
        case "/RastreioChamado":
            return <AppRastreio />;
        case "/NovaSenha":
            return <ConfirmarSenha />;
        case "/EsqueciSenha":
            return <EsqueciSenha />;
        default:
            return <PreApp />;



    }
}

export default routerFunction;