import { useData } from '../../../context';
import styles from '../../Products/components/ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function WishlistCard({ wishlistItem }) {
  const { _id: id, image, name, price } = wishlistItem;
  const { dataDispatch, wishlist, cart } = useData();
  const isInCart = cart.find((cartItem) => cartItem._id === id);
  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem._id === id);
  const navigate = useNavigate();

  const addToCart = async (id) => {
    try {
      const response = await axios.post('https://shoemeup.pranshudobhal.repl.co/cart', { product: { _id: id } });
      if (response.status === 200) {
        dataDispatch({ type: 'ADD_TO_CART', payload: wishlistItem });
      }
    } catch (error) {
      console.error('Error adding to cart ', error);
    }
  };

  const toggleFavourite = async (id) => {
    try {
      let response;

      if (isInWishlist) {
        response = await axios.delete(`https://shoemeup.pranshudobhal.repl.co/wishlist/${id}`);
      } else {
        response = await axios.post('https://shoemeup.pranshudobhal.repl.co/wishlist', { product: { _id: id } });
      }

      if (response.status === 200) {
        dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: wishlistItem });
      }
    } catch (error) {
      console.error('Error adding to wishlist ', error);
    }
  };

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`} onClick={() => navigate(`/${id}`)}>
        <img src={image} alt={name} />
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(id);
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

        <button className="btn btn-primary" onClick={() => (isInCart ? navigate('/cart') : addToCart(id))}>
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
