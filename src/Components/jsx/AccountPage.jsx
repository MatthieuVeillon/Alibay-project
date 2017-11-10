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

import {
  allItemsSold,
  getItemDescription,
  allItemsBought
} from "../../backend-mockup.js";

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      descriptionsSold: "no product sold",
      descriptionsBought: "no product bought"
    };
  }

  // update the state as an array of ID which match the seller ID
  updateDescriptionState = userId => {
    console.log("userId in update Desc", userId);
    this.getAllDescriptionSold(userId).then(descriptionsSold =>
      this.setState({ descriptionsSold: descriptionsSold })
    );
    this.getAllDescriptionBought(userId).then(descriptionsBought =>
      this.setState(
        { descriptionsBought: descriptionsBought },
        console.log("descriptionsBought step 1", descriptionsBought)
      )
    );
  };

  //
  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentUserId !== prevProps.currentUserId)
      this.updateDescriptionState(this.props.currentUserId);
  }

  componentDidMount() {
    this.updateDescriptionState(this.props.currentUserId);
    console.log("seller ID as a props", this.props.currentUserId);
  }

  getAllDescriptionSold = async userId => {
    // an array of sold listing IDs
    const ids = await allItemsSold(userId);

    // an array of sold listing full description

    if (!userId || ids[0] === "initial state") {
      return this.state.descriptionsSold;
    }

    const descriptionsArray = Promise.all(
      ids.map(async id => await getItemDescription(id))
    );
    descriptionsArray.then(x => console.log("descriptionsArray is ?", x));

    return descriptionsArray;
  };

  displaySold = userId => {
    if (typeof this.state.descriptionsSold === "string") {
      return (
        <div>
          <Jumbotron>
            <h3>No object sold yet</h3>
          </Jumbotron>
        </div>
      );
    }
    // iterate through array of descrpition object to populate an array of html elements
    const htmlDescription = this.state.descriptionsSold.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
          <img src={desc.imageUrl} alt="" />
        </Jumbotron>
      </div>
    ));

    return htmlDescription;
  };
  getAllDescriptionBought = async userId => {
    // an array of sold listing IDs
    const ids = await allItemsBought(userId);
    // an array of sold listing full description

    if (!userId || ids[0] === "initial state") {
      // check if array does not exist, or is not an array, or is empty
      return this.state.descriptionsSold;
    }

    const descriptionsArray = Promise.all(
      ids.map(async id => await getItemDescription(id))
    );

    return descriptionsArray;
  };

  displayBought = userId => {
    if (typeof this.state.descriptionsBought === "string") {
      return (
        <div>
          <Jumbotron>
            <h3>No object bought yet</h3>
          </Jumbotron>
        </div>
      );
    }
    // iterate through array of descrpition object to populate an array of html elements
    const htmlDescription = this.state.descriptionsBought.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
          <img src={desc.imageUrl} alt="" />
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
