import React, { Component } from "react";
import { Jumbotron, Button, Grid, Row, Col } from "react-bootstrap";
import "../css/Landing.css";

class Landing extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Jumbotron id="landingJumbotron">
              <h1>Marketplace of the future</h1>
              <p>
                Buy and sell goods from around the globe in just a few clicks.
              </p>
              <p>
                <Button bsStyle="primary">Enter</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Landing;
