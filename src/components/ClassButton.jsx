import React from "react";

// DIFFERENCE: A class component extends React.Component and accesses props via
// `this.props`, whereas a functional component receives props directly as a
// parameter and uses plain JS functions — no `this` keyword, no lifecycle methods
// (hooks replace them), and generally less boilerplate.

class ClassButton extends React.Component {
  render() {
    const { title, onClick, className = "" } = this.props;
    return (
      <button className={`btn ${className}`} onClick={onClick}>
        {title}
      </button>
    );
  }
}

export default ClassButton;
