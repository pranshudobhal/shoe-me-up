import { useData } from '../../context';
import WishlistCard from './components/WishlistCard';
import styles from './Wishlist.module.css';
import { useNavigate } from 'react-router';

export function Wishlist() {
  const { wishlist } = useData();

  const wishlistLength = wishlist.length;

  const wishlistLengthText = wishlistLength > 1 ? 'Items' : 'Item';

  const navigate = useNavigate();

  return (
    <div className={styles.wishlistContainer}>
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
          <div className={styles.pageTitle}>
            <h1 className={styles.pageName}>Wishlist</h1>
            <div className={styles.wishlistOverall}>
              <span>
                {wishlistLength} {wishlistLengthText}
              </span>
            </div>
          </div>
          <div className={styles.wishlistItemsContainer}>
            {wishlist.map((wishlistItem) => {
              return <WishlistCard wishlistItem={wishlistItem} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
