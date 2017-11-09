import React, {Component} from "react";
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
} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "../css/Sell.css";
import {createListing} from "../../backend-mockup";

// import all methods for firebase
import * as firebase from "firebase";
// import config file to initialize DB for firebase
import fb from "./firebase-config";

const storageRef = firebase.storage();

class Sell extends Component {
  clickAddProduct = () => {
    const userId = this.props.currentUserId;
    const productPrice = this.inputProductPrice.value;
    const productDescription = this.inputProductDescription.value;
    const ProductName = this.inputProductName.value;
    let productImgUrl;
    this.uploadImage()
      .then(url => {
        productImgUrl = url;
        console.log("productImgUrl", productImgUrl);
      })
      .then(() => {
        console.log("hey its createListing");
        createListing(
          userId,
          ProductName,
          productPrice,
          productDescription,
          productImgUrl,
        );
      });
  };

  // TODO : see if we need to create specific ID associated to pictures
  uploadImage = () => {
    const file = this.inputProductImage.files[0];

    return storageRef
      .ref()
      .child(`${file.name}`)
      .put(file)
      .then(() =>
        storageRef
          .ref()
          .child(`${file.name}`)
          .getDownloadURL(),
      );
  };

  render() {
    return (
      <Grid id="sellProductForm">
        <Row>
          <Col md={12}>
            <Form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Product Name</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductName = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductPrice = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductDescription = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />
                <ControlLabel>Image</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputProductImage = r;
                  }}
                  type="file"
                />
              </FormGroup>
            </Form>

            <LinkContainer to="/accountPage">
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
