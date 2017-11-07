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
import "../css/Sell.css";

class Sell extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Jumbotron id="landingJumbotron">
              <h1>Sell</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Sell;
