import { useAuth, useData } from '../../../context';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';
import { addToCart, addToLocalStorage, toggleFavourite } from '../../../services';

export function ProductCard({ product }) {
  const { _id: id, image, description, name, price } = product;
  const { dataDispatch, cart, wishlist } = useData();
  const navigate = useNavigate();
  const isInCart = cart?.find((cartItem) => cartItem._id === id);
  const isInWishlist = wishlist?.find((wishlistItem) => wishlistItem._id === id);
  const { token } = useAuth();

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

  const isInLocalStorage = cartFromLocalStorage.find((cartItem) => cartItem._id === id);

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`} onClick={() => navigate(`/${id}`)}>
        <img src={image} alt={name} />
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={(e) => {
            e.stopPropagation();
            token ? toggleFavourite(id, isInWishlist, dataDispatch, product) : navigate('/login');
          }}
        >
          {isInWishlist ? <FavoriteIcon style={{ color: '#ff3f6c' }} /> : <FavoriteBorderIcon />}
        </span>
      </div>
      <div className={`card-body ${styles.cardBodyOverride}`}>
        <h5 className="card-title" onClick={() => navigate(`/${id}`)}>
          {name}
        </h5>
        <p className="card-text" onClick={() => navigate(`/${id}`)}>
          {description}
        </p>
        <div className="card-price">₹ {price}</div>

        <button className="btn btn-primary" onClick={() => (token ? (isInCart ? navigate('/cart') : addToCart(id, dataDispatch, product)) : isInLocalStorage ? navigate('/cart') : addToLocalStorage(id, dataDispatch, product))}>
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
