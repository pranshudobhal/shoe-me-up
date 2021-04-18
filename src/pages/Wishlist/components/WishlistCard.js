import { useData } from '../../../context';
import styles from '../../Products/components/ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';

export default function WishlistCard({ wishlistItem }) {
  const { id, image, productName, name, price } = wishlistItem;

  const { dataDispatch, wishlist, cart } = useData();

  const isInCart = cart.find((cartItem) => cartItem.id === id);

  const inWishlist = wishlist.find((wishlistItem) => wishlistItem.id === id);

  const navigate = useNavigate();

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`}>
        <img src={image} alt={productName} />
        <span className={`${styles.cardHeaderSpan}`} onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: wishlistItem })}>
          {inWishlist ? <FavoriteIcon style={{ color: '#ff3f6c' }} /> : <FavoriteBorderIcon />}
        </span>
      </div>
      <div className={`card-body ${styles.cardBodyOverride}`}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Multi-Ground Football Boot</p>
        <div className="card-price">₹ {price}</div>

        <button
          className="btn btn-primary"
          onClick={() =>
            isInCart
              ? navigate('/cart')
              : dataDispatch({
                  type: 'ADD_TO_CART',
                  payload: wishlistItem,
                })
          }
        >
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
