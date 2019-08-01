import React from "react";
import ReactDOM from "react-dom";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tamanho: 0 };
    this.inner = React.createRef();
  }

  componentDidUpdate(a, b) {
    if (
      ReactDOM.findDOMNode(this.inner.current).getBoundingClientRect()
        .height !== b.tamanho
    )
      this.resize();
  }

  resize = () => {
    var dom = ReactDOM.findDOMNode(this.inner.current).getBoundingClientRect();
    this.setState({ ready: true, tamanho: dom.height });
  };

  componentDidMount() {
    if (!this.state.ready) {
      var dom = ReactDOM.findDOMNode(
        this.inner.current
      ).getBoundingClientRect();
      this.setState({ ready: true, tamanho: dom.height });
    }
  }

  render() {
    return (
      <div style={{ position: "relative", height: this.state.tamanho }}>
        <div
          ref={this.inner}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            fontSize: "initial"
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
