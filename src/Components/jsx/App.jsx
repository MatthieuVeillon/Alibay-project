import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Landing />
          <Navigation />
        </div>
      </Router>
    );
  }
}
export default App;
