import { useAuth, useData } from '../../context';
import { CartCard } from './components/CartCard';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router';
import { placeOrder } from '../../services';

export function Cart() {
  const { cart } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartLength = cart?.length;
  const cartLengthText = cartLength > 1 ? 'Items' : 'Item';
  const totalPrice = cart?.reduce((total, current) => total + current.price * current.qty, 0);
  const discountOnTotalPrice = Math.round(totalPrice * 0.2);
  const totalItems = cart?.reduce((total, current) => total + Number(current.qty), 0);
  const totalPriceAfterDiscount = totalPrice - discountOnTotalPrice;

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
              <span>| ₹{totalPriceAfterDiscount}</span>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.cartItemContainer}>
              {cart.map((cartItem, index) => {
                return <CartCard key={index} cartItem={cartItem} />;
              })}
            </div>
            <div className={styles.price}>
              <div className={styles.priceContainer}>
                <h3>
                  Price Details ({cartLength} {cartLengthText})
                </h3>
                <div className={styles.priceText}>
                  <span>Total MRP</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className={styles.priceText}>
                  <span>Discount on MRP</span>
                  <span className={styles.discount}>&#8211;₹{discountOnTotalPrice}</span>
                </div>
                <div className={styles.priceText}>
                  <span>Delivery Charges</span>
                  <span className={styles.delivery}>FREE</span>
                </div>
                <div className={styles.priceText}>
                  <span>Total Amount</span>
                  <span>₹{totalPriceAfterDiscount}</span>
                </div>
              </div>
              <div className={styles.checkoutButtonContainer}>
                <button className={styles.checkoutButton} onClick={() => placeOrder(user, totalPriceAfterDiscount)}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
