import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl
} from "react-bootstrap";
import "../css/Account.css";
// var BackendTools = require("../../backend-mockup.js");

class Account extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Jumbotron id="landingJumbotron">
              <h1>Account</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Account;
