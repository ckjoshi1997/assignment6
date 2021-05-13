import React from 'react';
import {
  Navbar, Nav, NavItem,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import ItemAddNavItem from './ItemAddNavItem.jsx';

function NavBar() {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>Item Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/items">
          <NavItem>Item List</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <ItemAddNavItem />
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/vasansr/pro-mern-stack-2">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}
