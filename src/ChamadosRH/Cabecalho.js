import React, { Component } from "react";
import "../css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Cabecalho.css";
const removeAcentos = require('remove-accents')


class Cabecalho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFiltering: false
    };
  }

  render() {
    return (
      <div className="">
        <div className="float-left">
          <FontAwesomeIcon icon={this.props.icone} /> {this.props.label}
        </div>


        <div className="float-right">
          <FontAwesomeIcon
            icon="filter"
            onClick={() => this.setState({ isFiltering: !this.state.isFiltering })}
          />
        </div>
        <div className="">
          <input
            style={this.state.isFiltering ? {} : { display: "none" }}
            className="form-control float-right"
            onChange={event =>
              this.props.onFilter({
                propertie: this.props.FilterParam,
                value: removeAcentos(event.target.value.toLowerCase())
              })

            }
          />
        </div>

      </div>
    );
  }
}

export default Cabecalho;
