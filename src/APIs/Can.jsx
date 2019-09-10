// import React from "react";

// const Can = ({ component: Component, children }) => {
//   const logged = localStorage.getItem("Politica");
//   const pol = logged.split(",");

//   if (logged) return <div>{children}</div>;
//   else return null;
// };

// export default Can;

import React, { Component, children } from "react";
import "../css/can.css";

export class Can extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: localStorage.getItem("Politica"),
      politica: Array.isArray(this.props.politica)
        ? this.props.politica
        : [this.props.politica],
      allowed: props.reverse || false,
      children: this.props.children
    };
  }
  render() {
    const pol = this.state.logged.split(",");
    let _this = this;
    let allow = this.state.allowed;

    for (let i = 0; i < pol.length; i++) {
      if (_this.state.politica.some(x => x == pol[i])) {
        allow = !allow;
        break;
      }
    }
    return (
      <React.Fragment>{allow ? this.state.children : null}</React.Fragment>
    );
  }
}
