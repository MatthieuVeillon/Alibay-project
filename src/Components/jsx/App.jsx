import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
      </Router>
    );
  }
}
export default App;
