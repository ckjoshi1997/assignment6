
/* eslint "react/jsx-no-undef": "off" */

import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

import ItemFilter from './ItemFilter.jsx';
import ItemTable from './ItemTable.jsx';
import ItemAdd from './ItemAdd.jsx';
import ItemDetail from './ItemDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

// list class
export default class ItemList extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
      $category: ItemType
      $priceMin: Float
      $priceMax: Float
    ) {
      itemList(
        category: $category
        priceMin: $priceMin
        priceMax: $priceMax
      ) {
        id category name price image
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ items: data.itemList });
    }
  }

  // create item and add to graphql
  async createItem(item) {
    const query = `mutation {
        itemAdd(item:{
            name: "${item.name}",
            category: ${item.category},
            price: ${item.price},
            image: "${item.image}", 
        }) {
                id
            }
        }`;

    const data = await graphQLFetch(query, { item });
    if (data) {
      this.loadData();
    }
  }

  async deleteItem(index) {
    const query = `mutation itemDelete($id: Int!) {
      itemDelete(id: $id)
    }`;
    const { items } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = items[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.itemDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.items];
        if (pathname === `/items/${id}`) {
          history.push({ pathname: '/items', search });
        }
        newList.splice(index, 1);
        return { items: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { items } = this.state;
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
        <ItemTable items={items} deleteItem={this.deleteItem} />
        <ItemAdd createItem={this.createItem} />
        <Route path={`${match.path}/:id`} component={ItemDetail} />
      </React.Fragment>
    );
  }
}
