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
          <LinkContainer to="/market">
            <Button
              onClick={() =>
                buy(this.props.currentUserId, desc.sellerID, desc.listingID)
              }
              bsStyle="primary"
            >
              Buy
            </Button>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              style={{
                overlay: {
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                },
                content: {
                  margin: "100px",
                },
              }}
            >
              <h2>Congrats for your purchase!</h2>
              <button onClick={this.handleCloseModal}>Close</button>
            </ReactModal>
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
