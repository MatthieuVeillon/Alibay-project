import React, {Component} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {
  Jumbotron,
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import "../css/Account.css";
// var BackendTools = require("../../backend-mockup.js");

class AccountLogin extends Component {
  clickLogin = () => {
    const userId = this.inputUserId.value;
    this.props.buttonClick(userId);
  };
  render() {
    return (
      <Grid className="componentHeader">
        <Row>
          <Col xs={12}>
            <h1>Enter your user id</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form>
              <FormGroup bsSize="large">
                <FormControl
                  inputRef={r => {
                    this.inputUserId = r;
                  }}
                  type="text"
                  placeholder="Enter id"
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <LinkContainer to="/accountPage">
          <Button onClick={this.clickLogin} bsStyle="primary">
            Login
          </Button>
        </LinkContainer>
      </Grid>
    );
  }
}

export default AccountLogin;
