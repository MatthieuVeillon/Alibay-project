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
import "../css/Account.css";
import {
  allItemsSold,
  getItemDescription,
  allItemsBought,
} from "../../backend-mockup";

class AccountPage extends Component {
  getAllDescriptionSold = sellerId => {
    // an array of sold listing IDs
    const ids = allItemsSold(sellerId);
    // an array of sold listing full description

    if (!Array.isArray(ids) || !ids.length) {
      // check if array does not exist, or is not an array, or is empty
      const noProductSold = "no object sold yet";

      return noProductSold;
    }

    const descriptionsArray = ids.map(id => getItemDescription(id));

    return descriptionsArray;
  };
  displaySold = sellerId => {
    const descriptions = this.getAllDescriptionSold(sellerId);

    if (typeof descriptions === "string") {
      return (
        <div>
          <Jumbotron>
            <h3>No object sold yet</h3>
          </Jumbotron>
        </div>
      );
    }
    // iterate through array of descrpition object to populate an array of html elements
    const htmlDescription = descriptions.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
        </Jumbotron>
      </div>
    ));

    return htmlDescription;
  };
  getAllDescriptionBought = sellerId => {
    // an array of sold listing IDs
    const ids = allItemsBought(sellerId);
    // an array of sold listing full description

    if (!Array.isArray(ids) || !ids.length) {
      // check if array does not exist, or is not an array, or is empty
      const noProductBought = "no object bought yet";

      return noProductBought;
    }

    const descriptionsArray = ids.map(id => getItemDescription(id));

    return descriptionsArray;
  };
  displayBought = sellerId => {
    const descriptions = this.getAllDescriptionBought(sellerId);

    if (typeof descriptions === "string") {
      return (
        <div>
          <Jumbotron>
            <h3>No object bought yet</h3>
          </Jumbotron>
        </div>
      );
    }
    // iterate through array of descrpition object to populate an array of html elements
    const htmlDescription = descriptions.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
        </Jumbotron>
      </div>
    ));

    return htmlDescription;
  };
  render() {
    return (
      <Grid className="componentHeader">
        <Row>
          <Col md={12}>
            <h1>Hello id {this.props.currentUserId}</h1>
          </Col>
          <Col md={6}>
            <h2>Products sold:</h2>
          </Col>
          <Col md={6}>
            <h2>Products bought:</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6}>{this.displaySold(this.props.currentUserId)}</Col>
          <Col md={6}>{this.displayBought(this.props.currentUserId)}</Col>
        </Row>
      </Grid>
    );
  }
}

export default AccountPage;
