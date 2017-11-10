import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import AccountPage from "./AccountPage";
import Sell from "./Sell";
import { initializeUserIfNeeded } from "../../backend-mockup.js";

import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";

// import all methods for firebase
import * as firebase from "firebase";
// import config file to initialize DB for firebase
import fb from "./firebase-config";

console.log(2 + 2);
// Firebase instance for login
const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: ""
    };
  }
  componentDidMount() {
    console.log("authentication from page");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({ currentUserId: result.user.uid });
      })
      .then(() => initializeUserIfNeeded(this.state.currentUserId));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path="/" component={Landing} />
          <Route
            path="/market"
            render={() => <Market currentUserId={this.state.currentUserId} />}
          />

          <Route
            path="/accountPage"
            render={() => (
              <AccountPage
                currentUserId={this.state.currentUserId}
                currentUserId={this.state.currentUserId}
              />
            )}
          />

          <Route
            exact
            path="/sell"
            render={() => <Sell currentUserId={this.state.currentUserId} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
