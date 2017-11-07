import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path="/" render={() => <Landing />} />
          <Route path="/market" render={() => <Market />} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
