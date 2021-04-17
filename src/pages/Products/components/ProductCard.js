import { useData } from '../../../context';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';

export function ProductCard({ product, setRoute }) {
  const { id, image, productName, name, price } = product;
  const { dataDispatch, cart, wishlist } = useData();
  const navigate = useNavigate();

  const isInCart = cart.find((cartItem) => cartItem.id === id);

  const inWishlist = wishlist.find((wishlistItem) => wishlistItem.id === id);

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`}>
        <img src={image} alt={productName} />
        <span className={`${styles.cardHeaderSpan}`} onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product })}>
          {inWishlist ? <FavoriteIcon style={{ color: '#ff3f6c' }} /> : <FavoriteBorderIcon />}
        </span>
      </div>
      <div className="card-body">
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
                  payload: product,
                })
          }
        >
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
