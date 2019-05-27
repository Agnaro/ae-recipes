import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MealsPage from "./components/MealPlanning/MealsPage";
import RecipeRoutes from "./components/Recipes/RecipeRoutes";
import Home from "./components/Home";

import { Provider } from "react-redux";
import store from "./store.js";

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
