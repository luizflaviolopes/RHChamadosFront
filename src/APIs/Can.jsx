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
      allowed: false,
      children: this.props.children
    };
  }
  render() {
    const pol = this.state.logged.split(",");
    let _this = this;

    pol.forEach(function(a) {
      if (_this.state.politica.some(x => x == a)) {
        _this.state.allowed = true;
        return true;
      }
    });
    return (
      <div className="can">
        {this.state.allowed ? this.state.children : null}
      </div>
    );
  }
}
