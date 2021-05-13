/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint "react/react-in-jsx-scope": "off" */

/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */


// eslint-disable-next-line react/prefer-stateless-function
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(element, document.getElementById('contents'));
