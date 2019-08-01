import React from "react";

const Can = ({ component: Component, children }) => {
  const logged = localStorage.getItem("sign");

  if (logged) return <div>{children}</div>;
  else return null;
};

export default Can;
