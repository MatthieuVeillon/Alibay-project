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
import {ReactModal} from "react-modal";

import {LinkContainer} from "react-router-bootstrap";
import "../css/ProductsTable.css";
import {getItemDescription, allListings, buy} from "../../backend-mockup";

class ProductTables extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

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
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
          <h4>Item id: {desc.listingID}</h4>

          {/* buy(this.props.currentUserId, desc.sellerID, desc.listingID) */}
        </Jumbotron>
      </div>
    ));

    return htmlDescription;
  };

  render() {
    return (
      <Grid>
        <Row>{this.displayProducts()}</Row>
        <div>
          <button onClick={this.handleOpenModal}>Buy</button>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <button onClick={this.handleCloseModal}>Close</button>
          </ReactModal>
        </div>
      </Grid>
    );
  }
}
export default ProductTables;
