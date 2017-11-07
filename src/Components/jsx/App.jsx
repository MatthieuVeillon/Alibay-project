import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import Account from "./Account";
import Sell from "./Sell";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      productForSale: []
    };
  }

  handleChange = data => {
    this.setState({
      productForSale: this.state.productForSale.concat([data])
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route path="/market" component={Market} />
          <Route path="/account" component={Account} />
          <Route
            exact
            path="/sell"
            render={() => <Sell buttonClick={this.handleChange} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
