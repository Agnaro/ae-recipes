import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store.js";
import MainRouter from "./components/MainRouter";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
