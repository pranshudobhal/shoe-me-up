import React from 'react';
import { useData } from './dataContext';

export default function CartCard({ wishlistItem }) {
  const { id, image, productName, name, price, level } = wishlistItem;

  const { dataDispatch } = useData();

  return (
    <div
      key={id}
      style={{
        border: '1px solid #4B5563',
        borderRadius: '0 0 0.5rem 0.5rem',
        margin: '1rem',
        maxWidth: '30%',
        padding: '0 0 1rem',
      }}
    >
      <img src={image} width="100%" height="auto" alt={productName} />
      <h3> {name} </h3>
      <div> Rs. {price} </div>
      <div> {level} </div>
      <button onClick={() => dataDispatch({ type: 'ADD_TO_CART', payload: wishlistItem })}>Add to Cart</button>
    </div>
  );
}
