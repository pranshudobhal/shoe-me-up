import { useData } from '../../../context';

export default function ProductCard({ product, setRoute }) {
  const { id, image, productName, name, price, inStock, fastDelivery, level } = product;
  const { dataDispatch, cart, wishlist } = useData();

  function toggleAddOrRemoveToCart() {
    if (cart.find((cartItem) => cartItem.id === id)) {
      return <button onClick={() => setRoute('cart')}>Go to Cart</button>;
    } else {
      return (
        <button
          onClick={() =>
            dataDispatch({
              type: 'ADD_TO_CART',
              payload: product,
            })
          }
        >
          Add to Cart
        </button>
      );
    }
  }

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
      <img src={image} width="100%" height="auto" alt={productName} /> <h3> {name} </h3> <div> Rs. {price} </div> {inStock && <div> In Stock </div>} {!inStock && <div> Out of Stock </div>} <div> {level} </div> {fastDelivery ? <div> Fast Delivery </div> : <div> 3 days minimum </div>}
      {toggleAddOrRemoveToCart()}
      <button onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product })}>{toggleFavourites()}</button>
    </div>
  );
}
