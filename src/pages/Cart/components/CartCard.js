import { useNavigate } from 'react-router';
import { useData } from '../../../context';
import { removeFromCart, updateQuantityInCart, toggleFavourite } from '../../../services';
import styles from './CartCard.module.css';

export function CartCard({ cartItem }) {
  const { _id: id, image, name, price, qty: quantity } = cartItem;
  const { dataDispatch, wishlist } = useData();
  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem._id === id);
  const navigate = useNavigate();

  return (
    <div className={`card card-horizontal ${styles.card}`} style={{ maxWidth: '600px' }}>
      <div className={`card-header ${styles.cardHeader}`} onClick={() => navigate(`/${id}`)}>
        <img className="img-responsive" src={image} alt={name} />
      </div>
      <div className={`card-body ${styles.cardBodyOverride}`}>
        <div className="card-details">
          <h5 className={`${styles.cardPrice}`} onClick={() => navigate(`/${id}`)}>
            {name}
          </h5>
          <p className="card-text" onClick={() => navigate(`/${id}`)}>
            Football Boot
          </p>
          <div className="card-text" style={{ maxWidth: 'fit-content' }}>
            <div className={`select ${styles.customSelect}`}></div>
            {/* <label htmlFor="size">Size</label>
            <select name="size" id="size" style={{ height: 'auto' }}>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select> */}
            {/* <div className={`select ${styles.customSelect1}`}></div> */}
            <label htmlFor="quantity">Quantity</label>
            <select onChange={(e) => updateQuantityInCart(e, id, dataDispatch)} name="quantity" id="quantity" value={quantity} style={{ height: 'auto' }}>
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
          <button className="btn btn-primary-text" onClick={() => removeFromCart(id, dataDispatch, cartItem)}>
            Remove
          </button>
          <button className="btn btn-primary-text" style={{ textAlign: 'left' }} onClick={() => toggleFavourite(id, isInWishlist, dataDispatch, cartItem)}>
            {!isInWishlist ? 'Add to Favorites' : 'Remove from Favorites'}
          </button>
        </div>
        <div className={styles.cardPrice}>₹{price * quantity}</div>
      </div>
    </div>
  );
}
