import React, { Component } from "react";
import PropTypes from "prop-types";

export class Thumbnail extends Component {
  static propTypes = {
    url: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.element
  };

  static defaultProps = {
    className: "",
    placeholder: <div />
  };

  render() {
    if (this.props.url === null) {
      return <React.Fragment>{this.props.placeholder}</React.Fragment>;
    } else {
      return (
        <div className={this.props.className}>
          <img src={this.props.url} alt="thumbnail" />
        </div>
      );
    }
  }
}

export default Thumbnail;
