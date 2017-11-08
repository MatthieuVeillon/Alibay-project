import React, {Component} from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import "../css/Navigation.css";

class Navigation extends Component {
  render() {
    return (
      <Navbar id="navbar" collapseOnSelect fluid fixedTop>
        <Navbar.Header>
          <Link to="/">
            <img
              alt=""
              className="logo"
              src={require("../../Images/smalllogo.png")}
            />
          </Link>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/market">
              <NavItem eventKey={1}>Buy</NavItem>
            </LinkContainer>
            <LinkContainer to="/sell">
              <NavItem eventKey={2}>Sell</NavItem>
            </LinkContainer>
            <LinkContainer to="/accountLogin">
              <NavItem eventKey={3}>Account</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Navigation;
