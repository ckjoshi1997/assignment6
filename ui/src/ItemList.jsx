import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import ItemFilter from './ItemFilter.jsx';
import ItemTable from './ItemTable.jsx';
import ItemDetail from './ItemDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';

export default class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    // this.closeItem = this.closeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('category')) vars.category = params.get('category');

    const priceMin = parseInt(params.get('priceMin'), 10);
    if (!Number.isNaN(priceMin)) vars.priceMin = priceMin;
    const priceMax = parseInt(params.get('priceMax'), 10);
    if (!Number.isNaN(priceMax)) vars.priceMax = priceMax;

    const query = `query itemList(
      $category: CategoryType
      $priceMin: Float
      $priceMax: Float
    ) {
      itemList(
        category: $category
        priceMin: $priceMin
        priceMax: $priceMax
      ) {
        id name category image
        price
      }
    }`;

    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      this.setState({ items: data.itemList });
    }
  }

  async deleteItem(index) {
    const query = `mutation itemDelete($id: Int!) {
      itemDelete(id: $id)
    }`;
    const { items } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = items[index];
    const data = await graphQLFetch(query, { id }, this.showError);
    if (data && data.itemDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.items];
        if (pathname === `/items/${id}`) {
          history.push({ pathname: '/items', search });
        }
        newList.splice(index, 1);
        return { items: newList };
      });
      this.showSuccess(`Deleted item ${id} successfully.`);
    } else {
      this.loadData();
    }
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { items } = this.state;
    const { toastVisible, toastType, toastMessage } = this.state;
    const { match } = this.props;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ItemFilter />
          </Panel.Body>
        </Panel>
        <ItemTable
          items={items}
          deleteItem={this.deleteItem}
        />
        <Route path={`${match.path}/:id`} component={ItemDetail} />
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}
