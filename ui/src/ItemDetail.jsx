import React from 'react';

export default function ItemDetail({ item }) {
  if (item) {
    return (
      <div>
        <h3>Description</h3>
        <pre>{item.description}</pre>
        <img
          src={item.image}
          alt="new"
        />
      </div>
    );
  }
  return null;
}
