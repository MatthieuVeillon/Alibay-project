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
import "../css/ProductsTable.css";
import {getItemDescription} from "../../backend-mockup";

class ProductTables extends Component {
  displayProducts = (product, i) => {
    console.log(product);

    return (
      <div key={i}>
        <Jumbotron>
          <h3>{product.productName}</h3>
          <h4>Price: {product.price}</h4>
          <h4>Description: {product.blurb}</h4>
        </Jumbotron>
      </div>
    );
  };

  render() {
    return (
      <Grid>
        <Row>
          {this.props.products.map(x =>
            this.displayProducts(getItemDescription(x.listingID)),
          )}
        </Row>
      </Grid>
    );
  }
}

export default ProductTables;
