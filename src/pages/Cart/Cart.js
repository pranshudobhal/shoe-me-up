import { useData } from '../../context';
import { CartCard } from './components/CartCard';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router';

export function Cart() {
  const { cart } = useData();

  const navigate = useNavigate();

  const totalPrice = cart?.reduce((total, current) => total + current.price * current.quantity, 0);

  const discountOnMRP = Math.round(totalPrice * 0.2);

  const cartLength = cart?.length;

  const cartLengthText = cartLength > 1 ? 'Items' : 'Item';

  const totalItems = cart?.reduce((total, current) => total + Number(current.quantity), 0);

  return (
    <div className={styles.cartContainer}>
      {cartLength === 0 ? (
        <div className={styles.emptyCart}>
          <h3>YOUR CART IS EMPTY</h3>
          <p>There is nothing in your bag. Let's add something.</p>
          <button className="btn btn-secondary-outline" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={styles.cart}>
          <div className={styles.pageTitle}>
            <h1 className={styles.pageName}>Cart</h1>
            <div className={styles.cartOverall}>
              <span>
                {totalItems} {cartLengthText}{' '}
              </span>
              <span>| ₹{totalPrice}</span>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.cartItemContainer}>
              {cart.map((cartItem) => {
                return <CartCard cartItem={cartItem} />;
              })}
            </div>
            <div className={styles.price}>
              <div className={styles.priceContainer}>
                <h3>
                  Price Details ({cart.length} {cartLengthText})
                </h3>
                <div className={styles.priceText}>
                  <span>Total MRP</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className={styles.priceText}>
                  <span>Discount on MRP</span>
                  <span className={styles.discount}>&#8211;₹{discountOnMRP}</span>
                </div>
                <div className={styles.priceText}>
                  <span>Delivery Charges</span>
                  <span className={styles.delivery}>FREE</span>
                </div>
                <div className={styles.priceText}>
                  <span>Total Amount</span>
                  <span>₹{totalPrice - discountOnMRP}</span>
                </div>
              </div>
              <div className={styles.checkoutButtonContainer}>
                <button className={styles.checkoutButton}>PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
