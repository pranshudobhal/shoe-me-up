import { useData } from '../../context';
import { CartCard } from './components/CartCard';
import styles from './Cart.module.css';

export function Cart() {
  const { cart } = useData();

  const totalPrice = cart.reduce((total, current) => total + current.price * current.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.pageTitle}>
        <h1 className={styles.pageName}>Cart</h1>
        <div className={styles.cartOverall}>
          <span>
            {cart.length} {cart.length > 1 ? 'Items' : 'Item'} |
          </span>
          <span>
            {' '}
            ₹ {totalPrice} {totalPrice === 0 ? '' : '.00'}
          </span>
        </div>
      </div>
      <div className={styles.container}>
        {cart.length === 0
          ? 'cart is empty'
          : cart.map((cartItem) => {
              return <CartCard cartItem={cartItem} />;
            })}
      </div>
      {/* <div>Total Price</div>

      <div>
        <div>Subtotal = {totalPrice}.00</div>
        <div>Total = {totalPrice}.00</div>
      </div> */}
    </div>
  );
}
