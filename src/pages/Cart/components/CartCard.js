import axios from 'axios';
import { useData } from '../../../context';
import styles from './CartCard.module.css';

export function CartCard({ cartItem }) {
  const { _id: id, image, name, price, qty: quantity } = cartItem;
  const { dataDispatch, wishlist } = useData();
  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem._id === id);

  /**
   * FIXME: Remove and toggleFav not working
   */
  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`https://shoemeup.pranshudobhal.repl.co/cart/${id}`, { userID: 124 });
      if (response.status === 200) {
        dataDispatch({ type: 'REMOVE_FROM_CART', payload: cartItem });
      }
    } catch (error) {
      console.error('Error deleting product from cart ', error);
    }
  };

  const toggleFavourite = async (id) => {
    try {
      let response;
      if (isInWishlist) {
        response = await axios.delete(`https://shoemeup.pranshudobhal.repl.co/wishlist/${id}`, { userID: 124 });
      } else {
        response = await axios.post('https://shoemeup.pranshudobhal.repl.co/wishlist', { userID: 124, product: { _id: id } });
      }

      if (response.status === 200) {
        dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: cartItem });
      }
    } catch (error) {
      console.error('Error adding to wishlist ', error);
    }
  };

  return (
    <div className={`card card-horizontal ${styles.card}`} style={{ maxWidth: '600px' }}>
      <div className={`card-header ${styles.cardHeader}`}>
        <img className="img-responsive" src={image} alt={name} />
      </div>
      <div className={`card-body ${styles.cardBodyOverride}`}>
        <div className="card-details">
          <h5 className={`${styles.cardPrice}`}>{name}</h5>
          <p className="card-text">Football Boot</p>
          <div className="card-text">
            <div className={`select ${styles.customSelect}`}></div>
            <label htmlFor="size">Size</label>
            <select name="size" id="size" style={{ height: 'auto' }}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <div className={`select ${styles.customSelect1}`}></div>
            <label htmlFor="quantity">Quantity</label>
            <select
              onChange={(e) =>
                dataDispatch({
                  type: 'UPDATE_QUANTITY_IN_CART',
                  payload: { cartItemID: id, value: e.target.value },
                })
              }
              name="quantity"
              id="quantity"
              value={quantity}
              style={{ height: 'auto' }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              {quantity}
            </select>
          </div>
          <button className="btn btn-primary-text" onClick={() => removeFromCart(id)}>
            Remove
          </button>
          <button className="btn btn-primary-text" onClick={() => toggleFavourite(id)}>
            {!isInWishlist ? 'Add to Favorites' : 'Remove from Favorites'}
          </button>
        </div>
        <div className={styles.cardPrice}>₹{price * quantity}</div>
      </div>
    </div>
  );
}
