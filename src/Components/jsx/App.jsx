import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import AccountPage from "./AccountPage";
import Sell from "./Sell";
import Buy from "./Buy";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
// import all methods for firebase
import * as firebase from "firebase";
// import config file to initialize DB for firebase
import fb from "./firebase-config";

// Firebase instance for login
const provider = new firebase.auth.GoogleAuthProvider();

// Firebase instance for storage
const storageRef = firebase.storage().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      productsForSale: [],
      userId: ""
    };
  }

  handleNewProduct = data => {
    this.setState({
      productsForSale: this.state.productsForSale.concat([data])
    });
  };

  handleLogin = data => {
    this.setState({ userId: data });
  };

  componentDidMount() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        // this.setState({ currentUser: result.user.displayName });
      });
  }

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
            path="/accountPage"
            render={() => <AccountPage userId={this.state.userId} />}
          />

          <Route
            exact
            path="/sell"
            render={() => <Sell buttonClick={this.handleNewProduct} />}
          />
          {/* <Route
            exact
            path="/buy"
            render={() => <Buy products={this.state.productsForSale} />}
          /> */}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
