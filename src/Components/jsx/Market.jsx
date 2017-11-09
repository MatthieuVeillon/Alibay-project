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
  DropdownButton,
  InputGroup,
} from "react-bootstrap";
import "../css/Market.css";
import ProductsTable from "./ProductsTable";
import ReactModal from "react-modal";

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  searchClick = () => {
    this.setState({searchTerm: this.searchTerm.value});
  };
  render() {
    return (
      <Grid className="componentHeader">
        <Row>
          <Col md={12}>
            <h1>Search products</h1>
            <p>Instantly find products you need from a variety of vendors.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form>
              <FormGroup bsSize="large">
                <InputGroup>
                  <FormControl
                    inputRef={ref => {
                      this.searchTerm = ref;
                    }}
                    type="text"
                    placeholder="Enter product"
                  />
                  <InputGroup.Button>
                    <Button bsSize="large" onClick={this.searchClick}>
                      Search
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ProductsTable
              searchTerm={this.state.searchTerm}
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
