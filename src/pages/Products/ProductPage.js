import { useNavigate, useParams } from 'react-router';
import { useAuth, useData } from '../../context/';
import styles from './ProductPage.module.css';
import axios from 'axios';
import { Error404 } from '../Error/Error404';

export function ProductPage() {
  const { productID } = useParams();
  const { products, cart, wishlist, dataDispatch } = useData();
  const navigate = useNavigate();
  const product = products?.find((product) => product._id === productID);
  const { token } = useAuth();

  if (!product) {
    return <Error404 />;
  }

  const { _id: id, name, image, price } = product;
  const isInCart = cart?.find((cartItem) => cartItem._id === id);
  const isInWishlist = wishlist?.find((wishlistItem) => wishlistItem._id === id);

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
    <div className={styles.productPageContainer}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>
            <h2>{name}</h2>
          </div>
          <div className={styles.subHeading}>
            <h3>Multi-Ground Football Boot</h3>
          </div>
        </div>
        <div className={styles.priceActionContainer}>
          <div className={styles.price}>
            <span>₹ {price}</span>
            <span>inclusive of all taxes</span>
          </div>
          <div className={styles.action}>
            <button className="btn btn-primary" onClick={() => (token ? (isInCart ? navigate('/cart') : addToCart(id)) : navigate('/login'))}>
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </button>
            <button className="btn btn-primary-outline" onClick={() => (token ? toggleFavourite(id) : navigate('/login'))}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
