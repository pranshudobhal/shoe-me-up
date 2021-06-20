import { useAuth, useData } from '../../../context';
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
  const isInWishlist = wishlist?.find((wishlistItem) => wishlistItem._id === id);
  const { token } = useAuth();

  const addToCart = async (id) => {
    try {
      // const response = await axios.post('http://localhost:3000/cart', { product: { _id: id } });
      const response = await axios.post('https://shoemeup.pranshudobhal.repl.co/cart', { product: { _id: id } });

      if (response.status === 200) {
        dataDispatch({ type: 'ADD_TO_CART', payload: product });
      }
    } catch (error) {
      console.error('Error adding to cart ', error);
    }
  };

  const toggleFavourite = async (id) => {
    try {
      let response;

      if (isInWishlist) {
        // response = await axios.delete(`http://localhost:3000/wishlist/${id}`);
        response = await axios.delete(`https://shoemeup.pranshudobhal.repl.co/wishlist/${id}`);
      } else {
        // response = await axios.post('http://localhost:3000/wishlist', { product: { _id: id } });
        response = await axios.post('https://shoemeup.pranshudobhal.repl.co/wishlist', { product: { _id: id } });
      }

      if (response.status === 200) {
        dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product });
      }
    } catch (error) {
      console.error('Error adding to wishlist ', error);
    }
  };

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`} onClick={() => navigate(`/${id}`)}>
        <img src={image} alt={productName} />
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={(e) => {
            e.stopPropagation();
            token ? toggleFavourite(id) : navigate('/login');
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

        <button className="btn btn-primary" onClick={() => (token ? (isInCart ? navigate('/cart') : addToCart(id)) : navigate('/login'))}>
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
