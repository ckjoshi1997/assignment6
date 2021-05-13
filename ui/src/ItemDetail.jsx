import React from 'react';
import graphQLFetch from './graphQLFetch.js';

export default class ItemDetail extends React.Component {
  constructor() {
    super();
    this.state = { item: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query item($id: Int!) {
      item (id: $id) {
        id description
      }
    }`;
    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ item: data.item });
    } else {
      this.setState({ item: {} });
    }
  }

  render() {
    const { item: { description } } = this.state;
    return (
      <div>
        <h3>Description</h3>
        <pre>{description}</pre>
      </div>
    );
  }
}
