import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import AccountLogin from "./AccountLogin";
import AccountPage from "./AccountPage";
import Sell from "./Sell";
import Buy from "./Buy";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      productsForSale: [],
      userId: "",
    };
  }

  handleNewProduct = data => {
    this.setState({
      productsForSale: this.state.productsForSale.concat([data]),
    });
  };

  handleLogin = data => {
    this.setState({userId: data});
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route
            path="/market"
            render={() => <Market products={this.state.productsForSale} />}
          />
          <Route
            path="/accountLogin"
            render={() => <AccountLogin buttonClick={this.handleLogin} />}
          />
          <Route
            path="/accountPage"
            render={() => <AccountPage userId={this.state.userId} />}
          />

          <Route
            exact
            path="/sell"
            render={() => <Sell buttonClick={this.handleNewProduct} />}
          />
          <Route exact path="/buy" render={() => <Buy />} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
