import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  componentDidMount() {
    if (this.input) this.input.focus();
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={value}
          ref={el => (this.input = el)}
        />
        <input type="submit" value={children} />
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Search;
