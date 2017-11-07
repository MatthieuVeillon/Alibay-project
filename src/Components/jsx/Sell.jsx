import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "../css/Sell.css";
import { LinkContainer } from "react-router-bootstrap";

// var BackendTools = require("../../backend-mockup.js");

class Sell extends Component {
  clickAddProduct = () => {
    this.props.buttonClick({
      userName: this.inputUserName.value,
      productName: this.inputProductName.value,
      productPrice: this.inputProductPrice.value,
      productDescription: this.inputProductDescription.value,
      productImageUrl: this.inputProductImage.value
    });
  };

  render() {
    return (
      <Grid id="sellProductForm">
        <Row>
          <Col xs={12}>
            <Form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>User name</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputUserName = r)}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Product Name</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputProductName = r)}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputProductPrice = r)}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputProductDescription = r)}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Image</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputProductImage = r)}
                  type="file"
                />
              </FormGroup>
            </Form>

            <LinkContainer to="/account">
              <Button onClick={this.clickAddProduct} bsStyle="primary">
                Upload to market
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Sell;
