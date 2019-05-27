import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import { NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";

export class LoginNav extends Component {
  state = {
    user: {}
  };

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      user: props.user.user
    }));
  }
  render() {
    if (!!this.state.user.id) {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink href="#">
              <Logout />
            </NavLink>
          </NavItem>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink href="#">
              <Login />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <Register />
            </NavLink>
          </NavItem>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(LoginNav);
