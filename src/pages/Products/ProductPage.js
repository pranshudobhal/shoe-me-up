import { useNavigate, useParams } from 'react-router';
import { useAuth, useData } from '../../context/';
import styles from './ProductPage.module.css';
import { Error404 } from '../Error/Error404';
import { addToCart, toggleFavourite } from '../../services';

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
            <button className="btn btn-primary" onClick={() => (token ? (isInCart ? navigate('/cart') : addToCart(id, dataDispatch, product)) : navigate('/login'))}>
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </button>
            <button className="btn btn-primary-outline" onClick={() => (token ? toggleFavourite(id, isInWishlist, dataDispatch, product) : navigate('/login'))}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
