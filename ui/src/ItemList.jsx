import React from 'react';
import URLSearchParams from 'url-search-params';
import { Panel } from 'react-bootstrap';

import ItemFilter from './ItemFilter.jsx';
import ItemTable from './ItemTable.jsx';
import ItemDetail from './ItemDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';
import store from './store.js';

export default class ItemList extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = { hasSelection: false, selectedId: 0 };
    if (params.get('category')) vars.category = params.get('category');

    const priceMin = parseFloat(params.get('priceMin'), 10);
    if (!Number.isNaN(priceMin)) vars.priceMin = priceMin;
    const priceMax = parseFloat(params.get('priceMax'), 10);
    if (!Number.isNaN(priceMax)) vars.priceMax = priceMax;

    const { params: { id } } = match;
    const idInt = parseInt(id, 10);
    if (!Number.isNaN(idInt)) {
      vars.hasSelection = true;
      vars.selectedId = idInt;
    }

    const query = `query itemList(
      $category: CategoryType
      $priceMin: Float
      $priceMax: Float
      $hasSelection: Boolean!
      $selectedId: Int!
    ) {
      itemList(
        category: $category
        priceMin: $priceMin
        priceMax: $priceMax
      ) {
        id name category image
        due
      }
      item(id: $selectedId) @include (if : $hasSelection) {
        id description
      }
    }`;

    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor() {
    super();
    const items = store.initialData ? store.initialData.itemList : null;
    const selectedItem = store.initialData
      ? store.initialData.item
      : null;
    delete store.initialData;
    this.state = {
      items,
      selectedItem,
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    this.closeItem = this.closeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    const { items } = this.state;
    if (items == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
      match: { params: { id: prevId } },
    } = prevProps;
    const { location: { search }, match: { params: { id } } } = this.props;
    if (prevSearch !== search || prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search, match } } = this.props;
    const data = await ItemList.fetchData(match, search, this.showError);
    if (data) {
      this.setState({ items: data.itemList, selectedItem: data.item });
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
    if (items == null) return null;

    const { toastVisible, toastType, toastMessage } = this.state;
    const { selectedItem } = this.state;
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
        <ItemDetail item={selectedItem} />
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
