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
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAYa9W4MdaR2PiqcYf4FTAuUwa5n4FYfms",
  authDomain: "alibay-project.firebaseapp.com",
  databaseURL: "https://alibay-project.firebaseio.com",
  projectId: "alibay-project",
  storageBucket: "alibay-project.appspot.com",
  messagingSenderId: "523831352588"
};

firebase.initializeApp(config);
// backend function for login
const provider = new firebase.auth.GoogleAuthProvider();

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
