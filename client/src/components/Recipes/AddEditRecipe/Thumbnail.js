import React, { Component } from "react";
import PropTypes from "prop-types";

export class Thumbnail extends Component {
  static propTypes = {
    url: PropTypes.string
  };

  render() {
    if (this.props.url === null) {
      return <div />;
    } else {
      return (
        <div>
          <img src={this.props.url} width="60px" alt="thumbnail" />
        </div>
      );
    }
  }
}

export default Thumbnail;
