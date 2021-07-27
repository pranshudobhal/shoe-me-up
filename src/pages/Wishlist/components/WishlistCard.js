import { useData } from '../../../context';
import styles from '../../Products/components/ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';
import { addToCart, toggleFavourite } from '../../../services';

export default function WishlistCard({ wishlistItem }) {
  const { _id: id, image, name, price } = wishlistItem;
  const { dataDispatch, wishlist, cart } = useData();
  const isInCart = cart.find((cartItem) => cartItem._id === id);
  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem._id === id);
  const navigate = useNavigate();

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`} onClick={() => navigate(`/${id}`)}>
        <img src={image} alt={name} />
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(id, isInWishlist, dataDispatch, wishlistItem);
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
          Multi-Ground Football Boot
        </p>
        <div className="card-price">₹ {price}</div>

        <button className="btn btn-primary" onClick={() => (isInCart ? navigate('/cart') : addToCart(id, dataDispatch, wishlistItem))}>
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
