import React from "react";

const Private = ({ component: Component, children }) => {
  const logged = null;

  if (logged) return <div>{children}</div>;
  else return null;
};

export default Private;
