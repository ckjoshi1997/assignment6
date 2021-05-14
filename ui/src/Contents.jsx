import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ItemList from './ItemList.jsx';
import ItemEdit from './ItemEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/items" />
      <Route path="/items" component={ItemList} />
      <Route path="/edit/:id" component={ItemEdit} />
      <Route component={NotFound} />
    </Switch>
  );
}
