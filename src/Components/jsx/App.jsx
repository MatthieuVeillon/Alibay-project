import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Market from "./Market";
import AccountPage from "./AccountPage";
import Sell from "./Sell";
import "bootstrap/dist/css/bootstrap.css";
import "../css/App.css";
import firebase from "firebase";
import {initializeUserIfNeeded} from "../../backend-mockup";

const config = {
  apiKey: "AIzaSyAYa9W4MdaR2PiqcYf4FTAuUwa5n4FYfms",
  authDomain: "alibay-project.firebaseapp.com",
  databaseURL: "https://alibay-project.firebaseio.com",
  projectId: "alibay-project",
  storageBucket: "alibay-project.appspot.com",
  messagingSenderId: "523831352588",
};

firebase.initializeApp(config);
// backend function for login
const provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: "",
    };
  }
  componentDidMount() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({currentUserId: result.user.uid});
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
