import { useData } from '../../context';
import WishlistCard from './components/WishlistCard';
import styles from './Wishlist.module.css';
import { useNavigate } from 'react-router';

export function Wishlist() {
  const { wishlist } = useData();

  const navigate = useNavigate();

  return (
    <div>
      {wishlist.length === 0 ? '' : <h1 className={styles.pageName}>Wishlist</h1>}
      {wishlist.length === 0 ? (
        <div className={styles.emptyWishlist}>
          <h3>YOUR WISHLIST IS EMPTY</h3>
          <p>Save your favorite pieces of shoes in one place. Add now, buy later.</p>
          <button className="btn btn-secondary-outline" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          {wishlist.map((wishlistItem) => {
            return <WishlistCard wishlistItem={wishlistItem} />;
          })}
        </div>
      )}
    </div>
  );
}
