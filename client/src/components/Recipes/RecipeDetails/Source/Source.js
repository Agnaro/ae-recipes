import React, { Component } from "react";
import PropTypes from "prop-types";

export class Source extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  getDomain = url => {
    const domain = String(url).slice(11, 20);
    return domain;
  };

  render() {
    return (
      <div className="source-link">
        Source: <a href={this.props.url}>{this.getDomain(this.props.url)}</a>
      </div>
    );
  }
}

export default Source;
