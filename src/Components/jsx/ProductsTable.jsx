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
import ReactModal from "react-modal";
import { LinkContainer } from "react-router-bootstrap";
import "../css/ProductsTable.css";
import {
  getItemDescription,
  allListings,
  buy,
  searchForListings
} from "../../backend-mockup";

console.log(2 + 2);

class ProductTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      descriptions: []
    };
  }

  updateDescriptionsState = () => {
    console.log("initial", this.state.descriptions);
    this.getAlldescription().then(result =>
      this.setState({ descriptions: result }, () =>
        console.log("second state", this.state.descriptions)
      )
    );
  };

  componentWillMount() {
    console.log("cwm", this.state.descriptions);
    this.updateDescriptionsState();
  }

  componentWillReceiveProps(nextProps) {
    console.log("willreceiveprops", this.state.descriptions);
    this.updateDescriptionsState();
  }
  getAlldescription = async () => {
    // an array of available listing IDs
    const ids = await searchForListings(this.props.searchTerm);
    console.log("ids", ids);
    // an array of available listing full description
    const descriptionsArray = Promise.all(
      ids.map(async id => await getItemDescription(id))
    );

    return descriptionsArray;
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  initializeBuy = (x, y) => {
    buy(this.props.currentUserId, x, y)
      .then(() => this.handleOpenModal())
      .then(() => this.getAlldescription())
      .then(result => this.setState({ descriptions: result }));
  };
  displayProducts = () => {
    // iterate through array of descrpition object to populate an array of html elements
    console.log("this state desc", this.state.descriptions);

    const htmlDescription = this.state.descriptions.map((desc, i) => (
      <div key={i}>
        <Jumbotron>
          <h3>{desc.productName}</h3>
          <h4>Price: {desc.price}</h4>
          <h4>Description: {desc.blurb}</h4>
          <h4>Item id: {desc.listingID}</h4>
          <img src={desc.imageUrl} alt="" />
          <Button
            bsStyle="primary"
            onClick={() => this.initializeBuy(desc.sellerID, desc.listingID)}
          >
            Buy
          </Button>
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
          <ReactModal
            isOpen={this.state.showModal}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)"
              }
            }}
          >
            <h3>Congrats! Your buy was successful.</h3>
            <Button bsStyle="primary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </ReactModal>
        </div>
      </Grid>
    );
  }
}
export default ProductTables;
