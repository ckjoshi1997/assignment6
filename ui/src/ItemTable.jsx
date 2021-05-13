import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const ItemRow = withRouter(({
  item, location: { search }, deleteItem, index,
}) => {
  const selectLocation = { pathname: `/items/${item.id}`, search };
  const editTooltip = (
    <Tooltip id="close-tooltip" placement="top">Edit Item</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Item</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteItem(index);
  }

  const tableRow = (
    <tr>
      <td>{item.name}</td>
      <td>{`$${item.price}`}</td>
      <td>{item.category}</td>
      <td>
        <a href={item.image} target="_blank" rel="noreferrer">View</a>
      </td>
      <td>
        <LinkContainer to={`/edit/${item.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );

  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
});

export default function ItemTable({ items, deleteItem }) {
  const itemRows = items.map((item, index) => (
    <ItemRow
      key={item.id}
      item={item}
      // closeItem={closeItem}
      deleteItem={deleteItem}
      index={index}
    />
  ));

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {itemRows}
      </tbody>
    </Table>
  );
}
