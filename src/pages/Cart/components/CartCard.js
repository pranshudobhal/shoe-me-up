import { useData } from '../../../context';
import styles from './CartCard.module.css';

export function CartCard({ cartItem }) {
  const { id, image, name, price } = cartItem;

  const { dataDispatch, wishlist } = useData();

  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem.id === id);

  return (
    <div className={`card card-horizontal ${styles.card}`}>
      <div className="card-header">
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
            <select name="quantity" id="quantity" style={{ height: 'auto' }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button className="btn btn-primary-text" onClick={() => dataDispatch({ type: 'REMOVE_FROM_CART', payload: cartItem })}>
            Remove
          </button>
          <button className="btn btn-primary-text" onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: cartItem })}>
            {!isInWishlist ? 'Move to Favorites' : 'Remove from Favorites'}
          </button>
        </div>
        <div className={styles.cardPrice}>₹{price}</div>
      </div>
    </div>
  );
}
