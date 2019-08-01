import React from "react";

export class Connector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(a, b) {}

  resize = () => {
    if (this.props.start.ready && this.props.end.ready) {
      this.forceUpdate();
    }
  };
  /*componentDidMount(){
      window.addEventListener('resize', this.resize)
    }
        
    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }*/

  render() {
    const { start, end, color } = this.props;

    if (!start.dom || !end.dom) {
      return null;
    }

    let startRect = start.dom.getBoundingClientRect();

    let endRect = end.dom.getBoundingClientRect();

    /*let positions = {
      x1: startRect.x + startRect.width/2,
      x2: endRect.x +endRect.width/2,
      y1: startRect.y,
      y2: endRect.y +(endRect.height),
    }*/

    let positions = {
      x1: start.dom.offsetLeft + startRect.width / 2,
      x2: end.dom.offsetLeft + endRect.width / 2,
      y1: start.dom.offsetTop + startRect.height,
      y2: end.dom.offsetTop
    };

    let middle = (positions.y2 - positions.y1) / 2;

    let linePoint = [];
    let startPoint;

    startPoint = { x: positions.x1, y: positions.y1 };
    linePoint.push({ x: positions.x1, y: positions.y1 + middle });
    linePoint.push({ x: positions.x2, y: positions.y1 + middle });
    linePoint.push({ x: positions.x2, y: positions.y2 });

    return (
      <path
        d={
          "M " +
          startPoint.x +
          " " +
          startPoint.y +
          linePoint.reduce((a, b) => {
            return a + " L" + b.x + " " + b.y;
          }, "")
        }
        style={{ stroke: color, strokeWidth: 2, fill: "none" }}
      />
    );
  }
}
