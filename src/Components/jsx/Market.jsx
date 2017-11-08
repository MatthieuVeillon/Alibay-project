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
import ReactModal from "react-modal";

class Market extends Component {
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
            <ProductsTable
              currentUserId={this.props.currentUserId}
              products={this.props.products}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Market;
