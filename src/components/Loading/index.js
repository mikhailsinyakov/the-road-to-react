import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0
    };
    this.isRotating = false;
    this.period = 1500;
    this.prevTime = 0;
    this.updateAngle = this.updateAngle.bind(this);
  }

  updateAngle(time) {
    if (this.isRotating) {
      const angleChange = ((time - this.prevTime) / this.period) * 360;
      this.setState(({ angle }) => ({ angle: angle + angleChange }));
      this.prevTime = time;
      window.requestAnimationFrame(this.updateAngle);
    }
  }

  componentDidMount() {
    this.isRotating = true;
    window.requestAnimationFrame(this.updateAngle);
  }

  componentWillUnmount() {
    this.isRotating = false;
  }

  render() {
    return (
      <i
        className="fas fa-spinner"
        style={{ transform: `rotate(${this.state.angle}deg)` }}
      ></i>
    );
  }
}

export default Loading;
