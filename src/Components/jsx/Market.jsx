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
import "../css/Market.css";
import ProductsTable from "./ProductsTable";
import Buy from "./Buy";

class Market extends Component {
  constructor() {
    super();
    this.state = {
      purchaseButtonClicked: false,
    };
  }
  purchaseClick = () => {
    this.setState({purchaseButtonClicked: true});
  };
  componentDidMmount = () => {
    this.setState({purchaseButtonClicked: false});
  };
  render() {
    return (
      <Grid className="componentHeader">
        <Row>
          <Col xs={12}>
            <h1>Search products</h1>
            <p>Instantly find products you need from a variety of vendors.</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form>
              <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
            </Form>
            <ProductsTable products={this.props.products} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Market;
