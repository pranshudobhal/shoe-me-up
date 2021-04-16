import { useData } from '../../../context';

export default function CartCard({ cartItem }) {
  const { id, image, productName, name, price, level, quantity } = cartItem;

  const { dataDispatch, wishlist } = useData();

  function toggleFavourites() {
    if (wishlist.find((wishlistItem) => wishlistItem.id === id)) {
      return `Remove to Favourites`;
    } else {
      return `Add to Favourites`;
    }
  }

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
      <button onClick={() => dataDispatch({ type: 'DECREMENT_IN_CART', payload: cartItem })}>-</button>
      <span>Quantity {quantity}</span>
      <button disabled={quantity >= 9} onClick={() => dataDispatch({ type: 'INCREMENT_IN_CART', payload: cartItem })}>
        +
      </button>
      <br />
      <button onClick={() => dataDispatch({ type: 'REMOVE_FROM_CART', payload: cartItem })}>Remove</button>
      <button onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: cartItem })}>{toggleFavourites()}</button>
    </div>
  );
}
