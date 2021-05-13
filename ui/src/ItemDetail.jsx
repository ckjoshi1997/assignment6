import React from 'react';

import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

export default class ItemDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      item: {},
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };

    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
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

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query item($id: Int!) {
      item (id: $id) {
        id description image
      }
    }`;

    const data = await graphQLFetch(query, { id }, this.showError);
    if (data) {
      this.setState({ item: data.item });
    } else {
      this.setState({ item: {} });
    }
  }

  render() {
    const { item: { description, image } } = this.state;
    const { toastVisible, toastType, toastMessage } = this.state;
    return (
      <div>
        <img
          src={image}
          alt="new"
        />
        <h3>Description</h3>
        <pre>{description}</pre>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </div>
    );
  }
}
