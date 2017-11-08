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
import ReactModal from "react-modal";
import "../css/Sell.css";
import {createListing} from "../../backend-mockup";

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = () => {
    this.setState({showModal: true});
  };

  handleCloseModal = () => {
    this.setState({showModal: false});
  };
  clickSellProduct = () => {
    this.handleOpenModal();
    console.log(this.props.products);
    // const buyerId = this.inputBuyerId.value;
    // const sellerID = this.inputProductPrice.value;
    // const listingID = this.inputProductDescription.value;
    // buy(buyerId, sellerID, listingID)
  };

  render() {
    return (
      <Grid id="sellProductForm">
        <Row>
          <Col xs={12}>
            <h2>Enter ID to proceed to checkout</h2>
            <Form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>UserId</ControlLabel>
                <FormControl
                  inputRef={r => {
                    this.inputBuyerId = r;
                  }}
                  type="text"
                  placeholder="Enter text"
                />
              </FormGroup>
            </Form>

            <div>
              <Button bsStyle="primary" onClick={this.clickSellProduct}>
                Finalize purchase
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
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Buy;