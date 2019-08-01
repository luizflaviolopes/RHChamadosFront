import React from "react";
import ReactDOM from "react-dom";

export class Unity extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount() {
    this.props.un.dom = ReactDOM.findDOMNode(this.container.current);
    this.props.un.ready = true;
    this.props.renderConnects();
  }

  componentDidUpdate() {
    if (!this.props.un.dom) {
      this.props.un.dom = ReactDOM.findDOMNode(this.container.current);
      this.props.un.ready = true;
      this.props.renderConnects();
    }
  }

  render() {
    const { el, un } = this.props;
    const El = el;
    let children;
    if (this.props.un.childrens) {
      children = this.props.un.childrens;
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem"
          }}
        >
          <div
            style={{ overflow: "hidden", margin: "5px" }}
            ref={this.container}
          >
            <div
              style={{
                display: "inline-block",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                minWidth: "1rem",
                minHeight: "1rem"
              }}
            >
              <El text={un.sigla} id={un.id} obj={un} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {children.map(a => (
            <Unity un={a} el={el} renderConnects={this.props.renderConnects} />
          ))}
        </div>
      </div>
    );
  }
}
