import React, { Component } from 'react';
import {
  Jumbotron,
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/Sell.css';
import { createListing } from '../../backend-mockup.js';

class Sell extends Component {
  clickAddProduct = () => {
    var userId = this.inputUserId.value;
    var productPrice = this.inputProductPrice.value;
    var productDescription = this.inputProductDescription.value;
    var ProductName = this.inputProductName.value;
    this.props.buttonClick(createListing(userId, ProductName, productPrice, productDescription));
  };

  render() {
    return (
      <Grid id="sellProductForm">
        <Row>
          <Col xs={12}>
            <Form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>UserId</ControlLabel>
                <FormControl
                  inputRef={r => (this.inputUserId = r)}
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
                <FormControl inputRef={r => (this.inputProductImage = r)} type="file" />
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