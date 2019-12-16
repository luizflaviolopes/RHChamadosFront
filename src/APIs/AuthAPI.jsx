import api from "../APIs/DataApi";

export const sendLogin = async user =>
  api("api/auth/entrar", {
    method: "post",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json;" },
    credentials: "include"
  }).then(resp => {
    return resp;
  });
