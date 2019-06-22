import React, { Component } from "react";
import PropTypes from "prop-types";

export class InfiniteScroll extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired
  };

  state = {
    error: false,
    hasMore: true,
    isLoading: false,
    data: []
  };

  scrollHandler = () => {
    const { error, isLoading, hasMore } = this.state;

    if (error || isLoading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.loadData();
    }
  };

  loadData() {
    this.setState({ isLoading: true }, () => {
      this.props
        .getData()
        .then(res => {
          this.setState({
            isLoading: false,
            data: [...this.state.data, ...res.data]
          });
        })
        .catch(err => console.log(err));
    });
  }

  constructor(props) {
    super(props);
    window.onscroll = this.scrollHandler.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    return (
      <React.Fragment>{this.props.render(this.state.data)}</React.Fragment>
    );
  }
}

export default InfiniteScroll;
