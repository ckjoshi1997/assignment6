/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button, Alert,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ItemEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      showingValidation: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      item: { ...prevState.item, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showValidation();
    const { item, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation itemUpdate(
      $id: Int!
      $changes: ItemUpdateInputs!
    ) {
      itemUpdate(
        id: $id
        changes: $changes
      ) {
        id name category image
        price description
      }
    }`;
    const { id, created, ...changes } = item;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ item: data.itemUpdate });
      alert('Updated item successfully'); // eslint-disable-line no-alert
    }
  }

  async loadData() {
    const query = `query item($id: Int!) {
      item(id: $id) {
        id name category image
        price description
      }
    }`;
    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ item: data ? data.item : {}, invalidFields: {} });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  render() {
    const { item: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Item with ID ${propsId} not found.`}</h3>;
      }
      return <h3>No propsId found</h3>;
    }

    const { invalidFields, showingValidation } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Please correct invalid fields before submitting.
        </Alert>
      );
    }

    const { item: { name, category } } = this.state;
    const { item: { image, price, description } } = this.state;

    return (
      // <React.Fragment>
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>Category</Col>
          <Col sm={9}>
            <FormControl
              componentClass="select"
              name="category"
              value={category}
              onChange={this.onChange}
            >
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirts</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>Image</Col>
          <Col sm={9}>
            <FormControl
              componentClass={TextInput}
              name="image"
              value={image}
              onChange={this.onChange}
              key={id}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>Price</Col>
          <Col sm={9}>
            <FormControl
              componentClass={NumInput}
              name="price"
              value={price}
              onChange={this.onChange}
              key={id}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>Name</Col>
          <Col sm={9}>
            <FormControl
              componentClass={TextInput}
              size={50}
              name="name"
              value={name}
              onChange={this.onChange}
              key={id}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>Description</Col>
          <Col sm={9}>
            <FormControl
              componentClass={TextInput}
              tag="textarea"
              rows={4}
              cols={50}
              name="description"
              value={description}
              onChange={this.onChange}
              key={id}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={6}>
            <ButtonToolbar>
              <Button bsStyle="primary" type="submit">Submit</Button>
              <LinkContainer to="/items">
                <Button bsStyle="link">Back</Button>
              </LinkContainer>
            </ButtonToolbar>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={9}>{validationMessage}</Col>
        </FormGroup>
      </Form>
    );
  }
}
