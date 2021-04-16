import { useData } from '../../context';
import WishlistCard from './components/WishlistCard';

export function Wishlist() {
  const { wishlist } = useData();

  return (
    <div>
      {wishlist.length === 0
        ? `wishlist is empty`
        : wishlist.map((wishlistItem) => {
            return <WishlistCard wishlistItem={wishlistItem} />;
          })}
    </div>
  );
}