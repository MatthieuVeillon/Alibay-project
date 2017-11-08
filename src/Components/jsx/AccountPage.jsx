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
import {allItemsSold, getItemDescription} from "../../backend-mockup";

class AccountPage extends Component {
  // getAllDescriptionSold = sellerId => {
  //   // an array of sold listing IDs
  //   const ids = allItemsSold(sellerId);
  //   // an array of sold listing full description
  //   const descriptionsArray = ids.map(id => getItemDescription(id));

  //   return descriptionsArray;
  // };
  displaySold = sellerId => {
    console.log(sellerId);
    /* const descriptions = this.getAllDescriptionSold(sellerId);
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

    return htmlDescription; */
  };
  render() {
    return (
      <Grid className="componentHeader">
        <Row>
          <Col xs={12}>
            <h1>Hello id {this.props.userId}</h1>
            <h2>Products sold:</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>{this.displaySold(this.props.userId)}</Col>
        </Row>
      </Grid>
    );
  }
}

export default AccountPage;
