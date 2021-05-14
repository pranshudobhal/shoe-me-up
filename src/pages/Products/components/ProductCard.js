import { useData } from '../../../context';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';
import axios from 'axios';

export function ProductCard({ product }) {
  const { _id: id, image, productName, name, price } = product;
  const { dataDispatch, cart, wishlist } = useData();
  const navigate = useNavigate();
  const isInCart = cart?.find((cartItem) => cartItem._id === id);
  const inWishlist = wishlist?.find((wishlistItem) => wishlistItem._id === id);

  const addToCart = async (id) => {
    try {
      const response = await axios.post('https://shoemeup.pranshudobhal.repl.co/cart', { userID: 124, product: { _id: id } });
      if (response.status === 200) {
        dataDispatch({ type: 'ADD_TO_CART', payload: product });
      }
    } catch (error) {
      console.error('Error adding to cart ', error);
    }
  };

  const addToFavourite = async (id) => {
    try {
      const response = await axios.post('https://shoemeup.pranshudobhal.repl.co/wishlist', { userID: 124, product: { _id: id } });
      if (response.status === 200) {
        dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product });
      }
    } catch (error) {
      console.error('Error adding to wishlist ', error);
    }
  };

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`}>
        <img src={image} alt={productName} />
        <span className={`${styles.cardHeaderSpan}`} onClick={() => addToFavourite(id)}>
          {inWishlist ? <FavoriteIcon style={{ color: '#ff3f6c' }} /> : <FavoriteBorderIcon />}
        </span>
      </div>
      <div className={`card-body ${styles.cardBodyOverride}`}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Multi-Ground Football Boot</p>
        <div className="card-price">₹ {price}</div>

        <button className="btn btn-primary" onClick={() => (isInCart ? navigate('/cart') : addToCart(id))}>
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
