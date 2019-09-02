import React, { Component } from "react";
import PropTypes from "prop-types";

export class Source extends Component {
  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: "#"
  };

  render() {
    const url = new URL(this.props.url);
    return (
      <div className="source-link">
        Source: <a href={url.href}>{url.hostname}</a>
      </div>
    );
  }
}

export default Source;
