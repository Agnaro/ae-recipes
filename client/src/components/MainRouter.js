import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import MealsPage from "./MealPlanning/MealsPage";
import RecipeRoutes from "./Recipes/RecipeRoutes";
import Home from "./Home";
import { getUser } from "../actions/user_actions/userActions";
import { connect } from "react-redux";

const ROUTES = [
  {
    path: "/",
    exact: true,
    navName: "Home",
    main: () => <Home />
  },
  {
    path: "/meals/",
    navName: "Meals",
    main: () => <MealsPage />
  },
  {
    path: "/recipes/",
    navName: "Recipes",
    main: () => <RecipeRoutes />
  }
];

export class MainRouter extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const user = this.props.user.user.id !== undefined;

    if (user) {
      return this.renderMain();
    } else {
      return this.renderLogin();
    }
  }

  renderLogin() {
    return (
      <div>
        <Container>
          <Router>
            <div>
              <Navigation routes={ROUTES} />
              <p>
                Please login to use this site. This site does not work if you
                are not logged in.
              </p>
            </div>
          </Router>
        </Container>
      </div>
    );
  }

  renderMain() {
    return (
      <div>
        <Container>
          <Router>
            <div>
              <Navigation routes={ROUTES} />

              {ROUTES.map((route, index) => (
                <Route
                  path={route.path}
                  exact={route.exact}
                  render={route.main}
                  key={index}
                />
              ))}
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(MainRouter);
