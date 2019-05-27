import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/user_actions/userActions";

export class Logout extends Component {
  logoutClick = () => {
    this.props.logout();
  };

  render() {
    return (
      <React.Fragment>
        <div onClick={this.logoutClick}>Logout</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
