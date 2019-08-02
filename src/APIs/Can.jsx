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
      politica: this.props.politica,
      allowed: false,
      children: this.props.children
    };
  }
  render() {
    const pol = this.state.logged.split(",");
    let _this = this;
    // const allowed = pol.push(_this.state.politica);

    pol.forEach(function(a) {
      if (a === _this.state.politica) {
        _this.state.allowed = true;
      }
    });
    return (
      <div className="can">
        {this.state.allowed ? this.state.children : null}
      </div>
    );
  }
}
