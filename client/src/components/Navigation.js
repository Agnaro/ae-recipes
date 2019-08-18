import React from "react";
import { NavLink as Link } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import LoginNav from "../components/User/LoginNav";
import PropTypes from "prop-types";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="nav-bar">
        <Navbar color="dark" dark expand="md">
          <Link to="/" className="navbar-brand">
            AE-Recipes
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {this.props.routes.map((route, index) => (
                <Link to={route.path} key={index} className="nav-link">
                  {route.navName}
                </Link>
              ))}
            </Nav>
            <Nav className="ml-auto" navbar>
              <LoginNav />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  routes: PropTypes.array.isRequired
};
