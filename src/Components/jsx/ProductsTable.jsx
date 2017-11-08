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
} from "react-bootstrap";

import {LinkContainer} from "react-router-bootstrap";
import "../css/ProductsTable.css";
import {getItemDescription, allListings} from "../../backend-mockup";

class ProductTables extends Component {
  getAlldescription = () => {
    // an array of available listing IDs
    const ids = allListings();
    // an array of available listing full description
    const descriptionsArray = ids.map(id => getItemDescription(id));

    return descriptionsArray;
  };

  displayProducts = () => {
    const descriptions = this.getAlldescription();
    // iterate through array of descrpition object to populate an array of html elements
    const htmlDescription = descriptions.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Seller id: {desc.sellerId}</h4>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
          <h4>Item id: {desc.listingID}</h4>

          <LinkContainer to="/buy">
            <Button onClick={this.purchaseClick} bsStyle="primary">
              Buy
            </Button>
          </LinkContainer>
        </Jumbotron>
      </div>
    ));

    return htmlDescription;
  };

  render() {
    return (
      <Grid>
        <Row>{this.displayProducts()}</Row>
      </Grid>
    );
  }
}

export default ProductTables;
